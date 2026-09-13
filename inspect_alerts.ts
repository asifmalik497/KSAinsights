import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

async function inspectAlerts() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }

    const db = getFirestore(firebaseConfig.firestoreDatabaseId || undefined);
    const snapshot = await db.collection('strategic_alerts').get();
    console.log(`FOUND_ALERTS:${snapshot.size}`);
    
    snapshot.forEach(doc => {
      console.log(`ALERT_ID:${doc.id}`);
      console.log(`ALERT_DATA:${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error("Error inspecting alerts:", error);
  }
}

inspectAlerts();
