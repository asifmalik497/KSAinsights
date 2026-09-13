import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BlogPost } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SupportedLanguage = 'en' | 'ar' | 'ur';

export function getLanguage(lang: string): SupportedLanguage {
  const base = lang.split('-')[0];
  if (base === 'ar') return 'ar';
  if (base === 'ur') return 'ur';
  return 'en';
}

export function normalizeText(str: string): string {
  if (!str) return '';
  return decodeURIComponent(str)
    .toLowerCase()
    .replace(/defence/g, 'defense')
    .replace(/[^a-z0-9]/g, '');
}

export function findPostById(posts: BlogPost[], targetId?: string | null): BlogPost | undefined {
  if (!targetId || !posts || posts.length === 0) return undefined;
  const decoded = decodeURIComponent(targetId).trim();
  const targetNorm = normalizeText(decoded);

  // 1. Exact or case-insensitive ID match
  const exact = posts.find(p => p.id === decoded || p.id?.toLowerCase() === decoded.toLowerCase());
  if (exact) return exact;

  // 2. Normalized ID match
  const normMatch = posts.find(p => p.id && normalizeText(p.id) === targetNorm);
  if (normMatch) return normMatch;

  // 3. Substring match on ID
  if (targetNorm.length > 4) {
    const subMatch = posts.find(p => p.id && (normalizeText(p.id).includes(targetNorm) || targetNorm.includes(normalizeText(p.id))));
    if (subMatch) return subMatch;
  }

  // 4. Title match across languages
  return posts.find(p => {
    if (!p.title) return false;
    const titleEn = normalizeText(typeof p.title === 'string' ? p.title : p.title.en || '');
    const titleAr = normalizeText(typeof p.title === 'object' ? p.title.ar || '' : '');
    const titleUr = normalizeText(typeof p.title === 'object' ? p.title.ur || '' : '');

    return (titleEn && (titleEn.includes(targetNorm) || targetNorm.includes(titleEn))) ||
           (titleAr && (titleAr.includes(targetNorm) || targetNorm.includes(titleAr))) ||
           (titleUr && (titleUr.includes(targetNorm) || targetNorm.includes(titleUr)));
  });
}

export function formatAlertDateTime(createdAt: any, fallbackDate?: string) {
  let dateObj: Date | null = null;

  if (createdAt) {
    if (typeof createdAt.toDate === 'function') {
      dateObj = createdAt.toDate();
    } else if (createdAt?.seconds) {
      dateObj = new Date(createdAt.seconds * 1000);
    } else if (createdAt instanceof Date) {
      dateObj = createdAt;
    } else if (typeof createdAt === 'string' || typeof createdAt === 'number') {
      const parsed = new Date(createdAt);
      if (!isNaN(parsed.getTime())) {
        dateObj = parsed;
      }
    }
  }

  if (!dateObj && fallbackDate) {
    const parsedFallback = new Date(fallbackDate);
    if (!isNaN(parsedFallback.getTime())) {
      dateObj = parsedFallback;
    }
  }

  if (dateObj) {
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return { dateStr, timeStr, fullStr: `${dateStr} at ${timeStr}` };
  }

  const defaultDate = fallbackDate || 'Recent';
  return { dateStr: defaultDate, timeStr: '', fullStr: defaultDate };
}
