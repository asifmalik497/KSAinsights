import axios from 'axios';

async function testExtraction() {
  const url = "https://www.argaam.com/en/latest-news";
  console.log(`Testing extraction for: ${url}`);
  try {
    const res = await axios.get(`http://localhost:3000/api/analyze?url=${encodeURIComponent(url)}&fresh=true`);
    console.log("Extraction successful!");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    if (e.response) {
      console.error(`Status: ${e.response.status}`);
      console.error(`Data:`, e.response.data);
    } else {
      console.error(`Error: ${e.message}`);
    }
  }
}

testExtraction();
