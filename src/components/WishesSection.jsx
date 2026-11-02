import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquareHeart, Send, Sparkles, Heart, Smile } from 'lucide-react';
import { fetchWishes, submitWish } from '../lib/supabase';

const initialWishes = [
  {
    id: 1,
    name: "श्रीमती सुनिता देवी एवं श्री दिलीप साहू",
    nameHi: "श्रीमती सुनिता देवी एवं श्री दिलीप साहू",
    nameEn: "Smt. Sunita Devi & Shri Dilip Sahu",
    relationshipHi: "वधू के माता-पिता",
    relationshipEn: "Bride's Parents",
    badgeHi: "माँ-पापा का आशीष",
    badgeEn: "Parents' Blessing",
    message: "हमारी लाडली बिटिया दीपा और दामाद सुमित को भगवान लक्ष्मीनारायण का अखंड आशीर्वाद मिले। आपका जीवन सदा सुख, शांति और समृद्धि से महकता रहे। — माँ एवं पापा",
    messageHi: "हमारी लाडली बिटिया दीपा और दामाद सुमित को भगवान लक्ष्मीनारायण का अखंड आशीर्वाद मिले। आपका जीवन सदा सुख, शांति और समृद्धि से महकता रहे। — माँ एवं पापा",
    messageEn: "May Lord Lakshmi-Narayana shower endless divine blessings upon our beloved daughter Deepa and son-in-law Sumit. May your life together always bloom with joy, peace, and eternal prosperity. — Mother & Father",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 2,
    name: "आनन्द प्रसाद चौधरी एवं श्रीमती ललिता देवी",
    nameHi: "आनन्द प्रसाद चौधरी एवं श्रीमती ललिता देवी",
    nameEn: "Anand Prasad Choudhary & Smt. Lalita Devi",
    relationshipHi: "फूफा जी एवं फुआ जी",
    relationshipEn: "Uncle & Aunt (Phupha & Phua)",
    badgeHi: "फूफा-फुआ का शुभाशीष",
    badgeEn: "Elders' Blessing",
    message: "वर-वधू को नव दाम्पत्य जीवन की हार्दिक बधाई एवं शुभाशीष। ईश्वर आप दोनों की जोड़ी को हर संकट से दूर रखे और हमेशा खुशहाल रखे।",
    messageHi: "वर-वधू को नव दाम्पत्य जीवन की हार्दिक बधाई एवं शुभाशीष। ईश्वर आप दोनों की जोड़ी को हर संकट से दूर रखे और हमेशा खुशहाल रखे।",
    messageEn: "Heartfelt congratulations and divine blessings to the newlyweds. May the Almighty protect your holy union and keep you both forever blissful.",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 3,
    name: "श्री प्रदीप प्रसाद एवं श्रीमती लक्ष्मी देवी",
    nameHi: "श्री प्रदीप प्रसाद एवं श्रीमती लक्ष्मी देवी",
    nameEn: "Shri Pradeep Prasad & Smt. Laxmi Devi",
    relationshipHi: "चाचा जी एवं चाची जी",
    relationshipEn: "Paternal Uncle & Aunt (Chacha & Chachi)",
    badgeHi: "चाचा-चाची का आशीष",
    badgeEn: "Uncle & Aunt's Blessing",
    message: "दीपा बिटिया और सुमित को शुभ विवाह की ढेर सारी शुभकामनाएं एवं शुभाशीष। आपका वैवाहिक जीवन प्रेम, विश्वास और खुशियों से परिपूर्ण रहे।",
    messageHi: "दीपा बिटिया और सुमित को शुभ विवाह की ढेर सारी शुभकामनाएं एवं शुभाशीष। आपका वैवाहिक जीवन प्रेम, विश्वास और खुशियों से परिपूर्ण रहे।",
    messageEn: "Heartfelt congratulations and warm blessings to dear Deepa and Sumit. May your sacred marriage be enriched with everlasting love, mutual trust, and boundless happiness.",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 4,
    name: "श्री अनिल कुमार एवं श्रीमती रिंकू देवी",
    nameHi: "श्री अनिल कुमार एवं श्रीमती रिंकू देवी",
    nameEn: "Shri Anil Kumar & Smt. Rinku Devi",
    relationshipHi: "चाचा जी एवं चाची जी",
    relationshipEn: "Paternal Uncle & Aunt (Chacha & Chachi)",
    badgeHi: "चाचा-चाची का आशीष",
    badgeEn: "Uncle & Aunt's Blessing",
    message: "प्रिय दीपा और सुमित को दांपत्य जीवन के पावन बंधन की अनंत मंगलकामनाएं। ईश्वर आप दोनों की जोड़ी को सदा सलामत रखे और हर कदम पर सफलता दे।",
    messageHi: "प्रिय दीपा और सुमित को दांपत्य जीवन के पावन बंधन की अनंत मंगलकामनाएं। ईश्वर आप दोनों की जोड़ी को सदा सलामत रखे और हर कदम पर सफलता दे।",
    messageEn: "Warmest wishes to beloved Deepa and Sumit as you unite in the sacred bond of marriage. May God bless you both with great health, prosperity, and joyous companionship.",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 5,
    name: "प्रिन्स",
    nameHi: "प्रिन्स",
    nameEn: "Prince",
    relationshipHi: "छोटा भाई (अनुज)",
    relationshipEn: "Younger Brother",
    badgeHi: "छोटे भाई का स्नेह",
    badgeEn: "Brother's Love",
    message: "दीदी, आपके नए सफर की शुरुआत पर ढेर सारा प्यार और शुभकामनाएं! सुमित जीजा जी, हमारी दीदी का हमेशा ख्याल रखिएगा। आप दोनों को बहुत-बहुत बधाई!",
    messageHi: "दीदी, आपके नए सफर की शुरुआत पर ढेर सारा प्यार और शुभकामनाएं! सुमित जीजा जी, हमारी दीदी का हमेशा ख्याल रखिएगा। आप दोनों को बहुत-बहुत बधाई!",
    messageEn: "Dearest Didi, sending you oceans of love on your new journey! Sumit Jija Ji, please take very good care of our wonderful sister. Heartiest congratulations to both of you!",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 6,
    name: "सौरभ एवं समस्त भाई (सुशांत, अंकित, अमन, अर्पित, चिराग)",
    nameHi: "सौरभ एवं समस्त भाई (सुशांत, अंकित, अमन, अर्पित, चिराग)",
    nameEn: "Saurav & All Brothers (Sushant, Ankit, Aman, Arpit, Chirag)",
    relationshipHi: "छोटे भाई (अनुज)",
    relationshipEn: "Brothers & Cousins",
    badgeHi: "छोटे भाइयों का स्नेह",
    badgeEn: "Brothers' Love",
    message: "दीदी और जीजाजी को शुभ विवाह की अनंत मंगलकामनाएं! हम सब भाइयों की तरफ से दोनों को जीवन भर का प्यार और खुशियां।",
    messageHi: "दीदी और जीजाजी को शुभ विवाह की अनंत मंगलकामनाएं! हम सब भाइयों की तरफ से दोनों को जीवन भर का प्यार और खुशियां।",
    messageEn: "Endless blessings and warmest wishes to Didi and Jija Ji on your auspicious wedding! Love, joy, and hearty congratulations from all of us brothers.",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  },
  {
    id: 7,
    name: "रूबी एवं रूची",
    nameHi: "रूबी एवं रूची",
    nameEn: "Ruby & Ruchi",
    relationshipHi: "लाडली बहने",
    relationshipEn: "Loving Sisters",
    badgeHi: "लाडली बहने",
    badgeEn: "Sisters' Love",
    message: "दीदी और सुमित जीजू को वैवाहिक जीवन की ढेरों शुभकामनाएं! हमारी दीदी की शादी सबसे यादगार और खुशहाल होगी!",
    messageHi: "दीदी और सुमित जीजू को वैवाहिक जीवन की ढेरों शुभकामनाएं! हमारी दीदी की शादी सबसे यादगार और खुशहाल होगी!",
    messageEn: "Warmest congratulations and hugs to Didi and Sumit Jeeju! Our dearest sister's wedding will be the happiest and most magical celebration ever!",
    dateHi: "जनवरी 2027",
    dateEn: "Jan 2027"
  }
];

// Helper blessing message templates
const quickTemplates = {
  hi: [
    "दीपा और सुमित को शुभ विवाह की हार्दिक शुभकामनाएं! आपकी जोड़ी सदा सलामत रहे।",
    "सदा सुहागन रहो! ईश्वर आप दोनों के जीवन में अपार खुशियां, प्रेम और समृद्धि प्रदान करे।",
    "दीपा बिटिया और सुमित को दांपत्य जीवन की अनंत मंगलकामनाएं! खुशहाल रहे आपका संसार।",
    "दो दिलों का पावन संगम, ईश्वर का आशीर्वाद आप दोनों पर सदैव बना रहे। बहुत-बहुत बधाई!",
    "नए सफर की शुरुआत पर हार्दिक बधाई। प्रेम और विश्वास का यह बंधन अटूट रहे।"
  ],
  en: [
    "Wishing Deepa & Sumit a lifetime of love, laughter, and endless happiness together!",
    "May your married life be filled with boundless joy, peace, and eternal companionship. Heartiest congratulations!",
    "Sending our warmest blessings and love to the newlyweds! Have a wonderful married life.",
    "Congratulations on your wedding! May the years ahead be filled with lasting joy and harmony."
  ]
};

const relationshipOptions = [
  { value: "पारिवारिक सदस्य", labelHi: "पारिवारिक सदस्य", labelEn: "Family Member" },
  { value: "चाचा जी एवं चाची जी", labelHi: "चाचा जी एवं चाची जी", labelEn: "Uncle & Aunt (Chacha & Chachi)" },
  { value: "चाचा / चाची", labelHi: "चाचा / चाची", labelEn: "Uncle / Aunt" },
  { value: "छोटा भाई (अनुज)", labelHi: "छोटा भाई (अनुज)", labelEn: "Younger Brother" },
  { value: "बड़ा भाई (अग्रज)", labelHi: "बड़ा भाई (अग्रज)", labelEn: "Elder Brother" },
  { value: "छोटी बहन (अनुजा)", labelHi: "छोटी बहन (अनुजा)", labelEn: "Younger Sister" },
  { value: "बड़ी बहन", labelHi: "बड़ी बहन", labelEn: "Elder Sister" },
  { value: "फूफा जी एवं फुआ जी", labelHi: "फूफा जी एवं फुआ जी", labelEn: "Uncle & Aunt (Phupha & Phua)" },
  { value: "फुआ / फूफा", labelHi: "फुआ / फूफा", labelEn: "Aunt & Uncle" },
  { value: "मामा / मामी", labelHi: "मामा / मामी", labelEn: "Maternal Uncle & Aunt" },
  { value: "भाई / भाभी", labelHi: "भाई / भाभी", labelEn: "Brother / Sister-in-law" },
  { value: "बहन / जीजाजी", labelHi: "बहन / जीजाजी", labelEn: "Sister / Brother-in-law" },
  { value: "मित्र / सहेली", labelHi: "मित्र / सहेली", labelEn: "Friend" },
  { value: "सहकर्मी", labelHi: "सहकर्मी", labelEn: "Colleague" },
  { value: "शुभचिंतक", labelHi: "शुभचिंतक", labelEn: "Well Wisher" }
];

// Helper to strictly show pure Hindi or English without awkward mixed parentheses
const getLocalizedRelationship = (item, lang) => {
  if (lang === 'hi') {
    if (item.relationshipHi) return item.relationshipHi;
    const rel = item.relationship || item.relation || '';
    const clean = rel.replace(/\s*\([A-Za-z\s/&,-]+\)/g, '').trim();
    const match = relationshipOptions.find(o => o.value === rel || o.labelHi === clean || o.labelEn === rel);
    return match ? match.labelHi : (clean || 'पारिवारिक सदस्य');
  } else {
    if (item.relationshipEn) return item.relationshipEn;
    const rel = item.relationship || item.relation || '';
    const enMatch = rel.match(/\(([A-Za-z\s/&,-]+)\)/);
    if (enMatch) return enMatch[1].trim();
    const match = relationshipOptions.find(o => o.value === rel || o.labelHi === rel || o.labelEn === rel);
    return match ? match.labelEn : (rel || 'Family Member');
  }
};

const getLocalizedBadge = (item, lang) => {
  if (lang === 'hi') {
    if (item.badgeHi) return item.badgeHi;
    const b = item.badge || '';
    return b.replace(/\s*\([A-Za-z\s/&,-]+\)/g, '').trim() || 'स्नेहिल आशीष';
  } else {
    if (item.badgeEn) return item.badgeEn;
    const b = item.badge || '';
    const enMatch = b.match(/\(([A-Za-z\s/&,-]+)\)/);
    if (enMatch) return enMatch[1].trim();
    return 'Blessing';
  }
};

// Filter out excluded / deleted blessings
const isExcludedWish = (w) => {
  const text = `${w.name || ''} ${w.relation || ''} ${w.relationship || ''} ${w.message || ''}`.toLowerCase();
  return (
    text.includes('vinay') ||
    text.includes('sarita') ||
    text.includes('mohit') ||
    text.includes('anita') ||
    text.includes('प्रदीप प्रसाद एवं श्री अनिल') ||
    text.includes('pradeep prasad and anil')
  );
};

export default function WishesSection({ lang }) {
  const [wishes, setWishes] = useState(() => {
    try {
      // Clear legacy storage versions to prevent cached stale items
      localStorage.removeItem('deepa_sumit_wishes');
      localStorage.removeItem('deepa_sumit_wishes_v2');
      localStorage.removeItem('deepa_sumit_wishes_v4');
      localStorage.removeItem('deepa_sumit_wishes_v5');

      const saved = localStorage.getItem('deepa_sumit_wishes_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(w => !isExcludedWish(w));
      }
    } catch {
      // fallback
    }
    return initialWishes;
  });

  const [form, setForm] = useState({
    name: '',
    relationship: 'पारिवारिक सदस्य',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    // Fetch live wishes from Supabase and merge with family blessings
    fetchWishes().then((serverWishes) => {
      if (serverWishes && serverWishes.length > 0) {
        const formatted = serverWishes
          .filter(w => !isExcludedWish(w))
          .map((w) => ({
            id: w.id,
            name: w.name,
            relationship: w.relation || 'शुभचिंतक',
            message: w.message,
            date: new Date(w.created_at || Date.now()).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
              month: 'short',
              year: 'numeric'
            }),
            badge: lang === 'hi' ? 'स्नेहिल आशीष' : 'Blessing'
          }));
        setWishes([...formatted, ...initialWishes]);
      } else {
        setWishes(initialWishes);
      }
    });
  }, [lang]);

  const applyTemplate = (tpl) => {
    setForm((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message} ${tpl}` : tpl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setIsSubmitting(true);

    const wishPayload = {
      name: form.name.trim(),
      relation: form.relationship,
      message: form.message.trim(),
    };

    const newWish = {
      id: Date.now(),
      name: form.name.trim(),
      relationship: form.relationship,
      message: form.message.trim(),
      date: new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
        month: 'short',
        year: 'numeric'
      }),
      badge: lang === 'hi' ? 'स्नेहिल आशीष' : 'Blessing'
    };

    // Optimistic UI update
    setWishes((prev) => [newWish, ...prev]);
    setForm({ name: '', relationship: 'पारिवारिक सदस्य (Family Member)', message: '' });
    setIsSubmitting(false);
    setSuccessMsg(true);

    // Save to Supabase
    try {
      await submitWish(wishPayload);
    } catch {
      // Handled
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#9B111E', '#EAA315']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <section id="wishes" className="py-16 px-4 bg-[#FAF7F0] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9B111E]/10 text-[#9B111E] text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'डिजिटल आशीर्वाद' : 'Digital Ashirwad & Blessings'}</span>
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'वर-वधू के लिए शुभकामना संदेश' : 'Wishes for Deepa & Sumit'}
          </h2>

          <div className="flex items-center justify-center gap-3 my-3 text-[#D4AF37]">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <Heart className="w-4 h-4 text-[#9B111E] fill-[#9B111E]" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            {lang === 'hi'
              ? 'दीपा एवं सुमित के मंगल दांपत्य जीवन के लिए अपने पावन आशीष एवं शुभकामनाएं यहां प्रेषित करें।'
              : 'Leave your heartfelt blessings and warm wishes for Deepa & Sumit as they begin this sacred journey.'}
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="md:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#D4AF37] shadow-royal">
            <h3 className="text-lg font-serif font-bold text-[#4A0E17] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'hi' ? 'अपना आशीर्वाद संदेश लिखें' : 'Write a Blessing'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {lang === 'hi' ? 'आपका शुभ नाम *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={lang === 'hi' ? 'उदा. अमित कुमार' : 'e.g. Amit Kumar'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none transition-all"
                />
              </div>

              {/* Relationship Dropdown */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {lang === 'hi' ? 'संबंध / रिश्ता *' : 'Relationship *'}
                </label>
                <select
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none bg-white transition-all cursor-pointer"
                >
                  {relationshipOptions.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {lang === 'hi' ? opt.labelHi : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Blessing Templates Helper */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">
                    {lang === 'hi' ? 'आशीर्वाद संदेश *' : 'Your Blessing *'}
                  </label>
                  <span className="text-[10px] text-[#9B111E] font-medium flex items-center gap-1">
                    <Smile className="w-3 h-3" />
                    {lang === 'hi' ? 'त्वरित संदेश चुनें' : 'Quick wishes'}
                  </span>
                </div>

                {/* Clickable Helper Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {quickTemplates[lang].map((tpl, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => applyTemplate(tpl)}
                      className="text-[10px] bg-amber-50 hover:bg-amber-100 text-[#9A7B1C] border border-amber-200 rounded-lg px-2 py-1 text-left line-clamp-1 transition-colors"
                      title={tpl}
                    >
                      + {tpl}
                    </button>
                  ))}
                </div>

                <textarea
                  required
                  rows="3"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={
                    lang === 'hi'
                      ? 'वर-वधू के लिए अपने शुभ विचार लिखें या ऊपर दिए गए संदेश पर क्लिक करें...'
                      : 'Share your warm words for Deepa & Sumit...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#9B111E] text-white font-medium text-xs sm:text-sm hover:bg-[#7A0A15] border border-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-[#F5D77F]" />
                <span>{lang === 'hi' ? 'संदेश प्रेषित करें' : 'Post Blessing'}</span>
              </button>

              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 text-center font-medium animate-fade-in">
                  {lang === 'hi'
                    ? '✨ आपका आशीर्वाद संदेश सफलतापूर्वक दर्ज हो गया है! धन्यवाद।'
                    : '✨ Thank you! Your warm blessing has been shared.'}
                </div>
              )}
            </form>
          </div>

          {/* Wishes Display Column */}
          <div className="md:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-2">
            {wishes.map((item) => {
              const displayName = lang === 'hi' ? (item.nameHi || item.name) : (item.nameEn || item.name);
              const displayRel = getLocalizedRelationship(item, lang);
              const displayBadge = getLocalizedBadge(item, lang);
              const displayMsg = lang === 'hi' ? (item.messageHi || item.message) : (item.messageEn || item.message);
              const displayDate = lang === 'hi' ? (item.dateHi || item.date) : (item.dateEn || item.date);
              const firstLetter = displayName ? displayName.trim().charAt(0) : '🌸';

              return (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-sm hover:shadow-gold-sm transition-all relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-bold text-[#9B111E]">
                        {firstLetter}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17] leading-tight">
                          {displayName}
                        </h4>
                        <span className="text-[10px] text-gray-500">{displayRel}</span>
                      </div>
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-[#9A7B1C] border border-amber-200 font-medium">
                      {displayBadge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 font-serif leading-relaxed italic pl-10">
                    "{displayMsg}"
                  </p>

                  <div className="text-right text-[10px] text-gray-400 mt-2">
                    {displayDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
