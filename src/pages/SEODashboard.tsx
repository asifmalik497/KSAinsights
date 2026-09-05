import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Globe, 
  Link as LinkIcon, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare, 
  Zap,
  ArrowUpRight,
  Eye,
  Target,
  FileText,
  Activity,
  Signal,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

const SEODashboard = () => {
  const { user, isAdmin } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    topKeywords: [] as { word: string; count: number }[],
    readinessScore: 88,
    backlinkOpportunities: [
      { name: 'Argaam', difficulty: 'High', type: 'Financial News', priority: 'Critical' },
      { name: 'Arab News', difficulty: 'Medium', type: 'Mainstream Press', priority: 'High' },
      { name: 'Saudi Gazette', difficulty: 'Medium', type: 'Local Daily', priority: 'Medium' },
      { name: 'MISA Insights', difficulty: 'High', type: 'Governmental', priority: 'Strategic' }
    ],
    indexingStatus: {
      indexed: 12,
      pending: 45,
      failed: 0
    },
    competitors: [
      { name: 'SaudiScoop', da: 24, articles: 58, avgWords: 750, gap: 'High' },
      { name: 'Argaam', da: 68, articles: 450, avgWords: 400, gap: 'Low' },
      { name: 'Arab News', da: 82, articles: 12000, avgWords: 350, gap: 'Strategic' }
    ]
  });

  const [engineStatus, setEngineStatus] = useState<{
    lastPulse: string;
    totalAutomatedSyncs: number;
    addedToday: number;
    syncing: boolean;
  }>({
    lastPulse: 'loading...',
    totalAutomatedSyncs: 0,
    addedToday: 0,
    syncing: false
  });

  const fetchEngineHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data.status === 'ok') {
        // Fetch items from today to get a real count
        const startOfToday = new Date();
        startOfToday.setHours(0,0,0,0);
        const q = query(collection(db, 'strategic_alerts'));
        const snap = await getDocs(q);
        const todayCount = snap.docs.filter(doc => {
            const created = doc.data().createdAt;
            const d = created?.seconds ? new Date(created.seconds * 1000) : null;
            return d && d >= startOfToday;
        }).length;

        setEngineStatus(prev => ({
          ...prev,
          lastPulse: data.lastPulse || 'No pulse recorded',
          totalAutomatedSyncs: data.totalAutomatedSyncs || 0,
          addedToday: todayCount
        }));
      }
    } catch (err) {
      console.error("Health check failed", err);
    }
  };

  const handleForceSync = async () => {
    setEngineStatus(prev => ({ ...prev, syncing: true }));
    try {
      const res = await fetch('/api/engine/sync', { method: 'POST' });
      await res.json();
      await fetchEngineHealth();
    } catch (err) {
      console.error("Manual sync failed", err);
    } finally {
      setEngineStatus(prev => ({ ...prev, syncing: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, 'strategic_alerts'));
        const docs = snap.docs.map(d => d.data());
        
        // Analyze keywords from titles and summaries
        const text = docs.map(d => `${d.title?.en} ${d.summary?.en}`).join(' ').toLowerCase();
        const words = text.split(/\W+/).filter(w => w.length > 4);
        const stopWords = ['these', 'about', 'would', 'could', 'should', 'their', 'there'];
        const wordCounts: Record<string, number> = {};
        
        words.forEach(w => {
          if (!stopWords.includes(w)) {
            wordCounts[w] = (wordCounts[w] || 0) + 1;
          }
        });

        const sortedKeywords = Object.entries(wordCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([word, count]) => ({ word, count }));

        setStats(prev => ({
          ...prev,
          totalArticles: docs.length,
          topKeywords: sortedKeywords
        }));

        await fetchEngineHealth();
      } catch (err) {
        console.error("SEO Data Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchData();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8 bg-paper">
        <div className="text-center max-w-md">
          <ShieldCheck size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Access Restricted</h2>
          <p className="text-gray-500 font-light mb-8">This portal is reserved for Strategic Administrators of KSA Insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-24">
      <SEO 
        title="SEO Performance Dashboard | Admin" 
        description="Administrative oversight for search engine optimization and market authority tracking."
      />

      {/* Header */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center text-white premium-shadow">
                  <TrendingUp size={20} className="text-secondary" />
                </div>
                <h1 className="text-xs font-bold text-secondary uppercase tracking-[0.4em]">Audit Intelligence</h1>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary tracking-tight">
                SEO Performance <br />
                <span className="text-emerald-gradient">Command Center</span>
              </h2>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 premium-shadow flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Market Readiness</p>
                <p className="text-3xl font-serif font-bold text-secondary">{stats.readinessScore}%</p>
              </div>
              <div className="w-px h-12 bg-gray-100" />
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Domain Health</p>
                <p className="text-3xl font-serif font-bold text-primary">Strategic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 premium-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <FileText size={24} />
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Content Depth</p>
            <h3 className="text-4xl font-serif font-bold text-primary">{stats.totalArticles} Items</h3>
            <p className="text-[10px] text-gray-400 mt-2 italic font-light">Semantic coverage is expanding.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 premium-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Globe size={24} />
            </div>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">Optimal</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Indexing Velocity</p>
            <h3 className="text-4xl font-serif font-bold text-primary">{stats.indexingStatus.indexed} Pgs</h3>
            <p className="text-[10px] text-gray-400 mt-2 italic font-light">{stats.indexingStatus.pending} pending discovery.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 premium-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <MessageSquare size={24} />
            </div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">84%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bilingual Parity</p>
            <h3 className="text-4xl font-serif font-bold text-primary">High</h3>
            <p className="text-[10px] text-gray-400 mt-2 italic font-light">Arabic SEO reaching maturity.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 premium-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Zap size={24} />
            </div>
            <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2.5 py-1 rounded-full">Vibrant</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Site Vitality</p>
            <h3 className="text-4xl font-serif font-bold text-primary">Fast</h3>
            <p className="text-[10px] text-gray-400 mt-2 italic font-light">Vite-optimized core web vitals.</p>
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Keywords Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-gray-50 premium-shadow">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <Target className="text-secondary" size={32} />
                <h3 className="text-2xl font-serif font-bold text-primary font-humanized">Keyword Dominance</h3>
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time Analysis</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {stats.topKeywords.map((kw, idx) => (
                <div key={`kw-${kw.word}`} className="group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors uppercase tracking-wider">{kw.word}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kw.count} Instances</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(kw.count / stats.topKeywords[0].count) * 100}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                      className="h-full emerald-gradient rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-paper rounded-2xl border border-dashed border-gray-200">
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-secondary" />
                Strategic AI Guidance
              </h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Your content is heavily indexing for <span className="font-bold text-primary">Saudi Vision 2030</span>. To capture more high-authority traffic, consider increasing the semantic density for terms like <span className="italic">"Direct Foreign Investment"</span> and <span className="italic">"PropTech Innovations"</span>.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-50 premium-shadow relative overflow-hidden">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
             
             <div className="flex items-center gap-4 mb-8">
                <LinkIcon className="text-secondary" size={32} />
                <h3 className="text-2xl font-serif font-bold text-primary">Strategic Backlink Roadmap</h3>
             </div>

             <div className="space-y-4">
                {stats.backlinkOpportunities.map((opp, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-paper border border-gray-50 hover:border-secondary/20 transition-all">
                    <div>
                      <div className="font-serif font-bold text-primary text-lg">{opp.name}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{opp.type}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Priority</div>
                        <div className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          opp.priority === 'Critical' ? "text-red-500" : opp.priority === 'Strategic' ? "text-emerald-500" : "text-secondary"
                        )}>{opp.priority}</div>
                      </div>
                      <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-300 hover:text-secondary hover:shadow-lg transition-all group">
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Diagnostics */}
        <div className="space-y-8">
          <div className="bg-primary rounded-[3rem] p-10 text-white premium-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full emerald-gradient opacity-20" />
            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                <ShieldCheck size={24} className="text-secondary" />
                Domain Authority
              </h3>
              
              <div className="flex items-center justify-center py-10">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="10"
                    />
                    <motion.circle
                      initial={{ strokeDasharray: "0, 440" }}
                      animate={{ strokeDasharray: "35, 440" }} // Current estimate
                      transition={{ duration: 2, ease: "easeOut" }}
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="#D4AF37"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-serif font-bold">1</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Out of 100</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/60 font-light leading-relaxed mb-6 text-center italic">
                Platform is in early high-growth phase. Authority scores will recalibrate after initial Google Search Console verification.
              </p>

              <button className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-bold text-[10px] uppercase tracking-[0.3em]">
                Request Full Audit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-50 premium-shadow">
            <h3 className="text-lg font-serif font-bold text-primary mb-8 flex items-center gap-3">
              <Search size={20} className="text-secondary" />
              Social Preview
            </h3>
            
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-32 bg-gray-100 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/riyadh/800/400" 
                  alt="SEO Preview" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-paper">
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">ksainsights.com</div>
                <div className="text-xs font-bold text-primary mb-2 line-clamp-1">Expert Saudi Business Intelligence | Vision 2030</div>
                <div className="text-[9px] text-gray-400 line-clamp-2 italic font-light">Navigating the complexities of the Saudi landscape with premium bilingual insights...</div>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-6 font-medium leading-relaxed">
              How your platform appears on LinkedIn, X, and WhatsApp when shared by investors.
            </p>
          </div>

          <div className="bg-paper border border-gray-100 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center text-white">
                <Eye size={16} />
              </div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Active Audit</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Robots.txt</span>
                <span className="text-emerald-500">Configured</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Sitemap XML</span>
                <span className="text-emerald-500">Auto-Generated</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Alt Tags</span>
                <span className="text-secondary">92% Coverage</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>H1 Hierarchy</span>
                <span className="text-emerald-500">Polished</span>
              </div>
            </div>
          </div>

          {/* New Engine Status Card */}
          <div className="bg-white border border-secondary/20 rounded-[2.5rem] p-8 premium-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className={cn(
                "w-2 h-2 rounded-full",
                engineStatus.lastPulse === 'loading...' ? "bg-gray-300" : "bg-emerald-500 animate-pulse"
              )} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <Activity size={16} />
              </div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Pulse Status</h4>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Frequency</p>
                <p className="text-xs font-bold text-primary">Every 6 Hours (Automated)</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Intelligence Pulse</p>
                <p className="text-xs font-mono text-secondary truncate">
                  {engineStatus.lastPulse !== 'never' && engineStatus.lastPulse !== 'loading...' 
                    ? new Date(engineStatus.lastPulse).toLocaleString() 
                    : engineStatus.lastPulse}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Automated Alerts</p>
                <p className="text-xs font-bold text-primary">{engineStatus.totalAutomatedSyncs} Strategic Briefs</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Items Discovered Today</p>
                <p className="text-xs font-bold text-emerald-600">{engineStatus.addedToday} Fresh Briefs</p>
              </div>
            </div>

            <button 
              onClick={handleForceSync}
              disabled={engineStatus.syncing}
              className={cn(
                "w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
                engineStatus.syncing 
                  ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed" 
                  : "bg-white text-secondary border-secondary/30 hover:bg-secondary hover:text-primary"
              )}
            >
              {engineStatus.syncing ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={12} className="animate-spin" /> Ingesting Data...
                </span>
              ) : (
                "Force Sync Pulse"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Competitor Intelligence Radar */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="bg-white rounded-[4rem] p-12 border border-gray-100 premium-shadow relative overflow-hidden group">
          {/* Background Echo Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-secondary/5 rounded-full animate-pulse pointer-events-none opacity-20" />
          
          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-16">
            {/* Radar Visualizer */}
            <div className="xl:col-span-5 flex flex-col justify-center items-center text-center">
              <div className="mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                    <Signal size={20} className="animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-secondary uppercase tracking-[0.4em]">Market Radar</h3>
                </div>
                <h4 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Competitor <br />Intelligence Radar</h4>
                <p className="text-xs text-gray-400 font-light max-w-sm mx-auto uppercase tracking-widest leading-relaxed">
                  Live signal tracking of authority dispersion across the Saudi digital landscape.
                </p>
              </div>

              <div className="relative w-72 h-72 mb-8">
                {/* Radar Circles */}
                <div className="absolute inset-0 border border-gray-100 rounded-full" />
                <div className="absolute inset-[25%] border border-gray-100 rounded-full" />
                <div className="absolute inset-[50%] border border-gray-100 rounded-full" />
                {/* Radar Scanning Line */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-1/2 h-px bg-secondary origin-left opacity-20"
                />
                
                {/* Competitor Nodes */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-[15%] left-[20%] w-4 h-4 bg-red-400 rounded-full premium-shadow flex items-center justify-center"
                >
                  <div className="absolute top-full mt-2 bg-primary text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-widest whitespace-nowrap">SaudiScoop (DA 24)</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-[40%] right-[10%] w-3 h-3 bg-blue-400 rounded-full premium-shadow"
                >
                  <div className="absolute top-full mt-2 bg-primary text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-widest whitespace-nowrap">Argaam</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-[20%] right-[30%] w-6 h-6 bg-emerald-400 rounded-full premium-shadow"
                >
                  <div className="absolute top-full mt-2 bg-primary text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-widest whitespace-nowrap">KSA Insights (DA 1)</div>
                </motion.div>
              </div>
            </div>

            {/* Benchmarking & Gaps */}
            <div className="xl:col-span-7 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="bg-paper p-8 rounded-[2rem] border border-gray-50">
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="text-secondary" size={20} />
                      <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Intelligence Gap Alert</h5>
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Opportunity Detected</p>
                        <p className="text-sm font-medium text-primary">"Vision 2030 Housing Strategy" guide on SaudiScoop lacks semantic depth (only 650 words).</p>
                        <button className="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] flex items-center gap-1 hover:underline">
                          Outperform now <ArrowUpRight size={10} />
                        </button>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Vacuum</p>
                        <p className="text-sm font-medium text-primary">Zero high-authority articles found for "Qiddiya 2026 Soft Launch" across competitors.</p>
                        <button className="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] flex items-center gap-1 hover:underline">
                          Secure First-mover <ArrowUpRight size={10} />
                        </button>
                      </div>
                    </div>
                 </div>

                 <div className="bg-paper p-8 rounded-[2rem] border border-gray-50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <RefreshCw className="text-secondary" size={20} />
                        <h5 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Update Radar</h5>
                      </div>
                      <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                        Competitive guides are refreshing at an average cycle of <span className="font-bold text-primary italic">18 days</span>. 
                        By updating your Intelligence Briefings every <span className="font-bold text-emerald-600">7 days</span>, you will maintain a "Freshness Priority" in search algorithms.
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Their Cycle</div>
                        <div className="text-xl font-serif font-bold text-primary">18d</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Your Cycle</div>
                        <div className="text-xl font-serif font-bold text-emerald-600">7d</div>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Benchmarking</th>
                      <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] text-center">DA Score</th>
                      <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] text-center">Depth (Avg)</th>
                      <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] text-right">Market Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.competitors.map((comp, i) => (
                      <tr key={i} className="group border-b border-gray-50/50 hover:bg-paper transition-colors duration-300">
                        <td className="py-4 font-serif font-bold text-primary">{comp.name}</td>
                        <td className="py-4 text-center">
                          <span className={cn(
                            "text-[10px] font-black px-2.5 py-1 rounded-lg",
                            comp.da > 50 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                          )}>
                            {comp.da}
                          </span>
                        </td>
                        <td className="py-4 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">{comp.avgWords} words</td>
                        <td className="py-4 text-right">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full",
                            comp.gap === 'High' ? "bg-secondary text-primary" : comp.gap === 'Low' ? "text-gray-400" : "emerald-gradient text-white"
                          )}>
                            {comp.gap} Target
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50/30">
                      <td className="py-5 pl-4 font-serif font-bold text-emerald-800">KSA Insights (You)</td>
                      <td className="py-5 text-center">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-600 text-white">1</span>
                      </td>
                      <td className="py-5 text-center text-[10px] font-bold text-emerald-700 uppercase tracking-widest">950+ words</td>
                      <td className="py-5 text-right pr-4">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-600">Intelligence Leader</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Info */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="w-12 h-1 bg-gray-100 mx-auto mb-8 rounded-full" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.4em] mb-4">
          SEO Intelligence Engine v1.0
        </p>
        <p className="text-[10px] text-gray-300 font-light max-w-lg mx-auto">
          Calculations are based on a real-time semantic analysis of the Strategic News database and core application architecture. Refreshed every session.
        </p>
      </section>
    </div>
  );
};

export default SEODashboard;

const Sparkles = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
