import React from "react";
import { Carousel } from "react-bootstrap";
import img2 from "../assets/iicmasjed2.jpeg";
import img3 from "../assets/iicmasjed3.jpeg";
import img4 from "../assets/iicmasjed4.jpeg";
import { useLanguage } from "../context/LanguageContext";
import "./Hero.css";

function Hero() {
    const { t } = useLanguage();

    const images = [img2, img3, img4];

    return (
        <section className="hero-section">
            <Carousel
                fade
                indicators={false}
                controls={false}
                interval={2000}
                className="hero-carousel"
            >
                {images.map((img, index) => (
                    <Carousel.Item key={index}>
                        <div className="hero-slide">
                            <img
                                src={img}
                                alt={`Iman Islamic Center Hero ${index + 1}`}
                                className="hero-bg-image"
                            />
                            <div className="hero-overlay"></div>
                            <div className="container hero-content-overlay">
                                <h1>{t('hero.welcome')}</h1>
                                <p>{t('hero.subtext')}</p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}

export default Hero;
