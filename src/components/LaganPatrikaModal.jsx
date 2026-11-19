import React, { useRef } from 'react';
import { X, Printer, Share2, Sparkles, Download, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { MangalKalash } from './TraditionalMotifs';

export default function LaganPatrikaModal({ isOpen, onClose, lang }) {
  const patrikaRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = lang === 'hi'
      ? `दीपा और सुमित के शुभ विवाह की डिजिटल लग्न पत्रिका देखें: ${window.location.origin}`
      : `View the Digital Lagan Patrika for Deepa & Sumit's Wedding: ${window.location.origin}`;

    if (navigator.share) {
      navigator.share({
        title: 'दीपा & सुमित | डिजिटल लग्न पत्रिका',
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white print:fixed print:inset-0"
    >
      {/* Outer Card with Royal Scroll Appearance */}
      <div
        ref={patrikaRef}
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFF9EE] rounded-3xl border-4 border-[#D4AF37] shadow-2xl p-5 sm:p-8 text-[#4A0E17] my-auto overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:rounded-none print:p-4"
      >
        {/* Ornate Gold & Crimson Corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#9B111E]"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#9B111E]"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#9B111E]"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#9B111E]"></div>

        {/* Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-[#9B111E]">
          <span className="text-[180px] font-serif font-black">卐</span>
        </div>

        {/* Action Header (Hidden during Print) */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4AF37]/40 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#9B111E]/10 text-[#9B111E] text-xs font-serif font-bold uppercase tracking-wider border border-[#D4AF37]/50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'hi' ? 'वैदिक लग्न पत्रिका' : 'Vedic Lagan Patrika'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title={lang === 'hi' ? 'प्रिंट या PDF सेव करें' : 'Print / Save as PDF'}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-[#7A0A15] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title={lang === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share'}
              className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-[#9B111E] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body (Traditional Hindu Lagan Patrika) */}
        <div className="space-y-4 text-center font-serif">
          {/* Top Invocations */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-full bg-[#9B111E]/10 border border-[#D4AF37] flex items-center justify-center">
              <MangalKalash className="w-8 h-8 text-[#9B111E]" />
            </div>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#9B111E] tracking-widest uppercase">
              ॥ श्री गणेशाय नमः ॥
            </h3>
            <p className="text-[11px] sm:text-xs text-[#7A0A15] italic mt-1 leading-relaxed max-w-lg mx-auto">
              {weddingData.shlokas.ganesh.sanskrit.split('\n')[1]}
            </p>
          </div>

          {/* Patrika Main Title */}
          <div className="py-2 px-4 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent border-y border-[#D4AF37]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#7A0A15] tracking-wide">
              {lang === 'hi' ? '॥ मांगलिक वैवाहिक लग्न पत्रिका ॥' : '॥ Sacred Wedding Lagan Patrika ॥'}
            </h2>
            <p className="text-[11px] text-[#9A7B1C] font-semibold mt-0.5">
              {lang === 'hi'
                ? 'स्वस्ति श्री संवत् २०८३ शके १९४८ • माघ मास • कृष्ण पक्ष • शुभ मुहूर्त'
                : 'Vikram Samvat 2083 • Magha Month • Krishna Paksha • Auspicious Muhurat'}
            </p>
          </div>

          {/* Panchang & Vedic Auspicious Timings Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-[#D4AF37]/60 text-xs text-left max-w-xl mx-auto shadow-inner grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">
                {lang === 'hi' ? 'पाणिग्रहण दिवस:' : 'Wedding Day:'}
              </span>
              <span className="font-bold text-[#9B111E]">
                {lang === 'hi' ? '२५ जनवरी २०२७ (सोमवार)' : 'January 25, 2027 (Monday)'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">
                {lang === 'hi' ? 'पावन नक्षत्र व लग्न:' : 'Nakshatra & Lagna:'}
              </span>
              <span className="font-bold text-[#9B111E]">
                {lang === 'hi' ? 'आश्लेषा / मघा • शुभ गोधूलि वेला' : 'Ashlesha / Magha • Godhuli'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">
                {lang === 'hi' ? 'विवाह स्थल:' : 'Ceremony Venue:'}
              </span>
              <span className="font-semibold text-gray-900">
                {weddingData.venue.name[lang]}, {weddingData.venue.city[lang]}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-sans">
                {lang === 'hi' ? 'गोत्र एवं कुल:' : 'Tradition:'}
              </span>
              <span className="font-semibold text-gray-900">
                {lang === 'hi' ? 'कश्यप गोत्र • सनातन वैदिक रीति' : 'Kashyap Gotra • Vedic Rites'}
              </span>
            </div>
          </div>

          {/* Couple Lineage (Var & Vadhu Details) */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left text-xs">
            {/* Bride Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-rose-300 shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B111E] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 inline-block mb-1">
                {lang === 'hi' ? 'वधू (Bride)' : 'The Bride'}
              </span>
              <h4 className="text-base font-bold text-[#7A0A15]">
                {weddingData.couple.bride[lang].prefix} {weddingData.couple.bride[lang].name}
              </h4>
              <p className="text-gray-700 mt-1 leading-tight">
                <span className="text-gray-500 text-[11px] block">{lang === 'hi' ? 'सुपौत्री:' : 'Granddaughter of:'}</span>
                {weddingData.couple.bride[lang].grandParents}
              </p>
              <p className="text-gray-700 mt-1 leading-tight">
                <span className="text-gray-500 text-[11px] block">{lang === 'hi' ? 'सुपुत्री:' : 'Daughter of:'}</span>
                {weddingData.couple.bride[lang].fatherMother}
              </p>
              <p className="text-gray-600 text-[11px] mt-1 font-sans">
                📍 {weddingData.couple.bride[lang].location}
              </p>
            </div>

            {/* Groom Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-amber-300 shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7B1C] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mb-1">
                {lang === 'hi' ? 'वर (Groom)' : 'The Groom'}
              </span>
              <h4 className="text-base font-bold text-[#7A0A15]">
                {weddingData.couple.groom[lang].prefix} {weddingData.couple.groom[lang].name}
              </h4>
              <p className="text-gray-700 mt-1 leading-tight">
                <span className="text-gray-500 text-[11px] block">{lang === 'hi' ? 'सुपुत्र:' : 'Son of:'}</span>
                {weddingData.couple.groom[lang].fatherMother}
              </p>
              <p className="text-gray-700 mt-1 leading-tight">
                <span className="text-gray-500 text-[11px] block">{lang === 'hi' ? 'पारिवारिक परिचय:' : 'Lineage:'}</span>
                {weddingData.couple.groom[lang].relationDesc}
              </p>
            </div>
          </div>

          {/* Manglik Itinerary Summary */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 max-w-xl mx-auto text-left text-xs space-y-1.5">
            <span className="text-[10px] font-bold text-[#9B111E] uppercase tracking-wider block border-b border-[#D4AF37]/30 pb-1">
              {lang === 'hi' ? '✨ मांगलिक कार्यक्रम सारिणी' : '✨ Sacred Ceremony Schedule'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-gray-800">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-600">●</span>
                <span><strong>२० जनवरी:</strong> शुभ तिलकोत्सव</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-600">●</span>
                <span><strong>२३ जनवरी:</strong> मण्डपाच्छादन व हल्दी</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-600">●</span>
                <span><strong>२४ जनवरी:</strong> घृतढारी, मेहन्दी व संगीत</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-600">●</span>
                <span><strong>२५ जनवरी:</strong> बारात व शुभ विवाह</span>
              </div>
            </div>
          </div>

          {/* Traditional Blessing & Hosts */}
          <div className="pt-2 text-center text-xs">
            <p className="italic text-[#7A0A15] max-w-md mx-auto leading-relaxed">
              "मिलन है दो परिवारों का, रस्म है खुशी मनाने का,
              हमें तो इंतजार है, शादी में आपके आने का ॥"
            </p>

            <div className="mt-3 pt-2 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-700">
              <div className="text-left">
                <span className="font-bold text-[#9B111E] block">दर्शनाभिलाषी:</span>
                <span>श्रीमती सुनिता देवी एवं श्री दिलीप साहू</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#9B111E] block">स्थान:</span>
                <span>समस्त साहू परिवार, देवाकी (घाघरा)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA for Print/Close (Hidden during Print) */}
        <div className="mt-6 pt-4 border-t border-[#D4AF37]/40 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-[#9B111E] text-white font-serif font-bold text-xs hover:bg-[#7A0A15] shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'लग्न पत्रिका प्रिंट / सेव करें' : 'Print / Save Lagan Patrika'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white text-gray-700 font-serif font-medium text-xs border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
