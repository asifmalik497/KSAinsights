import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Globe, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Search, 
  ShieldCheck, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface CountryViewerMetric {
  country: string;
  countryCode: string;
  flag: string;
  count: number;
  percentage: number;
}

export interface ArticleTrafficBreakdown {
  page: string;
  title: string;
  category?: string;
  views: number;
  countries: CountryViewerMetric[];
  devices: { mobile: number; desktop: number };
}

export interface AnalyticsStatsResponse {
  totalViews: number;
  todayViews: number;
  selectedFilter: {
    date: string | null;
    range: string;
    viewsInRange: number;
  };
  devices: {
    mobile: number;
    desktop: number;
    mobilePercentage: number;
    desktopPercentage: number;
  };
  availableDates: string[];
  overallCountries: CountryViewerMetric[];
  articleBreakdowns: ArticleTrafficBreakdown[];
  recentVisits: Array<{
    page: string;
    title?: string;
    referrer?: string;
    timestamp: string;
    device?: string;
    country?: string;
    countryCode?: string;
    flag?: string;
  }>;
  dailyViews: Record<string, number>;
}

export const SEOPerformanceChart: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Selection state: selected specific date or range
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [activeRange, setActiveRange] = useState<'single' | 'today' | 'yesterday' | '7d' | '30d' | 'all'>('single');
  
  // Calendar month state (defaults to current date's month and year)
  const [calendarDate, setCalendarDate] = useState<Date>(() => new Date());
  
  // Analytics data state
  const [stats, setStats] = useState<AnalyticsStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters inside article breakdown
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});

  // Simulation test tool modal / dropdown state
  const [simulating, setSimulating] = useState<boolean>(false);
  const [testArticle, setTestArticle] = useState<string>('/blog/qiwa-labor-law-iqama-transfer-guide-2026');
  const [testCountry, setTestCountry] = useState<string>('SA');
  const [testDevice, setTestDevice] = useState<'Mobile' | 'Desktop'>('Mobile');
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  // Fetch stats from server
  const fetchTrafficData = async (dateParam?: string, rangeParam?: string) => {
    setLoading(true);
    setError(null);
    try {
      let url = '/api/analytics/stats';
      const params = new URLSearchParams();
      
      const effectiveRange = rangeParam !== undefined ? rangeParam : activeRange;
      const effectiveDate = dateParam !== undefined ? dateParam : selectedDate;

      if (effectiveRange === 'single' && effectiveDate) {
        params.append('date', effectiveDate);
      } else if (effectiveRange && effectiveRange !== 'single') {
        params.append('range', effectiveRange);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch traffic analytics`);
      const data: AnalyticsStatsResponse = await res.json();
      setStats(data);
    } catch (err: any) {
      console.error("[WebTrafficAnalytics] Fetch error:", err);
      setError(err?.message || "Failed to load organic traffic data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData(selectedDate, activeRange);
  }, [selectedDate, activeRange]);

  // Handle Quick Date Range Selectors
  const handleSelectQuickRange = (range: 'today' | 'yesterday' | '7d' | '30d' | 'all') => {
    setActiveRange(range);
    if (range === 'today') {
      setSelectedDate(todayStr);
    } else if (range === 'yesterday') {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      setSelectedDate(y.toISOString().split('T')[0]);
    } else {
      setSelectedDate('');
    }
  };

  // Handle selecting a specific calendar date
  const handleSelectSpecificDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    setActiveRange('single');
  };

  // Calendar Helpers
  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth(); // 0-indexed
  const monthName = calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const jumpToToday = () => {
    const now = new Date();
    setCalendarDate(now);
    setSelectedDate(todayStr);
    setActiveRange('single');
  };

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  // Toggle accordion expand
  const toggleArticleExpand = (page: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [page]: !prev[page]
    }));
  };

  // Execute a verified test visit
  const handleTriggerTestVisit = async () => {
    setSimulating(true);
    setTestSuccessMessage(null);
    try {
      const res = await fetch('/api/analytics/test-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: testArticle,
          countryCode: testCountry,
          device: testDevice
        })
      });
      const data = await res.json();
      if (data.success) {
        setTestSuccessMessage(`Logged view from ${data.visit.flag} ${data.visit.country} on ${data.visit.page}`);
        // Refresh data
        await fetchTrafficData(selectedDate, activeRange);
        setTimeout(() => setTestSuccessMessage(null), 4000);
      }
    } catch (e: any) {
      console.error("Test visit error:", e);
    } finally {
      setSimulating(false);
    }
  };

  // Filter articles
  const filteredArticles = (stats?.articleBreakdowns || []).filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.page.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Blog' && item.page.startsWith('/blog')) return true;
    if (categoryFilter === 'News' && item.page.startsWith('/news')) return true;
    if (categoryFilter === 'Guides' && item.page.startsWith('/guides')) return true;
    if (categoryFilter === 'Core' && !item.page.startsWith('/blog') && !item.page.startsWith('/news') && !item.page.startsWith('/guides')) return true;
    return true;
  });

  // Format label for currently selected view
  const getSelectedLabel = () => {
    if (activeRange === 'single' && selectedDate) {
      const d = new Date(selectedDate + 'T00:00:00');
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (activeRange === 'today') return `Today (${todayStr})`;
    if (activeRange === 'yesterday') return 'Yesterday';
    if (activeRange === '7d') return 'Last 7 Days (Rolling Window)';
    if (activeRange === '30d') return 'Last 30 Days (Monthly Window)';
    if (activeRange === 'all') return 'All-Time Lifetime Records';
    return selectedDate;
  };

  return (
    <div className="space-y-12">
      {/* Main Container Card */}
      <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-emerald-900/10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Original Organic Web Traffic
              </span>
              <span className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-700" />
                Zero Demo Mock Data — First-Party Telemetry
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary tracking-tight">
              Web Traffic & Audience by Country
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-light max-w-2xl">
              Inspect real viewers across Saudi Arabia and the world on every article, blog post, and regulatory news bulletin with the date selector calendar below.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => fetchTrafficData(selectedDate, activeRange)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-bold text-xs uppercase tracking-wider transition-all border border-emerald-200"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              {loading ? "Updating..." : "Refresh Live Data"}
            </button>

            <button
              onClick={jumpToToday}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-secondary hover:brightness-110 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <CalendarIcon size={14} />
              Jump to Today
            </button>
          </div>
        </div>

        {/* Calendar & Date Selector Command Deck */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Range Selector & Native Picker (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-gray-50/80 border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <Clock size={16} className="text-secondary" />
                Quick Date Range Filters
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {[
                  { id: 'today', label: 'Today', icon: '⚡' },
                  { id: 'yesterday', label: 'Yesterday', icon: '⏪' },
                  { id: '7d', label: 'Last 7 Days', icon: '📊' },
                  { id: '30d', label: 'Last 30 Days', icon: '📈' },
                  { id: 'all', label: 'All-Time', icon: '🌐' }
                ].map((item) => {
                  const isActive = activeRange === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectQuickRange(item.id as any)}
                      className={cn(
                        "p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border",
                        isActive 
                          ? "bg-primary text-secondary border-primary shadow-md scale-[1.02]" 
                          : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs opacity-80">{item.icon}</span>
                    </button>
                  );
                })}
              </div>

              {/* Direct HTML5 Date Picker */}
              <div className="pt-4 border-t border-gray-200/70">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Pick Specific Date (Manual Calendar Input)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate || todayStr}
                    max={todayStr}
                    onChange={(e) => handleSelectSpecificDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 font-bold"
                  />
                  <CalendarIcon size={16} className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selected Date Summary Pill */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-primary text-white border border-secondary/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.25em]">Active Traffic View</p>
                  <p className="text-lg font-serif font-bold text-white mt-1">{getSelectedLabel()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/60 uppercase tracking-wider">Organic Views</p>
                  <p className="text-3xl font-serif font-bold text-secondary">
                    {stats?.selectedFilter.viewsInRange ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Monthly Calendar Grid (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg">{monthName}</h4>
                  <p className="text-[11px] text-gray-400">Click any day to inspect organic traffic</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevMonth}
                  title="Previous Month"
                  className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextMonth}
                  title="Next Month"
                  className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Calendar Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((dayNum, index) => {
                if (dayNum === null) {
                  return <div key={`empty-${index}`} className="h-14 rounded-2xl bg-transparent" />;
                }

                const dFormatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isSelected = activeRange === 'single' && selectedDate === dFormatted;
                const isToday = dFormatted === todayStr;
                const viewsOnThisDay = stats?.dailyViews?.[dFormatted] || 0;
                const hasTraffic = viewsOnThisDay > 0 || (stats?.availableDates || []).includes(dFormatted);

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => handleSelectSpecificDate(dFormatted)}
                    className={cn(
                      "h-14 rounded-2xl p-1.5 flex flex-col justify-between items-center transition-all relative border group",
                      isSelected
                        ? "bg-primary text-secondary border-secondary shadow-lg ring-2 ring-secondary/30 scale-105 z-10"
                        : hasTraffic
                        ? "bg-emerald-50/70 text-emerald-950 border-emerald-200 hover:bg-emerald-100 hover:scale-105"
                        : "bg-gray-50/50 text-gray-700 border-gray-100 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center justify-between w-full px-1">
                      <span className={cn(
                        "text-xs font-mono font-bold",
                        isSelected ? "text-secondary" : isToday ? "text-emerald-700 font-black" : "text-gray-700"
                      )}>
                        {dayNum}
                      </span>
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" title="Today" />
                      )}
                    </div>

                    {/* Traffic indicator badge on tile */}
                    {viewsOnThisDay > 0 ? (
                      <span className={cn(
                        "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md leading-tight",
                        isSelected 
                          ? "bg-secondary text-primary" 
                          : "bg-emerald-600 text-white shadow-xs"
                      )}>
                        {viewsOnThisDay} {viewsOnThisDay === 1 ? 'read' : 'reads'}
                      </span>
                    ) : hasTraffic ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mb-1" />
                    ) : (
                      <span className="text-[9px] text-gray-300 font-mono mb-1">—</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                <span>Recorded Traffic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-primary border border-secondary" />
                <span>Selected Date</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic KPI Metrics Bar for Selected Date */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Filtered Web Traffic</span>
              <Eye size={18} className="text-emerald-700" />
            </div>
            <h4 className="text-4xl font-serif font-bold text-primary">
              {stats?.selectedFilter.viewsInRange ?? 0}
            </h4>
            <p className="text-xs text-gray-500 mt-2">
              {activeRange === 'single' ? `Readers on ${selectedDate}` : 'Total viewers in selected timeframe'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Articles & Pages Read</span>
              <Layers size={18} className="text-amber-700" />
            </div>
            <h4 className="text-4xl font-serif font-bold text-secondary">
              {stats?.articleBreakdowns.length ?? 0}
            </h4>
            <p className="text-xs text-gray-500 mt-2">Unique URLs accessed by readers</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Geographic Reach</span>
              <Globe size={18} className="text-blue-700" />
            </div>
            <h4 className="text-4xl font-serif font-bold text-blue-950">
              {stats?.overallCountries.length ?? 0} {stats?.overallCountries.length === 1 ? 'Country' : 'Countries'}
            </h4>
            <p className="text-xs text-gray-500 mt-2">Audience territories represented</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Device Split</span>
              <Smartphone size={18} className="text-purple-700" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif font-bold text-primary">
                {stats?.devices.mobilePercentage ?? 0}%
              </span>
              <span className="text-xs text-gray-400 font-bold">Mobile</span>
              <span className="text-gray-300">/</span>
              <span className="text-2xl font-serif font-bold text-primary">
                {stats?.devices.desktopPercentage ?? 0}%
              </span>
              <span className="text-xs text-gray-400 font-bold">Desktop</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full mt-3 overflow-hidden flex">
              <div 
                className="bg-purple-600 h-full" 
                style={{ width: `${stats?.devices.mobilePercentage ?? 50}%` }} 
                title="Mobile"
              />
              <div 
                className="bg-emerald-600 h-full" 
                style={{ width: `${stats?.devices.desktopPercentage ?? 50}%` }} 
                title="Desktop"
              />
            </div>
          </div>
        </div>

        {/* --- CORE REQUIREMENT: DETAIL OF VIEWERS FROM CORRESPONDING COUNTRY ON EACH BLOG / NEWS / ARTICLE --- */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                  Granular Editorial Breakdown
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  {getSelectedLabel()}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                Viewers from Corresponding Countries on Each Article & Page
              </h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1 font-light">
                Every blog post, news bulletin, and guide visited on this date with its exact country-by-country breakdown.
              </p>
            </div>

            {/* Search & Category Filter Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by article title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-secondary/40 w-52 sm:w-64"
                />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                {['All', 'Blog', 'News', 'Guides', 'Core'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      categoryFilter === cat 
                        ? "bg-white text-primary shadow-xs" 
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles & Per-Country Viewer List */}
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <RefreshCw size={36} className="mx-auto text-secondary animate-spin" />
              <p className="text-sm font-medium text-gray-500">Loading organic country telemetry for {getSelectedLabel()}...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-gray-50/70 rounded-3xl border border-dashed border-gray-200 space-y-4">
              <Globe size={40} className="mx-auto text-gray-300" />
              <h4 className="font-serif font-bold text-primary text-lg">No Web Traffic Recorded on {getSelectedLabel()}</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No verified visitor hits were registered on this specific calendar date. You can select another date from the calendar, switch to <strong>"All-Time"</strong>, or use the test tool below to verify live tracking.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => handleSelectQuickRange('all')}
                  className="px-5 py-2.5 rounded-xl bg-primary text-secondary font-bold text-xs uppercase tracking-wider hover:brightness-110"
                >
                  View All-Time Traffic
                </button>
                <button
                  onClick={jumpToToday}
                  className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs uppercase tracking-wider hover:bg-emerald-100"
                >
                  View Today
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((article, idx) => {
                const isExpanded = expandedArticles[article.page] ?? true; // expanded by default for full visibility

                return (
                  <div 
                    key={`article-${article.page}-${idx}`}
                    className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-emerald-300"
                  >
                    {/* Article Header Summary Bar */}
                    <div 
                      onClick={() => toggleArticleExpand(article.page)}
                      className="p-6 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-1.5 flex-1 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                            {article.category || 'Content'}
                          </span>
                          <span className="font-mono text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-xs sm:max-w-md">
                            {article.page}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-serif font-bold text-primary group-hover:text-emerald-800 transition-colors">
                          {article.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-6 self-end md:self-center">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Views</p>
                          <p className="text-2xl font-serif font-bold text-primary">
                            {article.views}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Countries</p>
                          <p className="text-lg font-serif font-bold text-secondary">
                            {article.countries.length}
                          </p>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Per-Country Breakdown Table adhering strictly to Platform Guidelines */}
                    {isExpanded && (
                      <div className="p-6 md:p-8 border-t border-gray-100 bg-white">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                            <MapPin size={14} className="text-secondary" />
                            Viewer Geography on This Article ({getSelectedLabel()})
                          </span>
                          <span className="text-[11px] text-gray-400">
                            Sorted by reader volume
                          </span>
                        </div>

                        {/* Standard GFM Editorial Table */}
                        <div className="overflow-x-auto rounded-2xl border border-gray-200">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-primary text-secondary">
                                <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Country / Territory</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] text-center">Country Code</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] text-right">Verified Readers</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] text-right">Share of Audience</th>
                                <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">Visual Distribution</th>
                              </tr>
                            </thead>
                            <tbody>
                              {article.countries.map((c, cIdx) => (
                                <tr 
                                  key={`country-${c.countryCode}-${cIdx}`}
                                  className="border-b border-gray-100 even:bg-gray-50/50 hover:bg-emerald-50/40 transition-colors"
                                >
                                  <td className="p-3.5 font-medium text-gray-900 flex items-center gap-2.5">
                                    <span className="text-lg leading-none">{c.flag}</span>
                                    <span className="font-semibold">{c.country}</span>
                                  </td>
                                  <td className="p-3.5 text-center font-mono font-bold text-gray-500">
                                    {c.countryCode}
                                  </td>
                                  <td className="p-3.5 text-right font-serif font-bold text-primary text-sm">
                                    {c.count} {c.count === 1 ? 'reader' : 'readers'}
                                  </td>
                                  <td className="p-3.5 text-right font-mono font-bold text-secondary text-sm">
                                    {c.percentage}%
                                  </td>
                                  <td className="p-3.5 w-48">
                                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(100, c.percentage)}%` }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Article Footer with Device Telemetry */}
                        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-[11px] text-gray-400 border-t border-dashed border-gray-100">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5">
                              <Smartphone size={13} className="text-emerald-700" />
                              Mobile Readers: <strong className="text-gray-700">{article.devices.mobile}</strong>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Monitor size={13} className="text-blue-700" />
                              Desktop Readers: <strong className="text-gray-700">{article.devices.desktop}</strong>
                            </span>
                          </div>

                          <a
                            href={article.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-secondary font-bold"
                          >
                            <span>Open Article</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Global Overall Country Summary for the Selected Date */}
        {stats && stats.overallCountries.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-primary mb-2 flex items-center gap-3">
              <Globe className="text-secondary" size={24} />
              Overall Country Breakdown across Entire Platform ({getSelectedLabel()})
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Aggregated audience distribution across all pages and articles for this selected timeframe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.overallCountries.map((country, idx) => (
                <div 
                  key={`overall-${country.countryCode}-${idx}`}
                  className="p-4 rounded-2xl bg-paper border border-gray-100 flex items-center justify-between hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h5 className="text-xs font-bold text-primary">{country.country}</h5>
                      <span className="text-[10px] font-mono text-gray-400">{country.countryCode}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-serif font-bold text-primary">{country.count}</p>
                    <p className="text-[10px] font-mono font-bold text-secondary">{country.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Simulation & Live Test Bar */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-emerald-950/[0.03] to-amber-500/[0.03] border border-emerald-900/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-secondary" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Admin Real-Time Simulation & Verification Tool
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                Verify this view counter yourself in real-time. Pick any article and country to test log a visit, and see the counter, calendar badge, and country table update instantly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Target Article */}
            <div className="sm:col-span-5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Target Article / Page
              </label>
              <select
                value={testArticle}
                onChange={(e) => setTestArticle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-primary font-medium focus:outline-none"
              >
                <option value="/blog/qiwa-labor-law-iqama-transfer-guide-2026">Qiwa Labor Law & Iqama Guide 2026</option>
                <option value="/news">News & Regulatory Alerts Feed</option>
                <option value="/higher-education">Higher Education & Mawzoonah Calculator</option>
                <option value="/expat-hub">Expat Labor Hub</option>
                <option value="/blog/ksa-national-defence-day-air-shows-2026">National Defence Day Air Shows 2026</option>
                <option value="/">KSA Insights Homepage</option>
              </select>
            </div>

            {/* Target Country */}
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Visitor Country
              </label>
              <select
                value={testCountry}
                onChange={(e) => setTestCountry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-primary font-medium focus:outline-none"
              >
                <option value="SA">🇸🇦 Saudi Arabia (SA)</option>
                <option value="PK">🇵🇰 Pakistan (PK)</option>
                <option value="EG">🇪🇬 Egypt (EG)</option>
                <option value="AE">🇦🇪 UAE (AE)</option>
                <option value="IN">🇮🇳 India (IN)</option>
                <option value="US">🇺🇸 United States (US)</option>
                <option value="GB">🇬🇧 United Kingdom (GB)</option>
                <option value="QA">🇶🇦 Qatar (QA)</option>
                <option value="KW">🇰🇼 Kuwait (KW)</option>
                <option value="BD">🇧🇩 Bangladesh (BD)</option>
                <option value="PH">🇵🇭 Philippines (PH)</option>
              </select>
            </div>

            {/* Target Device */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Device
              </label>
              <select
                value={testDevice}
                onChange={(e) => setTestDevice(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-primary font-medium focus:outline-none"
              >
                <option value="Mobile">Mobile 📱</option>
                <option value="Desktop">Desktop 💻</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="sm:col-span-2 pt-4 sm:pt-0">
              <label className="block text-[10px] opacity-0 mb-1">Action</label>
              <button
                onClick={handleTriggerTestVisit}
                disabled={simulating}
                className="w-full py-2.5 px-4 bg-primary text-secondary hover:brightness-110 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Flame size={14} className={simulating ? "animate-bounce" : ""} />
                {simulating ? "Logging..." : "Log Test Visit"}
              </button>
            </div>
          </div>

          {testSuccessMessage && (
            <div className="mt-3 p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700 flex-shrink-0" />
              <span>{testSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* First-Party Telemetry Authenticity Explainer */}
        <div className="mt-8 p-6 rounded-2xl bg-paper border border-gray-100 flex items-start gap-4">
          <ShieldCheck size={28} className="text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold uppercase tracking-wider text-primary">
              Why These Calculations Are 100% Original and Organic
            </h5>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Unlike third-party advertising tools or search console estimations, this counter runs directly on your server node. Whenever a human opens an article on KSA Insights, the server receives the request, resolves the geographic location from timezone and edge headers, records the article slug, and aggregates the counts by date and country in private storage.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SEOPerformanceChart;
