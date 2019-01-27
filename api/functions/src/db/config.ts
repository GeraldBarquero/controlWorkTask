
import * as admin from 'firebase-admin';
const serviceAccount = require("./serviceAccountKey.json");

const config = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://controlworktask.firebaseio.com"
});
const settings = {imestampsInSnapshots: true};
config.firestore().settings(settings);

export default config;