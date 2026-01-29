import React from "react";
import img2 from "../assets/iicmasjed2.jpeg";
import { useLanguage } from "../context/LanguageContext";
import "./Hero.css";

function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero-section">
            <div className="hero-slide">
                <img
                    src={img2}
                    alt="Iman Islamic Center Hero"
                    className="hero-bg-image"
                />
                <div className="hero-overlay"></div>
                <div className="container hero-content-overlay">
                    <h1>{t('hero.welcome')}</h1>
                    <p>{t('hero.subtext')}</p>
                </div>
            </div>
        </section>
    );
}

export default Hero;
