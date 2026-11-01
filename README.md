# 🌸 Deepa संग Sumit — Wedding Invitation Website | शुभ परिणय

An elegant, interactive, and authentic traditional Hindu wedding invitation web application crafted for **Deepa & Sumit**. Built with **React**, **Vite**, **Tailwind CSS**, and **Supabase (PostgreSQL)** for real-time persistence.

🌐 **Live Domain**: [https://deepasumit.in](https://deepasumit.in)  
📅 **Wedding Date**: 25 January 2027 (Monday)  
📍 **Venue**: Utsav Banquet Hall, Chandni Chowk, Ghaghra, Gumla, Jharkhand  

---

## ✨ Key Features

1. **💌 Royal Envelope Opening Experience (`RoyalEnvelope.jsx`)**:
   - Auspicious opening card featuring *॥ श्री गणेशाय नमः ॥*, the couple's monogram crest, and an interactive **"निमंत्रण पत्र खोलें" (Open Invitation)** seal button.
   - Automatically begins the wedding music and triggers a golden marigold flower shower on open.

2. **🎶 Auspicious Wedding Music (`AudioPlayer.jsx` & `useAudio.js`)**:
   - Seamless loop playback of traditional Indian wedding background music (`/wedding_music.mp3`).
   - Compact control integrated into the top sticky navigation bar without cluttering screen real estate on mobile devices.

3. **🌼 Authentic Indian Marigold Flower Shower (`FlowerShower.jsx` & `PetalCanvas.jsx`)**:
   - Custom SVG canvas and physics-based particle confetti configured exclusively with auspicious marigold hues (*गेंदा पुष्प: पीला, केसरी, हल्दी स्वर्ण*).
   - Real-time atomic flower counter synchronized live with Supabase.

4. **🇮🇳 Dual Language Support (Bilingual Hindi & English)**:
   - Full bilingual support accessible via a one-tap language toggle in the sticky navbar.
   - Traditional Hindi scriptures, wedding couplets (*श्लोक एवं वैवाहिक पंक्तियाँ*), and ceremonies schedule alongside clear English translations.

5. **🕊️ Ceremonies & Rituals Itinerary (`CeremoniesSection.jsx`)**:
   - Comprehensive timeline covering **Tilak**, **Mandap & Haldi**, **Ghritdhari / Mehendi & Sangeet**, and **Shubha Vivah**.
   - Custom traditional SVG ritual motifs and Google Calendar sync links for every event.

6. **🏛️ Family Heritage & Contact Hub (`FamilySection.jsx`)**:
   - Honors elders and ancestors with respect to late grandparents (*स्मृतिशेष रामलखन साहू एवं श्रीमती तारामनी देवी*).
   - 4 symmetrical contact pillars with one-click direct Call and WhatsApp connectivity for key family hosts.

7. **💬 Digital Wishes Wall (`WishesSection.jsx`)**:
   - Live guest blessings wall pre-seeded with close family wishes.
   - Interactive form allowing guests to post warm congratulations with instant database persistence and confetti burst.

8. **📋 Attendance Confirmation / RSVP (`RsvpModal.jsx`)**:
   - Intuitive attendance form capturing guest name, contact, attendance status, and headcount.
   - Saves records securely to Supabase while simultaneously preparing a WhatsApp confirmation message to the family host.

9. **📲 1-Tap Personalized WhatsApp Invitation (`WhatsAppInviteSection.jsx`)**:
   - Allows guests or family members to enter a recipient's name to generate a tailored WhatsApp invitation with complete event details and a direct link to `deepasumit.in`.

---

## 📁 Project Architecture & Structure

```
DeepaSumit/
├── .env.example              # Template for environment variables
├── .gitignore                # Protects secrets, node_modules, and build output
├── index.html                # Entry HTML with OpenGraph previews & typography
├── package.json              # Project dependencies & build scripts
├── postcss.config.js         # PostCSS configuration
├── supabase_schema.sql       # Complete SQL database schema & RPC functions
├── tailwind.config.js        # Custom wedding color palette & animations
├── vite.config.js            # Vite configuration
│
├── public/                   # Public static assets
│   ├── wedding_logo_ds.jpg   # Official DS couple monogram crest
│   └── wedding_music.mp3     # Traditional wedding music track
│
└── src/
    ├── App.jsx               # Main application orchestration & layout
    ├── index.css             # Tailwind base and global animations
    ├── main.jsx              # React DOM entry point
    │
    ├── components/           # UI components
    │   ├── AudioPlayer.jsx   # Compact navbar music toggle button
    │   ├── CeremoniesSection.jsx # Rituals timeline & calendar sync
    │   ├── CoupleSection.jsx # Bride & Groom crests and sacred bridge
    │   ├── FamilySection.jsx # Grandparents tribute & host contacts
    │   ├── FlowerShower.jsx  # Floating marigold shower button
    │   ├── Footer.jsx        # Auspicious closing remarks & replay trigger
    │   ├── HeroSection.jsx   # Hero banner with wedding countdown
    │   ├── PetalCanvas.jsx   # Background floating marigold petals
    │   ├── QuickNavbar.jsx   # Sticky top nav, language toggle & music button
    │   ├── RoyalEnvelope.jsx # Opening invitation cover & ceremony start
    │   ├── RsvpModal.jsx     # Guest attendance confirmation modal
    │   ├── TraditionalMotifs.jsx # Pure SVG kalash, crests, and toran
    │   ├── VenueSection.jsx  # Banquet hall details & Google Maps embed
    │   ├── WhatsAppInviteSection.jsx # Custom WhatsApp invitation generator
    │   └── WishesSection.jsx # Real-time digital blessings wall
    │
    ├── data/
    │   └── weddingData.js    # Centralized event schedule & family metadata
    │
    ├── hooks/
    │   └── useAudio.js       # Background audio state & browser policy handler
    │
    └── lib/
        └── supabase.js       # Supabase client wrapper & local storage fallback
```

---

## 🔒 Security & Secrets Management

Security best practices are enforced:

1. **No Secret Keys in Source Control**:
   - All private access tokens (GitHub Personal Access Tokens, Supabase Service Role Keys, Management Tokens) are **never** committed to version control.
   - `.env` is explicitly listed in [`.gitignore`](.gitignore).
2. **Client-Safe Authentication**:
   - The frontend communicates with Supabase strictly via the **Anonymous Public Key (`anon`)**.
   - All database tables enforce **Row Level Security (RLS)**:
     - Public guests can read approved content (`site_stats`, `wedding_wishes`) and submit their own entries (`wedding_rsvps`, `site_visits`).
     - Modifying or deleting records is prohibited for anonymous users.
3. **Privacy-Preserving Analytics**:
   - Visitor tracking uses an anonymous random token stored in localStorage (`ds_visitor_id`) without collecting personally identifiable information (PII).

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/princekumar828/wedding-invite-deepasumit.git
cd wedding-invite-deepasumit

# Install dependencies
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
*(Note: If left empty, the application automatically uses local fallback mode without breaking).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

To enable live persistence for wishes, flower counts, and RSVPs:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Copy and run the SQL code from [`supabase_schema.sql`](supabase_schema.sql).
4. From **Project Settings -> API**, copy your **Project URL** and **anon public key** into your `.env` file or hosting provider's environment settings.

---

## 🌐 Deployment to Vercel (Custom Domain)

1. Import the repository `princekumar828/wedding-invite-deepasumit` in [Vercel](https://vercel.com/new).
2. Add your environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
3. Deploy!
4. Under **Project Settings -> Domains**, add `deepasumit.in` and follow the DNS instructions for your domain registrar.

---

## 📜 License & Credits

- Designed with love and blessings for **Deepa & Sumit**.
- Crafted with traditional Indian wedding aesthetics.
