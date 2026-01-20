# Project History & Master Documentation

## 1. Project Overview
A premium, fully responsive website for **Iman Islamic Center**, built with **React** and **Vite**. This platform connects the community, provides essential religious services, and offers a modern, bilingual user experience (English & Arabic).

**Key Features:**
*   **Bilingual**: Full English/Arabic support with RTL layout.
*   **Theme**: Light/Dark mode.
*   **Design**: Premium "glassmorphism" UI with 'Outfit' typography.
*   **Services**: Prayer times, Marriage Certificates, Quran Memorization, and Event Scheduling.

---

## 2. Technical Features & Guides

### A. Custom Date & Time Pickers
We replaced default HTML inputs with custom, brand-matched pickers.

**Components:** `DatePicker` (Calendar) and `TimePicker` (Scrollable).
**Location:** `src/components/DateTimePicker.jsx`

**Usage Example:**
```javascript
import { DatePicker, TimePicker } from './DateTimePicker';

<DatePicker
    label="Select Date"
    value={formData.date}
    onChange={handleChange}
    name="date"
    required
    minDate={new Date().toISOString().split('T')[0]} // Disable past dates
/>

<TimePicker
    label="Select Time"
    value={formData.time}
    onChange={handleChange}
    name="time"
    required
/>
```

### B. Form Validation
We implemented strict client-side validation for higher data quality, specifically for Quran Applications.

**Rules:**
*   **Age**: Must be 5-15 years.
*   **Address**: Must contain "Lincoln" and "NE" (case-insensitive).
*   **Phone**: US Format `(123)456-7890`. Auto-formats as you type.
*   **Email**: Standard Regex validation.

**visual Feedback:**
*   Red borders and text messages appear instantly on error.
*   Form submission is blocked until errors are resolved.

### C. File Optimization (Forms)
Large `.docx` files (~8MB) cause deployment issues and slow user downloads.

**Optimization Strategy:**
1.  **Convert to PDF** (Recommended): Reduces size by ~80%.
2.  **Compress Images**: If keeping `.docx`, use Word's "Compress Pictures" feature (150ppi).

**Status:**
*   `DownloadForms.jsx` updated to valid file references.
*   *Action Item*: Continue converting any remaining large `.docx` files to PDF.

---

## 3. Deployment Instructions (Vercel)

### Environment Variables
These **MUST** be set in the Vercel Dashboard for email functionality to work.

| Key | Value |
| :--- | :--- |
| `VITE_EMAILJS_PUBLIC_KEY` | `BbOdJw90Znas1_-jM` |
| `VITE_EMAILJS_SERVICE_ID` | `service_rb2tnxl` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_eiyci1x` |
| `VITE_EMAILJS_QURAN_TEMPLATE_ID` | `template_clbz3te` |

### Deployment Steps
1.  **Push Code**: `git push origin main`
2.  **Check Vercel**: Go to dashboard to confirm build success.
3.  **Redeploy (if needed)**:
    *   Go to Deployments → `...` → **Redeploy**.
    *   This is required if you update Environment Variables.

---

## 4. Work Log (Chronological Highlights)
*   **Initial Setup**: React/Vite project structure, Tailwind-free CSS design system.
*   **Navigation**: Built responsive Navbar with Arabic RTL support.
*   **Prayer Times**: Integrated Hijri/Gregorian calendar and dynamic time tables.
*   **Marriage Form**: Created multi-step wizard with appointment scheduling.
*   **Quran App**: Built boys/girls applications with PDF generation & EmailJS.
*   **Refinements**: 
    *   Fixed independent logo for Arabic mode.
    *   Solved mobile display issues (ribbons/logos).
    *   Optimized file sizes.
    *   Added custom date/time pickers.

---
*Verified & Validated: Jan 2026*
