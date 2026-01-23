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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route path="/ar" element={<ArabicHome />} />

        {/* Arabic Routes to support getPath() */}
        <Route path="/ar/contact" element={<ContactPage />} />
        <Route path="/ar/marriage-certificate" element={<MarriageCertificate />} />
        <Route path="/ar/quran-boys-application" element={<QuranBoysApplication />} />
        <Route path="/ar/quran-girls-application" element={<QuranGirlsApplication />} />
        <Route path="/ar/quran-memorization" element={<QuranMemorization />} />
        <Route path="/ar/marriage-info" element={<MarriageInfo />} />
        <Route path="/ar/policies" element={<ProgramPolicies />} />
        <Route path="/ar/policies" element={<ProgramPolicies />} />
        <Route path="/ar/event/:id" element={<Events />} />
        <Route path="/ar/couple-reconciliation" element={<CoupleReconciliation />} />
        <Route path="/ar/divorce-formalization" element={<DivorceFormalization />} />
        <Route path="/ar/staff" element={<Staff />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marriage-certificate" element={<MarriageCertificate />} />
        <Route path="/quran-boys-application" element={<QuranBoysApplication />} />
        <Route path="/quran-girls-application" element={<QuranGirlsApplication />} />
        <Route path="/quran-memorization" element={<QuranMemorization />} />
        <Route path="/marriage-info" element={<MarriageInfo />} />
        <Route path="/policies" element={<ProgramPolicies />} />
        <Route path="/event/:id" element={<Events />} />
        <Route path="/couple-reconciliation" element={<CoupleReconciliation />} />
        <Route path="/divorce-formalization" element={<DivorceFormalization />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
