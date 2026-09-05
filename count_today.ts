
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

async function countToday() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }

    const db = getFirestore(firebaseConfig.firestoreDatabaseId || undefined);
    
    // Using UTC date for "today" based on metadata 2026-04-26
    const startOfToday = new Date("2026-04-26T00:00:00Z");
    
    const snapshot = await db.collection('strategic_alerts')
      .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startOfToday))
      .get();

    console.log(`TOTAL_ALERTS_TODAY:${snapshot.size}`);

    // Break down by category if needed
    const categories: Record<string, number> = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const cat = data.category || 'unknown';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    console.log(`CATEGORIES_TODAY:${JSON.stringify(categories)}`);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

countToday();
