import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../config/serviceAccountKey.json";

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),  
});

export const db = getFirestore(firebaseApp);
