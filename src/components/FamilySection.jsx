import React from 'react';
import { Users, Phone, MessageCircle, Heart, Sparkles, UserCheck, Flame, Flower2 } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function FamilySection({ lang }) {
  const { family, quotes } = weddingData;

  return (
    <section id="family" className="py-16 px-4 bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF7F0] relative overflow-hidden">
      {/* Decorative Traditional Rangoli Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#9A7B1C] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#D4AF37]/40 shadow-sm font-serif">
            <Users className="w-3.5 h-3.5 text-[#EAA315]" />
            <span>{lang === 'hi' ? 'स्नेहिल आमंत्रण एवं परिवार' : 'Cordial Family Invitation'}</span>
            <Users className="w-3.5 h-3.5 text-[#EAA315]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A0E17]">
            {lang === 'hi' ? '॥ स्नेहिल आमंत्रण एवं परिवार ॥' : 'The Family & Hosts'}
          </h2>

          <div className="flex items-center justify-center gap-3 my-3 text-[#D4AF37]">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <Heart className="w-4 h-4 text-[#9B111E]" />
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 max-w-lg mx-auto font-serif">
            {lang === 'hi'
              ? '॥ मातृ-देवो भव • पितृ-देवो भव • अतिथि-देवो भव ॥\nआपके शुभागमन की प्रतीक्षा में संपूर्ण साहू परिवार।'
              : 'Eagerly awaiting your auspicious arrival — The Sahu Family.'}
          </p>
        </div>

        {/* 1. Creative Heritage Cards: Grandparents & Parents */}
        <div className="grid md:grid-cols-2 gap-7 mb-10">
          {/* Grandparents (स्वर्गीय दादाजी एवं पूजनीय दादी माँ) */}
          <div className="relative bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF7F0] p-7 rounded-3xl border border-[#D4AF37] shadow-royal text-center overflow-hidden group hover:shadow-gold-glow transition-all duration-300">
            {/* Top Gold Trim Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#9B111E] to-[#D4AF37]"></div>

            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-rose-50 border-2 border-[#D4AF37] flex items-center justify-center text-3xl shadow-sm transform group-hover:scale-105 transition-transform">
              🪔
            </div>

            <span className="text-xs font-serif font-bold tracking-widest text-[#9B111E] uppercase block mb-1">
              ॥ {family.grandparents.title[lang]} ॥
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17] leading-tight mt-1">
              {family.grandparents.names[lang]}
            </h3>

            <span className="inline-block text-xs font-serif text-[#9A7B1C] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mt-2 font-medium">
              {family.grandparents.relation[lang]}
            </span>

            <p className="text-xs text-gray-600 mt-3 italic font-serif">
              {lang === 'hi'
                ? 'वर-वधू के सिर पर पूज्य अग्रजों एवं पितरों का अखंड मंगल आशीष।'
                : 'Eternal blessings and guidance for the newly married couple.'}
            </p>
          </div>

          {/* Bride's Parents (माता-पिता / प्रेषक) */}
          <div className="relative bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF7F0] p-7 rounded-3xl border border-[#D4AF37] shadow-royal text-center overflow-hidden group hover:shadow-gold-glow transition-all duration-300">
            {/* Top Gold Trim Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9B111E] via-[#D4AF37] to-[#9B111E]"></div>

            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-50 border-2 border-[#D4AF37] flex items-center justify-center text-3xl shadow-sm transform group-hover:scale-105 transition-transform">
              🙏
            </div>

            <span className="text-xs font-serif font-bold tracking-widest text-[#9B111E] uppercase block mb-1">
              ॥ {family.parents.title[lang]} ॥
            </span>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17] leading-tight mt-1">
              {family.parents.names}
            </h3>

            <span className="inline-block text-xs font-serif text-[#9A7B1C] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mt-2 font-medium">
              {family.parents.relation[lang]}
            </span>

            <p className="text-xs text-gray-600 mt-3 italic font-serif">
              {lang === 'hi'
                ? 'आपकी गरिमामयी उपस्थिति हमारे लिए परम सौभाग्य एवं गौरव होगी।'
                : 'Your gracious presence will be our greatest honor and blessing.'}
            </p>
          </div>
        </div>

        {/* 2. Detailed Creative Family Grid (Grandfathers, Uncles, Siblings, Swagotsuk) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 text-xs sm:text-sm">
          {/* A. Grandfathers (बाबा / दादाजी - Memorial & Living Elders) */}
          <div className="bg-white p-5 rounded-3xl border border-[#D4AF37]/80 shadow-royal flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="flex items-center gap-2 text-[#9B111E] font-serif font-bold mb-3 pb-2 border-b border-[#D4AF37]/30">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{family.grandfathers.title[lang]}</span>
              </div>

              {/* In Loving Memory (स्मृतिशेष) */}
              <div className="mb-3 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                <span className="text-[10px] font-serif font-bold text-[#9B111E] uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <span>🌸</span>
                  <span>{lang === 'hi' ? 'अमर स्मृति (In Memory):' : 'In Loving Memory:'}</span>
                </span>
                <ul className="space-y-1 text-gray-900 font-serif font-medium">
                  {family.grandfathers.memorial.map((m, i) => (
                    <li key={i} className="text-xs">
                      • {m[lang]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Respected Living Elders */}
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4AF37]/30">
                <span className="text-[10px] font-serif font-bold text-[#9A7B1C] uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <span>🙏</span>
                  <span>{lang === 'hi' ? 'वरिष्ठ अग्रज (शुवाकांक्षी):' : 'Respected Elders:'}</span>
                </span>
                <ul className="space-y-1 text-gray-800 font-serif font-medium">
                  {family.grandfathers.elders.map((m, i) => (
                    <li key={i} className="text-xs">
                      • {m[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <span className="text-[10px] text-gray-500 mt-3 block italic font-serif text-center">
              {lang === 'hi' ? 'कुल के वयोवृद्ध मार्गदर्शक' : "Bride's Grandfathers"}
            </span>
          </div>

          {/* B. Uncles (चाचा जी) */}
          <div className="bg-white p-5 rounded-3xl border border-[#D4AF37]/80 shadow-royal flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="flex items-center gap-2 text-[#9B111E] font-serif font-bold mb-3 pb-2 border-b border-[#D4AF37]/30">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>{family.uncles.title[lang]}</span>
              </div>
              <ul className="space-y-1.5 text-gray-800 font-sans">
                {family.uncles.members.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#9B111E]"></span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[10px] text-gray-500 mt-4 block italic font-serif text-center">
              {lang === 'hi' ? 'स्नेहिल दर्शनाभिलाषी चाचागण' : "Bride's Uncles"}
            </span>
          </div>

          {/* C. Brothers & Sisters (भाई एवं बहने) */}
          <div className="bg-white p-5 rounded-3xl border border-[#D4AF37]/80 shadow-royal flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="flex items-center gap-2 text-[#9B111E] font-serif font-bold mb-3 pb-2 border-b border-[#D4AF37]/30">
                <Heart className="w-4 h-4 text-[#D4AF37]" />
                <span>{family.brothers.title[lang]}</span>
              </div>
              <p className="text-gray-800 leading-relaxed font-medium mb-2 font-sans">
                {family.brothers.members.join(', ')}
              </p>
              <div className="pt-2 border-t border-[#D4AF37]/20 text-xs">
                <span className="text-[#9B111E] font-serif font-bold block mb-0.5">
                  {family.sisters.title[lang]}:
                </span>
                <span className="text-gray-800 font-medium">रूबी, रूची</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 mt-3 block italic font-serif text-center">
              {lang === 'hi' ? 'लाडली बहना के स्नेही भाईगण' : "Bride's Siblings & Cousins"}
            </span>
          </div>

          {/* D. Swagotsuk (फुआ-फूफा, मामा-मामी) */}
          <div className="bg-white p-5 rounded-3xl border border-[#D4AF37]/80 shadow-royal flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div>
              <div className="flex items-center gap-2 text-[#9B111E] font-serif font-bold mb-3 pb-2 border-b border-[#D4AF37]/30">
                <UserCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>{family.swagotsuk.title[lang]}</span>
              </div>
              <ul className="space-y-2 text-gray-800">
                {family.swagotsuk.members.map((m, i) => (
                  <li key={i} className="text-xs">
                    <span className="font-semibold text-[#4A0E17] block">{m.name}</span>
                    <span className="text-[10px] text-gray-500">({m.relation})</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[10px] text-gray-500 mt-3 block italic font-serif text-center">
              {lang === 'hi' ? 'फुआ-फूफा एवं मामा-मामी' : 'Extended Family'}
            </span>
          </div>
        </div>

        {/* Kumkum Patrika Women Invitation Note */}
        <div className="mb-10 text-center px-5 py-3.5 bg-rose-50/90 rounded-2xl border-2 border-dashed border-rose-300 text-xs sm:text-sm text-[#9B111E] font-serif font-semibold shadow-sm">
          🌸 {quotes.kumkumPatrika[lang]} 🌸
        </div>

        {/* 3. Creative Host Contact Cards (4 Symmetrical Pillars) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37] shadow-royal">
          <div className="text-center mb-6">
            <span className="text-xs font-serif font-bold tracking-wider text-[#9B111E] uppercase block">
              {lang === 'hi' ? 'सीधा संपर्क एवं सहायता' : 'Host Contacts & Assistance'}
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17]">
              {lang === 'hi' ? 'साहू परिवार संपर्क सूत्र' : 'Connect with the Hosts'}
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {family.contacts.map((c, i) => (
              <div
                key={i}
                className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#D4AF37]/40 flex flex-col justify-between items-center text-center gap-3 shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-sm font-serif font-bold text-[#4A0E17] block">
                    {c.name}
                  </span>
                  <span className="text-xs text-[#9B111E] font-serif font-medium block">
                    ({c.role})
                  </span>
                  <span className="text-sm font-semibold text-gray-900 tracking-wider block mt-1">
                    +91 {c.phone}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <a
                    href={`tel:${c.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#9B111E] text-white text-xs font-medium hover:bg-[#7A0A15] transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'कॉल' : 'Call'}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(
                      lang === 'hi'
                        ? `नमस्ते ${c.name} जी, दीपा संग सुमित के शुभ विवाह के संदर्भ में सादर प्रणाम!`
                        : `Hello ${c.name} Ji, regarding Deepa & Sumit wedding ceremony!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
