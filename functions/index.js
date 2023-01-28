const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.https.onCall((data, context) => {
    return admin.auth().createUser({
        uid: data.nik,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
    }).then((user) => {
        return user;
    }).catch((error) => {
        return error;
    });
});

exports.deleteUser = functions.https.onCall((data, context) => {
    return admin.auth().deleteUser(data.id);
});

exports.setUserAsAdmin = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data).then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
            premiumAccount: false,
        });
    });
});

exports.setUserAsPremiumAccount = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data).then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {admin: true, premiumAccount: true,
        });
    });
});
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
