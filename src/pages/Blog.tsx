import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowRight, X, ChevronLeft, ChevronRight, Mic, MicOff, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { blogPosts as staticPosts } from '../data/posts';
import { useDevice } from '../contexts/DeviceContext';
import { BlogPost } from '../types';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { getLanguage, cn, findPostById } from '../lib/utils';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isMobile, isDesktop } = useDevice();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [dynamicPosts, setDynamicPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const allPosts = [...dynamicPosts, ...staticPosts.filter(sp => !dynamicPosts.some(dp => dp.id === sp.id))];

  // Handle post selection from URL or state
  useEffect(() => {
    if (id && allPosts.length > 0) {
      const post = findPostById(allPosts, id);
      if (post) {
        setSelectedPost(post);
      }
    } else if (!id) {
      setSelectedPost(null);
    }
  }, [id, allPosts]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    navigate(`/blog/${post.id}`);
  };

  const handleClosePost = () => {
    navigate('/blog');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPost) {
        handleClosePost();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const currentLang = getLanguage(i18n.language);
  const isRTL = currentLang === 'ar' || currentLang === 'ur';

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

      // Sort descending by createdAt or date
      posts.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis?.() || (a.date ? new Date(a.date).getTime() : 0);
        const timeB = b.createdAt?.toMillis?.() || (b.date ? new Date(b.date).getTime() : 0);
        return timeB - timeA;
      });

      setDynamicPosts(posts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching dynamic posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // JSON-LD for Blog Listing
  const blogListingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": t('blog.title'),
    "description": t('blog.subtitle'),
    "publisher": {
      "@type": "Organization",
      "name": "KSA Insights",
      "logo": {
        "@type": "ImageObject",
        "url": "https://picsum.photos/seed/riyadh/200/200"
      }
    }
  };

  // JSON-LD for Selected Post
  const getPostJsonLd = (post: BlogPost) => {
    const titleText = post.title?.[currentLang] || post.title?.en || post.title?.ar || post.title?.ur || (typeof post.title === 'string' ? post.title : '');
    const excerptText = post.excerpt?.[currentLang] || post.excerpt?.en || post.excerpt?.ar || post.excerpt?.ur || (typeof post.excerpt === 'string' ? post.excerpt : '');
    const contentText = post.content?.[currentLang] || post.content?.en || post.content?.ar || post.content?.ur || (typeof post.content === 'string' ? post.content : '');

    return [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": titleText,
        "image": post.images || [],
        "datePublished": post.date,
        "dateModified": post.date, // Assuming same for now
        "author": {
          "@type": "Person",
          "name": post.author || "Strategic Analyst",
          "jobTitle": "Strategic Analyst",
          "description": "Expert analyst specializing in Saudi Vision 2030, economic transformation, and regional residency regulations.",
          "url": window.location.origin + "/about"
        },
        "publisher": {
          "@type": "Organization",
          "name": "KSA Insights",
          "logo": {
            "@type": "ImageObject",
            "url": "https://picsum.photos/seed/riyadh/200/200"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.origin + "/blog/" + post.id
        },
        "description": excerptText,
        "articleBody": contentText
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin + "/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": window.location.origin + "/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": titleText,
            "item": window.location.origin + "/blog/" + post.id
          }
        ]
      }
    ];
  };
  
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser does not support voice search. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = i18n.language === 'ar' ? 'ar-SA' : i18n.language === 'ur' ? 'ur-PK' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };
  
  const categoryParam = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const categories = ['All', 'Geopolitics & Security', 'Legal & Residency', 'Vision 2030', 'Market Insights', 'Fintech', 'Tourism', 'Business', 'Environment', 'Sports', 'Society', 'Logistics', 'Lifestyle'];

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredPosts = allPosts.filter(post => {
    const titleEn = (post.title?.en || '').toLowerCase();
    const titleAr = (post.title?.ar || '').toLowerCase();
    const titleUr = (post.title?.ur || '').toLowerCase();
    const excerptEn = (post.excerpt?.en || '').toLowerCase();
    const excerptAr = (post.excerpt?.ar || '').toLowerCase();
    const excerptUr = (post.excerpt?.ur || '').toLowerCase();
    const catText = (post.category || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch = !q || 
      titleEn.includes(q) || titleAr.includes(q) || titleUr.includes(q) ||
      excerptEn.includes(q) || excerptAr.includes(q) || excerptUr.includes(q) ||
      catText.includes(q);

    const activeCatLower = activeCategory.trim().toLowerCase();
    const postCatLower = catText.trim();

    const matchesCategory = activeCategory === 'All' || 
      postCatLower === activeCatLower ||
      postCatLower.includes(activeCatLower) ||
      activeCatLower.includes(postCatLower) ||
      (activeCatLower.includes('geopolitic') && postCatLower.includes('geopolitic'));

    return matchesSearch && matchesCategory;
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      {selectedPost ? (
        <SEO 
          title={selectedPost.title?.[currentLang] || selectedPost.title?.en || selectedPost.title?.ar || selectedPost.title?.ur || ''} 
          description={selectedPost.excerpt?.[currentLang] || selectedPost.excerpt?.en || selectedPost.excerpt?.ar || selectedPost.excerpt?.ur || ''}
          ogImage={selectedPost.images?.[0] || 'https://picsum.photos/seed/ksa-blog/1200/630'}
          ogType="article"
          jsonLd={getPostJsonLd(selectedPost)}
        />
      ) : (
        <SEO 
          title={t('blog.title')} 
          description={t('blog.subtitle')}
          jsonLd={blogListingJsonLd}
        />
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-32 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
                {t('blog.title')}
              </h1>
              <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </motion.div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col items-center mb-24 gap-12">
          <div className="relative w-full md:w-[600px] group">
            <div className="absolute inset-0 emerald-gradient opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-full" />
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" size={24} />
              <input 
                type="text" 
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-gray-100 rounded-[2rem] py-5 pl-16 pr-16 focus:outline-none focus:border-secondary transition-all shadow-xl font-medium text-primary placeholder:text-gray-400"
              />
              <button
                onClick={startListening}
                className={cn(
                  "absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300",
                  isListening ? "text-secondary scale-125" : "text-gray-400 hover:text-secondary"
                )}
                title="Voice Search"
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Mic size={24} />
                  </motion.div>
                ) : (
                  <Mic size={24} />
                )}
              </button>
            </div>
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 emerald-gradient text-white px-6 py-2 rounded-full text-xs font-bold shadow-2xl whitespace-nowrap uppercase tracking-widest"
              >
                Listening...
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'emerald-gradient text-white shadow-xl shadow-emerald-900/20 scale-105' 
                    : 'bg-white text-primary border border-gray-100 hover:border-secondary/30 premium-shadow'
                }`}
              >
                {cat === 'All' ? t('blog.all') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="animate-spin text-secondary" size={64} />
            <p className="text-gray-400 font-serif italic text-xl">Loading the latest insights...</p>
          </div>
        ) : (
          <div className={cn(
            "grid gap-10 md:gap-16",
            isDesktop ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
          )}>
            {filteredPosts.map((post, idx) => (
            <motion.article
              key={`blog-post-${post.id}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-500"
              onClick={() => handlePostClick(post)}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={post.images?.[0] || 'https://picsum.photos/seed/ksa-blog/1200/800'} 
                  alt={post.title?.[currentLang] || post.title?.en || ''} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 gold-gradient text-primary px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-6 text-gray-400 text-[10px] mb-6 font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-secondary" /> {post.date}</span>
                  <span className="flex items-center gap-2"><User size={14} className="text-secondary" /> {post.author}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6 leading-tight group-hover:text-secondary transition-colors">
                  {post.title?.[currentLang] || post.title?.en || post.title?.ar || post.title?.ur || ''}
                </h2>
                <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed font-light">
                  {post.excerpt?.[currentLang] || post.excerpt?.en || post.excerpt?.ar || post.excerpt?.ur || ''}
                </p>
                <div className="mt-auto pt-8 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                    {t('blog.readMore')}
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform rtl:rotate-180" />
                  </span>
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {(post.images || []).slice(1, 4).map((img, i) => (
                      <div key={`preview-img-${i}`} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden premium-shadow">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

        {/* Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-xl"
              onClick={handleClosePost}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-[110]">
                <motion.div 
                  className="h-full gold-gradient shadow-[0_0_15px_#D4AF37]"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white w-full max-w-7xl max-h-[92vh] rounded-[3.5rem] overflow-hidden relative shadow-2xl flex flex-col border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={handleClosePost}
                  className="absolute top-8 right-8 z-[120] w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all premium-shadow border border-white/30"
                >
                  <X size={28} />
                </button>

                <div 
                  onScroll={handleScroll}
                  className="overflow-y-auto relative w-full"
                  dir="ltr"
                >
                  <div dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Floating Ornaments */}
                    <div className="absolute top-1/4 left-10 w-24 h-24 emerald-gradient opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-2/3 right-10 w-40 h-40 gold-gradient opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[45vh] md:h-[60vh] p-2">
                      <div className="md:col-span-2 h-full overflow-hidden rounded-3xl">
                        <img src={selectedPost.images?.[0] || 'https://picsum.photos/seed/ksa-blog/1200/800'} alt="Hero" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                      </div>
                      {(selectedPost.images || []).slice(1).map((img, i) => (
                        <div key={`gallery-img-${i}`} className="h-full overflow-hidden rounded-3xl hidden md:block">
                          <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                        </div>
                      ))}
                    </div>

                    <div className="px-6 py-20 md:px-32 max-w-6xl mx-auto">
                      <div className="flex flex-wrap items-center gap-8 text-secondary text-[11px] font-bold uppercase tracking-[0.4em] mb-16">
                        <span className="gold-gradient text-primary px-6 py-2 rounded-full shadow-lg ring-1 ring-white/20">{selectedPost.category}</span>
                        <div className="flex items-center gap-4 text-gray-400">
                          <Calendar size={14} className="text-secondary opacity-50" />
                          <span>{selectedPost.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                          <User size={14} className="text-secondary opacity-50" />
                          <span>{selectedPost.author}</span>
                        </div>
                      </div>

                      <h2 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-24 leading-[1.1] tracking-tight">
                        {selectedPost.title?.[currentLang] || selectedPost.title?.en || selectedPost.title?.ar || selectedPost.title?.ur || ''}
                      </h2>

                      <div className={cn(
                        "prose prose-xl max-w-none text-gray-600 leading-relaxed font-light dark:prose-invert",
                        "first-letter:text-8xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-6 first-letter:float-left first-letter:leading-[0.85] rtl:first-letter:float-right rtl:first-letter:ml-6 rtl:first-letter:mr-0 drop-cap"
                      )}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ node, ...props }) => (
                                <a 
                                  {...props} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-secondary hover:underline font-bold transition-all"
                                />
                              ),
                              table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-16 rounded-2xl border border-gray-100 shadow-2xl bg-white/50 backdrop-blur-sm p-4 ring-1 ring-black/5">
                                  <table {...props} className="min-w-full divide-y divide-gray-100" />
                                </div>
                              ),
                              thead: ({ node, ...props }) => (
                                <thead {...props} className="bg-gray-50/80" />
                              ),
                              th: ({ node, ...props }) => (
                                <th {...props} className="px-8 py-5 text-left rtl:text-right text-xs font-bold text-primary uppercase tracking-[0.25em]" />
                              ),
                              td: ({ node, ...props }) => (
                                <td {...props} className="px-8 py-5 text-sm text-gray-600 border-t border-gray-50 font-light" />
                              ),
                              tr: ({ node, ...props }) => (
                                <tr {...props} className="hover:bg-emerald-50/20 transition-colors" />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote {...props} className="relative p-12 my-16 bg-emerald-950/[0.02] border-l-0 rounded-3xl overflow-hidden before:content-['»'] before:absolute before:-top-4 before:left-4 before:text-[120px] before:text-secondary/10 before:font-serif italic text-2xl font-serif text-primary/80 leading-relaxed">
                                  {props.children}
                                </blockquote>
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 {...props} className="text-4xl md:text-5xl font-serif font-bold text-primary mt-24 mb-10 tracking-tight flex items-center gap-4">
                                  <span className="w-10 h-[2px] emerald-gradient rounded-full hidden md:block" />
                                  {props.children}
                                </h2>
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 {...props} className="text-2xl md:text-3xl font-serif font-bold text-primary/90 mt-16 mb-8 tracking-tight" />
                              ),
                              p: ({ node, children, ...props }) => {
                                const isImage = node?.children?.some((child: any) => child.tagName === 'img');
                                if (isImage) return <div className="mb-10">{children}</div>;
                                return <p {...props} className="mb-10 text-xl font-light leading-loose text-gray-600/90">{children}</p>;
                              },
                              hr: ({ node, ...props }) => (
                                <hr {...props} className="my-24 border-0 h-[1px] emerald-gradient opacity-20" />
                              ),
                              img: ({ node, ...props }) => (
                                <div className="my-16 group relative">
                                  <img 
                                    {...props} 
                                    className="rounded-3xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 mx-auto" 
                                    referrerPolicy="no-referrer"
                                  />
                                  {props.alt && (
                                    <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md text-white p-6 rounded-2xl text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase">
                                      {props.alt}
                                    </div>
                                  )}
                                </div>
                              ),
                            }}
                          >
                            {selectedPost.content?.[currentLang] || selectedPost.content?.en || selectedPost.content?.ar || selectedPost.content?.ur || (typeof selectedPost.content === 'string' ? selectedPost.content : '')}
                          </ReactMarkdown>
                        </motion.div>
                      </div>

                      <div className="mt-20 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl premium-shadow">
                            {selectedPost.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-serif font-bold text-2xl text-primary">{selectedPost.author}</div>
                            <div className="text-xs text-secondary font-bold uppercase tracking-widest">{t('blog.authorRole')}</div>
                          </div>
                        </div>
                        <button 
                          onClick={handleClosePost}
                          className="emerald-gradient text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 transition-all premium-shadow uppercase tracking-widest text-xs"
                        >
                          {t('blog.closeArticle')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blog;
