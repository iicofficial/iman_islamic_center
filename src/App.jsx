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

function App() {
  return (
    <Router>
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/event/:id" element={<Events />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
