/**
 * GOOGLE APPS SCRIPT CODE
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project.
 * 3. Delete any code in Code.gs and paste this code.
 * 4. Replace 'YOUR_ORGANIZATION_EMAIL@gmail.com' with the email that will receive notifications (or use data.to_email).
 * 5. Click "Deploy" -> "New Deployment".
 * 6. Select Type: "Web App".
 * 7. Description: "IIC Email Service".
 * 8. Execute as: "Me" (your Workspace account).
 * 9. Who has access: "Anyone".
 * 10. Click "Deploy", authorize the script, and COPY the "Web app URL".
 * 11. Paste that URL into your .env.local as VITE_GAS_URL.
 */

function doPost(e) {
  try {
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      // Fallback for some fetch configurations
      data = e.parameter;
    }
    
    var subject = data.form_title || "New Form Submission";
    var orgRecipient = "dev@iman-islam.org"; // Your organization email
    var userRecipient = data.user_email; // The person who filled the form
    
    var body = "IIC Application Received: " + subject + "\n\n" +
               "--- SENDER INFORMATION ---\n" +
               "Name: " + (data.user_name || "N/A") + "\n" +
               "Email: " + (data.user_email || "N/A") + "\n" +
               "Phone: " + (data.phone || "N/A") + "\n" +
               "Date: " + (data.date || "N/A") + "\n" +
               "Location: " + (data.location || "N/A") + "\n\n" +
               "--- MESSAGE DETAILS ---\n" + 
               (data.message || "No additional message.");

    // 1. Send to Organization
    MailApp.sendEmail({
      to: orgRecipient,
      subject: "[ORG COPY] " + subject + " - " + data.user_name,
      replyTo: data.user_email,
      body: body,
      name: data.from_name || "Iman Islamic Center(IIC)"
    });

    // 2. Send Confirmation to User
    if (userRecipient) {
      var userBody = "Dear " + (data.user_name || "Applicant") + ",\n\n" +
                     "Thank you for contacting Iman Islamic Center. We have received your application for: " + subject + ".\n\n" +
                     "Our team will review your request and get back to you shortly.\n\n" +
                     "A copy of your submitted details is included below for your records.\n\n" +
                     "---\n" + body;
                     
      MailApp.sendEmail({
        to: userRecipient,
        subject: "Confirmation: " + subject + " Received",
        body: userBody,
        name: data.from_name || "Iman Islamic Center(IIC)"
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
