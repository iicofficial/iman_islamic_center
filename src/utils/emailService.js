/**
 * Utility to send emails via Google Apps Script (Web App)
 * This replaces EmailJS to avoid the 200 requests/month limit.
 */

export const sendEmail = async (templateParams) => {
    const GAS_URL = import.meta.env.VITE_GAS_URL;
    console.log("DEBUG - CURRENT GAS URL IS:", GAS_URL); // <-- Debugging line

    if (!GAS_URL) {
        console.error("VITE_GAS_URL is not defined in environment variables.");
        throw new Error("Email service configuration missing.");
    }

    try {
        const response = await fetch(GAS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain", // Using text/plain avoids preflight triggers
            },
            body: JSON.stringify(templateParams),
        });

        // With no-cors, we can't read the response body or status, 
        // but it prevents CORS errors and the script still runs.
        return { status: 200, text: "OK (sent via GAS)" };
    } catch (error) {
        console.error("Error sending email via GAS:", error);
        throw error;
    }
};
