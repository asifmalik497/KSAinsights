import axios from 'axios';

async function verifyUrls() {
  const targets = [
    "https://www.zawya.com/en/mena/saudi-arabia"
  ];

  for (const url of targets) {
    try {
      const res = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Referer': 'https://www.google.com/'
        },
        timeout: 10000
      });
      console.log(`[OK] ${url} (Status: ${res.status})`);
    } catch (e) {
      console.log(`[FAIL] ${url} (Error: ${e.response ? e.response.status : e.message})`);
    }
  }
}

verifyUrls();
