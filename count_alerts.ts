
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

async function countTodayAlerts() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }

    const db = getFirestore(firebaseConfig.firestoreDatabaseId || undefined);
    
    // "Today" for the user is April 18, 2026
    // The user's local time is 18:31 (6:31 PM)
    // We want all alerts from the start of that day.
    // 2026-04-18T00:00:00-07:00
    
    const startOfToday = new Date("2026-04-18T00:00:00-07:00");
    
    const snapshot = await db.collection('strategic_alerts')
      .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfToday))
      .get();

    console.log(`COUNT_RESULT:${snapshot.size}`);
  } catch (error) {
    console.error("Error counting alerts:", error);
    process.exit(1);
  }
}

countTodayAlerts();
