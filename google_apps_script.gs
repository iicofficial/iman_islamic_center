/**
 * GOOGLE APPS SCRIPT CODE - WITH GOOGLE SHEETS INTEGRATION
 * 
 * This script handles:
 * 1. Saving form data to specific Google Sheet tabs
 * 2. Sending email notifications to the organization
 * 3. Sending confirmation emails to users
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace all code in Code.gs with this code
 * 4. Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheet ID
 * 5. Click "Deploy" -> "New Deployment"
 * 6. Select Type: "Web App"
 * 7. Execute as: "Me" (your account)
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy", authorize, and copy the Web app URL
 */

// === CONFIGURATION ===
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your actual Google Sheet ID
const ORG_EMAIL = 'dev@iman-islam.org';

function doPost(e) {
  try {
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter;
    }
    
    // 1. Save to Google Sheets
    saveToSheet(data);
    
    // 2. Send Emails
    sendEmails(data);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save form data to the appropriate Google Sheet tab
 */
function saveToSheet(data) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var formType = data.formType || 'contact';
  var sheetName = getSheetName(formType);
  
  // Get or create the sheet
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Add headers based on form type
    addHeaders(sheet, formType);
  }
  
  // Prepare row data based on form type
  var timestamp = new Date().toLocaleString();
  var rowData = getRowData(data, formType, timestamp);
  
  // Append the row
  sheet.appendRow(rowData);
}

/**
 * Get the sheet name based on form type
 */
function getSheetName(formType) {
  var sheetNames = {
    'contact': 'Contact',
    'visit': 'Visit Reservations',
    'marriage': 'Marriage Applications',
    'reconciliation': 'Reconciliation',
    'divorce': 'Divorce',
    'boys': 'Quran Boys',
    'girls': 'Quran Girls'
  };
  return sheetNames[formType] || 'Other';
}

/**
 * Add appropriate headers to a new sheet
 */
function addHeaders(sheet, formType) {
  var headers;
  
  switch(formType) {
    case 'contact':
      headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Message'];
      break;
    case 'visit':
      headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Reason'];
      break;
    case 'marriage':
      headers = ['Timestamp', 'Groom Name', 'Bride Name', 'Email', 'Phone', 'Nikaah Date', 'Appointment Date', 'Appointment Time', 'Location'];
      break;
    case 'reconciliation':
    case 'divorce':
      headers = ['Timestamp', 'Party 1', 'Party 2', 'Email', 'Phone', 'Date', 'Time', 'Notes'];
      break;
    case 'boys':
    case 'girls':
      headers = ['Timestamp', 'Student Name', 'Age', 'Grade', 'School', 'Address', 'Guardian Name', 'Phone', 'Email'];
      break;
    default:
      headers = ['Timestamp', 'Form Title', 'Name', 'Email', 'Phone', 'Message'];
  }
  
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}

/**
 * Get row data based on form type
 */
function getRowData(data, formType, timestamp) {
  switch(formType) {
    case 'contact':
      return [
        timestamp,
        data.user_name || '',
        data.user_email || '',
        data.phone || '',
        data.message || ''
      ];
    case 'visit':
      return [
        timestamp,
        data.user_name || data.name || '',
        data.user_email || '',
        data.phone || '',
        data.date || '',
        data.time || '',
        data.message || ''
      ];
    case 'marriage':
      return [
        timestamp,
        data.groomName || '',
        data.brideName || '',
        data.user_email || '',
        data.phone || '',
        data.nikaahDate || '',
        data.appointmentDate || '',
        data.appointmentTime || '',
        data.appointmentLocation || ''
      ];
    case 'reconciliation':
    case 'divorce':
      return [
        timestamp,
        data.name1 || '',
        data.name2 || '',
        data.user_email || '',
        data.phone || '',
        data.date || '',
        data.time || '',
        data.notes || ''
      ];
    case 'boys':
    case 'girls':
      return [
        timestamp,
        data.studentName || data.user_name || '',
        data.age || '',
        data.grade || '',
        data.school || '',
        data.address || '',
        data.guardianName || '',
        data.mobile || data.phone || '',
        data.user_email || ''
      ];
    default:
      return [
        timestamp,
        data.form_title || '',
        data.user_name || '',
        data.user_email || '',
        data.phone || '',
        data.message || ''
      ];
  }
}

/**
 * Send email notifications
 */
function sendEmails(data) {
  var subject = data.form_title || "New Form Submission";
  var userRecipient = data.user_email;
  
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
    to: ORG_EMAIL,
    subject: "[ORG COPY] " + subject + " - " + data.user_name,
    replyTo: data.user_email,
    body: body,
    name: data.from_name || "Iman Islamic Center (IIC)"
  });

  // 2. Send Confirmation to User
  if (userRecipient) {
    var userBody = "Dear " + (data.user_name || "Applicant") + ",\n\n" +
                   "Thank you for contacting Iman Islamic Center (IIC). We have received your application for: " + subject + ".\n\n" +
                   "Our team will review your request and get back to you shortly.\n\n" +
                   "A copy of your submitted details is included below for your records.\n\n" +
                   "---\n" + body;
                   
    MailApp.sendEmail({
      to: userRecipient,
      subject: "Confirmation: " + subject + " Received",
      body: userBody,
      name: data.from_name || "Iman Islamic Center (IIC)"
    });
  }
}
