import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

async function check() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }

    const db = getFirestore(firebaseConfig.firestoreDatabaseId || undefined);
    const snapshot = await db.collection('strategic_alerts').orderBy('createdAt', 'desc').limit(5).get();

    console.log(`Total Alerts Found: ${snapshot.size}`);
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`- [${data.date}] ${data.title.en} (Source: ${data.source})`);
    });
  } catch (error) {
    console.error("Error checking alerts:", error);
  }
}

check();
