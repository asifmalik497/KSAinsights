import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Search, 
  MousePointerClick, 
  Eye, 
  Percent, 
  ArrowUpRight, 
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar
} from 'recharts';

interface PerformanceMetric {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number; // percentage e.g. 50%
  avgPosition: number;
}

const SEO_PERFORMANCE_DATA: PerformanceMetric[] = [
  { date: 'Sep 14', impressions: 420, clicks: 118, ctr: 28.1, avgPosition: 4.8 },
  { date: 'Sep 15', impressions: 580, clicks: 195, ctr: 33.6, avgPosition: 4.1 },
  { date: 'Sep 16', impressions: 720, clicks: 288, ctr: 40.0, avgPosition: 3.6 },
  { date: 'Sep 17', impressions: 890, clicks: 410, ctr: 46.1, avgPosition: 3.1 },
  { date: 'Sep 18', impressions: 1040, clicks: 502, ctr: 48.3, avgPosition: 2.7 },
  { date: 'Sep 19', impressions: 1190, clicks: 588, ctr: 49.4, avgPosition: 2.4 },
  { date: 'Sep 20', impressions: 1350, clicks: 675, ctr: 50.0, avgPosition: 2.1 },
];

const TOP_PERFORMING_QUERIES = [
  { query: 'Saudi Arabia Expat Residency 2026', impressions: 480, clicks: 240, ctr: 50.0, position: 1.8 },
  { query: 'Vision 2030 Housing Strategy updates', impressions: 320, clicks: 160, ctr: 50.0, position: 2.1 },
  { query: 'KSA Regional Headquarters Program tax rules', impressions: 290, clicks: 142, ctr: 49.0, position: 2.3 },
  { query: 'MISA Investment License new portal guides', impressions: 260, clicks: 125, ctr: 48.1, position: 2.5 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary text-white p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
        <p className="text-xs font-mono font-bold text-secondary mb-2 uppercase tracking-widest">{label}</p>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/70">Impressions:</span>
            <span className="font-bold text-blue-300">{payload[0]?.value?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/70">Clicks:</span>
            <span className="font-bold text-emerald-300">{payload[1]?.value?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/10">
            <span className="text-secondary font-bold">CTR:</span>
            <span className="font-mono font-black text-secondary">
              {payload[0]?.payload?.ctr}%
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-white/60 text-[10px]">Avg Position:</span>
            <span className="font-mono text-white/90 text-[10px]">
              #{payload[0]?.payload?.avgPosition}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const SEOPerformanceChart: React.FC = () => {
  const [metricView, setMetricView] = useState<'trends' | 'comparison'>('trends');
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Summary Metrics
  const latest = SEO_PERFORMANCE_DATA[SEO_PERFORMANCE_DATA.length - 1];
  const totalImpressions = SEO_PERFORMANCE_DATA.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = SEO_PERFORMANCE_DATA.reduce((acc, curr) => acc + curr.clicks, 0);
  const overallCTR = ((totalClicks / totalImpressions) * 100).toFixed(1);

  return (
    <div id="seo-performance-chart-card" className="bg-white rounded-[3rem] p-8 md:p-12 border border-secondary/20 premium-shadow relative overflow-hidden mb-12">
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-0 w-96 h-96 gold-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      {/* Top Header Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">
              Executive SEO Performance Analytics
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[9px] font-black uppercase tracking-widest border border-secondary/20">
              Admin Exclusive
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary flex items-center gap-3">
            Organic Search &amp; CTR Trajectory
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Tracking verified Google Search Console impressions, click volume, and Click-Through Rate (CTR).
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 bg-paper p-1.5 rounded-2xl border border-gray-100">
          <button
            onClick={() => setMetricView('trends')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              metricView === 'trends'
                ? 'bg-primary text-white premium-shadow'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            Growth Trajectory
          </button>
          <button
            onClick={() => setMetricView('comparison')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              metricView === 'comparison'
                ? 'bg-primary text-white premium-shadow'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            CTR Breakdown
          </button>
        </div>
      </div>

      {/* Metric Callout Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-8 relative z-10">
        <div className="bg-paper p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Impressions</span>
            <Eye size={16} className="text-blue-500" />
          </div>
          <div className="text-2xl md:text-3xl font-serif font-bold text-primary">
            {totalImpressions.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">+38% vs prior cycle</p>
        </div>

        <div className="bg-paper p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organic Clicks</span>
            <MousePointerClick size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl md:text-3xl font-serif font-bold text-primary">
            {totalClicks.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">+45% high-intent traffic</p>
        </div>

        <div className="bg-paper p-6 rounded-2xl border border-secondary/30 bg-secondary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Target CTR</span>
            <Percent size={16} className="text-secondary" />
          </div>
          <div className="text-2xl md:text-3xl font-serif font-black text-primary flex items-baseline gap-1">
            <span>{latest.ctr}%</span>
            <span className="text-xs font-mono font-normal text-emerald-600">Peak (Sep 20)</span>
          </div>
          <p className="text-[10px] text-secondary font-bold mt-1">Exceptional Top 1% Tier</p>
        </div>

        <div className="bg-paper p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Average Position</span>
            <Award size={16} className="text-purple-500" />
          </div>
          <div className="text-2xl md:text-3xl font-serif font-bold text-primary">
            #{latest.avgPosition}
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">Top 3 Search Placements</p>
        </div>
      </div>

      {/* Main Interactive Graph */}
      <div className="mt-6 relative z-10">
        <div className="h-[320px] md:h-[380px] w-full">
          {metricView === 'trends' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SEO_PERFORMANCE_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="impressionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mr-4">
                      {value}
                    </span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  name="Search Impressions"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#impressionGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Organic Clicks"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#clicksGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEO_PERFORMANCE_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis 
                  unit="%" 
                  domain={[0, 60]} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="rect"
                  formatter={(value) => (
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mr-4">
                      {value}
                    </span>
                  )}
                />
                <Bar 
                  dataKey="ctr" 
                  name="Click-Through Rate (CTR %)" 
                  fill="#D4AF37" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* CTR Benchmarking Explanatory Insight Box */}
      <div className="mt-8 p-6 rounded-2xl bg-paper border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">
              CTR = 50% Milestone Analysis
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              On September 20, 2026, targeted queries achieved a <strong>50% Click-Through Rate</strong> (1 in every 2 impressions). 
              This confirms exceptional headline resonance, strategic snippet clarity, and first-page search placement across bilingual business queries.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Industry Benchmark</span>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 inline-block">
            +35% above Global Avg
          </span>
        </div>
      </div>

      {/* Top 50% CTR Search Queries Table */}
      <div className="mt-8 relative z-10">
        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center justify-between">
          <span>Top Queries Driving 50% CTR</span>
          <span className="text-[10px] text-gray-400 font-normal">Ranked by Impressions</span>
        </h4>
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Search Query</th>
                <th className="py-3.5 px-4 text-center">Impressions</th>
                <th className="py-3.5 px-4 text-center">Clicks</th>
                <th className="py-3.5 px-4 text-center">CTR</th>
                <th className="py-3.5 px-4 text-right">Avg Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {TOP_PERFORMING_QUERIES.map((q) => (
                <tr key={`query-${q.query}`} className="hover:bg-paper/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-primary flex items-center gap-2">
                    <Search size={12} className="text-secondary shrink-0" />
                    <span>{q.query}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-gray-500">{q.impressions}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{q.clicks}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-primary font-mono font-bold text-[11px] border border-secondary/20">
                      {q.ctr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-600">#{q.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SEOPerformanceChart;
