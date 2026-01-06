import React from "react";
import { FaFileDownload, FaFilePdf, FaFileWord } from "react-icons/fa";
import "./DownloadForms.css";

function DownloadForms() {
    const forms = [
        {
            title: "Constitution and Bylaws",
            description: "Official constitution and bylaws of the Iman Islamic Center.",
            fileName: "Constitution and bylaws.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            title: "Monthly Commitment Form",
            description: "Pledge your monthly contribution to support the Islamic Center.",
            fileName: "Islamic_Center_Monthly_Commitment_Form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            title: "ELC Member Work Form",
            description: "Application form for Executive Leadership Committee member positions.",
            fileName: "ELC Member work form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        },
        {
            title: "Board of Directors Work Form",
            description: "Application form for Board of Directors member positions.",
            fileName: "board of directors member work form.docx",
            icon: <FaFileWord className="word-icon" />,
            format: "DOCX"
        }
    ];

    return (
        <section className="forms-section" id="forms">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Community Forms</h2>
                    <p className="section-subtitle">
                        Download and fill out these forms to participate in our community activities and programs.
                    </p>
                </div>

                <div className="row g-4">
                    {forms.map((form, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="form-download-card">
                                <div className="card-icon">
                                    {form.icon}
                                </div>
                                <div className="card-body pl-0">
                                    <h3 className="form-name">{form.title}</h3>
                                    <p className="form-desc">{form.description}</p>
                                    <span className="file-badge">{form.format}</span>
                                    <a
                                        href={`/forms/${form.fileName}`}
                                        download
                                        className="btn btn-download-form"
                                    >
                                        <FaFileDownload /> Download Now
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

export default DownloadForms;
