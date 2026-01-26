import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Donate from "./components/Donate";
import PrayerTimes from "./components/PrayerTimes";
import Contact from "./components/Contact";
import Reservation from "./components/Reservation";
import ContactPage from "./components/ContactPage";
import MarriageCertificate from "./components/MarriageCertificate";
import QuranBoysApplication from "./components/QuranBoysApplication";
import QuranGirlsApplication from "./components/QuranGirlsApplication";
import QuranMemorization from "./components/QuranMemorization";
import MarriageInfo from "./components/MarriageInfo";
import ScrollToTop from "./components/ScrollToTop";
import ArabicHome from "./components/ArabicHome";
import ProgramPolicies from "./components/ProgramPolicies";
import CoupleReconciliation from "./components/CoupleReconciliation";
import DivorceFormalization from "./components/DivorceFormalization";
import Staff from "./components/Staff";

import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Announcements from "./components/Announcements";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <div className="container-fluid my-5">
                  <div className="row">
                    <div className="col-lg-8">
                      <Events />
                    </div>
                    <div className="col-lg-4">
                      <PrayerTimes />
                    </div>
                  </div>
                </div>
                <Donate />
                <Reservation />
                <Footer />
              </>
            }
          />
          <Route path="/ar" element={<><Navbar /><ArabicHome /><Footer /></>} />

          {/* Standalone Pages without default Navbar/Footer (handled inside component or custom) */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            }
          />

          {/* Re-wrap other routes with Layout if needed, for now manually adding Navbar/Footer to keep existing structure working */}
          {/* Note: In a larger refactor, Layout component would be better */}

          <Route path="/ar/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
          <Route path="/ar/marriage-certificate" element={<><Navbar /><MarriageCertificate /><Footer /></>} />
          <Route path="/ar/quran-boys-application" element={<><Navbar /><QuranBoysApplication /><Footer /></>} />
          <Route path="/ar/quran-girls-application" element={<><Navbar /><QuranGirlsApplication /><Footer /></>} />
          <Route path="/ar/quran-memorization" element={<><Navbar /><QuranMemorization /><Footer /></>} />
          <Route path="/ar/marriage-info" element={<><Navbar /><MarriageInfo /><Footer /></>} />
          <Route path="/ar/policies" element={<><Navbar /><ProgramPolicies /><Footer /></>} />
          <Route path="/ar/event/:id" element={<><Navbar /><Events /><Footer /></>} />
          <Route path="/ar/couple-reconciliation" element={<><Navbar /><CoupleReconciliation /><Footer /></>} />
          <Route path="/ar/divorce-formalization" element={<><Navbar /><DivorceFormalization /><Footer /></>} />
          <Route path="/ar/staff" element={<><Navbar /><Staff /><Footer /></>} />

          <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
          <Route path="/marriage-certificate" element={<><Navbar /><MarriageCertificate /><Footer /></>} />
          <Route path="/quran-boys-application" element={<><Navbar /><QuranBoysApplication /><Footer /></>} />
          <Route path="/quran-girls-application" element={<><Navbar /><QuranGirlsApplication /><Footer /></>} />
          <Route path="/quran-memorization" element={<><Navbar /><QuranMemorization /><Footer /></>} />
          <Route path="/marriage-info" element={<><Navbar /><MarriageInfo /><Footer /></>} />
          <Route path="/policies" element={<><Navbar /><ProgramPolicies /><Footer /></>} />
          <Route path="/event/:id" element={<><Navbar /><Events /><Footer /></>} />
          <Route path="/couple-reconciliation" element={<><Navbar /><CoupleReconciliation /><Footer /></>} />
          <Route path="/divorce-formalization" element={<><Navbar /><DivorceFormalization /><Footer /></>} />
          <Route path="/staff" element={<><Navbar /><Staff /><Footer /></>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
