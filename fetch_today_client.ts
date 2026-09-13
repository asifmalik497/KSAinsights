
import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

async function fetchTodayCount() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));

    const app = initializeApp(firebaseConfig);
    const db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    }, firebaseConfig.firestoreDatabaseId);
    
    // April 26, 2026 UTC
    const startOfToday = new Date("2026-04-26T00:00:00Z");
    const q = query(
      collection(db, 'strategic_alerts'),
      where('createdAt', '>=', Timestamp.fromDate(startOfToday))
    );

    const snapshot = await getDocs(q);
    console.log(`TOTAL_ALERTS_TODAY:${snapshot.size}`);

    const categories: Record<string, number> = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const cat = data.category || 'unknown';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    console.log(`CATEGORIES_TODAY:${JSON.stringify(categories)}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fetchTodayCount();
