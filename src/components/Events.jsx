import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Events.css";
import QuranImage from "../assets/quran_memorization.png";
import DaycareImage from "../assets/daycare.png";
import MarriageImage from "../assets/marriage_contract.png";
import EducationImage from "../assets/educational_programs.png";

const events = [
    {
        titleKey: "events.quranTitle",
        descKey: "events.quranDesc",
        image: QuranImage,
        link: "/event/quran"
    },
    {
        titleKey: "events.daycareTitle",
        descKey: "events.daycareDesc",
        image: DaycareImage,
        link: "/event/daycare"
    },
    {
        titleKey: "events.marriageTitle",
        descKey: "events.marriageDesc",
        image: MarriageImage,
        link: "/event/marriage"
    },
    {
        titleKey: "events.eduTitle",
        descKey: "events.eduDesc",
        image: EducationImage,
        link: "/event/education"
    }
];

function Events() {
    const { t } = useLanguage();

    return (
        <section id="events">
            <div className="w-100 px-3">
                <h2 className="section-heading text-center mb-4">{t('events.heading')}</h2>
                <div className="row">
                    {events.map((event, index) => (
                        <div className="col-md-6 col-lg-3 mb-4" key={index}>
                            <div className="card h-100 event-card">
                                <img
                                    src={event.image}
                                    className="card-img-top"
                                    alt={t(event.titleKey)}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{t(event.titleKey)}</h5>
                                    <p className="card-text">{t(event.descKey)}</p>
                                    <a href={event.link} className="btn btn-primary mt-auto">
                                        {t('events.learnMore')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Events;
