// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// admin.initializeApp();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// exports.sendTemporaryPassword = functions.https.onCall(
//   async (data, context) => {
//     const email = email.data;

//     const tempPassword = crypto.randomBytes(8).toString('hex');

//     try {
//       const user = await admin.auth().getUserByEmail(email);
//       await admin.auth().updateUser(user.uid, {password: tempPassword});

//       const mailOptions = {
//         from: 'your',
//         to: email,
//         subject: 'Your Temporary Password',
//         text: `Your Temporary Password is: ${tempPassword}`,
//       };

//       await transporter.sendMail(mailOptions);
//       return {success: true};
//     } catch (error) {
//       console.error('Error sending temporary password:', error);
//       throw new functions.https.HttpsError(
//         'internal',
//         'Failed to send temporary password',
//       );
//     }
//   },
// );
