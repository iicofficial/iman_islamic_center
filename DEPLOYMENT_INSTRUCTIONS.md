# Deployment Instructions for Vercel

Since your `.env.local` file is private and ignored by git, it does NOT get uploaded to Vercel automatically. You must manually configure these settings on the Vercel dashboard and then push your code changes.

## 1. Push Your Code Updates
Run these commands in your terminal to send the latest fixes (PDF waiting for email) to GitHub/Vercel:

```bash
git add .
git commit -m "Fix mobile submission: wait for email before pdf download"
git push
```

## 2. Add Environment Variables to Vercel (CRITICAL)
1.  Go to your **[Vercel Dashboard](https://vercel.com/dashboard)** and click on your project (`iman_islamic_center`).
2.  Click on the **Settings** tab (top menu).
3.  Click on **Environment Variables** (left side menu).
4.  Add these 4 variables one by one. Copy the **Key** and **Value** exactly as shown below:

| Key | Value |
| :--- | :--- |
| `VITE_EMAILJS_PUBLIC_KEY` | `BbOdJw90Znas1_-jM` |
| `VITE_EMAILJS_SERVICE_ID` | `service_rb2tnxl` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_eiyci1x` |
| `VITE_EMAILJS_QURAN_TEMPLATE_ID` | `template_clbz3te` |

## 3. Redeploy the Application
Adding variables does not affect the *currently* running site. You must trigger a new build.

1.  Go to the **Deployments** tab in Vercel.
2.  Click the three dots `...` next to your latest deployment (the one you just pushed).
3.  Select **Redeploy**.
4.  Click **Redeploy** again to confirm.

Once the deployment finishes (status becomes "Ready"), your live website will work correctly with the email features!
