import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquareHeart, Send, Sparkles, Heart, Smile } from 'lucide-react';
import { fetchWishes, submitWish } from '../lib/supabase';

const initialWishes = [
  {
    id: 1,
    name: "श्रीमती सुनिता देवी एवं श्री दिलीप साहू",
    relationship: "वधू के माता-पिता",
    message: "हमारी लाडली बिटिया दीपा और दामाद सुमित को भगवान लक्ष्मीनारायण का अखंड आशीर्वाद मिले। आपका जीवन सदा सुख, शांति और समृद्धि से महकता रहे। — माँ एवं पापा",
    date: "November 2026",
    badge: "माँ-पापा का आशीष"
  },
  {
    id: 2,
    name: "आनन्द प्रसाद चौधरी एवं श्रीमती ललिता देवी",
    relationship: "फूफा-फुआ",
    message: "वर-वधू को नव दाम्पत्य जीवन की हार्दिक बधाई एवं शुभाशीष। ईश्वर आप दोनों की जोड़ी को हर संकट से दूर रखे और हमेशा खुशहाल रखे।",
    date: "November 2026",
    badge: "फूफा-फुआ का शुभाशीष"
  },
  {
    id: 3,
    name: "श्री प्रदीप प्रसाद एवं श्री अनिल कुमार",
    relationship: "वधू के चाचा जी",
    message: "दीपा बिटिया और सुमित को दांपत्य जीवन के पावन बंधन की ढेरों शुभकामनाएं। खुशियों और सफलताओं से भरा रहे आप दोनों का नया संसार।",
    date: "November 2026",
    badge: "चाचा जी का आशीष"
  },
  {
    id: 4,
    name: "प्रिन्स",
    relationship: "भाई",
    message: "दीदी, आपके नए सफर की शुरुआत पर ढेर सारा प्यार और शुभकामनाएं! सुमित भैया, हमारी दीदी का हमेशा ख्याल रखिएगा। आप दोनों को बहुत-बहुत बधाई!",
    date: "November 2026",
    badge: "भाई का प्यार"
  },
  {
    id: 5,
    name: "सौरभ एवं समस्त भाई (सुशांत, अंकित, अमन, अर्पित, चिराग)",
    relationship: "भाईगण",
    message: "दीदी और जीजाजी को शुभ विवाह की अनंत मंगलकामनाएं! हम सब भाइयों की तरफ से दोनों को जीवन भर का प्यार और खुशियां।",
    date: "November 2026",
    badge: "भाईयों की ओर से"
  },
  {
    id: 6,
    name: "रूबी एवं रूची",
    relationship: "बहने",
    message: "दीदी और सुमित भैया को वैवाहिक जीवन की ढेरों शुभकामनाएं! हमारी दीदी की शादी सबसे यादगार और खुशहाल होगी!",
    date: "November 2026",
    badge: "लाडली बहने"
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
  { value: "पारिवारिक सदस्य (Family Member)", labelHi: "पारिवारिक सदस्य", labelEn: "Family Member" },
  { value: "चाचा / चाची (Uncle / Aunt)", labelHi: "चाचा / चाची", labelEn: "Uncle / Aunt" },
  { value: "मामा / मामी (Maternal Uncle / Aunt)", labelHi: "मामा / मामी", labelEn: "Maternal Uncle / Aunt" },
  { value: "फुआ / फूफा (Aunt & Uncle)", labelHi: "फुआ / फूफा", labelEn: "Aunt & Uncle" },
  { value: "भाई / भाभी (Brother / Sister-in-law)", labelHi: "भाई / भाभी", labelEn: "Brother / Sister-in-law" },
  { value: "बहन / जीजाजी (Sister / Brother-in-law)", labelHi: "बहन / जीजाजी", labelEn: "Sister / Brother-in-law" },
  { value: "मित्र / सहेली (Friend)", labelHi: "मित्र / सहेली", labelEn: "Friend" },
  { value: "सहकर्मी (Colleague)", labelHi: "सहकर्मी", labelEn: "Colleague" },
  { value: "शुभचिंतक (Well Wisher)", labelHi: "शुभचिंतक", labelEn: "Well Wisher" }
];

export default function WishesSection({ lang }) {
  const [wishes, setWishes] = useState(() => {
    try {
      // Clear legacy test keys from previous testing
      localStorage.removeItem('deepa_sumit_wishes');
      localStorage.removeItem('deepa_sumit_wishes_v2');

      const saved = localStorage.getItem('deepa_sumit_wishes_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out any stray test messages
        return parsed.filter(w => !['sumit', 'Prince'].includes(w.name.trim()));
      }
    } catch {
      // fallback
    }
    return initialWishes;
  });

  const [form, setForm] = useState({
    name: '',
    relationship: 'पारिवारिक सदस्य (Family Member)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    // Fetch live wishes from Supabase and merge with family blessings
    fetchWishes().then((serverWishes) => {
      if (serverWishes && serverWishes.length > 0) {
        const formatted = serverWishes.map((w) => ({
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
                  {lang === 'hi' ? 'आपका नाम (Your Name) *' : 'Your Name *'}
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
                  {lang === 'hi' ? 'संबंध / रिश्ता (Relationship) *' : 'Relationship *'}
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
                    {lang === 'hi' ? 'आशीर्वाद संदेश (Your Blessing) *' : 'Your Blessing *'}
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
            {wishes.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-sm hover:shadow-gold-sm transition-all relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-bold text-[#9B111E]">
                      {item.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17] leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-gray-500">{item.relationship}</span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-[#9A7B1C] border border-amber-200 font-medium">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-serif leading-relaxed italic pl-10">
                  "{item.message}"
                </p>

                <div className="text-right text-[10px] text-gray-400 mt-2">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
