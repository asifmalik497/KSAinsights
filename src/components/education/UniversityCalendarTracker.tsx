import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, CheckCircle2, Search, Filter, 
  MapPin, BookOpen, AlertCircle, Building2, Sparkles,
  ChevronDown, Sun, GraduationCap, Compass, UserCheck, 
  CreditCard, FileCheck, ArrowRight, ExternalLink, ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../lib/utils';

interface UniversityCalendarTrackerProps {
  currentLang: 'en' | 'ar' | 'ur';
}

interface UniversitySessionSchedule {
  fallTermStart: { en: string; ar: string; ur: string };
  fallExams: { en: string; ar: string; ur: string };
  springTermStart: { en: string; ar: string; ur: string };
  springExams: { en: string; ar: string; ur: string };
  summerTraining: { en: string; ar: string; ur: string };
}

interface UniversityStatus {
  id: string;
  name: { en: string; ar: string; ur: string };
  region: { en: string; ar: string; ur: string };
  system: 'two_semester' | 'three_semester';
  semesterWeeks: number;
  session1448: UniversitySessionSchedule;
  session1447: UniversitySessionSchedule;
  notes: { en: string; ar: string; ur: string };
}

const UNIVERSITIES_STATUS_DATA: UniversityStatus[] = [
  {
    id: 'ksu',
    name: {
      en: 'King Saud University (KSU)',
      ar: 'جامعة الملك سعود (الرياض)',
      ur: 'کنگ سعود یونیورسٹی (ریاض)'
    },
    region: { en: 'Riyadh', ar: 'منطقة الرياض', ur: 'ریاض' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: '10–12 Weeks (Mandatory)', ar: '10 إلى 12 أسبوعاً تدريب تعاوني', ur: '10 سے 12 ہفتے لازمی' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: '10–12 Weeks (Mandatory)', ar: '10 إلى 12 أسبوعاً تدريب تعاوني', ur: '10 سے 12 ہفتے لازمی' }
    },
    notes: {
      en: 'Officially approved by University Council; fully restored 2-semester academic rhythm across all colleges.',
      ar: 'معتمد رسمياً من مجلس الجامعة؛ عودة كاملة لنظام الفصلين لكافة الكليات والأقسام العلمية والصحية.',
      ur: 'یونیورسٹی کونسل سے منظور شدہ، تمام شعبوں میں 2 سمسٹر سسٹم بحال۔'
    }
  },
  {
    id: 'kfupm',
    name: {
      en: 'King Fahd University of Petroleum & Minerals (KFUPM)',
      ar: 'جامعة الملك فهد للبترول والمعادن (الظهران)',
      ur: 'کنگ فہد یونیورسٹی آف پیٹرولیم اینڈ منرلز (دہران)'
    },
    region: { en: 'Eastern Province', ar: 'المنطقة الشرقية', ur: 'مشرقی صوبہ' },
    system: 'two_semester',
    semesterWeeks: 16,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '13–31 December 2026', ar: '03–21 رجب 1448هـ', ur: '13–31 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '09–27 May 2027', ar: '03–21 ذو الحجة 1448هـ', ur: '09–27 مئی 2027ء' },
      summerTraining: { en: 'Summer Coop (14 Weeks)', ar: 'برنامج التعاون الصناعي الصيفي (14 أسبوعاً)', ur: 'سمر کوآپ انٹرنشپ (14 ہفتے)' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '14–31 December 2025', ar: '24 جمادى الآخرة – 11 رجب 1447هـ', ur: '14–31 دسمبر 2025ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '10–28 May 2026', ar: '23 ذو القعدة – 11 ذو الحجة 1447هـ', ur: '10–28 مئی 2026ء' },
      summerTraining: { en: 'Summer Coop (14 Weeks)', ar: 'برنامج التعاون الصناعي الصيفي (14 أسبوعاً)', ur: 'سمر کوآپ انٹرنشپ (14 ہفتے)' }
    },
    notes: {
      en: 'Standard international 2-semester model aligned with MIT/Stanford credit-transfer and industrial co-op.',
      ar: 'نظام عالمي موحد يعتمد الفصلين لتسهيل برامج التبادل الطلابي الدولي والتدريب التعاوني مع أرامكو.',
      ur: 'عالمی معیار کے مطابق 2 سمسٹر سسٹم، آرامکو کے ساتھ انٹرنشپ۔'
    }
  },
  {
    id: 'kau',
    name: {
      en: 'King Abdulaziz University (KAU)',
      ar: 'جامعة الملك عبدالعزيز (جدة)',
      ur: 'کنگ عبدالعزیز یونیورسٹی (جدہ)'
    },
    region: { en: 'Makkah / Western', ar: 'منطقة مكة المكرمة', ur: 'مکہ / جدہ' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: 'Hospital Internship & Fieldwork', ar: 'سنة الامتياز الطبي والتدريب الميداني', ur: 'میڈیکل انٹرنشپ اور فیلڈ ورک' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: 'Hospital Internship & Fieldwork', ar: 'سنة الامتياز الطبي والتدريب الميداني', ur: 'میڈیکل انٹرنشپ اور فیلڈ ورک' }
    },
    notes: {
      en: 'Early adopter of the 2-semester return to accommodate medical clerkships and international accreditation.',
      ar: 'من أوائل الجامعات العائدة للفصلين لملائمة الامتياز الصحي والاعتمادات الأكاديمية الدولية.',
      ur: 'طبی تعلیم اور بین الاقوامی ایکریڈیشن کے پیش نظر 2 سمسٹر سسٹم لاگو۔'
    }
  },
  {
    id: 'pnu',
    name: {
      en: 'Princess Nourah bint Abdulrahman University (PNU)',
      ar: 'جامعة الأميرة نورة بنت عبدالرحمن (الرياض)',
      ur: 'پرنسس نورہ بنت عبدالرحمن یونیورسٹی (ریاض)'
    },
    region: { en: 'Riyadh', ar: 'منطقة الرياض', ur: 'ریاض' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: '8 Weeks Career Training', ar: '8 أسابيع تدريب مهني وصيفي', ur: '8 ہفتے پیشہ ورانہ تربیت' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: '8 Weeks Career Training', ar: '8 أسابيع تدريب مهني وصيفي', ur: '8 ہفتے پیشہ ورانہ تربیت' }
    },
    notes: {
      en: 'Structured semester calendar with integrated student wellness and research publication terms.',
      ar: 'تقويم فصلي منظم يدعم جودة الحياة الجامعية ومشاريع التخرج البحثية للطالبات.',
      ur: 'طالبات کی سہولت اور تحقیقی پروجیکٹس کے لیے 2 سمسٹرز۔'
    }
  },
  {
    id: 'imamu',
    name: {
      en: 'Imam Mohammad Ibn Saud Islamic University',
      ar: 'جامعة الإمام محمد بن سعود الإسلامية (الرياض)',
      ur: 'امام محمد بن سعود اسلامک یونیورسٹی (ریاض)'
    },
    region: { en: 'Riyadh', ar: 'منطقة الرياض', ur: 'ریاض' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: 'Summer Seminars & Legal Clinics', ar: 'العيادات القانونية والتدريب الشرعي', ur: 'قانونی کلینکس اور ٹریننگ' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: 'Summer Seminars & Legal Clinics', ar: 'العيادات القانونية والتدريب الشرعي', ur: 'قانونی کلینکس اور ٹریننگ' }
    },
    notes: {
      en: 'Returned to the 2-semester calendar for all Sharia, Law, Computing, and Media faculties.',
      ar: 'اعتمدت مجلس الجامعة العودة لنظام الفصلين لكافة كليات الشريعة والأنظمة والحاسب والإعلام.',
      ur: 'تمام شریعہ، قانون، کمپیوٹر اور میڈیا فیکلٹیز میں 2 سمسٹرز۔'
    }
  },
  {
    id: 'uqu',
    name: {
      en: 'Umm Al-Qura University (UQU)',
      ar: 'جامعة أم القرى (مكة المكرمة)',
      ur: 'ام القری یونیورسٹی (مکہ مکرمہ)'
    },
    region: { en: 'Makkah / Western', ar: 'منطقة مكة المكرمة', ur: 'مکہ مکرمہ' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: 'Early April 2027 (Pre-Hajj)', ar: 'مطلع ذو القعدة 1448هـ (قبل موسم الحج)', ur: 'شروع اپریل 2027ء (حج سے قبل)' },
      summerTraining: { en: 'Hajj Season Volunteering & Research', ar: 'المشاركة الميدانية في أبحاث وخدمة الحج', ur: 'موسم حج ریسرچ اور رضاکارانہ خدمات' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: 'Late April – Early May 2026 (Pre-Hajj)', ar: 'أواخر شوال – مطلع ذو القعدة 1447هـ (قبل موسم الحج)', ur: 'آخر اپریل – مئی 2026ء (حج سے قبل)' },
      summerTraining: { en: 'Hajj Season Volunteering & Research', ar: 'المشاركة الميدانية في أبحاث وخدمة الحج', ur: 'موسم حج ریسرچ اور رضاکارانہ خدمات' }
    },
    notes: {
      en: 'Two-semester model specifically scheduled to complete spring finals prior to the annual Hajj season mobilization.',
      ar: 'تم تصميم مواعيد الفصل الثاني للانتهاء مبكراً قبل بدء موسم الحج لإتاحة مشاركة منسوبي الجامعة في خدمة الحجيج.',
      ur: 'حج کے انتظامات کے پیش نظر دوسرے سمسٹر کے امتحانات جلد مکمل ہوتے ہیں۔'
    }
  },
  {
    id: 'kfu',
    name: {
      en: 'King Faisal University (KFU)',
      ar: 'جامعة الملك فيصل (الأحساء)',
      ur: 'کنگ فیصل یونیورسٹی (الاحساء)'
    },
    region: { en: 'Eastern Province', ar: 'المنطقة الشرقية', ur: 'مشرقی صوبہ' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: 'Agricultural & Veterinary Fieldwork', ar: 'التدريب البيطري والزراعي والأمن الغذائي', ur: 'زرعی اور ویٹرنری فیلڈ ورک' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: 'Agricultural & Veterinary Fieldwork', ar: 'التدريب البيطري والزراعي والأمن الغذائي', ur: 'زرعی اور ویٹرنری فیلڈ ورک' }
    },
    notes: {
      en: 'Operates on 2 semesters with intensive winter/summer sessions for Agricultural and Veterinary Sciences.',
      ar: 'نظام فصلين مستقر يعزز الأبحاث الزراعية والبيطرية وعلوم الأمن الغذائي والاستدامة.',
      ur: 'زرعی اور فوڈ سیکیورٹی ریسرچ کے لیے 2 سمسٹر سسٹم۔'
    }
  },
  {
    id: 'qu',
    name: {
      en: 'Qassim University',
      ar: 'جامعة القصيم (القصيم)',
      ur: 'قصیم یونیورسٹی (قصیم)'
    },
    region: { en: 'Central / Qassim', ar: 'منطقة القصيم', ur: 'قصیم' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: '8 Weeks Field Placement', ar: '8 أسابيع تدريب ميداني صيفي', ur: '8 ہفتے فیلڈ ٹریننگ' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: '8 Weeks Field Placement', ar: '8 أسابيع تدريب ميداني صيفي', ur: '8 ہفتے فیلڈ ٹریننگ' }
    },
    notes: {
      en: 'Returned to the 2-semester system in response to faculty feedback and student academic achievement metrics.',
      ar: 'أقرت الجامعة العودة لنظام الفصلين بناءً على مؤشرات التحصيل الأكاديمي واستطلاعات الرأي لأعضاء هيئة التدريس.',
      ur: 'اساتذہ اور طلباء کی رائے اور تعلیمی نتائج کے بعد 2 سمسٹرز کی واپسی۔'
    }
  },
  {
    id: 'kku',
    name: {
      en: 'King Khalid University (KKU)',
      ar: 'جامعة الملك خالد (أبها / عسير)',
      ur: 'کنگ خالد یونیورسٹی (ابہا / عسیر)'
    },
    region: { en: 'Southern / Asir', ar: 'منطقة عسير', ur: 'عسیر' },
    system: 'two_semester',
    semesterWeeks: 18,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: '29 Nov – 10 Dec 2026', ar: '19–29 جمادى الآخرة 1448هـ', ur: '29 نومبر – 10 دسمبر 2026ء' },
      springTermStart: { en: '17 January 2027', ar: '09 شعبان 1448هـ / 17 يناير 2027م', ur: '17 جنوری 2027ء' },
      springExams: { en: '13–28 April 2027', ar: '07–22 ذو القعدة 1448هـ', ur: '13–28 اپریل 2027ء' },
      summerTraining: { en: 'Tourism & Healthcare Training', ar: 'تدريب مسارات السياحة والاستشفاء', ur: 'سیاحت اور ہیلتھ کیئر ٹریننگ' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: '21 Dec 2025 – 08 Jan 2026', ar: '01–19 رجب 1447هـ', ur: '21 دسمبر 2025 – 08 جنوری 2026ء' },
      springTermStart: { en: '18 January 2026', ar: '29 رجب 1447هـ / 18 يناير 2026م', ur: '18 جنوری 2026ء' },
      springExams: { en: '03–21 May 2026', ar: '16 ذو القعدة – 04 ذو الحجة 1447هـ', ur: '03–21 مئی 2026ء' },
      summerTraining: { en: 'Tourism & Healthcare Training', ar: 'تدريب مسارات السياحة والاستشفاء', ur: 'سیاحت اور ہیلتھ کیئر ٹریننگ' }
    },
    notes: {
      en: 'Maintains 2 semesters at its new landmark Al-Faraa campus in Asir with extended summer climate programs.',
      ar: 'نظام فصلين في المدينة الجامعية الجديدة بالفرعاء، مستفيدة من اعتدال مناخ عسير الصيفي.',
      ur: 'الفراعہ کیمپس میں 2 سمسٹر سسٹم نافذ ہے۔'
    }
  },
  {
    id: 'tvtc',
    name: {
      en: 'Technical and Vocational Training Corp (Selected TVTC Colleges)',
      ar: 'المؤسسة العامة للتدريب التقني والمهني (بعض الكليات التقنية)',
      ur: 'ٹیکنیکل اینڈ ووکیشنل ٹریننگ کارپوریشن (ٹی وی ٹی سی)'
    },
    region: { en: 'All Regions', ar: 'كافة مناطق المملكة', ur: 'تمام علاقے' },
    system: 'three_semester',
    semesterWeeks: 12,
    session1448: {
      fallTermStart: { en: '30 August 2026', ar: '17 ربيع الأول 1448هـ / 30 أغسطس 2026م', ur: '30 اگست 2026ء' },
      fallExams: { en: 'Mid-November 2026', ar: 'نوفمبر 2026م', ur: 'نومبر 2026ء' },
      springTermStart: { en: 'Early December 2026', ar: 'ديسمبر 2026م', ur: 'دسمبر 2026ء' },
      springExams: { en: 'Mid-June 2027', ar: 'يونيو 2027م', ur: 'جون 2027ء' },
      summerTraining: { en: 'Continuous Hands-on Apprenticeship', ar: 'تطبيق مهني مستمر على مدار الفصول', ur: 'مسلسل عملی ٹریننگ' }
    },
    session1447: {
      fallTermStart: { en: '24 August 2025', ar: '01 ربيع الأول 1447هـ / 24 أغسطس 2025م', ur: '24 اگست 2025ء' },
      fallExams: { en: 'Mid-November 2025', ar: 'نوفمبر 2025م', ur: 'نومبر 2025ء' },
      springTermStart: { en: 'Early December 2025', ar: 'ديسمبر 2025م', ur: 'دسمبر 2025ء' },
      springExams: { en: 'Mid-June 2026', ar: 'يونيو 2026م', ur: 'جون 2026ء' },
      summerTraining: { en: 'Continuous Hands-on Apprenticeship', ar: 'تطبيق مهني مستمر على مدار الفصول', ur: 'مسلسل عملی ٹریننگ' }
    },
    notes: {
      en: 'Certain vocational and industrial diploma programs retain modular 3-semester rotations for fast-track skill acquisition.',
      ar: 'تحتفظ بعض المعاهد والكليات التقنية بمسارات الفصول الثلاثة للدبلومات المهنية المكثفة وسرعة ضخ الكفاءات لسوق العمل.',
      ur: 'مخصوص ووکیشنل اور ٹیکنیکل ڈپلوموں میں 3 سمسٹرز کا ماڈل جاری ہے۔'
    }
  }
];

// Current Academic Session 2026–2027 (1448H) Table
const CALENDAR_BREAKDOWN_TABLE_1448 = {
  en: `
| Academic Milestone / Period | Hijri Date (1448H) | Verified Gregorian Date (2026–2027) | Strategic Operational Focus |
| :--- | :--- | :--- | :--- |
| **Faculty & Staff Return** | 10 Rabi' I 1448H | Sunday, 23 August 2026 | Course registration, faculty orientation & syllabus publication. |
| **First Semester (Fall) Start** | 17 Rabi' I 1448H | Sunday, 30 August 2026 | First day of official university lectures across all regions. |
| **Saudi National Day Holiday** | 12–15 Rabi' II 1448H | 23–26 September 2026 | National commemoration holiday across all campuses. |
| **Autumn Mid-Semester Break** | 10–18 Jumada II 1448H | 20–28 November 2026 | Mid-term academic recess and continuous evaluations. |
| **Fall Semester Final Exams** | 19–29 Jumada II 1448H | 29 Nov – 10 Dec 2026 | Comprehensive final written examinations and grading submissions. |
| **Mid-Year / Winter Vacation** | 30 Rajab – 08 Sha'ban 1448H | 08–16 January 2027 | Inter-semester break for students and faculty. |
| **Second Semester (Spring) Start** | 09 Sha'ban 1448H | Sunday, 17 January 2027 | Official launch of Spring semester coursework and clinical rotations. |
| **Founding Day Holiday** | 12–15 Ramadan 1448H | 19–22 February 2027 | Saudi Founding Day nationwide institutional holiday. |
| **Eid Al-Fitr Holiday Break** | 19 Ramadan – 05 Shawwal 1448H | 26 Feb – 13 March 2027 | Holy month conclusion (Eid Al-Fitr on Tuesday, 09 March 2027). |
| **Resumption of Spring Classes** | 06 Shawwal 1448H | Sunday, 14 March 2027 | Return to spring lectures and laboratory sessions. |
| **Spring Final Exams Window** | 07–22 Dhu al-Qi'dah 1448H | 13–28 April 2027 | Official end-of-year examinations and degree completion clearances. |
| **Eid Al-Adha Holiday Break** | 01–16 Dhu al-Hijjah 1448H | 07–22 May 2027 | Annual Hajj and blessed Eid Al-Adha recess. |
| **Summer Break & Coop Training** | 19 Muharram 1449H Onward | June – August 2027 | Mandatory corporate co-op internships (Aramco/SABIC) & summer term. |
`,
  ar: `
| المحطة الأكاديمية / الحدث الزمني | التاريخ الهجري المعتمد (1448هـ) | التاريخ الميلادي المعتمد (2026–2027م) | التوجيه التشغيلي والأكاديمي |
| :--- | :--- | :--- | :--- |
| **عودة الكوادر التعليمية والإدارية** | 10 ربيع الأول 1448هـ | الأحد، 23 أغسطس 2026م | استكمال الجداول، الإرشاد الأكاديمي، وتجهيز المعامل والمقررات. |
| **انطلاق الدراسة بالفصل الأول (الخريف)** | 17 ربيع الأول 1448هـ | الأحد، 30 أغسطس 2026م | بدء المحاضرات الفعلية لطلاب وطالبات الجامعات في كافة المناطق. |
| **إجازة اليوم الوطني للمملكة** | 12–15 ربيع الثاني 1448هـ | 23–26 سبتمبر 2026م | إجازة رسمية لكافة منسوبي ومنسوبات مؤسسات التعليم العالي. |
| **إجازة الخريف (منتصف الفصل الأول)** | 10–18 جمادى الآخرة 1448هـ | 20–28 نوفمبر 2026م | استراحة منتصف الفصل وتقييمات الأعمال الدورية والعملية. |
| **الاختبارات النهائية للفصل الأول** | 19–29 جمادى الآخرة 1448هـ | 29 نوفمبر – 10 ديسمبر 2026م | الجلسات الامتحانية النهائية ورصد الدرجات عبر البوابات الأكاديمية. |
| **إجازة منتصف العام الجامعي** | 30 رجب – 08 شعبان 1448هـ | 08–16 يناير 2027م | استراحة بين الفصلين وتعديل الجداول للطلاب والطالبات. |
| **انطلاق الدراسة بالفصل الثاني (الربيع)** | 09 شعبان 1448هـ | الأحد، 17 يناير 2027م | بدء الفصل الدراسي الثاني ومباشرة المقررات التخصصية وسنة الامتياز. |
| **إجازة يوم التأسيس** | 12–15 Ramadan 1448هـ | 19–22 فبراير 2027م | ذكرى يوم التأسيس المجيد وإجازة لكافة الجامعات والكليات. |
| **إجازة عيد الفطر المبارك** | 19 رمضان – 05 شوال 1448هـ | 26 فبراير – 13 مارس 2027م | إجازة عيد الفطر (يوم العيد يوافق الثلاثاء 09 مارس 2027م). |
| **استئناف الدراسة بعد عيد الفطر** | 06 شوال 1448هـ | الأحد، 14 مارس 2027م | استئناف المحاضرات التخصصية والمعامل حتى موعد الاختبارات. |
| **الاختبارات النهائية للفصل الثاني** | 07–22 ذو القعدة 1448هـ | 13–28 أبريل 2027م | اختتام العام الأكاديمي وإنهاء متطلبات التخرج وحفلات التكريم. |
| **إجازة عيد الأضحى المبارك** | 01–16 ذو الحجة 1448هـ | 07–22 مايو 2027م | إجازة موسم الحج وعيد الأضحى المبارك لكافة الجامعات. |
| **الإجازة الصيفية والتدريب التعاوني** | 19 محرم 1449هـ فصاعداً | يونيو – أغسطس 2027م | انطلاق التدريب الصيفي الإلزامي والبرامج البحثية والإجازة السنوية. |
`,
  ur: `
| تعلیمی مرحلہ / تقویم | ہجری تاریخ (1448ھ) | مصدقہ عیسوی تاریخ (2026–2027ء) | تفصیلات و امتحانی شیڈول |
| :--- | :--- | :--- | :--- |
| **اساتذہ اور عملے کی واپسی** | 10 ربیع الاول 1448ھ | اتوار، 23 اگست 2026ء | رجسٹریشن، کلاس شیڈول اور اکیڈمک تیاری کا آغاز۔ |
| **پہلے سمسٹر کا باقاعدہ آغاز** | 17 ربیع الاول 1448ھ | اتوار، 30 اگست 2026ء | سعودی عرب کی تمام سرکاری و نجی جامعات میں کلاسز کا آغاز۔ |
| **سعودی قومی دن کی چھٹی** | 12–15 ربیع الثانی 1448ھ | 23–26 ستمبر 2026ء | مملکت بھر کی جامعات میں قومی دن کی سرکاری تعطیل۔ |
| **خزاں مڈ ٹرم وقفہ** | 10–18 جمادی الثانی 1448ھ | 20–28 نومبر 2026ء | مڈ ٹرم اور پریکٹیکل امتحانات کا مرحلہ۔ |
| **پہلے سمسٹر کے فائنل امتحانات** | 19–29 جمادی الثانی 1448ھ | 29 نومبر – 10 دسمبر 2026ء | پہلے سمسٹر کے حتمی تحریری امتحانات اور نتائج۔ |
| **درمیانی سال / موسم سرما کی چھٹیاں** | 30 رجب – 08 شعبان 1448ھ | 08–16 جنوری 2027ء | سمسٹرز کے درمیان موسم سرما کی تعطیلات۔ |
| **دوسرے سمسٹر کا باقاعدہ آغاز** | 09 شعبان 1448ھ | اتوار، 17 جنوری 2027ء | نئے سال میں دوسرے سمسٹر کے تدریسی عمل کا آغاز۔ |
| **یوم تاسیس کی تعطیل** | 12–15 رمضان 1448ھ | 19–22 فروری 2027ء | یوم تاسیس کی مناسبت سے تمام کیمپسز میں عام تعطیل۔ |
| **عید الفطر کی تعطیلات** | 19 رمضان – 05 شوال 1448ھ | 26 فروری – 13 مارچ 2027ء | عید الفطر تعطیلات (عید کا دن منگل 09 مارچ 2027ء ہے)۔ |
| **عید الفطر کے بعد کلاسز کی واپسی** | 06 شوال 1448ھ | اتوار، 14 مارچ 2027ء | دوسرے سمسٹر کی کلاسز اور لیبز کا دوبارہ آغاز۔ |
| **دوسرے سمسٹر کے فائنل امتحانات** | 07–22 ذو القعدہ 1448ھ | 13–28 اپریل 2027ء | سالانہ تعلیمی سال کا اختتام اور گریجویشن کلیئرنس۔ |
| **عید الاضحیٰ کی تعطیلات** | 01–16 ذو الحجہ 1448ھ | 07–22 مئی 2027ء | حج سیزن اور عید الاضحیٰ کی سرکاری چھٹیاں۔ |
| **موسم گرما کی تعطیلات و انٹرنشپ** | 19 محرم 1449ھ بعد | جون – اگست 2027ء | فیلڈ انٹرنشپ، صنعتی ٹریننگ اور موسم گرما کی تعطیلات۔ |
`
};

// Previous Transition Session 1447H (2025–2026) Table
const CALENDAR_BREAKDOWN_TABLE_1447 = {
  en: `
| Academic Milestone / Period | Hijri Date (1447H) | Official Gregorian Date (2025–2026) | Strategic Operational Focus |
| :--- | :--- | :--- | :--- |
| **Return of Educational Supervisors & Admins** | 18 Safar 1447H | Tuesday, 12 August 2025 | Institutional planning, scheduling & administrative campus readiness. |
| **Return of Teaching Faculty & Lecturers** | 23 Safar 1447H | Sunday, 17 August 2025 | Course registration, faculty orientation & syllabus publication. |
| **First Semester (Fall) Start for Students** | 01 Rabi' I 1447H | Sunday, 24 August 2025 | First day of official university lectures across all regions. |
| **Saudi National Day Holiday** | 01 Rabi' II 1447H | Tuesday, 23 September 2025 | National commemoration holiday across all campuses. |
| **Autumn Mid-Semester Break** | 30 Jumada I – 08 Jumada II 1447H | 21–29 November 2025 | Mid-term academic recess and continuous evaluations (9 consecutive days). |
| **Fall Semester Final Exams** | 01–19 Rajab 1447H | 21 Dec 2025 – 08 Jan 2026 | Comprehensive final written examinations and grading submissions. |
| **Mid-Year / Winter Vacation** | 20–28 Rajab 1447H | 09–17 January 2026 | Inter-semester winter recess for students and faculty (9 days). |
| **Second Semester (Spring) Start** | 29 Rajab 1447H | Sunday, 18 January 2026 | Official launch of Spring semester coursework and clinical rotations. |
| **Founding Day Holiday** | 05 Ramadan 1447H | Sunday, 22 February 2026 | Saudi Founding Day nationwide institutional holiday. |
| **Eid Al-Fitr Holiday Break** | 17 Ramadan – 09 Shawwal 1447H | Friday, 06 March – Saturday, 28 March 2026 | Official 23-day break; Eid Al-Fitr falls on Friday, 20 March 2026. |
| **Resumption of Spring Classes** | 10 Shawwal 1447H | Sunday, 29 March 2026 | Official return to spring lectures and laboratory sessions across KSA. |
| **Spring Final Exams Window** | 16 Dhu al-Qi'dah – 04 Dhu al-Hijjah 1447H | 03–21 May 2026 | Official end-of-year examinations and degree completion clearances. |
| **Eid Al-Adha Holiday Break** | 05–15 Dhu al-Hijjah 1447H | 22 May – 01 June 2026 | Annual Hajj and blessed Eid Al-Adha recess. |
| **End of Academic Year & Summer Break** | 10 Muharram 1448H Onward | Thursday, 25 June 2026 | Mandatory corporate co-op internships (Aramco/SABIC) & summer recess. |
`,
  ar: `
| المحطة الأكاديمية / الحدث الزمني | التاريخ الهجري المعتمد (1447هـ) | التاريخ الميلادي الرسمي المعتمد (2025–2026م) | التوجيه التشغيلي والأكاديمي |
| :--- | :--- | :--- | :--- |
| **عودة المشرفين التربويين والكوادر الإدارية** | 18 صفر 1447هـ | الثلاثاء، 12 أغسطس 2025م | التخطيط المؤسسي، إعداد الجداول، وتجهيز المرافق الأكاديمية. |
| **عودة المعلمين وأعضاء هيئة التدريس** | 23 صفر 1447هـ | الأحد، 17 أغسطس 2025م | الإرشاد الأكاديمي، نشر الخطط الدراسية، وتجهيز المقررات والمعامل. |
| **انطلاق الدراسة الفعلية للفصل الأول للطلاب** | 01 ربيع الأول 1447هـ | الأحد، 24 أغسطس 2025م | بدء المحاضرات الفعلية لطلاب وطالبات الجامعات في كافة المناطق. |
| **إجازة اليوم الوطني للمملكة** | 01 ربيع الآخر 1447هـ | الثلاثاء، 23 سبتمبر 2025م | إجازة رسمية لكافة منسوبي ومنسوبات مؤسسات التعليم العالي. |
| **إجازة الخريف (منتصف الفصل الأول)** | 30 جمادى الأولى – 08 جمادى الآخرة 1447هـ | 21–29 نوفمبر 2025م | استراحة منتصف الفصل الأول وتقييمات الأعمال الدورية (9 أيام). |
| **الاختبارات النهائية للفصل الأول** | 01–19 رجب 1447هـ | 21 ديسمبر 2025 – 08 يناير 2026م | الجلسات الامتحانية النهائية ورصد الدرجات عبر البوابات الأكاديمية. |
| **إجازة منتصف العام الجامعي** | 20–28 رجب 1447هـ | 09–17 يناير 2026م | استراحة بين الفصلين وتعديل الجداول للطلاب والطالبات (9 أيام). |
| **انطلاق الدراسة بالفصل الثاني** | 29 رجب 1447هـ | الأحد، 18 يناير 2026م | بدء الفصل الدراسي الثاني ومباشرة المقررات التخصصية وسنة الامتياز. |
| **إجازة يوم التأسيس** | 05 Ramadan 1447هـ | الأحد، 22 فبراير 2026م | ذكرى يوم التأسيس المجيد وإجازة رسمية لكافة الجامعات والكليات. |
| **إجازة عيد الفطر المبارك** | 17 Ramadan – 09 شوال 1447هـ | الجمعة 06 مارس – السبت 28 مارس 2026م | إجازة رسمية مدتها 23 يوماً (يوافق يوم عيد الفطر الجمعة 20 مارس 2026م). |
| **استئناف الدراسة بعد إجازة عيد الفطر** | 10 شوال 1447هـ | الأحد، 29 مارس 2026م | استئناف المحاضرات التخصصية والمعامل حتى موعد الاختبارات النهائية. |
| **الاختبارات النهائية للفصل الثاني** | 16 ذو القعدة – 04 ذو الحجة 1447هـ | 03–21 مايو 2026م | اختتام العام الأكاديمي وإنهاء متطلبات التخرج وحفلات التكريم. |
| **إجازة عيد الأضحى المبارك** | 05–15 ذو الحجة 1447هـ | 22 مايو – 01 يونيو 2026م | إجازة موسم الحج وعيد الأضحى المبارك لكافة منسوبي الجامعات. |
| **نهاية العام الدراسي وبدء الإجازة الصيفية** | 10 محرم 1448هـ فصاعداً | الخميس، 25 يونيو 2026م | انطلاق التدريب الصيفي الإلزامي (أرامكو/سابك) والإجازة السنوية. |
`,
  ur: `
| تعلیمی مرحلہ / تقویم | ہجری تاریخ (1447ھ) | سرکاری مصدقہ عیسوی تاریخ (2025–2026ء) | تفصیلات و امتحانی شیڈول |
| :--- | :--- | :--- | :--- |
| **تعلیمی سپروائزرز اور انتظامی عملے کی واپسی** | 18 صفر 1447ھ | منگل، 12 اگست 2025ء | اکیڈمک شیڈولنگ، رجسٹریشن اور کیمپس کی تیاری۔ |
| **اساتذہ اور فیکلٹی ممبران کی واپسی** | 23 صفر 1447ھ | اتوار، 17 اگست 2025ء | نصاب کی تیاری، کورس پلاننگ اور تعلیمی انتظامات۔ |
| **طلباء کے لیے پہلے سمسٹر کا باقاعدہ آغاز** | 01 ربیع الاول 1447ھ | اتوار، 24 اگست 2025ء | سعودی عرب کی تمام سرکاری و نجی جامعات میں کلاسز کا آغاز۔ |
| **سعودی قومی دن کی چھٹی** | 01 ربیع الثانی 1447ھ | منگل، 23 ستمبر 2025ء | مملکت بھر کی جامعات میں قومی دن کی سرکاری تعطیل۔ |
| **خزاں مڈ ٹرم وقفہ (فال بریک)** | 30 جمادی الاول – 08 جمادی الثانی 1447ھ | 21–29 نومبر 2025ء | مڈ ٹرم وقفہ اور پریکٹیکل جانچ کا مرحلہ (9 دن)۔ |
| **پہلے سمسٹر کے فائنل امتحانات** | 01–19 رجب 1447ھ | 21 دسمبر 2025 – 08 جنوری 2026ء | پہلے سمسٹر کے حتمی تحریری امتحانات اور نتائج کا اندراج۔ |
| **درمیانی سال / موسم سرما کی چھٹیاں** | 20–28 رجب 1447ھ | 09–17 جنوری 2026ء | سمسٹرز کے درمیان موسم سرما کی 9 روزہ تعطیلات۔ |
| **دوسرے سمسٹر کا باقاعدہ آغاز** | 29 رجب 1447ھ | اتوار، 18 جنوری 2026ء | دوسرے سمسٹر کے تدریسی عمل اور کلینیکل روٹیشنز کا آغاز۔ |
| **یوم تاسیس کی تعطیل** | 05 رمضان 1447ھ | اتوار، 22 فروری 2026ء | یوم تاسیس کی مناسبت سے تمام کیمپسز میں عام تعطیل۔ |
| **عید الفطر کی تعطیلات** | 17 رمضان – 09 شوال 1447ھ | جمعہ 06 مارچ – ہفتہ 28 مارچ 2026ء | 23 روزہ باضابطہ چھٹیاں (عید الفطر کا دن جمعہ 20 مارچ 2026ء ہے)۔ |
| **عید الفطر کے بعد کلاسز کی واپسی** | 10 شوال 1447ھ | اتوار، 29 مارچ 2026ء | دوسرے سمسٹر کی کلاسز اور لیبز کا مکمل تسلسل کے ساتھ دوبارہ آغاز۔ |
| **دوسرے سمسٹر کے فائنل امتحانات** | 16 ذو القعدہ – 04 ذو الحجہ 1447ھ | 03–21 مئی 2026ء | سالانہ تعلیمی سال کا اختتام اور گریجویشن کلیئرنس۔ |
| **عید الاضحیٰ کی تعطیلات** | 05–15 ذو الحجہ 1447ھ | 22 مئی – 01 جون 2026ء | حج سیزن اور عید الاضحیٰ کی سرکاری چھٹیاں۔ |
| **تعلیمی سال کا اختتام اور موسم گرما کی تعطیلات** | 10 محرم 1448ھ بعد | جمعرات، 25 جون 2026ء | فیلڈ انٹرنشپ (آرامکو/سابک)، سمر ٹریننگ اور سالانہ تعطیلات۔ |
`
};

export const UniversityCalendarTracker: React.FC<UniversityCalendarTrackerProps> = ({ currentLang }) => {
  const [selectedSession, setSelectedSession] = useState<'1448' | '1447'>('1448');
  const [systemFilter, setSystemFilter] = useState<'all' | 'two_semester' | 'three_semester'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive induction checklist items
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    step1: true,
    step2: true,
    step3: true,
    step4: false,
    step5: false,
    step6: false
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_STATUS_DATA.filter((item) => {
      const matchesSystem = systemFilter === 'all' || item.system === systemFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.en.toLowerCase().includes(q) ||
        item.name.ar.includes(q) ||
        item.name.ur.includes(q) ||
        item.region.en.toLowerCase().includes(q) ||
        item.region.ar.includes(q) ||
        item.region.ur.includes(q);
      return matchesSystem && matchesSearch;
    });
  }, [systemFilter, searchQuery]);

  // Custom table styling according to RULE[AGENTS_md]
  const customMarkdownComponents = {
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <table className="w-full text-left rtl:text-right border-collapse text-xs md:text-sm" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => (
      <thead className="bg-primary text-secondary font-serif uppercase tracking-wider text-[11px] md:text-xs" {...props} />
    ),
    tbody: ({ node, ...props }: any) => (
      <tbody className="divide-y divide-gray-100 bg-white" {...props} />
    ),
    tr: ({ node, ...props }: any) => (
      <tr className="even:bg-gray-50/50 hover:bg-emerald-50/40 transition-colors" {...props} />
    ),
    th: ({ node, ...props }: any) => (
      <th className="py-3.5 px-4 font-bold tracking-wider border-b border-white/10" {...props} />
    ),
    td: ({ node, ...props }: any) => (
      <td className="py-3 px-4 text-gray-700 leading-relaxed font-sans" {...props} />
    ),
    strong: ({ node, ...props }: any) => (
      <strong className="font-bold text-primary" {...props} />
    )
  };

  return (
    <section id="calendar-tracker" className="space-y-12">
      {/* Editorial Header Card with Deep Emerald Green & Gold Luxury Accents */}
      <div className="bg-gradient-to-br from-primary via-emerald-950 to-primary text-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {currentLang === 'ar' ? 'العام الجامعي الجاري 1448هـ (2026–2027م)' : currentLang === 'ur' ? 'موجودہ اکیڈمک سیشن 2026-2027' : 'Current Session 2026–2027 (1448H) Active'}
              </span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold">
              <Calendar size={13} />
              <span>{currentLang === 'ar' ? 'الأسبوع الخامس من 18' : currentLang === 'ur' ? 'ہفتہ 5 از 18' : 'Week 05 of 18 (Fall)'}</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
            {currentLang === 'ar' ? (
              <>مرصد أنظمة الجامعات السعودية <span className="text-gold-gradient">ودليل التهيئة والتسجيل 2026–2027</span></>
            ) : currentLang === 'ur' ? (
              <>سعودی جامعات کا <span className="text-gold-gradient">2 سمسٹر مانیٹر، انڈکشن و سیشن گائیڈ 2026-2027</span></>
            ) : (
              <>Saudi University Academic Tracker: <span className="text-gold-gradient">2026–2027 Session & Freshmen Induction</span></>
            )}
          </h2>

          <p className="text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6">
            {currentLang === 'ar'
              ? 'دليل استراتيجي ومحدث يرصد تفاصيل العام الجامعي الجاري 2026–2027 (1448هـ)، متضمناً مواعيد الفصول الدراسية، الاختبارات، إجازات الأعياد، وإجراءات التهيئة والتسجيل للمستجدين والقبول الإلحاقي.'
              : currentLang === 'ur'
              ? 'موجودہ تعلیمی سال 2026-2027 (1448ھ) کا مصدقہ شیڈول، نئے طلباء کے لیے اورینٹیشن، ضمنی داخلے اور 2 سمسٹر سسٹم کے امتحانات کی تفصیلات۔'
              : 'An authoritative strategic tracker monitoring the current 2026–2027 (1448H) academic session, complete with semester milestone chronologies, freshmen orientation blueprints, and live university calendars.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">90%+</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'جامعات على نظام الفصلين' : currentLang === 'ur' ? '2 سمسٹر سسٹم پر' : 'On 2-Semester System'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">Week 05</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'الأسبوع الدراسي الحالي' : currentLang === 'ur' ? 'موجودہ اکیڈمک ہفتہ' : 'Current Active Week'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">29 Nov</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'بدء اختبارات الفصل الأول' : currentLang === 'ur' ? 'پہلے سمسٹر کے امتحانات' : 'Fall Finals Kickoff'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">1448H / 2026–27</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'السنة الأكاديمية الجارية' : currentLang === 'ur' ? 'فعال تعلیمی سال' : 'Active Academic Year'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Current 2026–2027 University Induction & Session Orientation Blueprint */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Compass size={16} />
              <span>
                {currentLang === 'ar' ? 'دليل المستجدين والتهيئة الجامعية' : currentLang === 'ur' ? 'نئے طلباء کی اورینٹیشن گائیڈ' : 'Freshmen Induction & Session Blueprint'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {currentLang === 'ar'
                ? 'إجراءات التهيئة والتسجيل للعام الجامعي 2026–2027 (1448هـ)'
                : currentLang === 'ur'
                ? 'تعلیمی سال 2026-2027 کے لیے رجسٹریشن، اورینٹیشن اور وظائف کی تفصیل'
                : 'Current Year 2026–2027 Induction, Enrollment & Campus Living Blueprint'}
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles size={14} className="text-emerald-600" />
            <span>
              {currentLang === 'ar' ? 'محدث لشهر سبتمبر – أكتوبر 2026' : currentLang === 'ur' ? 'ستمبر – اکتوبر 2026 اپ ڈیٹ' : 'Live for Sep – Oct 2026'}
            </span>
          </div>
        </div>

        {/* 5 Core Induction Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Digital ID & Nafath Sync */}
          <div className="p-6 rounded-3xl bg-paper border border-gray-150 hover:border-secondary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                <ShieldCheck size={20} className="text-primary" />
              </div>
              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {currentLang === 'ar' ? '1. التثبيت الرقمي والهوية الجامعية عبر توكلنا' : currentLang === 'ur' ? '1. ڈیجیٹل اسٹوڈنٹ کارڈ اور نفاذ تصدیق' : '1. Digital Nafath Confirmation & Tawakkalna Student ID'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'يتم إصدار البطاقة الجامعية الرقمية تلقائياً وربطها بتطبيق "توكلنا خدمات" وتطبيق الجامعة فور تثبيت المقعد عبر النفاذ الوطني الموحد، مما يتيح الدخول الذكي للبوابات والمعامل والمكتبات.'
                  : currentLang === 'ur'
                  ? 'نفاذ کے ذریعے داخلے کی تصدیق کے بعد یونیورسٹی اسٹوڈنٹ کارڈ خود بخود توکلنا خدمات ایپ کے ساتھ لنک ہو جاتا ہے، جس سے کیمپس گیٹس اور لیبز تک رسائی ممکن ہوتی ہے۔'
                  : 'Following electronic seat confirmation on Nafath, freshmen receive their verified digital student identification synchronized directly into Tawakkalna Services and university apps for contactless campus entry.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 size={13} />
              <span>{currentLang === 'ar' ? 'متطلب إلزامي لكافة المقبولين' : currentLang === 'ur' ? 'تمام طلباء کے لیے لازمی' : 'Mandatory across all universities'}</span>
            </div>
          </div>

          {/* Pillar 2: Course Scheduling & LMS */}
          <div className="p-6 rounded-3xl bg-paper border border-gray-150 hover:border-secondary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                <BookOpen size={20} className="text-primary" />
              </div>
              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {currentLang === 'ar' ? '2. تثبيت الجداول وبوابات التعلم (بلاك بورد / كانفاس)' : currentLang === 'ur' ? '2. کلاس شیڈول اور بلیک بورڈ / کینوس ایکٹیویشن' : '2. Class Timetables & LMS (Blackboard / Canvas)'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'تفعيل الحساب الجامعي الرسمي (Office 365) والاطلاع على الشعب والقاعات عبر نظام EduGate / Banner، مع التأكيد على نسبة الحرمان (25% من مجموع ساعات المقرر).'
                  : currentLang === 'ur'
                  ? 'باضابطہ یونیورسٹی ای میل اور آفس 365 اکاؤنٹ کی ایکٹیویشن، EduGate پورٹل پر کلاس شیڈول کا اندراج اور 25 فیصد غیر حاضری پر ڈینائل وارننگ کا نوٹس۔'
                  : 'Automated enrollment into course sections via EduGate / Banner, activating institutional Microsoft 365 suites and Blackboard/Canvas LMS portals with strict monitoring of the 25% absence DN limit.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 size={13} />
              <span>{currentLang === 'ar' ? 'متاح عبر بوابات القبول الذاتي' : currentLang === 'ur' ? 'آن لائن دستیاب' : 'Self-service EduGate portals'}</span>
            </div>
          </div>

          {/* Pillar 3: Preparatory Year & English Placement */}
          <div className="p-6 rounded-3xl bg-paper border border-gray-150 hover:border-secondary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                <GraduationCap size={20} className="text-primary" />
              </div>
              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {currentLang === 'ar' ? '3. السنة الأولى المشتركة ومعادلة اللغة الإنجليزية' : currentLang === 'ur' ? '3. فرسٹ ایئر کامن پروگرام اور انگلش استثناء' : '3. Common First Year & STEP / IELTS Exemptions'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'يخضع طلاب المسارات العلمية والصحية لاختبار تحديد مستوى اللغة الإنجليزية، ويُعفى الطالب الحاصل على درجة 80+ في STEP أو 5.5+ في IELTS مع رصد المعدل الكامل للمقرر.'
                  : currentLang === 'ur'
                  ? 'سائنس اور میڈیکل طلباء کا انگلش پلیسمنٹ ٹیسٹ۔ اگر طالب علم کے پاس STEP میں 80 یا IELTS میں 5.5 اسکور ہو تو اسے کورس سے استثناء اور فل گریڈ دیا جاتا ہے۔'
                  : 'Scientific and health students undertake English diagnostics; presenting an IELTS 5.5+ or STEP 80+ grants full course exemption and automatic A+ transfer credits toward first-year GPA.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
              <AlertCircle size={13} />
              <span>{currentLang === 'ar' ? 'يرفع المعدل التراكمي مباشرة' : currentLang === 'ur' ? 'جی پی اے میں اضافہ' : 'Direct GPA enhancement'}</span>
            </div>
          </div>

          {/* Pillar 4: Monthly University Stipend */}
          <div className="p-6 rounded-3xl bg-paper border border-gray-150 hover:border-secondary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                <CreditCard size={20} className="text-primary" />
              </div>
              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {currentLang === 'ar' ? '4. المكافأة الجامعية الشهرية (990 / 840 ريال)' : currentLang === 'ur' ? '4. ماہانہ سرکاری وظیفہ (990 تا 840 ریال)' : '4. Monthly Government University Stipend'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'تصرف وزارة التعليم مكافأة شهرية منتظمة قدرها 990 ريالاً للتخصصات العلمية والصحية و 840 ريالاً للتخصصات الإنسانية والشرعية، وتودع في حساب الطالب البنكي في 27 من كل شهر ميلادي.'
                  : currentLang === 'ur'
                  ? 'سعودی وزارتِ تعلیم کی جانب سے سائنس و میڈیکل کے لیے 990 ریال اور ہیومینٹیز کے لیے 840 ریال ماہانہ وظیفہ ہر گریگورین مہینے کی 27 تاریخ کو طالب علم کے بینک اکاؤنٹ میں آتا ہے۔'
                  : 'Regular government financial allowance: 990 SAR/month for Scientific/Medical disciplines and 840 SAR/month for Humanities, disbursed directly to the student personal Saudi bank IBAN on the 27th of each month.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 size={13} />
              <span>{currentLang === 'ar' ? 'إيداع دوري يوم 27 ميلادي' : currentLang === 'ur' ? 'ہر ماہ کی 27 تاریخ' : 'Credited on 27th of each month'}</span>
            </div>
          </div>

          {/* Pillar 5: Spring 2027 Supplementary Intake (Open Now!) */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 hover:border-emerald-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                <Sparkles size={20} />
              </div>
              <h4 className="font-serif font-bold text-base text-emerald-950 mb-2">
                {currentLang === 'ar' ? '5. القبول الإلحاقي والتجسير للفصل الثاني 2027 (نشط الآن)' : currentLang === 'ur' ? '5. دوسرے سمسٹر کے ضمنی داخلے (فی الوقت جاری)' : '5. Spring 2027 Supplementary Admissions (Open Now)'}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'تستقبل بوابات القبول الإلحاقي بجامعة الملك سعود وجامعة الأميرة نورة وكليات التقنية طلبات شغل المقاعد الشاغرة وبرامج التجسير والتحويل الداخلي للفصل الدراسي الثاني حتى نهاية أكتوبر 2026.'
                  : currentLang === 'ur'
                  ? 'کنگ سعود یونیورسٹی، پرنسس نورہ اور ٹیکنیکل کالجز میں خالی نشستوں اور دوسرے سمسٹر کے لیے ٹرانسفر و ضمنی داخلے اکتوبر 2026 کے اختتام تک کھلے ہیں۔'
                  : 'Supplementary admission portals across King Saud, Princess Nourah, and TVTC colleges are currently accepting spring applications to fill vacant seats and accommodate internal transfers through late October 2026.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{currentLang === 'ar' ? 'التقديم مفتوح الآن سبتمبر – أكتوبر 2026' : currentLang === 'ur' ? 'ابھی درخواستیں جمع ہو رہی ہیں' : 'Active Intake: Sep – Oct 2026'}</span>
            </div>
          </div>

          {/* Pillar 6: Campus Housing & Transport */}
          <div className="p-6 rounded-3xl bg-paper border border-gray-150 hover:border-secondary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mb-4">
                <Building2 size={20} className="text-primary" />
              </div>
              <h4 className="font-serif font-bold text-base text-primary mb-2">
                {currentLang === 'ar' ? '6. السكن الجامعي وشبكات النقل الترددي المجاني' : currentLang === 'ur' ? '6. یونیورسٹی ہاسٹل اور مفت ٹرانسپورٹ سروس' : '6. Subsidized Campus Dorms & Free Shuttle Fleets'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {currentLang === 'ar'
                  ? 'توفير السكن الجامعي المدعوم للطلاب القادمين من خارج المنطقة، مع أسطول حافلات ترددية حديثة ومجانية تربط الكليات بمحطات المترو والأحياء السكنية الرئيسية.'
                  : currentLang === 'ur'
                  ? 'دور دراز کے طلباء کے لیے رعایتی ہاسٹل رہائش اور یونیورسٹی کیمپس کو میٹرو اسٹیشنز سے جوڑنے والی جدید مفت بس سروس۔'
                  : 'Furnished on-campus student housing for non-local residents, complemented by air-conditioned rapid-transit campus shuttle networks connecting academic hubs with Riyadh Metro and major commuter corridors.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 size={13} />
              <span>{currentLang === 'ar' ? 'خدمات دعم متكاملة للطلاب' : currentLang === 'ur' ? 'مکمل سہولیات' : 'Full student wellness support'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Freshmen Onboarding Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h4 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                <FileCheck size={18} className="text-secondary" />
                <span>
                  {currentLang === 'ar'
                    ? 'قائمة التحقق التفاعلية لإنهاء إجراءات المستجدين 2026–2027'
                    : currentLang === 'ur'
                    ? 'نئے طلباء کے لیے انٹرایکٹو آن بورڈنگ چیک لسٹ 2026-2027'
                    : 'Interactive Freshmen Induction & Onboarding Checklist 2026–2027'}
                </span>
              </h4>
              <p className="text-xs text-gray-500 font-light mt-1">
                {currentLang === 'ar'
                  ? 'اضغط على المهام لمتابعة استكمال متطلباتك الأكاديمية والمالية في الجامعة:'
                  : 'Click on the checklist milestones to monitor completion of your institutional and banking onboarding:'}
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-primary shadow-sm shrink-0">
              {Object.values(checkedItems).filter(Boolean).length} / 6 {currentLang === 'ar' ? 'مهام منجزة' : currentLang === 'ur' ? 'مکمل شدہ' : 'Completed'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'step1', en: 'National Nafath Seat Confirmation', ar: 'تأكيد القبول النهائي عبر النفاذ الوطني', ur: 'نفاذ کے ذریعے داخلے کی حتمی تصدیق' },
              { id: 'step2', en: 'Tawakkalna Digital Student Card Active', ar: 'تفعيل البطاقة الجامعية بتطبيق توكلنا', ur: 'توکلنا میں ڈیجیٹل اسٹوڈنٹ کارڈ کا اجرا' },
              { id: 'step3', en: 'University Email & Office 365 Login', ar: 'تفعيل البريد الجامعي الرسمي وبلاك بورد', ur: 'یونیورسٹی ای میل اور بلیک بورڈ لاگ ان' },
              { id: 'step4', en: 'EduGate Course Schedule Validation', ar: 'مراجعة وتثبيت الجدول في بوابة البانر', ur: 'ایڈو گیٹ پورٹل پر کلاس ٹائم ٹیبل کی تصدیق' },
              { id: 'step5', en: 'Bank IBAN Registered for Monthly Stipend', ar: 'رصد الآيبان البنكي لصرف المكافأة الشهرية', ur: 'ماہانہ وظیفے کے لیے ذاتی بینک آئی بی اے این کا اندراج' },
              { id: 'step6', en: 'Medical Checkup & Campus Dorm Booking', ar: 'استكمال الفحص الطبي وحجز السكن والنقل', ur: 'میڈیکل فٹنس فارم اور ہاسٹل بکنگ' },
            ].map((task) => (
              <button
                key={task.id}
                onClick={() => toggleCheck(task.id)}
                className={cn(
                  "p-3.5 rounded-2xl border text-start transition-all flex items-start gap-3 text-xs font-medium cursor-pointer",
                  checkedItems[task.id]
                    ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  checkedItems[task.id]
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-gray-300 bg-white"
                )}>
                  {checkedItems[task.id] && <CheckCircle2 size={13} className="text-white" />}
                </div>
                <span className={cn(checkedItems[task.id] ? "line-through opacity-80" : "font-bold text-gray-800")}>
                  {task[currentLang] || task.en}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Comparative Introductions: 2-Semester vs. 3-Semester (Required in separate paragraphs) */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <BookOpen size={16} />
            <span>{currentLang === 'ar' ? 'التحليل الهيكلي للأنظمة الدراسية' : 'Curriculum Architecture Analysis'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {currentLang === 'ar'
              ? 'مقارنة عميقة: أسباب العودة إلى نظام الفصلين وطبيعة نظام الفصول الثلاثة'
              : currentLang === 'ur'
              ? '2 سمسٹر اور 3 سمسٹر سسٹم کا تفصیلی تعلیمی تجزیہ'
              : 'Structural Comparison: The Rationale Behind the 2-Semester Return vs. The 3-Semester Model'}
          </h3>
        </div>

        {/* Separate Paragraph 1: The 2-Semester System */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-primary text-secondary font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-primary">
              {currentLang === 'ar'
                ? 'نظام الفصلين الدراسيين (The 2-Semester System): العمق المعرفي والاستقرار البحثي والمهني'
                : currentLang === 'ur'
                ? '2 سمسٹر سسٹم: علمی گہرائی، تحقیقی استحکام اور انٹرنشپ کی سہولت'
                : 'The 2-Semester Academic Framework: Depth, Research Equilibrium & Industry Co-op Alignment'}
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'يمثل نظام الفصلين الدراسيين الركيزة التقليدية الراسخة في التعليم العالي عالمياً ومحلياً؛ حيث يمتد الفصل الواحد لمدة تتراوح بين 16 إلى 18 أسبوعاً أكاديمياً متكاملاً. يتيح هذا المدى الزمني المتزن لأعضاء هيئة التدريس والطلاب استيعاب المفاهيم العلمية التخصصية دون ضغوط امتحانية متسارعة، وتوفير نافذة زمنية رحبة للمشاريع المعملية والبحوث التخصصية وسنوات الامتياز في الكليات الصحية. والأهم من ذلك، يمنح نظام الفصلين الجامعات عطلة صيفية ممتدة (بين 10 إلى 14 أسبوعاً)، وهي فترة حيوية للغاية في المملكة لإنجاز برامج التدريب التعاوني الإلزامي (Cooperative Training) في كبرى الشركات الوطنية مثل أرامكو وسابك، وإجراء الأبحاث الميدانية الصيفية دون مقاطعة الجداول الدراسية.'
              : currentLang === 'ur'
              ? '2 سمسٹر سسٹم دنیا بھر کی صف اول کی یونیورسٹیوں کا روایتی ماڈل ہے، جس میں ہر سمسٹر 16 سے 18 ہفتوں پر محیط ہوتا ہے۔ یہ دورانیہ طلباء کو مضامین کی گہرائی سمجھنے، امتحانی تناؤ سے بچنے اور پروجیکٹس کو مکمل کرنے کا بھرپور موقع فراہم کرتا ہے۔ اس کا سب سے بڑا فائدہ موسم گرما کی 10 سے 14 ہفتوں پر مشتمل لمبی چھٹیاں ہیں، جو سعودی عرب میں آرامکو اور سابک جیسی بڑی ملٹی نیشنل کمپنیوں میں لازمی صنعتی انٹرنشپ (Co-op) اور فیلڈ ریسرچ کے لیے ناگزیر سمجھی جاتی ہیں۔'
              : 'The traditional 2-semester architecture remains the gold-standard operational model across elite global and regional universities, organizing the academic year into two comprehensive terms spanning 16 to 18 instructional weeks each. This extended timeline affords university students and faculty essential intellectual breathing room to master dense theoretical principles, complete rigorous lab capstones, and fulfill hospital clinical clerkships without the cognitive exhaustion of constant quarterly examinations. Crucially, the 2-semester framework preserves an uninterrupted 10-to-14-week summer recess, which is strategically indispensable in Saudi Arabia for students to complete mandatory corporate co-op internships at major employers like Saudi Aramco, SABIC, and STC, as well as faculty-led research expeditions.'}
          </p>
        </div>

        {/* Separate Paragraph 2: The 3-Semester System */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-amber-950">
              {currentLang === 'ar'
                ? 'نظام الفصول الثلاثة (The 3-Semester System): الطموح المعياري والتحديات التشغيلية في التعليم الجامعي'
                : currentLang === 'ur'
                ? '3 سمسٹر سسٹم: مسلسل رفتار اور اعلیٰ تعلیم میں درپیش انتظامی چیلنجز'
                : 'The 3-Semester Trimester Model: Modular Pacing and Structural Friction in Higher Education'}
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'طُبق نظام الفصول الدراسية الثلاثة بهدف زيادة كفاءة استخدام المنشآت التعليمية على مدار العام وتقليص الإجازات الصيفية الطويلة وتوزيع المقررات على دورات سريعة مدتها 12 أسبوعاً فقط. ومع ذلك، واجه هذا النموذج في التعليم الجامعي تحديات هيكلية؛ إذ أدى تلاحق فترات الاختبارات (ثلاث جولات امتحانية سنوية مع متطلبات الرصد المتسارعة) إلى إجهاد ذهني وأكاديمي للطلاب وهيئات التدريس، وعرقل التوافق مع برامج الابتعاث الدولي والتبادل الطلابي مع الجامعات العالمية. كما تسبب في انكماش الإجازة الصيفية إلى أقل من شهر ونصف، مما أضر بقدرة طلاب الهندسة والحاسب والعلوم على إتمام ساعات التدريب الصناعي الصيفي؛ وهو ما دفع وزارة التعليم بحكمة إلى منح مجالس الجامعات الاستقلالية الكاملة للعودة إلى نظام الفصلين وفق ما تقتضيه طبيعة كل جامعة.'
              : currentLang === 'ur'
              ? '3 سمسٹر سسٹم اس مقصد کے ساتھ نافذ کیا گیا تھا کہ تعلیمی سال کو زیادہ فعال بنایا جائے اور 12 ہفتوں کے تیز رفتار ماڈیولز میں ڈگری کی تکمیل کو تیز کیا جا سکے۔ لیکن یونیورسٹی کی سطح پر اس ماڈل کو شدید انتظامی اور نفسیاتی چیلنجز کا سامنا کرنا پڑا۔ سال میں 3 بار امتحانات، نتائج کی فوری تیاری اور مسلسل دباؤ نے طلباء اور پروفیسرز دونوں کو تھکا دیا۔ اس کے علاوہ موسم گرما کی چھٹیاں انتہائی مختصر ہونے کی وجہ سے انجینئرنگ اور میڈیکل طلباء کے لیے لازمی ہسپتال اور انڈسٹریل ٹریننگ مکمل کرنا ناممکن ہو گیا، جس پر وزارت تعلیم نے جامعات کو اپنی مرضی کا نظام منتخب کرنے کا مکمل اختیار دیا۔'
              : 'The 3-semester trimester system was originally conceptualized to maximize year-round institutional capacity, curtail lengthy summer hiatuses, and accelerate course completions across concise 12-week modular blocks. However, in higher education, this cadence introduced acute logistical and cognitive frictions. Three full examination and grading cycles per academic year led to noticeable assessment fatigue among university students and faculty, while fundamentally complicating international credit transfers and global exchange programs with partner institutions in North America and Europe. Most significantly, compressing the summer recess to under six weeks crippled the feasibility of comprehensive industrial co-op rotations for engineering and computer science undergraduates, prompting the Ministry of Education to prudently grant university councils autonomous discretion to reinstate the 2-semester paradigm.'}
          </p>
        </div>
      </div>

      {/* Photographic Editorial Evidence & Contextual Visual Showcase (3 High-Fidelity Pictures) */}
      <div className="space-y-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <Building2 size={16} />
            <span>{currentLang === 'ar' ? 'شواهد ميدانية ومعالم جامعية' : 'Campus Infrastructure & Academic Life'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {currentLang === 'ar'
              ? 'معالم البيئة الجامعية السعودية للعام الجامعي 2026–2027'
              : currentLang === 'ur'
              ? 'سعودی جامعات کا جدید تعلیمی ماحول اور اکیڈمک سہولیات'
              : 'Campus Infrastructure & Student Experience under the Active 2026–2027 Calendar'}
          </h3>
          <p className="text-sm text-gray-500 font-light mt-1">
            {currentLang === 'ar'
              ? 'صور توثيقية حصرية تجسد جاهزية الصروح الأكاديمية السعودية لاستقبال الطلاب في الفصول الدراسية والمكتبات ومدرجات المحاضرات الحديثة.'
              : 'Documentary editorial visuals illustrating Saudi higher education environments as institutions operate their academic rhythms.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Photo 1: University Campus Exterior */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg flex flex-col group hover:shadow-xl transition-all">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src="/src/assets/images/saudi_university_campus_1790710468947.jpg"
                alt="Modern Saudi university campus architecture with palm courtyards and limestone archways"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-secondary/30">
                {currentLang === 'ar' ? 'صرح أكاديمي' : 'Campus Gateway'}
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-primary mb-1.5">
                  {currentLang === 'ar'
                    ? 'الاستقرار الأكاديمي في الصروح الجامعية'
                    : currentLang === 'ur'
                    ? 'سعودی یونیورسٹی کیمپس کا خوبصورت منظر'
                    : 'Architectural Scale & Campus Readiness'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {currentLang === 'ar'
                    ? 'تصميم عمراني عصري يجمع الأصالة مع المرافق المتقدمة، مستعداً لكافة متطلبات التدريس والبحث في دورة العام 2026–2027.'
                    : 'Premier architectural facilities across Riyadh and the Kingdom, operating under stable 18-week semester operational plans for the 2026–2027 term.'}
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2: Student Studying Academic Calendar in Library */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg flex flex-col group hover:shadow-xl transition-all">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src="/src/assets/images/saudi_student_studying_1790710483668.jpg"
                alt="Saudi university student in traditional dress reviewing academic calendar on a digital tablet in a modern library"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-secondary/30">
                {currentLang === 'ar' ? 'التخطيط الفصلي' : 'Academic Focus'}
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-primary mb-1.5">
                  {currentLang === 'ar'
                    ? 'التخطيط الزمني للتحصيل الأكاديمي'
                    : currentLang === 'ur'
                    ? 'طالب علم ڈیجیٹل کیلنڈر کے ساتھ تیاری میں مصروف'
                    : 'Balanced Study Pacing & Exam Strategy'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {currentLang === 'ar'
                    ? 'يتيح نظام الفصلين للطلاب تخطيط مواعيد الاختبارات النصفية والنهائية بهدوء، مستفيدين من مصادر التعلم الرقمية والمكتبات الجامعية المتطورة.'
                    : 'The extended semester window allows students to manage coursework milestones and midterms effectively with minimal exam overlap.'}
                </p>
              </div>
            </div>
          </div>

          {/* Photo 3: Modern Amphitheater Lecture Hall */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg flex flex-col group hover:shadow-xl transition-all">
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src="/src/assets/images/lecture_hall_meeting_1790710495135.jpg"
                alt="State of the art amphitheater lecture hall in a Saudi university with tiered seating and digital presentation screens"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-secondary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-secondary/30">
                {currentLang === 'ar' ? 'مدرجات المحاضرات' : 'Lecture Halls'}
              </span>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-primary mb-1.5">
                  {currentLang === 'ar'
                    ? 'مدرجات المحاضرات والاختبارات المركزية'
                    : currentLang === 'ur'
                    ? 'جدید ترین آڈیٹوریم اور لیکچر ہال'
                    : 'Instructional Continuity & Evaluations'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {currentLang === 'ar'
                    ? 'مدرجات مصممة بأعلى المعايير الصوتية والتقنية لتوفير بيئة تدريسية تفاعلية تتناغم مع الأسابيع الـ 18 للفصلين الدراسيين.'
                    : 'Acoustically engineered amphitheaters hosting comprehensive course lecture series and verified final assessment periods.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Master Academic Calendar Dates Table with Dynamic Session Switcher */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.25em] block mb-1">
              {currentLang === 'ar' ? 'الجدول الزمني الرسمي للعام الجامعي' : 'Master Academic Chronology'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {selectedSession === '1448' ? (
                currentLang === 'ar'
                  ? 'التقويم الأكاديمي للعام الجامعي الجاري 1448هـ (2026–2027م)'
                  : currentLang === 'ur'
                  ? 'موجودہ تعلیمی سال 1448ھ (2026–2027ء) کا آفیشل اکیڈمک کیلنڈر'
                  : 'Official Academic Calendar for Active Session 2026–2027 (1448H)'
              ) : (
                currentLang === 'ar'
                  ? 'التقويم الأكاديمي المعتمد لعام 1447هـ (2025–2026م)'
                  : currentLang === 'ur'
                  ? 'تعلیمی سال 1447ھ (2025–2026ء) کا سرکاری کیلنڈر'
                  : 'Official Academic Calendar for Session 1447H (2025–2026)'
              )}
            </h3>
          </div>

          {/* Academic Session Switcher Toggle */}
          <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl shrink-0">
            <button
              onClick={() => setSelectedSession('1448')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                selectedSession === '1448'
                  ? "bg-primary text-secondary shadow-md"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {currentLang === 'ar' ? 'العام الجاري 1448هـ (2026–27)' : currentLang === 'ur' ? 'موجودہ 2026-27 (1448ھ)' : 'Current 2026–27 (1448H)'}
              </span>
            </button>

            <button
              onClick={() => setSelectedSession('1447')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                selectedSession === '1447'
                  ? "bg-primary text-secondary shadow-md"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              <span>
                {currentLang === 'ar' ? 'تقويم 1447هـ (2025–26)' : currentLang === 'ur' ? 'تقویم 1447ھ (2025-26)' : 'Session 1447H (2025–26)'}
              </span>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 font-light leading-relaxed">
          {selectedSession === '1448' ? (
            currentLang === 'ar'
              ? 'المواعيد التشغيلية المعتمدة للعام الدراسي الجاري 2026–2027 (1448هـ) لبدء الفصول، إجازة اليوم الوطني، إجازة الخريف، عيد الفطر 1448هـ، وعيد الأضحى المبارك:'
              : currentLang === 'ur'
              ? 'موجودہ تعلیمی سال 2026-2027 (1448ھ) کے امتحانات، قومی چھٹیاں، عید الفطر 1448ھ اور گرمیوں کی تعطیلات کا مصدقہ شیڈول:'
              : 'Verified operational milestone dates for the active 2026–2027 (1448H) session detailing semester start dates, Fall exams, Ramadan & Eid breaks, and summer recess:'
          ) : (
            currentLang === 'ar'
              ? 'المواعيد التشغيلية الرسمية المعتمدة من مجلس الوزراء ووزارة التعليم لعام 1447هـ (2025–2026م) مع إجازة عيد الفطر الممتدة (06–28 مارس 2026م):'
              : currentLang === 'ur'
              ? 'سعودی کابینہ سے منظور شدہ سال 1447ھ (2025–2026ء) کا تعلیمی شیڈول اور عید الفطر کی 23 روزہ چھٹیاں:'
              : 'Official operational milestone dates for 1447H (2025–2026) session as approved by the Ministry of Education, featuring the 23-day Eid Al-Fitr recess:'
          )}
        </p>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
          {selectedSession === '1448' 
            ? (CALENDAR_BREAKDOWN_TABLE_1448[currentLang] || CALENDAR_BREAKDOWN_TABLE_1448.en)
            : (CALENDAR_BREAKDOWN_TABLE_1447[currentLang] || CALENDAR_BREAKDOWN_TABLE_1447.en)}
        </ReactMarkdown>
      </div>

      {/* Interactive Live "University Academic Calendar Tracker" (Searchable & Filterable) */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Sparkles size={16} />
              <span>{currentLang === 'ar' ? 'المرصد التفاعلي المباشر' : 'Live Interactive Directory'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {currentLang === 'ar'
                ? 'مرصد الأنظمة المعتمدة لكافة الجامعات السعودية (فصلين مقابل فصول ثلاثة)'
                : currentLang === 'ur'
                ? 'تمام سعودی جامعات کے تعلیمی نظام اور امتحانات کا براہ راست ٹریکر'
                : 'Live Saudi University Calendar & System Tracker by Institution'}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-1">
              {currentLang === 'ar'
                ? `تعرض البطاقات أدناه مواعيد العام: ${selectedSession === '1448' ? '2026–2027 (1448هـ)' : '2025–2026 (1447هـ)'}`
                : `Displaying dates for Session: ${selectedSession === '1448' ? '2026–2027 (1448H Active)' : '2025–2026 (1447H)'}`}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: { en: 'All Universities', ar: 'كافة الجامعات', ur: 'تمام جامعات' } },
              { id: 'two_semester', label: { en: '2-Semester (نظام الفصلين)', ar: 'نظام الفصلين (90%)', ur: '2 سمسٹر سسٹم' } },
              { id: 'three_semester', label: { en: '3-Semester (فصول ثلاثة)', ar: 'فصول ثلاثة', ur: '3 سمسٹر سسٹم' } },
            ].map(f => (
              <button
                key={`filter-sys-${f.id}`}
                onClick={() => setSystemFilter(f.id as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                  systemFilter === f.id
                    ? "bg-primary text-secondary border-primary shadow-md"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                )}
              >
                {f.label[currentLang] || f.label.en}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'ar'
                ? 'ابحث باسم الجامعة أو المنطقة (مثل: الملك سعود، الظهران، جدة)...'
                : currentLang === 'ur'
                ? 'یونیورسٹی کا نام یا شہر تلاش کریں...'
                : 'Search by university name or region (e.g. King Saud, KFUPM, Jeddah)...'
            }
            className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-2xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-xs sm:text-sm bg-gray-50/50"
          />
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUniversities.map((uni) => {
            const isTwoSemester = uni.system === 'two_semester';
            const sessionSchedule = selectedSession === '1448' ? uni.session1448 : uni.session1447;

            return (
              <div
                key={`uni-status-${uni.id}`}
                className={cn(
                  "rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl",
                  isTwoSemester 
                    ? "bg-white border-gray-200/80 hover:border-emerald-600/50" 
                    : "bg-amber-50/40 border-amber-200 hover:border-amber-400"
                )}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <MapPin size={13} className="text-secondary" />
                      <span>{uni.region[currentLang] || uni.region.en}</span>
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border",
                      isTwoSemester 
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-amber-100 text-amber-900 border-amber-300"
                    )}>
                      {isTwoSemester 
                        ? (currentLang === 'ar' ? 'نظام الفصلين (18 أسبوعاً)' : currentLang === 'ur' ? '2 سمسٹر سسٹم' : '2-Semester (16–18 Wks)')
                        : (currentLang === 'ar' ? 'نظام الفصول الثلاثة' : currentLang === 'ur' ? '3 سمسٹر سسٹم' : '3-Semester Trimester')}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-lg sm:text-xl text-primary group-hover:text-secondary transition-colors mb-4">
                    {uni.name[currentLang] || uni.name.en}
                  </h4>

                  <div className="space-y-2 text-xs text-gray-700 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 mb-4">
                    <div className="flex justify-between py-1 border-b border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        {currentLang === 'ar' ? 'انطلاق الفصل الأول:' : currentLang === 'ur' ? 'پہلا سمسٹر:' : 'Fall Term Start:'}
                      </span>
                      <strong className="text-primary font-bold">{sessionSchedule.fallTermStart[currentLang] || sessionSchedule.fallTermStart.en}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        {currentLang === 'ar' ? 'اختبارات الفصل الأول:' : currentLang === 'ur' ? 'پہلے سمسٹر کے امتحانات:' : 'Fall Final Exams:'}
                      </span>
                      <strong className="text-primary font-bold">{sessionSchedule.fallExams[currentLang] || sessionSchedule.fallExams.en}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        {currentLang === 'ar' ? 'انطلاق الفصل الثاني:' : currentLang === 'ur' ? 'دوسرا سمسٹر:' : 'Spring Term Start:'}
                      </span>
                      <strong className="text-primary font-bold">{sessionSchedule.springTermStart[currentLang] || sessionSchedule.springTermStart.en}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        {currentLang === 'ar' ? 'اختبارات الفصل الثاني:' : currentLang === 'ur' ? 'دوسرے سمسٹر کے امتحانات:' : 'Spring Final Exams:'}
                      </span>
                      <strong className="text-primary font-bold">{sessionSchedule.springExams[currentLang] || sessionSchedule.springExams.en}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500 font-medium">
                        {currentLang === 'ar' ? 'التدريب الصيفي / الامتياز:' : currentLang === 'ur' ? 'سمر انٹرنشپ:' : 'Summer Co-op:'}
                      </span>
                      <strong className="text-secondary font-bold">{sessionSchedule.summerTraining[currentLang] || sessionSchedule.summerTraining.en}</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100 font-light">
                  <span className="font-bold text-gray-700">{currentLang === 'ar' ? 'القرار المؤسسي: ' : 'Council Decision: '}</span>
                  {uni.notes[currentLang] || uni.notes.en}
                </p>
              </div>
            );
          })}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="p-12 text-center text-gray-400 font-light text-sm">
            {currentLang === 'ar' ? 'لم يتم العثور على جامعات تطابق معايير البحث الحالية.' : 'No universities match your current search query.'}
          </div>
        )}
      </div>
    </section>
  );
};
