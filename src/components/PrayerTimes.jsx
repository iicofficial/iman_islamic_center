import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./PrayerTimes.css";

function PrayerTimes() {
    const { language, t } = useLanguage();
    const [gregorianDate, setGregorianDate] = useState("");
    const [hijriDate, setHijriDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const locale = language === 'ar' ? 'ar-SA' : 'en-GB';

        // Gregorian Date
        setGregorianDate(
            today.toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
        );

        // Hijri Date
        setHijriDate(
            today.toLocaleDateString(locale + "-u-ca-islamic", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }) + (language === 'en' ? " Hijri" : " هجري")
        );
    }, [language]);

    const dailyPrayers = [
        { prayer: t('prayer.fajr'), adhaan: "06:17 AM", iqamah: "06:30 AM" },
        { prayer: t('prayer.sunrise'), adhaan: "07:29 AM", iqamah: "" },
        { prayer: t('prayer.dhuhr'), adhaan: "12:31 PM", iqamah: "02:00 PM" },
        { prayer: t('prayer.asr'), adhaan: "03:14 PM", iqamah: "04:00 PM" },
        { prayer: t('prayer.maghrib'), adhaan: "05:32 PM", iqamah: "05:42 PM" },
        { prayer: t('prayer.isha'), adhaan: "06:45 PM", iqamah: "08:00 PM" },
    ];

    const jumuah = [
        { prayer: t('prayer.jummah1'), khutba: "01:00 PM" },
        { prayer: t('prayer.jummah2'), khutba: "02:30 PM" },
    ];

    const formatTime = (time) => {
        if (!time) return "";
        if (language === 'ar') {
            return time.replace("AM", "ص").replace("PM", "م");
        }
        return time;
    };

    return (
        <section className="prayer-section" id="prayer">
            <h2 className="prayer-heading">{t('prayer.heading')}</h2>

            {/* Dates */}
            <div className="prayer-date-container">
                <span className="prayer-date-hijri">{hijriDate}</span>
                <span>|</span>
                <span className="prayer-date-greg">{gregorianDate}</span>
            </div>

            {/* Daily Prayers */}
            <div className="table-responsive">
                <table className="table daily-table">
                    <thead>
                        <tr>
                            <th>{t('prayer.prayer')}</th>
                            <th>{t('prayer.adhaan')}</th>
                            <th>{t('prayer.iqamah')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyPrayers.map((p, i) => (
                            <tr key={i}>
                                <td>{p.prayer}</td>
                                <td>{formatTime(p.adhaan)}</td>
                                <td>{formatTime(p.iqamah) || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Jumu'ah */}
            <div className="table-responsive">
                <table className="table jumuah-table">
                    <thead>
                        <tr>
                            <th>{t('prayer.jummahPrayers')}</th>
                            <th>{t('prayer.khutba')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jumuah.map((j, i) => (
                            <tr key={i}>
                                <td>{j.prayer}</td>
                                <td>{formatTime(j.khutba)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default PrayerTimes;
