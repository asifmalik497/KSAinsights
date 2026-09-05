import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { DeviceProvider } from './contexts/DeviceContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Services from './pages/Services';
import ExpatHub from './pages/ExpatHub';
import About from './pages/About';
import Contact from './pages/Contact';
import Consultancy from './pages/Consultancy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContentLab from './pages/ContentLab';
import News from './pages/News';
import Guides from './pages/Guides';
import SEODashboard from './pages/SEODashboard';

function App() {
  return (
    <FirebaseProvider>
      <DeviceProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/news" element={<News />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/services" element={<Services />} />
              <Route path="/expat-hub" element={<ExpatHub />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/consultancy" element={<Consultancy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/content-lab" element={<ContentLab />} />
              <Route path="/admin/seo" element={<SEODashboard />} />
            </Routes>
          </Layout>
        </Router>
      </DeviceProvider>
    </FirebaseProvider>
  );
}

export default App;
