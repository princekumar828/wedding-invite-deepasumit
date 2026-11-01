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
 * Detect simple client device info for analytics
 */
function getClientDeviceInfo() {
  if (typeof window === 'undefined') return {};
  const ua = navigator.userAgent || '';
  let deviceType = 'Desktop';
  if (/mobile/i.test(ua)) deviceType = 'Mobile';
  if (/iPad|tablet/i.test(ua)) deviceType = 'Tablet';
  if (/iPhone|Android/i.test(ua)) deviceType = /iPhone/i.test(ua) ? 'iPhone' : 'Android';

  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';

  const screen = `${window.innerWidth}x${window.innerHeight}`;
  const referrer = document.referrer || (window.location.search.includes('source=whatsapp') ? 'WhatsApp' : 'Direct');

  return { deviceType, browser, screen, referrer };
}

/**
 * Record a unique visit and update stats
 */
export async function recordVisit() {
  const visitorId = getOrCreateVisitorId();
  const { deviceType, browser, screen, referrer } = getClientDeviceInfo();

  if (!isSupabaseConfigured || !supabase) {
    // Local fallback
    const localVisits = parseInt(localStorage.getItem('ds_local_visits') || '1', 10) + 1;
    localStorage.setItem('ds_local_visits', localVisits.toString());
    return { success: true, isLocal: true };
  }

  try {
    const { data, error } = await supabase.rpc('record_visit', {
      p_visitor_id: visitorId,
      p_device_type: deviceType,
      p_browser: browser,
      p_screen: screen,
      p_referrer: referrer,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Visit recording notice:', err.message);
    return { success: false, error: err };
  }
}

/**
 * Fetch live flower shower count & site stats
 */
export async function getLiveStats() {
  if (!isSupabaseConfigured || !supabase) {
    const localFlowers = parseInt(localStorage.getItem('ds_flower_count') || '168', 10);
    return { flower_count: localFlowers, total_visits: 1 };
  }

  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('flower_count, total_visits')
      .eq('id', 'global')
      .maybeSingle();

    if (error || !data) {
      return { flower_count: 168, total_visits: 1 };
    }
    return data;
  } catch {
    return { flower_count: 168, total_visits: 1 };
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
