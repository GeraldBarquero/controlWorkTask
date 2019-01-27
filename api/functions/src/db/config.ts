
import * as admin from 'firebase-admin';

const config = admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const settings = {imestampsInSnapshots: true};
config.firestore().settings(settings);

export default config;