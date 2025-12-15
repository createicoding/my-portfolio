// --- COPY THIS CONTENT TO YOUR GOOGLE APPS SCRIPT EDITOR ---

const SHEET_NAME = "Sheet1";

// --- CONFIGURATION ---
// We hardcode defaults here so you don't need to run setupAdmin
const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASS = "admin123";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
       try {
         data = JSON.parse(e.postData.contents);
       } catch (err) {
         data = e.parameter;
       }
    } else if (e && e.parameter) {
       data = e.parameter;
    }

    const action = data.action || 'contact';

    // --- LOGIN LOGIC ---
    if (action === 'login') {
      const props = PropertiesService.getScriptProperties();
      
      const storedEmail = props.getProperty('ADMIN_EMAIL') || DEFAULT_EMAIL;
      const storedPass = props.getProperty('ADMIN_PASS') || DEFAULT_PASS;
      
      const inputEmail = (data.email || '').trim();
      const inputPass = (data.password || '').trim();

      if (inputEmail === storedEmail && inputPass === storedPass) {
        return responseJSON({ status: 'success', message: 'Logged in' });
      } else {
        return responseJSON({ 
            status: 'error', 
            message: 'Invalid credentials',
            debug: {
                receivedEmail: inputEmail,
                storedEmail: storedEmail, 
                usingDefault: (storedEmail === DEFAULT_EMAIL)
            }
        });
      }
    }

    // --- UPDATE CREDENTIALS (Email & Password) ---
    else if (action === 'update_credentials') {
      const props = PropertiesService.getScriptProperties();
      const currentStoredPass = props.getProperty('ADMIN_PASS') || DEFAULT_PASS;
      const currentStoredEmail = props.getProperty('ADMIN_EMAIL') || DEFAULT_EMAIL;

      // Verify current credentials passed from frontend
      if (data.currentEmail !== currentStoredEmail || data.currentPassword !== currentStoredPass) {
         return responseJSON({ status: 'error', message: 'Current credentials incorrect' });
      }

      // Update Email if provided
      if (data.newEmail && data.newEmail.trim() !== "") {
          props.setProperty('ADMIN_EMAIL', data.newEmail.trim());
      }

      // Update Password if provided
      if (data.newPassword && data.newPassword.trim() !== "") {
          props.setProperty('ADMIN_PASS', data.newPassword.trim());
      }
      
      return responseJSON({ status: 'success', message: 'Credentials updated successfully' });
    }

    // --- CONTACT FORM ---
    else {
      const doc = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = doc.getSheetByName(SHEET_NAME);
      if(!sheet) return responseJSON({ status: 'error', message: 'Sheet1 not found' });
      
      const nextRow = sheet.getLastRow() + 1;
      const name = data.name || "";
      const subject = data.subject || "";
      const email = data.email || "";
      const phone = data.phone || "";
      const message = data.message || "";

      sheet.getRange(nextRow, 1, 1, 6).setValues([[new Date(), name, subject, email, phone, message]]);
      return responseJSON({ result: "success" });
    }

  } catch (e) {
    return responseJSON({ status: 'error', message: e.toString() });
  } finally {
    lock.releaseLock();
  }
}

function responseJSON(content) {
  return ContentService.createTextOutput(JSON.stringify(content))
    .setMimeType(ContentService.MimeType.JSON);
}
