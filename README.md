A premium, fully responsive website for Iman Islamic Center, built with React and Vite. This platform is designed to connect the community, provide essential religious services, and offer a modern, bilingual user experience.

**🌐 Live Site:** [iman-islamic-center.vercel.app](https://iman-islamic-center.vercel.app/) (Draft/Preview)
**🔗 Repository:** [github.com/akeelsalman888/iman_islamic_center](https://github.com/akeelsalman888/iman_islamic_center)

## ✨ Key Features

*   **🌍 Bilingual Excellence**: Full support for **English and Arabic** languages with automated RTL (Right-to-Left) layout adjustments and custom branding (localized Arabic logo).
*   **🌓 Adaptive Theme System**: Integrated **Light and Dark mode** switcher with persistent user preferences and smooth transitions.
*   **🕋 Premium Visual Identity**: High-end modern design using the **'Outfit'** typography, glassmorphism elements, and professional hover effects.
*   **⏳ Real-time Prayer Times**: Dynamic Hijri and Gregorian calendar integration with beautifully styled daily and Jumu'ah iqamah tables.
*   **💍 Advanced Marriage Services**: Comprehensive multi-step digital marriage application including appointment scheduling for Masjid or Home visits.
*   **📖 Quran Memorization Center**: Dedicated portals for Boys and Girls applications, including integrated **Program Policies** and legal acknowledgments.
*   **📊 Organized Forms Hub**: Reorganized navigation with nested submenus for Membership and Donation forms.
*   **📱 Mobile Optimized**: Fully responsive architecture with specialized mobile adjustments for logos, ribbons, and navigation pods.

## 📂 Project Structure

```text
iman_islamic_center/
│
├─ docs/                       # Project guides & deployment instructions
│
├─ src/
│   ├─ assets/                     # High-resolution branding and assets
│   ├─ context/                    # Language and Theme Context providers
│   ├─ components/
│   │   ├─ Navbar.jsx              # Bilingual Navbar with Nested Dropdowns
│   │   ├─ Hero.jsx                # Cinematic entry section
│   │   ├─ PrayerTimes.jsx         # Dynamic iqamah scheduling
│   │   ├─ MarriageCertificate.jsx # Multi-step digital application
│   │   ├─ QuranMemorization.jsx   # Center for educational services
│   │   ├─ ProgramPolicies.jsx     # Policy and legal acknowledgement module
│   │   ├─ Reservation.jsx         # Modern visiting/booking system
│   │   ├─ ContactPage.jsx         # Dedicated Contact Hub
│   │   ├─ Events.jsx              # Community events viewer
│   │   └─ Footer.jsx              # Branded site footer
│   │
│   ├─ App.jsx                     # Centralized Routing & Layout
│   ├─ index.css                   # Global Design System & Variables
│   └─ main.jsx                    # Application Entry point
│
├─ package.json                    # Configuration & Dependencies
├─ PROJECT_HISTORY.md              # Master log of features & changes
└─ README.md                       # Documentation
```

## 🚀 Technologies Used

*   **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
*   **State Management**: React Context API (Language & Theme)
*   **Routing**: [React Router 7](https://reactrouter.com/)
*   **Styling**: Vanilla CSS (Custom Design System), [Bootstrap 5](https://getbootstrap.com/)
*   **Dates**: [Moment.js](https://momentjs.com/) & [Moment-Hijri](https://github.com/x-68/moment-hijri)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/akeelsalman888/iman_islamic_center.git
   cd iman_islamic_center
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development Mode**
   ```bash
   npm run dev
   ```

## 🎨 Color Palette & Design System

| Element | Color |
| :--- | :--- |
| **Primary Theme** | `#27569b` |
| **Secondary Accord** | `#1e467f` |
| **Highlight Blue** | `#87CEEB` |
| **Typography** | `Outfit`, `Poppins`, `Inter` |

## 📝 Notes for the Client

*   **SEO Optimized**: Semantic HTML and descriptive meta-tags implemented for better search visibility.
*   **High Performance**: Leverages Vite for near-instant loading and optimized asset delivery.
*   **Scalable Architecture**: Flexible structure allows for easy addition of new languages, themes, or services.
*   **Accessibility First**: Optimized for both LTR and RTL reading patterns, ensuring a comfortable experience for all users.
*   **Modern Validation**: All forms include real-time visual feedback and refined error states.

---
*Created with care for Iman Islamic Center (Updated Jan 2026).*
