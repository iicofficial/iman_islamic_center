import React, { useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";
import imamImage from '../assets/imam.jpeg';
import './Staff.css';

const Staff = () => {
    const { language } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isRtl = language === 'ar';

    return (
        <div className={`staff-page ${isRtl ? 'rtl' : ''}`}>
            <div className="container my-5 pt-5">
                <div className="row align-items-center">
                    <div className={`col-lg-7 ${isRtl ? 'order-lg-2 text-end' : ''}`}>
                        <div className="staff-content p-4">
                            <div className="section-badge mb-3">
                                {language === 'ar' ? 'الإمام' : 'Imam'}
                            </div>
                            <h1 className="staff-name mb-2">
                                {language === 'ar' ? 'عبد العزيز العباسي' : 'Abdulaziz Al-Abbasi'}
                            </h1>
                            <h3 className="staff-title mb-4">
                                {language === 'ar' ? 'إمام مركز الإيمان الإسلامي' : 'Imam, Iman Islamic Center (IIC)'}
                            </h3>

                            <div className="staff-bio">
                                <p>
                                    Imam Abdulaziz Abdullah Al-Abbasi was born in Jeddah, Kingdom of Saudi Arabia, on August 16, 1984. He began his educational journey at Umar ibn Khattab High School, where he served as the leader of the Islamic Da‘wah Committee.
                                </p>
                                <p>
                                    From 2006 to 2008, he served as a muezzin, deputy imam, and spare khateeb at Masjid al-Khalil in Jeddah. During this period, he organized and led several Qur’anic halaqas and summer memorization programs, including initiatives he helped establish at Masjid al-Khalil. Between 2008 and 2010, he worked as a teacher and mentor at Masjid al-Khulafa’ al-Rashideen, teaching Qur’an and Islamic studies to elementary and intermediate students as part of a dedicated educational team.
                                </p>
                                <p>
                                    In 2016, Imam Abdulaziz graduated from King Abdulaziz University with a Doctor of Pharmacy (PharmD) degree. He then worked as a licensed pharmacist for nearly five years. Despite his professional career, his devotion to Islamic knowledge continued to grow. He memorized the entire Qur’an at the age of 17 and had the honor of reciting the Holy Qur’an before several distinguished scholars, among them Sheikh Abdel-Halim Abdel-Moneim Hassan, a prominent member of the General Administration of Egyptian Quranic Recitations (GAEQR). This early commitment to Qur’anic mastery and tajwīd strengthened his spiritual foundation and inspired him to continue pursuing sacred knowledge.
                                </p>
                                <p>
                                    Imam Abdulaziz studied under several eminent scholars, including Sheikh Mohammed Mokhtar al-Shanqiti, under whom he studied Sunan al-Tirmidhi from the Book of Prayer to the Book of Hajj for seven years at Masjid al-Imam Mohammed bin Saud in Jeddah. He also attended lessons with Sheikh Ibn Jibreel (may Allah have mercy on him) and completed courses in Muhimmat al-‘Ilm and other foundational texts with Sheikh Saleh ibn Saleh al-Usaymi, a member of the Council of Senior Scholars in Saudi Arabia. He received ijazah (authorization) in approximately nineteen classical Islamic works, further solidifying his scholarly background.
                                </p>
                                <p>
                                    In 2022, Imam Abdulaziz traveled to the United States to further his studies and was appointed Imam at the Islamic Foundation of Lincoln, where he served until 2025. During his tenure, he delivered the Friday Jumu‘ah Khutbahs, led the Taraweeh prayers for three consecutive years, and oversaw various community programs. He also officiated marriage contracts, conducted family and marital reconciliations, and supervised Islamic divorce procedures in accordance with Shari‘ah. In addition, he founded the Qur’an Carriers Program, a structured Qur’an memorization initiative that ran for two semesters, and organized Qur’anic summer camps throughout 2023, 2024, and 2025.
                                </p>
                                <p>
                                    Currently, Imam Abdulaziz serves as the Imam of Iman Islamic Center (IIC), where he continues his mission of spreading authentic Islamic knowledge, strengthening community faith, and nurturing future generations upon the Qur’an and Sunnah.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-5 mb-5 mb-lg-0 text-center ${isRtl ? 'order-lg-1' : ''}`}>
                        <div className="imam-image-wrapper">
                            <img
                                src={imamImage}
                                alt="Imam Abdulaziz Abdullah Al-Abbasi"
                                className="img-fluid imam-image"
                            />
                            <div className="image-border"></div>
                        </div>
                    </div>
                </div>

                <div className="staff-divider my-5"></div>

                {/* Executive Committee Section */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'اللجنة التنفيذية' : 'Executive Committee'}
                        </h2>
                    </div>

                    {/* Secretary Placeholder */}
                    <div className="col-md-6 mb-4">
                        <div className="staff-card p-4 text-center h-100">
                            <div className="staff-card-badge mb-3">
                                {language === 'ar' ? 'السكرتير' : 'Secretary'}
                            </div>
                            <h3 className="staff-card-name">
                                {language === 'ar' ? 'منصور البياتي' : 'Mansoor Al Bayati'}
                            </h3>
                        </div>
                    </div>

                    {/* Treasurer Placeholder */}
                    <div className="col-md-6 mb-4">
                        <div className="staff-card p-4 text-center h-100">
                            <div className="staff-card-badge mb-3">
                                {language === 'ar' ? 'أمين الصندوق' : 'Treasurer'}
                            </div>
                            <h3 className="staff-card-name">
                                {language === 'ar' ? 'الو دياكيتي' : 'Alou Diakite'}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="staff-divider my-5"></div>

                {/* Board of Directors Section */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}
                        </h2>
                    </div>
                    {/* Placeholder for Board Members - can be a list or grid */}
                    <div className="col-12 text-center text-muted">
                        <p>{language === 'ar' ? 'قريباً...' : 'Coming Soon...'}</p>
                    </div>
                </div>

                <div className="staff-divider my-5"></div>

                {/* ELC Members Section */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'أعضاء اللجنة التعليمية' : 'ELC Members'}
                        </h2>
                    </div>
                    {/* Placeholder for ELC Members */}
                    {/* ELC Members List */}
                    <div className="col-12">
                        <div className="row justify-content-center">
                            {[
                                "Idriss Abdelmadjid",
                                "Mohammad Alshammari",
                                "Ahmed",
                                "Esam Mohamed",
                                "Soleiman Espinoza",
                                "Dhugomsa Mohammed",
                                "Zaid Al Bayati"
                            ].map((name, index) => (
                                <div key={index} className="col-md-4 col-sm-6 mb-4">
                                    <div className="staff-card p-4 text-center h-100 d-flex align-items-center justify-content-center">
                                        <h3 className="staff-card-name m-0" style={{ fontSize: '1.2rem' }}>
                                            {name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;
