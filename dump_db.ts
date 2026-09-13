import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

async function dumpDB() {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
  
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: firebaseConfig.projectId });
  }
  
  const db = getFirestore(firebaseConfig.firestoreDatabaseId || undefined);
  const collections = ['strategic_alerts', 'system_stats', 'users'];
  
  for (const coll of collections) {
    console.log(`--- Collection: ${coll} ---`);
    const snap = await db.collection(coll).get();
    console.log(`Count: ${snap.size}`);
    snap.forEach(doc => {
      console.log(`ID: ${doc.id}`);
      // console.log(`Data: ${JSON.stringify(doc.data())}`);
    });
  }
}

dumpDB();
