/**
 * IMAN ISLAMIC CENTER - FORM HANDLER v2.0
 * Fresh, clean script with separate tabs per form type
 * 
 * SETUP:
 * 1. Create NEW project at script.google.com
 * 2. Paste this code
 * 3. Replace SPREADSHEET_ID below with your Google Sheet ID
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the new URL to your code
 */

// =============================================
// CONFIGURATION - UPDATE THIS!
// =============================================
const SPREADSHEET_ID = '1234567890abcdef'; // <-- PUT YOUR SHEET ID HERE
const ORG_EMAIL = 'dev@iman-islam.org';

// =============================================
// MAIN HANDLER
// =============================================
function doPost(e) {
  try {
    // Parse incoming data
    var data = JSON.parse(e.postData.contents);
    var formType = String(data.formType || 'unknown').toLowerCase().trim();
    
    Logger.log('Received form: ' + formType);
    Logger.log('Data: ' + JSON.stringify(data));
    
    // Save to sheet
    var saved = saveToSheet(formType, data);
    
    // Send emails
    var emailed = sendEmails(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      saved: saved,
      emailed: emailed
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// =============================================
// SAVE TO GOOGLE SHEETS
// =============================================
function saveToSheet(formType, data) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var timestamp = new Date();
  
  // Define sheet configs for each form type
  var configs = {
    'contact': {
      sheetName: 'Contact',
      headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Message'],
      getData: function(d) {
        return [timestamp, d.user_name, d.user_email, d.phone, d.message];
      }
    },
    'visit': {
      sheetName: 'Visit',
      headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Reason'],
      getData: function(d) {
        return [timestamp, d.user_name || d.name, d.user_email, d.phone, d.date, d.time, d.message];
      }
    },
    'marriage': {
      sheetName: 'Marriage',
      headers: ['Timestamp', 'Groom', 'Bride', 'Email', 'Phone', 'Nikaah Date', 'Appt Date', 'Appt Time', 'Location'],
      getData: function(d) {
        return [timestamp, d.groomName, d.brideName, d.user_email, d.phone, d.nikaahDate, d.appointmentDate, d.appointmentTime, d.appointmentLocation];
      }
    },
    'reconciliation': {
      sheetName: 'Reconciliation',
      headers: ['Timestamp', 'Party 1', 'Party 2', 'Email', 'Phone', 'Date', 'Time', 'Notes'],
      getData: function(d) {
        return [timestamp, d.name1, d.name2, d.user_email, d.phone, d.date, d.time, d.notes];
      }
    },
    'divorce': {
      sheetName: 'Divorce',
      headers: ['Timestamp', 'Party 1', 'Party 2', 'Email', 'Phone', 'Date', 'Time', 'Notes'],
      getData: function(d) {
        return [timestamp, d.name1, d.name2, d.user_email, d.phone, d.date, d.time, d.notes];
      }
    },
    'boys': {
      sheetName: 'Quran Boys',
      headers: ['Timestamp', 'Student', 'Age', 'Grade', 'School', 'Address', 'Guardian', 'Phone', 'Email'],
      getData: function(d) {
        return [timestamp, d.studentName || d.user_name, d.age, d.grade, d.school, d.address, d.guardianName, d.mobile || d.phone, d.user_email];
      }
    },
    'girls': {
      sheetName: 'Quran Girls',
      headers: ['Timestamp', 'Student', 'Age', 'Grade', 'School', 'Address', 'Guardian', 'Phone', 'Email'],
      getData: function(d) {
        return [timestamp, d.studentName || d.user_name, d.age, d.grade, d.school, d.address, d.guardianName, d.mobile || d.phone, d.user_email];
      }
    }
  };
  
  // Get config or use fallback
  var config = configs[formType];
  if (!config) {
    // Fallback for unknown form types
    config = {
      sheetName: 'Other',
      headers: ['Timestamp', 'Form Type', 'Name', 'Email', 'Phone', 'Raw Data'],
      getData: function(d) {
        return [timestamp, formType, d.user_name, d.user_email, d.phone, JSON.stringify(d)];
      }
    };
  }
  
  // Get or create sheet
  var sheet = ss.getSheetByName(config.sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(config.sheetName);
    sheet.appendRow(config.headers);
    sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
    sheet.setFrozenRows(1);
  }
  
  // Append data
  var rowData = config.getData(data);
  sheet.appendRow(rowData);
  
  return config.sheetName;
}

// =============================================
// SEND EMAILS
// =============================================
function sendEmails(data) {
  var subject = data.form_title || 'New Form Submission';
  var userName = data.user_name || 'Applicant';
  var userEmail = data.user_email;
  
  // Build email body
  var body = '=== IIC FORM SUBMISSION ===\n\n';
  body += 'Form: ' + subject + '\n';
  body += 'Name: ' + userName + '\n';
  body += 'Email: ' + (userEmail || 'N/A') + '\n';
  body += 'Phone: ' + (data.phone || data.mobile || 'N/A') + '\n';
  body += 'Date: ' + (data.date || 'N/A') + '\n\n';
  body += '--- Details ---\n';
  body += (data.message || 'No additional details.');
  
  // Send to organization
  MailApp.sendEmail({
    to: ORG_EMAIL,
    subject: '[IIC] ' + subject + ' - ' + userName,
    body: body,
    replyTo: userEmail || ORG_EMAIL,
    name: 'Iman Islamic Center'
  });
  
  // Send confirmation to user
  if (userEmail) {
    var userBody = 'Assalamu Alaikum ' + userName + ',\n\n';
    userBody += 'Thank you for submitting your request to Iman Islamic Center.\n\n';
    userBody += 'We have received your: ' + subject + '\n\n';
    userBody += 'Our team will review your submission and contact you soon.\n\n';
    userBody += 'JazakAllahu Khairan,\nIman Islamic Center Team';
    
    MailApp.sendEmail({
      to: userEmail,
      subject: 'Confirmation: ' + subject,
      body: userBody,
      name: 'Iman Islamic Center'
    });
  }
  
  return true;
}

// =============================================
// TEST FUNCTION (Run this manually to test)
// =============================================
function testScript() {
  var testData = {
    formType: 'contact',
    form_title: 'Test Contact',
    user_name: 'Test User',
    user_email: 'test@example.com',
    phone: '402-555-1234',
    message: 'This is a test message'
  };
  
  var result = saveToSheet('contact', testData);
  Logger.log('Saved to: ' + result);
}
