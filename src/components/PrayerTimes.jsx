import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./PrayerTimes.css";
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

function PrayerTimes() {
    const { language, t } = useLanguage();
    const [gregorianDate, setGregorianDate] = useState("");
    const [hijriDate, setHijriDate] = useState("");
    const [timings, setTimings] = useState(null);
    const [nextPrayer, setNextPrayer] = useState({ name: '', time: '', countdown: '' });
    const [loading, setLoading] = useState(true);

    const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    // Hardcoded Iqamah offsets (minutes after Adhaan) or fixed times
    const getIqamahTime = (prayerName, adhaan24) => {
        if (!adhaan24) return "";

        switch (prayerName) {
            case 'Fajr': return "06:30"; // Fixed 24h
            case 'Sunrise': return "";
            case 'Dhuhr': return "14:00"; // 2:00 PM in 24h
            case 'Asr': return "16:00";   // 4:00 PM in 24h
            case 'Maghrib':
                // 10 mins after Maghrib adhaan
                const [h, m] = adhaan24.split(':').map(Number);
                let newM = m + 10;
                let newH = h;
                if (newM >= 60) { newM -= 60; newH++; }
                return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
            case 'Isha': return "20:00";  // 8:00 PM in 24h
            default: return "";
        }
    };

    const fetchPrayerTimes = useCallback(async () => {
        try {
            // Lincoln, NE coordinates: 40.8136, -96.7026
            // Method 2: ISNA
            const response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=Lincoln&state=NE&country=US&method=2`
            );
            const data = await response.json();
            if (data.code === 200) {
                setTimings(data.data.timings);

                // Set Hijri Date from API
                const hj = data.data.date.hijri;
                setHijriDate(`${hj.day} ${hj.month[language === 'ar' ? 'ar' : 'en']} ${hj.year}${language === 'ar' ? ' هـ' : ' AH'}`);

                // Set Gregorian Date
                const gr = data.data.date.gregorian;
                setGregorianDate(`${gr.day} ${gr.month.en} ${gr.year}`);

                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching prayer times:", error);
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        fetchPrayerTimes();
    }, [fetchPrayerTimes]);

    const calculateNextPrayer = useCallback(() => {
        if (!timings) return;

        const now = new Date();
        let next = null;

        const prayerTimesMap = [
            { name: 'Fajr', time: timings.Fajr },
            { name: 'Dhuhr', time: timings.Dhuhr },
            { name: 'Asr', time: timings.Asr },
            { name: 'Maghrib', time: timings.Maghrib },
            { name: 'Isha', time: timings.Isha }
        ];

        for (let p of prayerTimesMap) {
            const [hours, minutes] = p.time.split(':').map(Number);
            const pDate = new Date();
            pDate.setHours(hours, minutes, 0);

            if (pDate > now) {
                next = { ...p, date: pDate };
                break;
            }
        }

        // If no more prayers today, next is tomorrow's Fajr
        if (!next) {
            const [hours, minutes] = timings.Fajr.split(':').map(Number);
            const pDate = new Date();
            pDate.setDate(pDate.getDate() + 1);
            pDate.setHours(hours, minutes, 0);
            next = { name: 'Fajr', time: timings.Fajr, date: pDate };
        }

        // Calculate countdown
        const diff = next.date - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        setNextPrayer({
            name: next.name,
            displayName: t(`prayer.${next.name.toLowerCase()}`),
            time: formatTo12Hour(next.time),
            iqamah: formatTo12Hour(getIqamahTime(next.name, next.time)),
            countdown: `${h}h ${m}m ${s}s`
        });
    }, [timings, t]);

    useEffect(() => {
        const timer = setInterval(calculateNextPrayer, 1000);
        return () => clearInterval(timer);
    }, [calculateNextPrayer]);

    const formatTo12Hour = (time24) => {
        if (!time24) return "";
        let [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const result = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

        if (language === 'ar') {
            return result.replace("AM", "ص").replace("PM", "م");
        }
        return result;
    };

    if (loading) {
        return <div className="prayer-loading">Loading Prayer Times...</div>;
    }

    const prayersToDisplay = [
        { id: 'fajr', name: t('prayer.fajr'), adhaan: timings.Fajr, raw: 'Fajr' },
        { id: 'sunrise', name: t('prayer.sunrise'), adhaan: timings.Sunrise, raw: 'Sunrise' },
        { id: 'dhuhr', name: t('prayer.dhuhr'), adhaan: timings.Dhuhr, raw: 'Dhuhr' },
        { id: 'asr', name: t('prayer.asr'), adhaan: timings.Asr, raw: 'Asr' },
        { id: 'maghrib', name: t('prayer.maghrib'), adhaan: timings.Maghrib, raw: 'Maghrib' },
        { id: 'isha', name: t('prayer.isha'), adhaan: timings.Isha, raw: 'Isha' },
    ];

    return (
        <section className="prayer-section" id="prayer">
            <h2 className="prayer-heading centered">{t('prayer.heading')}</h2>

            <div className="next-prayer-container">
                <div className="next-prayer-card">
                    <div className="next-label"><FaClock className="me-2" /> {t('prayer.nextPrayer')}</div>
                    <div className="next-info-row">
                        <span className="next-name">{nextPrayer.displayName}</span>
                        <span className="next-time-main">{nextPrayer.time}</span>
                        {nextPrayer.iqamah && (
                            <span className="next-iqamah-badge">
                                <small>{t('prayer.iqamah')}:</small> {nextPrayer.iqamah}
                            </span>
                        )}
                    </div>
                    <div className="next-countdown-row">
                        <div className="countdown-item">
                            <small>{t('prayer.timeLeft')}:</small>
                            <span>{nextPrayer.countdown}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="prayer-date-container">
                <div className="date-item">
                    <FaCalendarAlt className="me-2" />
                    <span className="prayer-date-hijri">{hijriDate}</span>
                </div>
                <div className="date-divider"></div>
                <div className="date-item">
                    <span className="prayer-date-greg">{gregorianDate}</span>
                </div>
            </div>

            <div className="table-responsive prayer-table-wrapper">
                <table className="table daily-table">
                    <thead>
                        <tr>
                            <th>{t('prayer.prayer')}</th>
                            <th>{t('prayer.adhaan')}</th>
                            <th>{t('prayer.iqamah')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prayersToDisplay.map((p) => (
                            <tr key={p.id} className={nextPrayer.displayName === p.name ? 'next-row' : ''}>
                                <td className="p-name">{p.name}</td>
                                <td className="p-time">{formatTo12Hour(p.adhaan)}</td>
                                <td className="p-iqamah">{formatTo12Hour(getIqamahTime(p.raw, p.adhaan)) || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="jumuah-container mt-4">
                <div className="jumuah-title">
                    <FaClock className="me-2" /> {t('prayer.jummahPrayers')}
                </div>
                <div className="jumuah-grid">
                    <div className="jumuah-item">
                        <span>{t('prayer.jummah1')}</span>
                        <strong>01:00 PM</strong>
                    </div>
                    <div className="jumuah-item">
                        <span>{t('prayer.jummah2')}</span>
                        <strong>02:30 PM</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PrayerTimes;

