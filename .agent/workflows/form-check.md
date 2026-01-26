---
description: How to verify form stability after changes
---

# Form Stability Check Workflow

Use this workflow whenever you make changes to the forms or the backend.

1. **Verify `emailService.js`**
   - Open `src/utils/emailService.js`.
   - Ensure there is ONLY ONE `fetch` call.
   - Ensure the `GAS_URL` matches the latest deployment.

2. **Verify Hook Rules**
   - Check all form components (e.g., `MarriageCertificate.jsx`).
   - Ensure `useLanguage()` is NOT used inside `generatePDF` or `handleSubmit`.
   - Language should be accessed via a variable defined at the top of the component: `const { t, language } = useLanguage();`.

3. **Check Validation**
   - In Quran forms, ensure secondary phone numbers (Work/Home) are NOT marked as `required`.

4. **Run Local Build Test**
   - Run `npm run build` to ensure there are no syntax or linting errors that would break the production site.

5. **Live Test**
   - Submit a test "Contact" message.
   - Confirm:
     - [ ] Success Modal appears.
     - [ ] PDF downloads.
     - [ ] Email arrives.
     - [ ] Google Sheet record appears.
