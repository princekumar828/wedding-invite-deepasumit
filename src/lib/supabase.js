import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid credentials are present
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Generate or retrieve an anonymous persistent visitor ID
 */
export function getOrCreateVisitorId() {
  const STORAGE_KEY = 'ds_visitor_id';
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

/**
 * Detect deep client device info passively without prompting user
 */
function getClientDeviceInfo() {
  if (typeof window === 'undefined') return {};
  const ua = navigator.userAgent || '';
  const nav = navigator || {};

  // 1. Operating System
  let os = 'Unknown';
  if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // 2. Device Type & Exact Category
  let deviceType = 'Desktop';
  if (/iPad|tablet/i.test(ua)) deviceType = 'Tablet';
  else if (/iPhone/i.test(ua)) deviceType = 'iPhone';
  else if (/Android/i.test(ua) && /mobile/i.test(ua)) deviceType = 'Android Phone';
  else if (/mobile/i.test(ua)) deviceType = 'Mobile';

  // 3. Browser & In-App Webview Detection (crucial for WhatsApp shares)
  let browser = 'Browser';
  if (/WhatsApp/i.test(ua)) browser = 'WhatsApp In-App';
  else if (/Instagram/i.test(ua)) browser = 'Instagram App';
  else if (/FBAN|FBAV/i.test(ua)) browser = 'Facebook App';
  else if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
  else if (/Chrome|CriOS/i.test(ua)) browser = 'Google Chrome';
  else if (/Safari/i.test(ua)) browser = 'Apple Safari';
  else if (/Firefox/i.test(ua)) browser = 'Mozilla Firefox';

  // 4. Screen & DPR
  const dpr = window.devicePixelRatio ? `${window.devicePixelRatio}x` : '1x';
  const orientation = window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
  const screen = `${window.innerWidth}x${window.innerHeight} (${dpr}, ${orientation})`;

  // 5. Traffic Source (WhatsApp / Google / Direct)
  let referrer = 'Direct Link';
  const ref = document.referrer || '';
  const search = window.location.search || '';
  if (ref.includes('whatsapp') || search.includes('whatsapp') || browser === 'WhatsApp In-App') {
    referrer = 'WhatsApp Invite';
  } else if (ref.includes('google')) {
    referrer = 'Google Search';
  } else if (ref.includes('instagram')) {
    referrer = 'Instagram';
  } else if (ref.includes('facebook') || ref.includes('t.co')) {
    referrer = 'Social Media';
  } else if (ref) {
    referrer = new URL(ref).hostname || 'Referral';
  }

  // 6. Network & Connection Speed
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  const network = conn ? `${conn.effectiveType || '4G'}`.toUpperCase() : 'WiFi/4G';

  // 7. Timezone & Language
  const timezone = Intl?.DateTimeFormat?.().resolvedOptions()?.timeZone || 'Asia/Kolkata';
  const language = nav.language || 'hi-IN';

  return {
    os,
    deviceType,
    browser,
    screen,
    referrer,
    network,
    timezone,
    language
  };
}

/**
 * Record a unique visit and update stats (Session-deduplicated)
 */
export async function recordVisit() {
  if (typeof window !== 'undefined') {
    // 1. Never record visits when on admin portal
    const isAdmin =
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.search.includes('admin=true');
    if (isAdmin) {
      return { success: true, skipped: 'admin' };
    }

    // 2. Prevent repeated increments on page refresh (deduplicate by session)
    const alreadyRecordedInSession = sessionStorage.getItem('ds_visit_recorded');
    if (alreadyRecordedInSession) {
      return { success: true, skipped: 'session_already_counted' };
    }
    sessionStorage.setItem('ds_visit_recorded', 'true');
  }

  const visitorId = getOrCreateVisitorId();
  const info = getClientDeviceInfo();

  // Save to detailed local log for rich admin analytics
  try {
    const raw = localStorage.getItem('ds_detailed_visitors');
    const logs = raw ? JSON.parse(raw) : [];
    // Keep last 100 visitor logs
    const newEntry = {
      id: visitorId,
      ...info,
      created_at: new Date().toISOString()
    };
    const updated = [newEntry, ...logs.filter((l) => l.id !== visitorId)].slice(0, 100);
    localStorage.setItem('ds_detailed_visitors', JSON.stringify(updated));
  } catch (e) {
    // silent fallback
  }

  if (!isSupabaseConfigured || !supabase) {
    const localVisits = parseInt(localStorage.getItem('ds_local_visits') || '0', 10) + 1;
    localStorage.setItem('ds_local_visits', localVisits.toString());
    return { success: true, isLocal: true };
  }

  try {
    const { data, error } = await supabase.rpc('record_visit', {
      p_visitor_id: visitorId,
      p_device_type: `${info.deviceType} (${info.os})`,
      p_browser: `${info.browser} • ${info.network}`,
      p_screen: `${info.screen} [${info.timezone}]`,
      p_referrer: info.referrer,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Visit recording notice:', err.message);
    return { success: false, error: err };
  }
}

/**
 * Reset visit counter to zero (0)
 */
export async function resetVisitCount() {
  localStorage.setItem('ds_local_visits', '0');
  localStorage.removeItem('ds_detailed_visitors');
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('ds_visit_recorded');
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('site_stats')
        .update({ total_visits: 0 })
        .eq('id', 'global');

      await supabase
        .from('site_visits')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    } catch (e) {
      console.warn('Reset visits remote error:', e);
    }
  }
  return 0;
}

/**
 * Fetch live flower shower count & site stats
 */
export async function getLiveStats() {
  if (!isSupabaseConfigured || !supabase) {
    const localFlowers = parseInt(localStorage.getItem('ds_flower_count') || '168', 10);
    const localVisits = parseInt(localStorage.getItem('ds_local_visits') || '0', 10);
    return { flower_count: localFlowers, total_visits: localVisits };
  }

  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('flower_count, total_visits')
      .eq('id', 'global')
      .maybeSingle();

    if (error || !data) {
      const localVisits = parseInt(localStorage.getItem('ds_local_visits') || '0', 10);
      return { flower_count: 168, total_visits: localVisits };
    }
    return data;
  } catch {
    const localVisits = parseInt(localStorage.getItem('ds_local_visits') || '0', 10);
    return { flower_count: 168, total_visits: localVisits };
  }
}

/**
 * Increment flower shower count in real-time
 */
export async function incrementFlowerCount() {
  if (!isSupabaseConfigured || !supabase) {
    const current = parseInt(localStorage.getItem('ds_flower_count') || '168', 10) + 1;
    localStorage.setItem('ds_flower_count', current.toString());
    return current;
  }

  try {
    const { data, error } = await supabase.rpc('increment_flower_count');
    if (error) throw error;
    return data;
  } catch {
    // Fallback
    const current = parseInt(localStorage.getItem('ds_flower_count') || '168', 10) + 1;
    localStorage.setItem('ds_flower_count', current.toString());
    return current;
  }
}

/**
 * Fetch wedding wishes
 */
export async function fetchWishes() {
  if (!isSupabaseConfigured || !supabase) {
    const stored = localStorage.getItem('wedding_wishes');
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const { data, error } = await supabase
      .from('wedding_wishes')
      .select('id, name, relation, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Wishes fetch notice:', err.message);
    const stored = localStorage.getItem('wedding_wishes');
    return stored ? JSON.parse(stored) : [];
  }
}

/**
 * Save a new wish
 */
export async function submitWish({ name, relation, message }) {
  const newWish = {
    name,
    relation: relation || 'Well-wisher',
    message,
    created_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured || !supabase) {
    const stored = localStorage.getItem('wedding_wishes');
    const wishes = stored ? JSON.parse(stored) : [];
    const updated = [{ id: 'loc_' + Date.now(), ...newWish }, ...wishes];
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));
    return { success: true, data: updated[0] };
  }

  try {
    const { data, error } = await supabase
      .from('wedding_wishes')
      .insert([newWish])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Submit wish error:', err);
    return { success: false, error };
  }
}

/**
 * Submit Attendance (RSVP)
 */
export async function submitRsvp({ name, phone, attending, guestCount, message }) {
  const rsvpData = {
    name,
    phone: phone || null,
    attending: Boolean(attending),
    guest_count: parseInt(guestCount || 1, 10),
    message: message || null,
  };

  if (!isSupabaseConfigured || !supabase) {
    const stored = localStorage.getItem('wedding_rsvps');
    const rsvps = stored ? JSON.parse(stored) : [];
    rsvps.push({ id: 'rsvp_' + Date.now(), ...rsvpData, created_at: new Date().toISOString() });
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .insert([rsvpData]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Submit RSVP error:', err);
    return { success: false, error };
  }
}

/**
 * Admin: Fetch all RSVPs
 */
export async function fetchAdminRsvps() {
  if (!isSupabaseConfigured || !supabase) {
    const stored = localStorage.getItem('wedding_rsvps');
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Admin fetch RSVPs error, using local fallback:', err);
    const stored = localStorage.getItem('wedding_rsvps');
    return stored ? JSON.parse(stored) : [];
  }
}

/**
 * Admin: Update an RSVP (Full CRUD)
 */
export async function updateAdminRsvp(id, updates) {
  try {
    const stored = localStorage.getItem('wedding_rsvps');
    if (stored) {
      const rsvps = JSON.parse(stored);
      const updated = rsvps.map((r) => (r.id === id ? { ...r, ...updates } : r));
      localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
    }
  } catch {}

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Update RSVP error:', err);
    return { success: false, error };
  }
}

/**
 * Admin: Delete an RSVP
 */
export async function deleteAdminRsvp(id) {
  try {
    const stored = localStorage.getItem('wedding_rsvps');
    if (stored) {
      const rsvps = JSON.parse(stored);
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps.filter((r) => r.id !== id)));
    }
  } catch {}

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('wedding_rsvps')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Delete RSVP error:', err);
    return { success: false, error };
  }
}

/**
 * Admin: Fetch all wishes (alias for admin)
 */
export const fetchAdminWishes = fetchWishes;

/**
 * Admin: Update a Wish (Full CRUD)
 */
export async function updateAdminWish(id, updates) {
  try {
    const stored = localStorage.getItem('wedding_wishes');
    if (stored) {
      const wishes = JSON.parse(stored);
      const updated = wishes.map((w) => (w.id === id ? { ...w, ...updates } : w));
      localStorage.setItem('wedding_wishes', JSON.stringify(updated));
    }
    const storedV5 = localStorage.getItem('deepa_sumit_wishes_v5');
    if (storedV5) {
      const wishesV5 = JSON.parse(storedV5);
      const updatedV5 = wishesV5.map((w) => (w.id === id ? { ...w, ...updates } : w));
      localStorage.setItem('deepa_sumit_wishes_v5', JSON.stringify(updatedV5));
    }
  } catch {}

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { data, error } = await supabase
      .from('wedding_wishes')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Update wish error:', err);
    return { success: false, error };
  }
}

/**
 * Admin: Reset or update flower count
 */
export async function setFlowerCount(count = 0) {
  localStorage.setItem('ds_flower_count', count.toString());
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('site_stats')
        .update({ flower_count: count })
        .eq('id', 'global');
    } catch (e) {
      console.warn('Set flower count error:', e);
    }
  }
  return count;
}

/**
 * Admin: Delete a Wish
 */
export async function deleteAdminWish(id) {
  try {
    const stored = localStorage.getItem('wedding_wishes');
    if (stored) {
      const wishes = JSON.parse(stored);
      localStorage.setItem('wedding_wishes', JSON.stringify(wishes.filter((w) => w.id !== id)));
    }
    const storedV5 = localStorage.getItem('deepa_sumit_wishes_v5');
    if (storedV5) {
      const wishesV5 = JSON.parse(storedV5);
      localStorage.setItem('deepa_sumit_wishes_v5', JSON.stringify(wishesV5.filter((w) => w.id !== id)));
    }
  } catch {}

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('wedding_wishes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Delete wish error:', err);
    return { success: false, error };
  }
}

/**
 * Admin: Fetch recent visitor logs
 */
export async function fetchRecentVisits() {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('site_visits')
      .select('id, device_type, browser, screen, referrer, created_at')
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Fetch visits error:', err);
    return [];
  }
}

/**
 * Admin: Site Notice Ticker Management (stored in site_stats or local)
 */
export function getLocalNotice() {
  try {
    const raw = localStorage.getItem('ds_live_notice');
    if (!raw) return { text: '', enabled: false };
    return JSON.parse(raw);
  } catch {
    return { text: '', enabled: false };
  }
}

export function saveLocalNotice(noticeObj) {
  try {
    localStorage.setItem('ds_live_notice', JSON.stringify(noticeObj));
    return true;
  } catch {
    return false;
  }
}
