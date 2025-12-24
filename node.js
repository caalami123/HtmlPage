const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brewo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: "9ebb12001@smtp-brewo.com",
    pass: "SMTP_PASSWORD" // ⚠️ Ma muuqato frontend
  }
});

// Callable function for sending emails
exports.sendEmailCampaign = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Please login first.');
  }

  const { to, subject, message } = data;

  try {
    await transporter.sendMail({
      from: '"Safar Travel" <safartravel1122@gmail.com>',
      to,
      subject,
      text: message
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
