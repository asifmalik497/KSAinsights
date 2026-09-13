import axios from 'axios';

async function checkHealth() {
  try {
    const res = await axios.get('http://localhost:3000/api/health');
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error("Health check failed:", e.message);
  }
}

checkHealth();
