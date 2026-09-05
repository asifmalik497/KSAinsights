import axios from 'axios';
import fs from 'fs';
import path from "path";

async function checkRest() {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
  
  const databases = [firebaseConfig.firestoreDatabaseId, "(default)"];
  
  for (const dbId of databases) {
    if (!dbId) continue;
    console.log(`Checking database: ${dbId}`);
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${dbId}/documents/strategic_alerts`;
    try {
      const r = await axios.get(url + "?mask.fieldPaths=id");
      if (r.data.documents) {
        console.log(`TOTAL_ALERTS_${dbId}:${r.data.documents.length}`);
      } else {
        console.log(`TOTAL_ALERTS_${dbId}:0`);
      }
    } catch(e: any) {
      console.error(`Error for ${dbId}: ${e.response ? JSON.stringify(e.response.data) : e.message}`);
    }
  }
}

checkRest();
