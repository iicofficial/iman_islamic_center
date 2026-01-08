A premium, fully responsive website for Iman Islamic Center, built with React and Vite. This platform is designed to connect the community, provide essential religious services, and offer a modern user experience.

**🌐 Live Site:** [iman-islamic-center.vercel.app](https://iman-islamic-center.vercel.app/) (Draft/Preview)
**🔗 Repository:** [github.com/akeelsalman888/iman_islamic_center](https://github.com/akeelsalman888/iman_islamic_center)

## ✨ Key Features

*   **Premium Visual Identity**: High-end modern design using the **'Outfit'** typography and a professional **#27569b** color palette.
*   **Dynamic Hero Section**: Stunning architectural visuals with direct "Donate" action and localized branding for Lincoln, NE.
*   **Real-time Prayer Times**: Integrated Hijri and Gregorian calendar dates with styled daily and Jumu'ah iqamah tables.
*   **Interactive Reservation System**: Dedicated "Book a Visit" system for visitors to schedule meetings with the team.
*   **Dedicated Contact Center**: A separate, full-featured contact page with modern form validation and glassmorphism styling.
*   **Responsive Navigation**: Optimized navbar featuring a unique "Action Pod" for quick contact access.
*   **Event Management**: Browse upcoming and past community events with dedicated detail views.
*   **Digital Marriage Services**: Comprehensive two-step digitized marriage application with integrated appointment scheduling (Masjid or Home visit).

## 📂 Project Structure

```text
iman_islamic_center/
│
├─ public/
│   └─ forms/                      # Downloadable PDF/DOCX forms
│
├─ src/
│   ├─ assets/                     # High-resolution images and logos
│   ├─ components/
│   │   ├─ Navbar.jsx              # Optimized Navbar with Action Pod
│   │   ├─ Hero.jsx                # Cinematic entry section
│   │   ├─ Reservation.jsx         # Modern visiting/booking system
│   │   ├─ ContactPage.jsx         # Dedicated Contact Hub
│   │   ├─ Contact.jsx             # Reusable Contact Form component
│   │   ├─ PrayerTimes.jsx         # Dynamic iqamah scheduling
│   │   ├─ Events.jsx              # Community events viewer
│   │   ├─ Donate.jsx              # High-contrast donation section
│   │   ├─ MarriageCertificate.jsx # Two-step digital marriage application
│   │   ├─ DownloadForms.jsx       # Downloadable resources center
│   │   └─ Footer.jsx              # Branded site footer
│   │
│   ├─ App.jsx                     # Centralized Routing
│   ├─ index.css                   # Global Design System
│   └─ main.jsx                    # Entry point
│
├─ package.json                    # Configuration & Dependencies
└─ README.md                       # Documentation
```

## 🚀 Technologies Used

*   **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
*   **Routing**: [React Router 7](https://reactrouter.com/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Styling**: Vanilla CSS (Custom Design System), [Bootstrap 5](https://getbootstrap.com/)
*   **Dates**: [Moment.js](https://momentjs.com/) with Hijri support

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

4. **Production Build**
   ```bash
   npm run build
   ```

## 🎨 Color Palette & Design System

| Element | Color |
| :--- | :--- |
| **Primary Theme** | `#27569b` |
| **Secondary Accord** | `#1e467f` |
| **Highlight Blue** | `#87CEEB` |
| **Typography** | `Outfit`, `Poppins` |

## 📝 Notes for the Client

*   **SEO Optimized**: Semantic HTML and descriptive meta-tags are used throughout the site.
*   **High Performance**: Built with Vite for ultra-fast loading speeds.
*   **Ready for Vercel**: Fully configured for one-click deployment to Vercel or Netlify.
*   **User Friendly**: All forms include visual feedback and modern validation states.
*   **Scalable**: New events or forms can be added easily by updating the respective JSON or assets.
*   **Mobile Fixed**: Optimized hamburger menu and dropdowns for Android and iOS mobile browsers (Jan 2026 update).

---
*Created with care for Iman Islamic Center.*
