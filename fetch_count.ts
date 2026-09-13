import axios from 'axios';

async function fetchCount() {
  try {
    const r = await axios.get('http://localhost:3000/api/health');
    console.log(JSON.stringify(r.data));
  } catch(e: any) {
    if (e.response) {
       console.error("Error Response:", e.response.data);
    } else {
       console.error("Error:", e.message);
    }
  }
}

fetchCount();
