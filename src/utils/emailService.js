/**
 * Utility to send emails via Google Apps Script (Web App)
 * This replaces EmailJS to avoid the 200 requests/month limit.
 */

export const sendEmail = async (templateParams) => {
    // HARDCODING URL TO FIX DEPLOYMENT ISSUE IMMEDIATELY
    const GAS_URL = "https://script.google.com/macros/s/AKfycbw_aviFOyzao-O_ZCruSQq-EmxDDihKzdwXUOepjpZacq4a1_TiLLMJu1-Cdw2p1bhJcA/exec";

    if (!GAS_URL) {
        console.error("GAS_URL is not defined.");
        throw new Error("Email service configuration missing.");
    }

    try {
        // GAS script handles both saving to sheet and sending BOTH admin/user emails in one call.
        // We only need ONE fetch.
        const response = await fetch(GAS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(templateParams),
        });

        return { status: 200, text: "OK (sent via GAS)" };
    } catch (error) {
        console.error("Error sending email via GAS:", error);
        throw error;
    }
};
