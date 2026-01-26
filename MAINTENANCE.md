# Iman Islamic Center - System Maintenance Guide

To ensure the website forms, email services, and PDF generation stay functional "forever," follow these core principles and procedures.

## 1. Core Architecture Overview
The system relies on three main parts working together:
1.  **Frontend (React/Vite)**: The user interface at `iman-islam-center.org`.
2.  **Backend (Google Apps Script)**: Handles saving to the Spreadsheet and sending emails.
3.  **Client-Side PDF (jsPDF/html2canvas)**: Generates the application documents directly in the browser.

## 2. Preventing "Breaking Changes"
### Do Not Rename Form Fields
The Google Apps Script (in `google_apps_script_v2.gs`) expects specific names for data (e.g., `studentName`, `email`, `phone`). If you rename a variable in the React code, the data will not show up in the Google Sheet.

### Keep React Hooks at the Top
Always keep `useLanguage()` and other hooks at the top of the component function. Never call them inside `handleSubmit` or `generatePDF`, as this will cause the form to "hang" or crash.

## 3. Maintenance Procedures

### A. Updating the Google Script URL
If you ever deploy a new version of the Google Apps Script:
1.  Update the URL in `.env` (`VITE_GOOGLE_SCRIPT_URL`).
2.  Update the **hardcoded** URL in `src/utils/emailService.js` (this ensures the live site works even if environment variables have sync issues).
3.  Update the variable in **Vercel Dashboard Settings** -> **Environment Variables**.

### B. Testing Forms (The "Golden Rule")
Before considering any update "done," test at least one form (e.g., the Contact form) from a **mobile device** and a **desktop browser**.
Check for:
1.  The "Success" message appears.
2.  The PDF downloads automatically.
3.  The Google Sheet gets a new row.
4.  The confirmation email arrives in your inbox.

### C. Spreadsheet Protection
*   **Do not delete tabs**: The script looks for tabs named "Contact", "Marriage", "Quran Boys", etc. If you delete them, the script will try to recreate them, but it might mess up your historical data.
*   **Freeze the Header**: Keep the first row (headers) frozen to prevent accidental sorting errors.

## 4. Troubleshooting
| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| Form hangs on "Processing" | JavaScript error in `handleSubmit` | Check the browser console (F12) for a "ReferenceError". |
| No PDF downloads | Hook violation or html2canvas error | Ensure `generatePDF` does not contain `useLanguage()`. |
| No email received | GAS quota exceeded or Script URL changed | Check Google Apps Script "Executions" log for errors. |
| Duplicate records | `emailService.js` calling fetch twice | Ensure only one `fetch` call exists in `emailService.js`. |

## 5. Contact / Support
If the system stops working suddenly, check the **Google Apps Script Dashboard** first. 90% of issues are related to the script URL or Google's daily email quotas (1,500 emails/day for Workspace accounts).
