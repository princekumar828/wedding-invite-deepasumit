import React, { useState, useEffect } from 'react';
import RoyalEnvelope from './components/RoyalEnvelope';
import PetalCanvas from './components/PetalCanvas';
import { useAudio } from './hooks/useAudio';
import QuickNavbar from './components/QuickNavbar';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import CeremoniesSection from './components/CeremoniesSection';
import VenueSection from './components/VenueSection';
import FamilySection from './components/FamilySection';
import WishesSection from './components/WishesSection';
import WhatsAppInviteSection from './components/WhatsAppInviteSection';
import Footer from './components/Footer';
import RsvpModal from './components/RsvpModal';
import FloatingFlowerShower, { triggerFlowerShower } from './components/FlowerShower';
import { TraditionalToran } from './components/TraditionalMotifs';
import { recordVisit } from './lib/supabase';
import { Calendar, MapPin, Heart, MessageSquareHeart, Flower2, MessageCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('hi');
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Audio Hook (controls auspicious background music)
  const { isPlaying, playMusic, toggleMusic } = useAudio();

  // Log unique visit anonymously on first load
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#4A0E17] font-sans relative selection:bg-[#9B111E] selection:text-white">
      {/* 1. Floating Auspicious Flower Petals Canvas */}
      <PetalCanvas />

      {/* 2. Interactive Royal Envelope Opening Experience */}
      {!envelopeOpened && (
        <RoyalEnvelope
          lang={lang}
          onOpen={() => {
            setEnvelopeOpened(true);
            playMusic();
          }}
        />
      )}

      {/* 3. Floating Flower Shower Button (Bottom-Left) */}
      <FloatingFlowerShower lang={lang} />

      {/* 4. Top Sticky Navigation (with Integrated Music Button & Language Switcher) */}
      <QuickNavbar
        lang={lang}
        setLang={setLang}
        onOpenRsvp={() => setIsRsvpOpen(true)}
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />

      {/* 5. Traditional Marigold & Mango Leaves Toran */}
      <TraditionalToran />

      {/* 6. Main Content Flow */}
      <main className="relative z-20">
        <HeroSection
          lang={lang}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        <CoupleSection lang={lang} />

        <CeremoniesSection lang={lang} />

        <VenueSection lang={lang} />

        <FamilySection lang={lang} />

        <WishesSection lang={lang} />

        {/* 7. WhatsApp Invitation Sharing Section */}
        <WhatsAppInviteSection lang={lang} />
      </main>

      {/* 8. Footer */}
      <Footer
        lang={lang}
        onReplayEnvelope={() => {
          setEnvelopeOpened(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 9. Attendance Confirmation Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        lang={lang}
      />

      {/* 10. Mobile Sticky Quick Action Bar (Bottom) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-full border border-[#D4AF37] shadow-xl p-1.5 flex items-center justify-around text-[10px] font-medium text-[#4A0E17]">
        <a href="#events" className="flex flex-col items-center py-1 px-1 hover:text-[#9B111E]">
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'hi' ? 'कार्यक्रम' : 'Events'}</span>
        </a>

        <a href="#venue" className="flex flex-col items-center py-1 px-1 hover:text-[#9B111E]">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'hi' ? 'स्थल' : 'Venue'}</span>
        </a>

        <button
          onClick={triggerFlowerShower}
          className="flex flex-col items-center py-1 px-1 text-[#9B111E] font-bold"
          title="पुष्प वर्षा"
        >
          <Flower2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          <span>{lang === 'hi' ? 'पुष्प वर्षा' : 'Flowers'}</span>
        </button>

        <a href="#share-invite" className="flex flex-col items-center py-1 px-1 text-emerald-700 font-bold">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? 'व्हाट्सएप' : 'Invite'}</span>
        </a>

        <button
          onClick={() => setIsRsvpOpen(true)}
          className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-[#9B111E] text-white font-semibold shadow-sm text-[10px]"
        >
          <Heart className="w-2.5 h-2.5 fill-current text-[#F5D77F]" />
          <span>{lang === 'hi' ? 'आगमन' : 'Attend'}</span>
        </button>
      </div>
    </div>
  );
}
