import firebaseAdmin from "firebase-admin";
import servicesAccountJson from "./servicesAccountKey.json" assert { type: "json" };

const firebaseAdminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(servicesAccountJson),
});

export default firebaseAdminApp;
