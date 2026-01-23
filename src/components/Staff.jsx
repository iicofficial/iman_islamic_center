import React, { useEffect } from 'react';
import { useLanguage } from "../context/LanguageContext";
import imamImage from '../assets/imam.JPG';
import imamBanner from '../assets/imam2.JPG';
import './Staff.css';

const Staff = () => {
    const { language } = useLanguage();
    const isRtl = language === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Bio Data Structure
    const bioData = [
        {
            label: isRtl ? "ولد في:" : "Born:",
            value: isRtl
                ? "16 أغسطس 1984 – جدة، المملكة العربية السعودية"
                : "August 16, 1984 – Jeddah, Kingdom of Saudi Arabia"
        },
        {
            label: isRtl ? "التعليم:" : "Education:",
            value: isRtl
                ? "تخرج من ثانوية عمر بن الخطاب، حيث كان مسؤولاً عن لجنة التوعية الإسلامية."
                : "Graduated from Umar ibn Khattab High School, where he served as leader of the Islamic Da‘wah Committee."
        },
        {
            label: isRtl ? "الخدمة الدينية المبكرة (2006-2008):" : "Early Religious Service (2006–2008):",
            value: isRtl
                ? "عمل مؤذناً ونائباً للإمام (إمام التراويح)، وخطيباً احتياطياً في مسجد الخليل بجدة. نظم وأدار العديد من حلقات تحفيظ القرآن والبرامج الصيفية، بما في ذلك مبادرات ساهم في تأسيسها في مسجد الخليل."
                : "Served as muezzin, deputy imam (Taraweeh leader), and spare Khateeb at Masjid al-Khalil in Jeddah. Organized and led several Qur’anic halaqas and summer memorization programs, including initiatives he helped establish at Masjid al-Khalil."
        },
        {
            label: isRtl ? "التدريس والإرشاد (2008-2010):" : "Teaching and Mentorship (2008–2010):",
            value: isRtl
                ? "عمل معلماً وموجهاً في مسجد الخلفاء الراشدين. قام بتدريس القرآن والدراسات الإسلامية لطلاب المراحل الابتدائية والمتوسطة كجزء من فريق تعليمي متخصص."
                : "Worked as a teacher and mentor at Masjid al-Khulafa’ al-Rashideen. Taught Qur’an and Islamic studies to elementary and intermediate students as part of a dedicated teaching team."
        },
        {
            label: isRtl ? "المسيرة الأكاديمية (2010-2016):" : "Academic Career (2010–2016):",
            value: isRtl
                ? "أكمل تعليمه العالي في جامعة الملك عبد العزيز، وحصل على درجة دكتور صيدلي (PharmD) في عام 2016. عمل كصيدلي مرخص لمدة خمس سنوات تقريباً بعد التخرج."
                : "Pursued higher education at King Abdulaziz University, earning a Doctor of Pharmacy (PharmD) degree in 2016. Worked as a licensed pharmacist for nearly five years following graduation."
        },
        {
            label: isRtl ? "التدريب القرآني والعلمي:" : "Qur’anic and Scholarly Training:",
            value: isRtl
                ? "أتم حفظ القرآن الكريم كاملاً في سن السابعة عشرة. قرأ القرآن الكريم على عدد من العلماء المتميزين، ومنهم الشيخ عبد الحليم عبد المنعم حسن، العضو البارز في الإدارة العامة للمقاريء المصرية. هذا التفاني المبكر للقرآن والتجويد ألهمه لمواصلة طلب العلم الشرعي طوال حياته."
                : "Memorized the entire Qur’an at the age of 17. Recited the Holy Qur’an before several distinguished scholars, including Sheikh Abdel-Halim Abdel-Moneim Hassan, a prominent member of the General Administration of Egyptian Quranic Recitations (GAEQR). This early dedication to the Qur’an and tajwid inspired his lifelong pursuit of Islamic knowledge."
        },
        {
            label: isRtl ? "الدراسة على يد العلماء:" : "Studies with Scholars:",
            value: isRtl
                ? "درس على يد الشيخ محمد مختار الشنقيطي، وأكمل دراسة سنن الترمذي (من كتاب الصلاة إلى كتاب الحج) على مدار سبع سنوات في مسجد الإمام محمد بن سعود بجدة. حضر دروساً للشيخ ابن جبرين (رحمه الله). أكمل دورات في 'مهمات العلم' ومتون تأسيسية أخرى تحت إشراف الشيخ صالح بن عبد الله العصيمي، عضو هيئة كبار العلماء في المملكة العربية السعودية. حصل على إجازات في حوالي تسعة عشر متناً من المتون الإسلامية الكلاسيكية."
                : "Studied under Sheikh Mohammed Mokhtar al-Shanqiti, completing Sunan al-Tirmidhi (Book of Prayer to Book of Hajj) over seven years at Masjid al-Imam Mohammed bin Saud in Jeddah. Attended lessons with Sheikh Ibn Jibreen (may Allah have mercy on him). Completed courses in Muhimmat al-‘Ilm and other foundational texts under Sheikh Saleh ibn Saleh al-Usaymi, a member of the Council of Senior Scholars in Saudi Arabia. Received ijazah (authorization) in approximately nineteen classical Islamic works."
        },
        {
            label: isRtl ? "الإمامة في الولايات المتحدة (2022-2025):" : "Imamship in the United States (2022–2025):",
            value: isRtl
                ? "عُين إماماً للمؤسسة الإسلامية في لينكولن من 2022 إلى 2025. ألقى خطب الجمعة وأمّ المصلين في صلاة التراويح لثلاث سنوات متتالية. أشرف على العديد من البرامج المجتمعية وقدم الاستشارات الروحية. قام بعقد أنكحة الزواج، وإجراء الصلح العائلي والزوجي، والإشراف على إجراءات الطلاق وفقاً للشريعة الإسلامية. أسس برنامج 'حملة القرآن'، وهو دورة منهجية لحفظ القرآن استمرت لفصلين دراسيين، إلى جانب تنظيم مخيمات صيفية قرآنية في أعوام 2023 و2024 و2025."
                : "Appointed Imam at the Islamic Foundation of Lincoln from 2022 to 2025. Delivered Friday Jumu'ah Khutbahs and led Taraweeh prayers for three consecutive years. Oversaw numerous community programs and provided spiritual counseling. Officiated marriage contracts, conducted family and marital reconciliations, and supervised Islamic divorce procedures in accordance with Shari'ah. Founded the Qur’an Carriers Program, a structured Qur’an memorization course that ran for two semesters alongside organizing Qur’anic summer camps in 2023, 2024, and 2025."
        },
        {
            label: isRtl ? "الدور الحالي:" : "Current Role:",
            value: isRtl
                ? "يعمل حالياً إماماً لمركز الإيمان الإسلامي (IIC). يؤم الصلوات اليومية، ويلقي خطب الجمعة، ويدير برامج التعليم القرآني للشباب والكبار. يكرس جهوده لنشر العلم الشرعي الصحيح، وتعزيز إيمان المجتمع، وتربية الأجيال القادمة على القرآن والسنة."
                : "Serves as Imam of Iman Islamic Center (IIC). Leads daily prayers, Friday sermons, and Qur’anic education programs for youth and adults. Dedicated to spreading authentic Islamic knowledge, strengthening community faith, and nurturing future generations upon the Qur’an and Sunnah."
        }
    ];

    return (
        <div className={`staff-page ${isRtl ? 'rtl' : ''}`}>
            <div className="container">

                {/* ---------------- IMAM SECTION ---------------- */}
                <div className="imam-section-container">

                    {/* Header */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="section-badge mb-3">
                                {isRtl ? 'الإمام' : 'IMAM'}
                            </div>
                            <div className="staff-divider my-4"></div>
                            <h1 className="staff-name mb-2">
                                {isRtl ? 'عبد العزيز عبد الله العباسي' : 'Abdulaziz Abdullah Al-Abbasi'}
                            </h1>
                            <div className="imam-header-subtitle">
                                {isRtl ? 'إمام مركز الإيمان الإسلامي' : 'Imam, Iman Islamic Center (IIC)'}
                            </div>
                        </div>
                    </div>

                    <div className="row imam-profile-row mb-0">

                        {/* Bio Content (Left on LTR, Right on RTL) */}
                        <div className={`col-lg-7 bio-content-column ${isRtl ? 'order-lg-1' : ''}`}>
                            {bioData.map((item, index) => (
                                <div className="bio-item" key={index}>
                                    <span className="bio-label">{item.label}</span>
                                    <span className="bio-value">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Sticky Image (Right on LTR, Left on RTL) */}
                        <div className="col-lg-5 ps-lg-0 pe-lg-0">
                            <div className="sticky-image-wrapper">
                                <img
                                    src={imamImage}
                                    alt="Imam Abdulaziz"
                                    className="img-fluid imam-sticky-photo"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Banner Image Below */}
                    <div className="row mt-0">
                        <div className="col-12 p-0">
                            <div className="imam-banner-section">
                                <img
                                    src={imamBanner}
                                    alt="Imam Leading Prayer"
                                    className="imam-banner-img"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="staff-divider"></div>


                {/* ---------------- BOARD OF DIRECTORS ---------------- */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}
                        </h2>
                    </div>

                    {/* Secretary */}
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

                    {/* Treasurer */}
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

                <div className="staff-divider"></div>

                {/* ---------------- ELC ---------------- */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'اللجنة القيادية التنفيذية' : 'Executive Leadership Committee'}
                        </h2>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-center">
                            {[
                                { en: "Idriss Abdelmadjid", ar: "إدريس عبد المجيد" },
                                { en: "Mohammad Alshammari", ar: "محمد الشمري" },
                                { en: "Ahmed", ar: "أحمد" },
                                { en: "Esam Mohamed", ar: "عصام محمد" },
                                { en: "Soleiman Espinoza", ar: "سليمان إسبينوزا" },
                                { en: "Dhugomsa Mohammed", ar: "دقمسا محمد" },
                                { en: "Zaid Al Bayati", ar: "زيد البياتي" },
                                { en: "Abdelmalik Al-Fendi", ar: "عبد الملك الفندي" }
                            ].map((person, index) => (
                                <div key={index} className="col-md-4 col-sm-6 mb-4">
                                    <div className="staff-card p-4 text-center h-100 d-flex align-items-center justify-content-center">
                                        <h3 className="staff-card-name m-0" style={{ fontSize: '1.2rem' }}>
                                            {language === 'ar' ? person.ar : person.en}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="staff-divider"></div>

                {/* ---------------- IT ---------------- */}
                <div className="row mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 className="section-title">
                            {language === 'ar' ? 'التطوير' : 'Development'}
                        </h2>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className="staff-card p-4 text-center h-100">
                                    {/* Developer badge removed by user request */}
                                    <h3 className="staff-card-name">
                                        {language === 'ar' ? 'عقيل خطاب' : 'Akeel Salman'}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Staff;
