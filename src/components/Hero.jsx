import React from "react";
import heroImage from "../assets/newhero.png";
import { useLanguage } from "../context/LanguageContext";
import "./Hero.css";

function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero-section d-flex align-items-center justify-content-center">
            <img
                src={heroImage}
                alt="Iman Islamic Center Hero"
                className="hero-bg-image"
            />

            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <h1>{t('hero.welcome')}</h1>
                <p>{t('hero.subtext')}</p>
            </div>
        </section>
    );
}

export default Hero;
