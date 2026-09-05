import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Zap, Users, ChevronRight, Calendar, User, Sparkles, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDevice } from '../contexts/DeviceContext';
import { blogPosts as staticPosts } from '../data/posts';
import { getLanguage, cn, formatAlertDateTime } from '../lib/utils';
import SEO from '../components/SEO';
import { collection, query, orderBy, limit, getDocs, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { FALLBACK_ALERTS } from '../data/fallbackAlerts';
import { BlogPost } from '../types';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isMobile, isDesktop } = useDevice();
  const currentLang = getLanguage(i18n.language);
  const [strategicAlerts, setStrategicAlerts] = useState<any[]>([]);
  const [dynamicPosts, setDynamicPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: data.id || doc.id,
        };
      }) as BlogPost[];
      setDynamicPosts(posts);
    }, (err) => {
      console.warn('Could not fetch dynamic blog posts:', err);
    });
    return () => unsubscribe();
  }, []);

  const allPosts = [...dynamicPosts, ...staticPosts.filter(sp => !dynamicPosts.some(dp => dp.id === sp.id))];

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const q = query(collection(db, 'strategic_alerts'), orderBy('createdAt', 'desc'), limit(15));
        const snapshot = await getDocs(q);
        const dbAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge fallback alerts if not already present
        const mergedAlerts: any[] = [...dbAlerts];
        for (const fallback of FALLBACK_ALERTS) {
          const isDuplicate = mergedAlerts.some((item: any) => 
            (item.title?.en || "").toLowerCase().trim() === (fallback.title?.en || "").toLowerCase().trim()
          );
          if (!isDuplicate) {
            mergedAlerts.push(fallback);
          }
        }

        // Robust time parser for safe sorting
        const getAlertTime = (alert: any) => {
          if (alert.createdAt instanceof Timestamp) {
            return alert.createdAt.toMillis();
          }
          if (alert.createdAt?.seconds) {
            return alert.createdAt.seconds * 1000;
          }
          if (alert.createdAt) {
            const t = new Date(alert.createdAt).getTime();
            if (!isNaN(t)) return t;
          }
          if (alert.date) {
            const t = new Date(alert.date).getTime();
            if (!isNaN(t)) return t;
          }
          return Date.now();
        };

        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        const freshAlerts = mergedAlerts.filter((alert: any) => {
          const alertTime = getAlertTime(alert);
          const age = now - alertTime;
          const titleText = (typeof alert.title === 'string' ? alert.title : alert.title?.en || "").toLowerCase();
          const summaryText = (typeof alert.summary === 'string' ? alert.summary : alert.summary?.en || "").toLowerCase();
          
          // Exclude obsolete grace period alerts or alerts older than 30 days
          if (titleText.includes("grace period") || summaryText.includes("grace period")) return false;
          if (age > THIRTY_DAYS_MS) return false;
          return true;
        });

        const sorted = freshAlerts.sort((a, b) => {
          return getAlertTime(b) - getAlertTime(a);
        });

        // Limit to 3 items for the homepage layout
        setStrategicAlerts(sorted.slice(0, 3));
      } catch (err: any) {
        console.error("Home: Failed to fetch alerts", err);
        if (err.message?.includes('permission')) {
          try {
             handleFirestoreError(err, OperationType.LIST, 'strategic_alerts');
          } catch (handlerErr) {
             // catch to prevent re-throw
          }
        }
      }
    };
    fetchAlerts();
  }, []);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${window.location.origin}/#website`,
        "name": "KSA Insights",
        "url": window.location.origin,
        "publisher": { "@id": `${window.location.origin}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${window.location.origin}/blog?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${window.location.origin}/#organization`,
        "name": "KSA Insights",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": "https://picsum.photos/seed/riyadh/200/200"
        },
        "description": "A premium, bilingual blog platform providing expert insights into the Saudi business landscape, investment opportunities, and Vision 2030 updates.",
        "sameAs": [
          "https://twitter.com/ksainsights",
          "https://linkedin.com/company/ksainsights"
        ],
        "knowsAbout": ["Vision 2030", "Saudi Business", "Investment in KSA", "Expatriate Life in Saudi Arabia"]
      }
    ]
  };

  const features = [
    {
      icon: <TrendingUp className="text-secondary" size={32} />,
      title: t('features.market.title'),
      desc: t('features.market.desc'),
      path: '/blog?category=Business'
    },
    {
      icon: <ShieldCheck className="text-secondary" size={32} />,
      title: t('features.legal.title'),
      desc: t('features.legal.desc'),
      path: '/blog?category=Vision 2030'
    },
    {
      icon: <Zap className="text-secondary" size={32} />,
      title: t('features.vision.title'),
      desc: t('features.vision.desc'),
      path: '/blog?category=Vision 2030'
    },
    {
      icon: <Users className="text-secondary" size={32} />,
      title: t('features.expert.title'),
      desc: t('features.expert.desc'),
      path: '/contact'
    }
  ];

  const featuredPosts = allPosts.slice(0, 3);
  const trendingPosts = allPosts.slice(3, 6);

  return (
    <div className="overflow-hidden">
      <SEO jsonLd={websiteJsonLd} />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 emerald-gradient opacity-95" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 transform translate-x-20" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
        
        <div className={cn(
          "max-w-7xl mx-auto px-4 relative z-10 grid items-center py-20",
          isDesktop ? "grid-cols-2 gap-20" : "grid-cols-1 gap-12"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(isMobile && "text-center")}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-2 glass text-secondary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border-secondary/20"
            >
              Expert Business Intelligence
            </motion.span>
            <h1 className={cn(
              "font-serif font-bold text-white leading-[1.05] mb-8",
              isDesktop ? "text-8xl" : "text-5xl"
            )}>
              {t('hero.title').split(' ').map((word, i) => (
                <span key={`hero-word-${word}-${i}`} className={cn(i === 2 && "text-gold-gradient block md:inline")}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className={cn(
              "text-xl text-white/70 mb-12 leading-relaxed font-light",
              isDesktop ? "max-w-lg" : "mx-auto max-w-md"
            )}>
              {t('hero.subtitle')}
            </p>
            <div className={cn("flex flex-wrap gap-6", isMobile && "justify-center")}>
              <Link 
                to="/blog" 
                className="gold-gradient text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-3 group premium-shadow"
              >
                {t('hero.cta')}
                <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" size={22} />
              </Link>
              <Link 
                to="/about" 
                className="glass text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border-white/10"
              >
                {t('nav.about')}
              </Link>
            </div>
          </motion.div>

          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden premium-shadow border-[12px] border-white/5 p-2">
                <div className="rounded-[2.5rem] overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/riyadh-luxury/1200/1600" 
                    alt="Riyadh Luxury" 
                    className="w-full h-auto scale-110 hover:scale-100 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              {/* Floating stats card */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl premium-shadow z-20 min-w-[240px] border-secondary/20"
              >
                <div className="text-secondary font-serif font-bold text-5xl mb-2">2030</div>
                <div className="text-primary text-xs font-bold uppercase tracking-widest opacity-60">Vision Alignment</div>
                <div className="mt-4 flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-secondary" />)}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Dynamic Breaking Intelligence */}
      {strategicAlerts.length > 0 && (
        <section className="bg-paper py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary italic">Breaking Strategic Intelligence</h2>
              <div className="h-px bg-gray-100 flex-grow hidden md:block" />
              <Link to="/news" className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">View All Alerts</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {strategicAlerts.map((alert, idx) => {
                const dateTime = formatAlertDateTime(alert.createdAt, alert.date);
                return (
                  <motion.div
                    key={`strategic-alert-${alert.id || idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-[2rem] border border-gray-100 premium-shadow group hover:border-secondary transition-all flex flex-col h-full cursor-pointer"
                    onClick={() => window.location.href = '/news'}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest relative",
                        alert.impact === 'High' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-emerald-50 text-emerald-500 border border-emerald-100'
                      )}>
                        {alert.impact} Impact
                        {(alert.createdAt && (Date.now() - (alert.createdAt?.seconds ? alert.createdAt.seconds * 1000 : Date.now()) < 24 * 60 * 60 * 1000)) && (
                          <span className="absolute -top-1.5 -right-1.5 bg-secondary text-primary text-[6px] px-1 py-0.5 rounded-full border border-white animate-pulse">NEW</span>
                        )}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} className="text-secondary" />
                        {dateTime.dateStr}
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-1.5 text-[10px] font-medium text-gray-400 bg-paper px-2.5 py-1 rounded-lg border border-gray-100 w-fit">
                      <Clock size={11} className="text-secondary shrink-0" />
                      <span>Updated: <strong className="text-primary font-bold">{dateTime.fullStr}</strong></span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                      {alert.title[currentLang] || alert.title.en}
                    </h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {alert.summary[currentLang] || alert.summary.en}
                    </p>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest group-hover:text-secondary transition-colors">
                        Analyze Insight
                      </span>
                      <ArrowRight size={14} className="text-secondary group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-emerald-gradient mb-8">
                {t('home.whyChoose')}
              </h2>
              <div className="w-24 h-1.5 gold-gradient mx-auto mb-8 rounded-full" />
              <p className="text-gray-500 text-xl font-light leading-relaxed">
                {t('home.whyChooseDesc')}
              </p>
            </motion.div>
          </div>

          <div className={cn(
            "grid gap-8 md:gap-12",
            isDesktop ? "grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
          )}>
            {features.map((feature, idx) => (
              <Link
                key={`feature-${idx}`}
                to={feature.path}
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[2.5rem] bg-paper border border-gray-100 group-hover:border-secondary/20 group-hover:bg-white group-hover:premium-shadow transition-all duration-500 h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors" />
                  
                  <div className="mb-8 flex justify-between items-start relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                      {feature.icon}
                    </div>
                    {feature.path.includes('Business') && (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{feature.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 border-[40px] border-primary rounded-full" />
          <div className="absolute bottom-20 right-20 w-64 h-64 border-[20px] border-secondary rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-emerald-gradient mb-6">
                {t('home.latestReports')}
              </h2>
              <p className="text-gray-500 text-xl font-light">
                {t('home.latestReportsDesc')}
              </p>
            </div>
            <Link to="/blog" className="group flex items-center gap-3 bg-white px-8 py-4 rounded-full font-bold text-primary hover:bg-primary hover:text-white transition-all premium-shadow">
              {t('home.viewAllReports')} 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </div>

          <div className={cn(
            "grid gap-8 md:gap-12",
            isDesktop ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
          )}>
            {featuredPosts.map((post, idx) => (
              <motion.article
                key={`featured-${post.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={post.images?.[0] || 'https://picsum.photos/seed/ksa-blog/1200/800'} 
                    alt={post.title?.[currentLang] || post.title?.en || post.title?.ar || post.title?.ur || ''} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 gold-gradient text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] mb-6 font-bold uppercase tracking-[0.2em]">
                    <Calendar size={14} className="text-secondary" />
                    {post.date}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-6 leading-tight group-hover:text-secondary transition-colors line-clamp-2 font-serif">
                    {post.title?.[currentLang] || post.title?.en || post.title?.ar || post.title?.ur || ''}
                  </h3>
                  <div className="mt-auto pt-8 border-t border-gray-50 flex justify-between items-center">
                    <div className="text-primary font-bold text-sm flex items-center gap-2 group/link">
                      <span className="relative">
                        {t('blog.readMore')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover/link:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight size={18} className="text-secondary group-hover/link:translate-x-1 transition-transform rtl:rotate-180" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <User size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{post.author?.split(' ')[0] || ''}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className={cn(
            "grid gap-12 md:gap-20",
            isDesktop ? "grid-cols-3" : "grid-cols-1"
          )}>
            <div className={cn(isDesktop && "lg:col-span-2")}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-serif font-bold text-emerald-gradient flex items-center gap-4">
                  <span className="w-3 h-10 emerald-gradient rounded-full" />
                  {t('home.trendingNow')}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {trendingPosts.map((post, idx) => (
                  <Link 
                    key={`trending-${post.id}`} 
                    to={`/blog/${post.id}`} 
                    className="flex gap-8 group items-center p-8 rounded-3xl hover:bg-paper border border-transparent hover:border-gray-100 transition-all duration-300"
                  >
                    <div className="text-6xl font-serif font-bold text-gray-100 group-hover:text-secondary/20 transition-colors tabular-nums">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">{post.category}</div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight font-serif">
                        {post.title?.[currentLang] || post.title?.en || post.title?.ar || post.title?.ur || ''}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-secondary group-hover:text-secondary transition-all">
                      <ArrowRight size={20} className="rtl:rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-paper rounded-[3rem] p-10 border border-gray-100 premium-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <h2 className="text-2xl font-serif font-bold text-emerald-gradient mb-8 flex items-center gap-3">
                <TrendingUp size={24} className="text-secondary" />
                {t('home.tadawulWatch')}
              </h2>
              <div className="space-y-2">
                {[
                  { name: 'TASI', value: '12,450.20', change: '+1.2%', up: true },
                  { name: 'Aramco', value: '31.45', change: '+0.5%', up: true },
                  { name: 'STC', value: '38.90', change: '-0.2%', up: false },
                  { name: 'Al Rajhi', value: '84.20', change: '+2.1%', up: true },
                ].map((stock, i) => (
                  <motion.div 
                    key={`stock-${i}`} 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center p-4 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-50"
                  >
                    <span className="font-bold text-primary">{stock.name}</span>
                    <div className="text-right">
                      <div className="text-lg font-serif font-bold text-primary">{stock.value}</div>
                      <div className={`text-xs font-bold flex items-center justify-end gap-1 ${stock.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stock.up ? '▲' : '▼'} {stock.change}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-10 py-5 emerald-gradient text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-900/20 transition-all premium-shadow">
                {t('home.viewFullMarket')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 emerald-gradient" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="glass border-white/10 rounded-[4rem] p-12 md:p-24 text-center premium-shadow">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                {t('home.newsletterTitle')}
              </h2>
              <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                {t('home.newsletterDesc')}
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={t('home.emailPlaceholder')}
                  className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-all backdrop-blur-sm"
                  required
                />
                <button className="gold-gradient text-primary px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow whitespace-nowrap">
                  {t('home.subscribeBtn')}
                </button>
              </form>
              <div className="mt-10 flex items-center justify-center gap-6 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="flex items-center gap-2"><Zap size={14} /> Instant</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="flex items-center gap-2"><Users size={14} /> 10k+ Subscribers</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
