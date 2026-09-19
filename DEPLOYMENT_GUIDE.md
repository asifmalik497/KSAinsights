# 🚀 KSA Insights: Google Cloud Run Production Deployment Guide

This guide details how to take your **KSA Insights** codebase downloaded from AI Studio and deploy it as a high-performance containerized application on **Google Cloud Run**.

---

## 🏗 Architecture Overview on Cloud Run

- **Container Runtime**: Multi-stage Docker build with Node.js 20 Alpine.
- **Port Handling**: Cloud Run passes `PORT=8080` (automatically read by `Number(process.env.PORT) || 3000`).
- **Proxy & SSL**: Cloud Run terminates SSL/TLS at Google's edge. Express is configured with `app.set("trust proxy", true)` to ensure correct `https` scheme, client IP tracking, and dynamic canonical URL generation.
- **SEO & Sitemaps**: Dynamic XML sitemaps with multilingual `hreflang` tags (`/sitemap.xml`) and crawler rules (`/robots.txt`) adapt seamlessly to your custom domain or Cloud Run service URL.
- **Server-Side Metadata**: Real-time OpenGraph and Twitter card injection runs at request time in Express for social share cards (WhatsApp, Twitter, LinkedIn).

---

## 📋 Step 1: Prerequisites

1. **Google Cloud Project**:
   - A GCP Project with billing enabled.
   - APIs to enable:
     - Cloud Run API (`run.googleapis.com`)
     - Cloud Build API (`cloudbuild.googleapis.com`)
     - Artifact Registry API (`artifactregistry.googleapis.com`)
2. **Google Cloud SDK (`gcloud`)** installed on your machine (or use Google Cloud Shell directly in your browser).
3. **Environment Secrets**:
   - `GEMINI_API_KEY`: Your Gemini API key from AI Studio / Google Cloud Vertex.
   - `CANONICAL_DOMAIN` (Optional): Set to `https://ksainsights.com` once your custom domain is connected.

---

## 🛠 Step 2: Deploying via `gcloud` CLI (Fastest Method)

1. Open your terminal inside the downloaded project root folder:
   ```bash
   cd path/to/the-saudi-insight
   ```

2. Initialize and authenticate with your Google Cloud account:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_GCP_PROJECT_ID
   ```

3. Deploy directly to Cloud Run from source (Cloud Build will automatically read the included `Dockerfile`):
   ```bash
   gcloud run deploy ksa-insights \
     --source . \
     --region me-central1 \
     --platform managed \
     --allow-unauthenticated \
     --set-env-vars="NODE_ENV=production,GEMINI_API_KEY=YOUR_GEMINI_API_KEY"
   ```
   *(Tip: Choose `me-central1` for Dammam/Saudi Arabia or `me-west1` for minimal latency in the Gulf region).*

4. Within 2–3 minutes, Cloud Run will output your live URL:
   ```
   Service URL: https://ksa-insights-xxxxxxxxxx-xx.a.run.app
   ```

---

## 🖥 Step 3: Deploying via Google Cloud Console (Browser UI)

If you prefer using the web interface:

1. Go to [Google Cloud Run Console](https://console.cloud.google.com/run).
2. Click **Create Service**.
3. Choose **Continuously deploy from a repository** (via GitHub) or **Deploy one revision from an existing container image / source**.
4. In **Container, Networking, Security**:
   - **Port**: Set to `8080`.
   - **Variables**: Add:
     - `NODE_ENV` = `production`
     - `GEMINI_API_KEY` = `your_key_here`
     - `CANONICAL_DOMAIN` = `https://ksainsights.com`
5. In **Authentication**, select **Allow unauthenticated invocations** (so public visitors can access the website).
6. Click **Create**.

---

## 🌐 Step 4: Map Custom Domain (`ksainsights.com`) on Cloud Run

Google Cloud Run provisions and auto-renews free Google-managed SSL certificates for your domain:

1. In the Cloud Run dashboard, click **Manage Custom Domains** (top action bar).
2. Click **Add Mapping**:
   - Select your service: `ksa-insights`
   - Select or add your verified domain: `ksainsights.com` and `www.ksainsights.com`
3. Google Cloud will provide the DNS records:
   - For `ksainsights.com`: Add the provided **A** and **AAAA** records in your domain registrar (GoDaddy, Namecheap, or Cloudflare).
   - For `www.ksainsights.com`: Add the provided **CNAME** record pointing to `ghs.googlehosted.com`.
4. Wait 15–60 minutes for DNS propagation and certificate issuance.

---

## 🔍 Step 5: Verification & Search Engine Submission

Once deployed on Cloud Run:

1. **Verify Sitemaps & Robots**:
   - Visit `https://ksainsights.com/sitemap.xml` (or your `.run.app` URL). Confirm all pages, dates, and multilingual `xhtml:link` tags render cleanly.
   - Visit `https://ksainsights.com/robots.txt`. Confirm crawler allowances and the sitemap directive.
2. **Submit to Search Engines**:
   - Open **Google Search Console** (`https://search.google.com/search-console`).
   - Add property: `https://ksainsights.com`.
   - Go to **Sitemaps** > Enter `sitemap.xml` > Click **Submit**.
   - Open **Bing Webmaster Tools** (`https://www.bing.com/webmasters`) and import or submit `sitemap.xml`.
3. **Verify Social Cards**:
   - Test a blog post URL in the [Twitter Card Validator](https://cards-dev.twitter.com/validator) or [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
   - Express SSR metadata injection will serve high-resolution imagery and localized titles to crawler bots.
