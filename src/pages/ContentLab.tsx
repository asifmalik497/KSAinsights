import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Sparkles, Loader2, Copy, Check, Languages, FileText, Globe, LogIn } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from '../contexts/FirebaseContext';
import { generateBlogPost, GeneratedPost } from '../services/geminiService';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

const ContentLab: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAdmin, login, loading: authLoading } = useFirebase();
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [result, setResult] = useState<GeneratedPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ar' | 'ur'>('en');

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    setPublished(false);
    try {
      const post = await generateBlogPost(topic);
      setResult(post);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate content. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!result || !isAdmin || isPublishing) return;
    setIsPublishing(true);
    try {
      const postData = {
        ...result,
        id: topic.toLowerCase().replace(/\s+/g, '-'),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        images: [
          `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}1/1200/800`,
          `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}2/1200/800`,
          `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}3/1200/800`
        ],
        authorUid: user?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'blog_posts'), postData);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    } catch (error) {
      console.error('Publishing failed:', error);
      alert('Failed to publish post. Check console for details.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const code = JSON.stringify({
      ...result,
      id: topic.toLowerCase().replace(/\s+/g, '-'),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      images: [
        `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}1/1200/800`,
        `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}2/1200/800`,
        `https://picsum.photos/seed/${topic.replace(/\s+/g, '')}3/1200/800`
      ]
    }, null, 2);
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading) return null;

  return (
    <div className="bg-paper min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] emerald-gradient opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] gold-gradient opacity-[0.03] rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-4 pt-40 pb-32 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 emerald-gradient text-white rounded-[2rem] mb-10 premium-shadow"
          >
            <Sparkles size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">AI Content Lab</h1>
          <p className="text-gray-500 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Generate professional, multi-language insights for KSA Insights using Gemini AI.
          </p>
        </div>

        {/* Auth Check */}
        {!user ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[4rem] p-16 md:p-24 text-center premium-shadow border border-gray-100 mb-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Admin Access Required</h2>
            <p className="text-gray-500 text-xl font-light mb-12 max-w-md mx-auto">Please sign in with your admin account to generate and publish content.</p>
            <button
              onClick={login}
              className="gold-gradient text-primary px-14 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all premium-shadow flex items-center justify-center gap-3 mx-auto"
            >
              <LogIn size={24} />
              Sign in with Google
            </button>
          </motion.div>
        ) : (
          <>
            {/* Input Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 premium-shadow border border-gray-100 mb-16 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., The future of Green Hydrogen in KSA)..."
                  className="flex-1 bg-paper border border-gray-100 rounded-[2rem] px-10 py-6 focus:outline-none focus:border-secondary transition-all text-xl font-light"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="emerald-gradient text-white px-12 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-3 min-w-[240px] premium-shadow"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Generate Post
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Result Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Tabs & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-6 rounded-[3rem] premium-shadow border border-gray-100">
                  <div className="flex gap-3">
                    {(['en', 'ar', 'ur'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={cn(
                          "px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 text-sm uppercase tracking-widest",
                          activeTab === lang 
                            ? "emerald-gradient text-white premium-shadow" 
                            : "text-gray-400 hover:bg-paper"
                        )}
                      >
                        <Languages size={18} />
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-8 py-3 bg-paper text-gray-500 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                      {copied ? 'Copied!' : 'Copy JSON'}
                    </button>
                    {isAdmin && (
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing || published}
                        className={cn(
                          "flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all premium-shadow",
                          published 
                            ? "bg-green-500 text-white" 
                            : "gold-gradient text-primary hover:scale-105"
                        )}
                      >
                        {isPublishing ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : published ? (
                          <Check size={20} />
                        ) : (
                          <Globe size={20} />
                        )}
                        {isPublishing ? 'Publishing...' : published ? 'Published Live!' : 'Publish to Live'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-12">
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 premium-shadow border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 emerald-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      
                      <div className="mb-12 relative z-10">
                        <span className="inline-block px-6 py-2 gold-gradient text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 premium-shadow">
                          {result.category}
                        </span>
                        <h2 className={cn(
                          "text-4xl md:text-6xl font-serif font-bold text-primary mb-10 leading-tight",
                          activeTab !== 'en' && "text-right"
                        )}>
                          {result.title[activeTab]}
                        </h2>
                        <p className={cn(
                          "text-2xl text-gray-400 font-light italic leading-relaxed",
                          activeTab !== 'en' && "text-right"
                        )}>
                          {result.excerpt[activeTab]}
                        </p>
                      </div>
                      <div className={cn(
                        "prose prose-xl max-w-none text-gray-500 font-light leading-relaxed",
                        activeTab !== 'en' && "text-right"
                      )}>
                        <ReactMarkdown>{result.content[activeTab]}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-8">
                    <div className="bg-primary text-white rounded-[3rem] p-10 premium-shadow relative overflow-hidden">
                      <div className="absolute inset-0 emerald-gradient opacity-90" />
                      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                      
                      <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3 relative z-10">
                        <FileText size={28} className="text-secondary" />
                        Instructions
                      </h3>
                      <ol className="space-y-6 text-white/70 text-lg font-light list-decimal list-inside relative z-10">
                        <li>Review the generated content in all three languages.</li>
                        <li>Click <strong>"Publish to Live Site"</strong> to save directly to the database.</li>
                        <li>The post will appear instantly on the Blog page.</li>
                        <li>Use <strong>"Copy JSON"</strong> if you want to keep a manual backup.</li>
                      </ol>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 premium-shadow border border-gray-100">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-8">Post Metadata</h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                          <span className="text-gray-400 font-light">Category</span>
                          <span className="font-bold text-secondary text-sm uppercase tracking-widest">{result.category}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                          <span className="text-gray-400 font-light">Author</span>
                          <span className="font-bold text-primary">{user?.displayName || 'Admin'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-light">Status</span>
                          <span className={cn(
                            "font-bold text-sm uppercase tracking-widest",
                            published ? "text-green-500" : "text-orange-500"
                          )}>
                            {published ? 'Live' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {!result && !isGenerating && (
              <div className="mt-32 text-center opacity-10">
                <div className="flex justify-center gap-12 mb-12">
                  <div className="w-16 h-16 bg-gray-400 rounded-full" />
                  <div className="w-16 h-16 bg-gray-400 rounded-full" />
                  <div className="w-16 h-16 bg-gray-400 rounded-full" />
                </div>
                <p className="text-3xl font-serif italic text-primary">Your next insight is just one prompt away...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContentLab;
