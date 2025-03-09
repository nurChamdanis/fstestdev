import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../config/serviceAccountKey.json');

const firebaseApp = admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccountPath),
});
 
export const db = getFirestore(firebaseApp);