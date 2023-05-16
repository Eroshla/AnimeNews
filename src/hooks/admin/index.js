const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
          admin: true;
      })
  }).then(() => {
      return {
          message: `Sucess! ${data.email} has been an admin`
      }
  }).catch( err => {
      return err;
  })
});
