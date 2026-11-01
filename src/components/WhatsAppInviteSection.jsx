import React, { useState } from 'react';
import { MessageCircle, Copy, Check, Eye, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function WhatsAppInviteSection({ lang }) {
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const websiteUrl = 'https://deepasumit.in';

  // Capitalize or format name cleanly
  const formatName = (str) => {
    if (!str) return '';
    return str.trim();
  };

  // Clean, respectful invitation message in Hindi (NO stars on guest name)
  const getHindiMessage = (name) => {
    const clean = formatName(name);
    const greeting = clean ? `आदरणीय ${clean} जी,\n\n` : '';

    return `${greeting}॥ श्री गणेशाय नमः ॥
॥ मंगलम् भगवान विष्णुः मंगलम् गरूड़ ध्वजः ॥

*मांगलिक वैवाहिक आमंत्रण*

स्नेही स्वजन,
ईश्वर की असीम अनुकम्पा एवं पूज्य बुजुर्गों के आशीर्वाद से हमारी सुपुत्री
*आयुष्मती दीपा साहू*
संग
*चिरंजीवी सुमित प्रसाद*
के पावन वैवाहिक परिणय की मांगलिक बेला पर आप सपरिवार सादर आमंत्रित हैं।

━━━━━━━━━━━━━━━━━━━━
📅 *शुभ विवाह दिनांक:* 25 जनवरी 2027 (सोमवार)
📍 *स्थल:* उत्सव बैंक्वेट हॉल, चाँदनी चौक, घाघरा (गुमला)
━━━━━━━━━━━━━━━━━━━━

✨ *मांगलिक वैवाहिक कार्यक्रम:*
• 20 जन: शुभ तिलकोत्सव (वर पक्ष निवास, चंदवा)
• 23 जन: मण्डपाच्छादन एवं हल्दी (देवाकी)
• 24 जन: घृतढारी, मेहन्दी एवं संगीत (देवाकी)
• 25 जन: बारात आगमन एवं शुभ-विवाह (उत्सव बैंक्वेट हॉल, घाघरा)

"मिलन है दो परिवारों का, रस्म है खुशी मनाने का,
हमें तो इंतजार है, शादी में आपके आने का ॥"

💌 *डिजिटल निमंत्रण पत्र एवं संपूर्ण विवरण:*
${websiteUrl}

निवेदक:
श्रीमती सुनिता देवी एवं श्री दिलीप साहू
एवं समस्त साहू परिवार, देवाकी (घाघरा)
📞 9304845132, 6204177370, 9308411143`;
  };

  // Clean, respectful invitation message in English (NO stars on guest name)
  const getEnglishMessage = (name) => {
    const clean = formatName(name);
    const greeting = clean ? `Dear ${clean},\n\n` : '';

    return `${greeting}॥ Shri Ganeshaya Namah ॥

*Wedding Invitation*

With the divine grace of God and blessings of our elders, we cordially invite you with family to celebrate the sacred wedding of
*Ayushmati Deepa Sahu*
&
*Chiranjeevi Sumit Prasad*

━━━━━━━━━━━━━━━━━━━━
📅 *Wedding Date:* January 25, 2027 (Monday)
📍 *Venue:* Utsav Banquet Hall, Chandni Chowk, Ghaghra (Gumla)
━━━━━━━━━━━━━━━━━━━━

✨ *Ceremony Schedule:*
• Jan 20 (Wed): Tilak Ceremony (Groom's Residence, Chandwa)
• Jan 23 (Sat): Mandap & Haldi (Devaki)
• Jan 24 (Sun): Mehendi & Sangeet (Devaki)
• Jan 25 (Mon): Baraat & Shubha Vivah (Utsav Banquet Hall, Ghaghra)

"Two souls, one sacred journey of eternal love..."

💌 *View Digital Invitation, Venue Map & Schedule:*
${websiteUrl}

Warmly Invited By:
Smt. Sunita Devi & Shri Dilip Sahu
& The Sahu Family, Devaki (Ghaghra)
📞 +91 9304845132, +91 6204177370, +91 9308411143`;
  };

  const currentMessage = lang === 'hi' ? getHindiMessage(guestName) : getEnglishMessage(guestName);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(currentMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="share-invite" className="py-12 px-4 bg-gradient-to-b from-white to-[#FAF7F0] relative overflow-hidden border-t border-[#D4AF37]/30">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF7F0] rounded-3xl p-5 sm:p-7 border border-[#D4AF37]/80 shadow-royal">
          {/* Simple, Clean Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#4A0E17]">
                {lang === 'hi' ? 'व्हाट्सएप पर निमंत्रण भेजें' : 'Share Invitation on WhatsApp'}
              </h3>
            </div>

            <span className="text-[10px] font-serif font-bold px-2.5 py-1 rounded-full bg-amber-50 text-[#9B111E] border border-amber-200 uppercase shrink-0">
              {lang === 'hi' ? 'हिन्दी' : 'English'}
            </span>
          </div>

          {/* Clean Guest Name Input */}
          <div className="mb-4">
            <div className="relative flex items-center">
              <Users className="w-4 h-4 text-[#D4AF37] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={lang === 'hi' ? 'अतिथि का नाम लिखें (वैकल्पिक)...' : 'Guest name (optional)...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none bg-white font-sans transition-all shadow-inner"
              />
            </div>
            {guestName.trim() && (
              <p className="text-[11px] text-[#9B111E] font-serif mt-1.5 pl-1">
                {lang === 'hi' ? `अभिवादन: आदरणीय ${guestName.trim()} जी,` : `Greeting: Dear ${guestName.trim()},`}
              </p>
            )}
          </div>

          {/* Collapsible Message Preview */}
          <div className="mb-5">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs font-serif font-semibold text-[#9B111E] hover:text-[#7A0A15] flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{showPreview ? (lang === 'hi' ? 'पूर्वावलोकन छिपाएं' : 'Hide Preview') : (lang === 'hi' ? 'संदेश देखें (Preview Message)' : 'Preview Message')}</span>
              {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showPreview && (
              <div className="mt-2.5 p-4 rounded-2xl bg-[#FAF7F0] border border-[#D4AF37]/30 text-xs text-gray-800 font-sans whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto animate-fade-in shadow-inner">
                {currentMessage}
              </div>
            )}
          </div>

          {/* Action Buttons: Simple & Direct */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 text-[#FEF3C7]" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send on WhatsApp'}</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-white text-[#4A0E17] font-serif font-semibold text-xs border border-[#D4AF37] hover:bg-[#FAF7F0] shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
