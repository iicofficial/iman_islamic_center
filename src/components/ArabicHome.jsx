import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Hero from "./Hero";
import Events from "./Events";
import PrayerTimes from "./PrayerTimes";
import Donate from "./Donate";
import Reservation from "./Reservation";
import "./ArabicHome.css"; // optional styling if needed

function ArabicHome() {
    const { setLanguage } = useLanguage();

    // Force Arabic language when this component mounts
    useEffect(() => {
        setLanguage('ar');
        // Scroll to top for good measure
        window.scrollTo(0, 0);
    }, [setLanguage]);

    return (
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
    );
}

export default ArabicHome;
