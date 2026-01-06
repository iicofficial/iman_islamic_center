import { useLanguage } from "../context/LanguageContext";
import "./Donate.css";

function Donate() {
    const { t } = useLanguage();

    return (
        <section id="donate" className="donate-section d-flex align-items-center justify-content-center">
            <div className="donate-overlay"></div>
            <div className="container-fluid donate-content text-center">
                <h2>{t('donate.heading')}</h2>
                <p>{t('donate.desc')}</p>
                <a href="https://www.paypal.com/donate" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg mt-3">
                    {t('donate.button')}
                </a>
            </div>
        </section>
    );
}

export default Donate;
