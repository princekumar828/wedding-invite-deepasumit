import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, Users, Sparkles } from 'lucide-react';
import { submitRsvp } from '../lib/supabase';

export default function RsvpModal({ isOpen, onClose, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestCount: '2',
    events: ['vivah'],
    message: ''
  });

  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleEventToggle = (eventId) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventId);
      return {
        ...prev,
        events: exists
          ? prev.events.filter((e) => e !== eventId)
          : [...prev.events, eventId]
      };
    });
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();

    const eventNames = {
      tilak: lang === 'hi' ? 'तिलकोत्सव (20 जन)' : 'Tilak (Jan 20)',
      haldi: lang === 'hi' ? 'हल्दी (23 जन)' : 'Haldi (Jan 23)',
      mehendi: lang === 'hi' ? 'मेहन्दी/संगीत (24 जन)' : 'Mehendi (Jan 24)',
      vivah: lang === 'hi' ? 'शुभ-विवाह (25 जन)' : 'Wedding (Jan 25)'
    };

    const selectedEventsText = formData.events.map((ev) => eventNames[ev]).join(', ');

    // 1. Persist to Supabase Database
    try {
      await submitRsvp({
        name: formData.name,
        phone: formData.phone,
        attending: true,
        guestCount: formData.guestCount,
        message: `${selectedEventsText} | ${formData.message || ''}`,
      });
    } catch {
      // Handled
    }

    // 2. Open WhatsApp Message to Host
    const text =
      lang === 'hi'
        ? `*सादर प्रणाम साहू परिवार,* \nमैं दीपा एवं सुमित के शुभ विवाह में उपस्थिति दर्ज करना चाहता/चाहती हूँ।\n\n👤 *नाम:* ${formData.name}\n📞 *संपर्क:* ${formData.phone}\n👥 *अतिथि संख्या:* ${formData.guestCount}\n🎉 *शामिल होने वाले कार्यक्रम:* ${selectedEventsText}\n📝 *संदेश:* ${formData.message || 'सपरिवार उपस्थित होंगे।'}`
        : `*Namaste Sahu Family,* \nI am pleased to confirm our attendance for Deepa & Sumit's wedding celebration.\n\n👤 *Name:* ${formData.name}\n📞 *Contact:* ${formData.phone}\n👥 *Guests:* ${formData.guestCount}\n🎉 *Events Attending:* ${selectedEventsText}\n📝 *Note:* ${formData.message || 'Looking forward to celebrating with you!'}`;

    // Target the host's primary WhatsApp number: 9304845132
    const waUrl = `https://wa.me/919304845132?text=${encodeURIComponent(text)}`;

    setConfirmed(true);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9A7B1C] block mb-1">
            {lang === 'hi' ? '॥ सादर स्वागतम् ॥' : 'Welcome'}
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'आगमन की सूचना दें' : 'Will You Be Attending?'}
          </h3>
          <p className="text-xs text-gray-600 mt-1 font-serif">
            {lang === 'hi'
              ? 'कृपया अपने आगमन एवं सहभागिता की जानकारी साझा कर साहू परिवार को कृतार्थ करें।'
              : 'Please let the Sahu family know if you will be attending to help with arrangements.'}
          </p>
        </div>

        {confirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#4A0E17]">
              {lang === 'hi' ? 'हार्दिक धन्यवाद!' : 'Thank You!'}
            </h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              {lang === 'hi'
                ? 'आपकी उपस्थिति की जानकारी व्हाट्सएप के माध्यम से साहू परिवार को प्रेषित की जा रही है। हमें आपका इंतजार रहेगा!'
                : 'Your confirmation has been prepared for the Sahu family. We warmly look forward to welcoming you!'}
            </p>
            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#9B111E] text-white text-xs font-semibold shadow-md"
            >
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                {lang === 'hi' ? 'आपका नाम (Your Full Name) *' : 'Your Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={lang === 'hi' ? 'उदा. राजेश कुमार साहू' : 'e.g. Rajesh Kumar Sahu'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {lang === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {lang === 'hi' ? 'अतिथि संख्या (Members)' : 'Guest Count'}
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none bg-white"
                >
                  <option value="1">1 सदस्य (Person)</option>
                  <option value="2">2 सदस्य (Persons)</option>
                  <option value="3">3 सदस्य (Persons)</option>
                  <option value="4">4 सदस्य (Persons)</option>
                  <option value="5+">5+ सपरिवार (Full Family)</option>
                </select>
              </div>
            </div>

            {/* Events selection checkboxes */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                {lang === 'hi' ? 'शामिल होने वाले कार्यक्रम:' : 'Events you will attend:'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'tilak', label: lang === 'hi' ? 'तिलकोत्सव (20 जन)' : 'Tilak (Jan 20)' },
                  { id: 'haldi', label: lang === 'hi' ? 'हल्दी (23 जन)' : 'Haldi (Jan 23)' },
                  { id: 'mehendi', label: lang === 'hi' ? 'मेहन्दी (24 जन)' : 'Mehendi (Jan 24)' },
                  { id: 'vivah', label: lang === 'hi' ? 'शुभ-विवाह (25 जन)' : 'Wedding (Jan 25)' },
                ].map((ev) => (
                  <label
                    key={ev.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      formData.events.includes(ev.id)
                        ? 'bg-rose-50 border-[#9B111E] text-[#9B111E] font-medium'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.events.includes(ev.id)}
                      onChange={() => handleEventToggle(ev.id)}
                      className="accent-[#9B111E]"
                    />
                    <span>{ev.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                {lang === 'hi' ? 'कोई विशेष टिप्पणी / आगमन समय' : 'Special Note / Travel info'}
              </label>
              <input
                type="text"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={lang === 'hi' ? 'उदा. हम 25 तारीख को शाम 6 बजे पहुंचेंगे' : 'e.g. Arriving on 25th evening'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B111E] focus:ring-1 focus:ring-[#9B111E] text-xs sm:text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 text-white font-medium text-xs sm:text-sm hover:from-emerald-800 hover:to-emerald-900 shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#F5D77F]" />
              <span>
                {lang === 'hi' ? 'व्हाट्सएप द्वारा पुष्टि भेजें' : 'Send Confirmation via WhatsApp'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
