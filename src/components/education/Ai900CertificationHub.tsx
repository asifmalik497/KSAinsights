import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Award, CheckCircle2, HelpCircle, 
  ArrowRight, RotateCcw, ShieldCheck, Send,
  AlertTriangle, Cpu, BrainCircuit, GraduationCap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { cn } from '../../lib/utils';

interface Ai900CertificationHubProps {
  currentLang: 'en' | 'ar' | 'ur';
}

interface QuizQuestion {
  id: number;
  domain: {
    en: string;
    ar: string;
    ur: string;
  };
  domainBadge: string;
  question: {
    en: string;
    ar: string;
    ur: string;
  };
  options: {
    key: string;
    text: {
      en: string;
      ar: string;
      ur: string;
    };
  }[];
  correctKey: string;
  explanation: {
    en: string;
    ar: string;
    ur: string;
  };
  trapWarning?: {
    en: string;
    ar: string;
    ur: string;
  };
}

const DIAGNOSTIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    domain: {
      en: 'AI Workloads & Considerations',
      ar: 'أعباء عمل الذكاء الاصطناعي واعتباراته',
      ur: 'مصنوعی ذہانت کے ورک لوڈز اور بنیادی اصول'
    },
    domainBadge: 'Responsible AI (15-20%)',
    question: {
      en: 'A commercial bank in Riyadh deploys an AI credit-scoring model. The model unintentionally denies loans to female entrepreneurs at a significantly higher rate than male applicants with identical financial profiles. Which Microsoft Responsible AI principle has been violated?',
      ar: 'يقوم مصرف تجاري في الرياض بنشر نموذج ذكاء اصطناعي للتصنيف الائتماني. يرفض النموذج قروض رائدات الأعمال بمعدل أعلى بكثير مقارنة بالمتقدمين الذكور الذين يمتلكون سجلات مالية متطابقة. ما هو مبدأ الذكاء الاصطناعي المسؤول الذي تم انتهاكه؟',
      ur: 'ریاض کے ایک تجارتی بینک نے کریڈٹ اسکورنگ کے لیے اے آئی ماڈل نافذ کیا۔ یہ ماڈل یکساں مالی پروفائل رکھنے کے باوجود خواتین کاروباریوں کے قرضے مردوں کے مقابلے نمایاں طور پر زیادہ مسترد کر رہا ہے۔ مائیکروسافٹ کے کس ذمہ دارانہ اے آئی اصول کی خلاف ورزی ہوئی ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Reliability and safety (الموثوقية والسلامة)', ar: 'الموثوقية والسلامة (Reliability and Safety)', ur: 'قابل اعتماد ہونا اور حفاظت' } },
      { key: 'B', text: { en: 'Fairness (الإنصاف / العدالة)', ar: 'الإنصاف والعدالة (Fairness)', ur: 'انصاف اور برابری (Fairness)' } },
      { key: 'C', text: { en: 'Transparency (الشفافية)', ar: 'الشفافية (Transparency)', ur: 'شفافیت (Transparency)' } },
      { key: 'D', text: { en: 'Accountability (المساءلة)', ar: 'المساءلة (Accountability)', ur: 'احتساب اور جوابدہی' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Fairness mandates that AI systems should treat all people fairly without bias or discrimination based on gender, ethnicity, or demographic traits.',
      ar: 'ينص مبدأ الإنصاف والعدالة (Fairness) على ضرورة معاملة أنظمة الذكاء الاصطناعي لجميع الأشخاص بعدالة وتكافؤ دون تحيز قائم على الجنس أو العرق.',
      ur: 'انصاف (Fairness) کا تقاضا ہے کہ تمام افراد کے ساتھ بغیر کسی صنفی یا نسلی تعصب کے برابری کا سلوک کیا جائے۔'
    },
    trapWarning: {
      en: 'Exam Trap: Candidates often confuse Fairness with Transparency. Transparency means explaining HOW decisions are made, whereas Fairness governs UNBIASED treatment.',
      ar: 'فخ الاختبار: يخلط البعض بين الإنصاف والشفافية. الشفافية تعني شرح كيفية اتخاذ القرار، بينما الإنصاف يمنع التمييز والتحيز.',
      ur: 'امتحانی نکتہ: شفافیت کا مطلب فیصلہ سازی کی وضاحت ہے، جبکہ انصاف کا مطلب غیر جانبدارانہ برتاؤ ہے۔'
    }
  },
  {
    id: 2,
    domain: {
      en: 'Machine Learning Fundamentals',
      ar: 'المبادئ الأساسية للتعلم الآلي',
      ur: 'مشین لرننگ کے بنیادی اصول'
    },
    domainBadge: 'Azure Machine Learning (20-25%)',
    question: {
      en: 'An agricultural enterprise in Al-Qassim wants to predict the exact date palm yield in kilograms (numerical value) based on soil moisture, daily temperature, and irrigation volume. Which type of machine learning model should be trained?',
      ar: 'ترغب شركة زراعية في القصيم في التنبؤ بإنتاجية النخيل بالكيلوغرام (قيمة عددية مستمرة) بناءً على رطوبة التربة ودرجات الحرارة وكميات الري. ما نوع نموذج التعلم الآلي المطلوب تدريبه؟',
      ur: 'قصیم کی ایک زرعی کمپنی مٹی کی نمی، درجہ حرارت اور پانی کی بنیاد پر کھجور کی کل پیداوار کلوگرام (عددی قیمت) میں معلوم کرنا چاہتی ہے۔ اسے کس قسم کا مشین لرننگ ماڈل تربیت دینا چاہیے؟'
    },
    options: [
      { key: 'A', text: { en: 'Binary classification (التصنيف الثنائي)', ar: 'التصنيف الثنائي (Binary Classification)', ur: 'بائنری درجہ بندی (ہاں یا نہ)' } },
      { key: 'B', text: { en: 'Clustering (التجميع غير الموجه)', ar: 'التجميع غير الخاضع للإشراف (Clustering)', ur: 'کلسٹرنگ (غیر منظم گروہ بندی)' } },
      { key: 'C', text: { en: 'Regression (الانحدار)', ar: 'الانحدار والتنبؤ العددي (Regression)', ur: 'ریگریشن عددی تخمینہ (Regression)' } },
      { key: 'D', text: { en: 'Multiclass classification (التصنيف متعدد الفئات)', ar: 'التصنيف متعدد الفئات (Multiclass Classification)', ur: 'کثیر الجہتی درجہ بندی' } }
    ],
    correctKey: 'C',
    explanation: {
      en: 'Regression is used whenever the target label to predict is a continuous numeric quantity (such as weight in kilograms, price, or temperature). Classification predicts discrete categories.',
      ar: 'يُستخدم الانحدار (Regression) دائمًا عندما تكون القيمة المطلوب التنبؤ بها رقمًا كميًا مستمرًا (كالوزن بالكيلوغرام، السعر، أو درجات الحرارة). بينما التصنيف يتنبأ بفئات وتصنيفات.',
      ur: 'جب بھی کسی مسلسل عددی مقدار (جیسے کلوگرام یا قیمت) کی پیش گوئی درکار ہو تو ہمیشہ ریگریشن (Regression) کا انتخاب کیا جاتا ہے۔'
    }
  },
  {
    id: 3,
    domain: {
      en: 'Computer Vision Workloads',
      ar: 'أعباء عمل الرؤية الحاسوبية',
      ur: 'کمپیوٹر وژن کے ورک لوڈز'
    },
    domainBadge: 'Azure Vision (15-20%)',
    question: {
      en: 'A logistics warehouse at King Abdulaziz Port in Dammam needs an automated system to detect shipping containers in video feeds, count them, and highlight their precise bounding box coordinates on screen. Which computer vision task is this?',
      ar: 'يحتاج مستودع لوجستي في ميناء الملك عبد العزيز بالدمام إلى نظام آلي لاكتشاف حاويات الشحن في تسجيلات الفيديو، وعدّها، وتحديد إحداثيات مستطيل الإحاطة (Bounding Box) لكل حاوية على الشاشة. ما هي مهمة الرؤية الحاسوبية هذه؟',
      ur: 'دمام کی بندرگاہ پر واقع لاجسٹک گودام کو ویڈیو میں کنٹینرز کی شناخت، ان کی گنتی اور اسکرین پر ان کی قطعی پوزیشن (Bounding Box) کے تعین کی ضرورت ہے۔ یہ کمپیوٹر وژن کا کون سا ٹاسک ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Image classification (تصنيف الصور)', ar: 'تصنيف الصور (Image Classification)', ur: 'تصویر کی درجہ بندی' } },
      { key: 'B', text: { en: 'Object detection (اكتشاف الكائنات وتحديدها)', ar: 'اكتشاف الكائنات (Object Detection)', ur: 'اشیاء کی شناخت اور لوکیشن (Object Detection)' } },
      { key: 'C', text: { en: 'Semantic segmentation (التجزئة الدلالية للبكسل)', ar: 'التجزئة الدلالية (Semantic Segmentation)', ur: 'سیمنٹک سیگمنٹیشن' } },
      { key: 'D', text: { en: 'Optical Character Recognition (التعرف الضوئي على الحروف)', ar: 'التعرف الضوئي على الحروف (OCR)', ur: 'تحریر پڑھنے کی ٹیکنالوجی (OCR)' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Object detection identifies multiple items within an image AND provides bounding box coordinates with labels for each item. Image classification only assigns a single label to the entire image.',
      ar: 'اكتشاف الكائنات (Object Detection) يحدد عناصر متعددة داخل الصورة ويقدم إحداثيات مستطيل الإحاطة (Bounding Box) لكل عنصر. أما تصنيف الصور فيعطي تصنيفًا واحدًا لكامل الصورة.',
      ur: 'آبجیکٹ ڈیٹیکشن (Object Detection) تصویر میں موجود اشیاء کو تلاش کر کے ان کے گرد bounding box بناتا ہے اور ان کا شمار کرتا ہے۔'
    }
  },
  {
    id: 4,
    domain: {
      en: 'Natural Language Processing',
      ar: 'معالجة اللغات الطبيعية',
      ur: 'قدرتی زبان کی پروسیسنگ (NLP)'
    },
    domainBadge: 'Azure AI Language (15-20%)',
    question: {
      en: 'A retail chain in Jeddah wants to analyze thousands of Arabic customer reviews on Google Maps and classify each review as Positive, Neutral, or Negative to monitor brand reputation. Which prebuilt Azure AI Language feature should they use?',
      ar: 'ترغب سلسلة متاجر تجزئة في جدة في تحليل آلاف تقييمات العملاء باللغة العربية على خرائط Google وتصنيف كل تقييم إلى (إيجابي، محايد، سلبي) لمراقبة سمعة العلامة التجارية. ما هي ميزة Azure AI Language المضمنة مسبقًا التي يجب استخدامها؟',
      ur: 'جدہ کا ایک ریٹیل اسٹور گوگل میپس پر کسٹمرز کے عربی تبصروں کا تجزیہ کر کے انہیں مثبت، غیر جانبدار یا منفی کے طور پر درجہ بند کرنا چاہتا ہے۔ اسے Azure AI Language کی کون سی خصوصیت استعمال کرنی چاہیے؟'
    },
    options: [
      { key: 'A', text: { en: 'Key phrase extraction (استخراج العبارات الأساسية)', ar: 'استخراج العبارات الأساسية (Key Phrase Extraction)', ur: 'اہم الفاظ کا اخراج' } },
      { key: 'B', text: { en: 'Sentiment analysis (تحليل المشاعر والآراء)', ar: 'تحليل المشاعر (Sentiment Analysis)', ur: 'جذبات اور تاثرات کا تجزیہ (Sentiment Analysis)' } },
      { key: 'C', text: { en: 'Named Entity Recognition (التعرف على الكيانات المسماة)', ar: 'التعرف على الكيانات المسماة (NER)', ur: 'ناموں اور مقامات کی شناخت (NER)' } },
      { key: 'D', text: { en: 'Language detection (اكتشاف اللغة)', ar: 'اكتشاف اللغة (Language Detection)', ur: 'زبان کی خودکار شناخت' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Sentiment Analysis evaluates text and returns sentiment labels (positive, negative, neutral) along with numeric confidence scores, natively supporting Arabic text.',
      ar: 'تحليل المشاعر (Sentiment Analysis) يقيّم النصوص ويعيد تقييمات المشاعر (إيجابي، سلبي، محايد) مع درجات الثقة الإحصائية ويدعم اللغة العربية بشكل كامل.',
      ur: 'سینٹیمنٹ اینالائسس (Sentiment Analysis) تحریر کا جائزہ لے کر اس کے منفی یا مثبت ہونے کا قطعی سکور فراہم کرتا ہے۔'
    }
  },
  {
    id: 5,
    domain: {
      en: 'Generative AI & Azure OpenAI',
      ar: 'الذكاء الاصطناعي التوليدي وAzure OpenAI',
      ur: 'جنریٹو اے آئی اور ایژور اوپن اے آئی'
    },
    domainBadge: 'Azure OpenAI & Copilots (15-20%)',
    question: {
      en: 'When integrating a Large Language Model (LLM) through Azure OpenAI Service, what is the best practice to prevent "hallucinations" and ensure answers are strictly rooted in your internal corporate policy documents?',
      ar: 'عند دمج نموذج لغوي كبير (LLM) عبر خدمة Azure OpenAI، ما هي أفضل ممارسة معتمدة لمنع "الهلوسة" والتأكد من أن الإجابات مستندة حصريًا إلى وثائق سياسات الشركة الداخلية؟',
      ur: 'ایژور اوپن اے آئی سروس کے ذریعے لارج لینگویج ماڈل کو استعمال کرتے ہوئے غلط معلومات (Hallucinations) سے بچنے اور صرف کمپنی کے اندرونی دستاویزات سے جواب حاصل کرنے کا بہترین طریقہ کیا ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Increase the model temperature to 1.8 for higher creativity', ar: 'رفع درجة حرارة النموذج (Temperature) إلى 1.8 لزيادة الإبداع', ur: 'درجہ حرارت (Temperature) کو 1.8 تک بڑھانا' } },
      { key: 'B', text: { en: 'Use Retrieval Augmented Generation (RAG) with Azure AI Search grounding', ar: 'تطبيق توليد الاسترجاع المعزز (RAG) مع تأريض البيانات بواسطة Azure AI Search', ur: 'ریٹریول آگمنٹڈ جنریشن (RAG) اور سرچ گراؤنڈنگ کا استعمال' } },
      { key: 'C', text: { en: 'Retrain the foundation GPT-4 model from scratch with your files', ar: 'إعادة تدريب نموذج GPT-4 الأساسي من البداية باستخدام ملفاتك', ur: 'ماڈل کو شروع سے دوبارہ ٹرین کرنا' } },
      { key: 'D', text: { en: 'Shorten system prompts to less than five words', ar: 'تقليص التعليمات الإرشادية إلى أقل من خمس كلمات', ur: 'پرامپٹ کو 5 الفاظ سے کم رکھنا' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Retrieval-Augmented Generation (RAG) grounds the LLM responses by fetching relevant context from corporate document indexes (Azure AI Search) before passing the prompt to the language model.',
      ar: 'تقنية توليد الاسترجاع المعزز (RAG) تقوم بتأريض إجابات النموذج عبر استرجاع السياق الموثق من فهارس الشركة (Azure AI Search) قبل توليد الإجابة، مما يقضي على الهلوسة.',
      ur: 'RAG ٹیکنالوجی ایژور اے آئی سرچ کے ذریعے کمپنی کے اصلی ریکارڈز سے معلومات نکال کر ماڈل کو فراہم کرتی ہے جس سے غلط جوابات کا امکان ختم ہو جاتا ہے۔'
    }
  },
  {
    id: 6,
    domain: {
      en: 'AI Workloads & Considerations',
      ar: 'أعباء عمل الذكاء الاصطناعي واعتباراته',
      ur: 'مصنوعی ذہانت کے ورک لوڈز'
    },
    domainBadge: 'Responsible AI (15-20%)',
    question: {
      en: 'An AI healthcare triage app deployed in a hospital provides detailed diagnostic confidence scores, references to clinical guidelines, and plain-language summaries so doctors can understand why a patient was flagged for urgent care. Which Responsible AI principle is highlighted?',
      ar: 'يقدم تطبيق طبي ذكي في مستشفى درجات ثقة تشخيصية مفصلة، ومراجع للأدلة الإكلينيكية، وملخصات مفهومة تُمكّن الأطباء من معرفة سبب تصنيف المريض كحالة حرجة. أي مبدأ من مبادئ الذكاء الاصطناعي المسؤول يتجسد هنا؟',
      ur: 'ہسپتال کی میڈیکل اے آئی ایپ ڈاکٹرز کو یہ واضح ثبوت اور اسکور فراہم کرتی ہے کہ مریض کو ایمرجنسی وارڈ کے لیے کیوں منتخب کیا گیا۔ یہ کس اصول کی عکاسی کرتا ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Inclusiveness (الشمولية)', ar: 'الشمولية (Inclusiveness)', ur: 'شمولیت (Inclusiveness)' } },
      { key: 'B', text: { en: 'Transparency (الشفافية وقابلية التفسير)', ar: 'الشفافية (Transparency)', ur: 'شفافیت اور وضاحت پذیری (Transparency)' } },
      { key: 'C', text: { en: 'Privacy and security (الخصوصية والأمان)', ar: 'الخصوصية والأمان (Privacy and Security)', ur: 'رازداری اور ڈیٹا کا تحفظ' } },
      { key: 'D', text: { en: 'Fairness (الإنصاف)', ar: 'الإنصاف (Fairness)', ur: 'انصاف (Fairness)' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Transparency requires that AI systems are understandable and explainable to users and stakeholders, allowing them to comprehend system decisions.',
      ar: 'يتطلب مبدأ الشفافية (Transparency) أن تكون أنظمة الذكاء الاصطناعي مفهومة وقابلة للتفسير للمستخدمين والمعنيين، مما يمكنهم من فهم أسباب القرارات المتخذة.',
      ur: 'شفافیت (Transparency) کا بنیادی مقصد یہ ہے کہ ماڈل کے فیصلوں کی وجوہات انسانی ماہرین کے لیے مکمل طور پر واضح اور قابل تصدیق ہوں۔'
    }
  },
  {
    id: 7,
    domain: {
      en: 'Computer Vision Workloads',
      ar: 'أعباء عمل الرؤية الحاسوبية',
      ur: 'کمپیوٹر وژن کے ورک لوڈز'
    },
    domainBadge: 'Azure Vision (15-20%)',
    question: {
      en: 'A government department in Riyadh needs to extract printed national ID numbers, Arabic handwritten names, and dates from scanned paper forms into a structured database. Which Azure AI service should they choose?',
      ar: 'تحتاج جهة حكومية بالرياض إلى استخراج أرقام الهوية المطبوعة، والأسماء المكتوبة بخط اليد باللغة العربية، والتواريخ من النماذج الورقية الممسوحة ضوئيًا وتحويلها إلى قاعدة بيانات منظمة. ما هي خدمة Azure AI الأنسب؟',
      ur: 'ایک سرکاری محکمے کو اسکین شدہ کاغذی فارمز سے عربی دستی تحریر، شناختی کارڈ نمبرز اور تاریخیں خودکار طریقے سے ڈیٹا بیس میں منتقل کرنی ہیں۔ کون سی ایژور سروس منتخب کرنی چاہیے؟'
    },
    options: [
      { key: 'A', text: { en: 'Azure AI Document Intelligence (formerly Form Recognizer)', ar: 'ذكاء المستندات Azure AI Document Intelligence (سابقاً Form Recognizer)', ur: 'ایژور ڈاکومنٹ انٹیلی جنس (Azure AI Document Intelligence)' } },
      { key: 'B', text: { en: 'Azure AI Face API', ar: 'واجهة برمجة تطبيقات الوجه Azure AI Face API', ur: 'ایژور فیس اے پی آئی' } },
      { key: 'C', text: { en: 'Azure AI Custom Vision (Object Detection)', ar: 'الرؤية المخصصة Azure AI Custom Vision', ur: 'کسٹم وژن' } },
      { key: 'D', text: { en: 'Azure Video Indexer', ar: 'مفهرس الفيديو Azure Video Indexer', ur: 'ویڈیو انڈیکسر' } }
    ],
    correctKey: 'A',
    explanation: {
      en: 'Azure AI Document Intelligence (formerly Form Recognizer) uses advanced machine learning to extract key-value pairs, tables, and handwritten/printed text from forms and documents.',
      ar: 'تستخدم خدمة Azure AI Document Intelligence (المعروفة سابقاً باسم Form Recognizer) التعلم الآلي المتقدم لاستخراج أزواج المفاتيح والقيم، والجداول، والنصوص المكتوبة بخط اليد من النماذج الرسمية.',
      ur: 'فارمز اور کاغذات سے تحریری فیلڈز اور ٹیبلز نکالنے کے لیے سرکاری اور بینکاری سطح پر Azure AI Document Intelligence کا استعمال کیا جاتا ہے۔'
    }
  },
  {
    id: 8,
    domain: {
      en: 'Machine Learning Fundamentals',
      ar: 'المبادئ الأساسية للتعلم الآلي',
      ur: 'مشین لرننگ کے بنیادی اصول'
    },
    domainBadge: 'Azure Machine Learning (20-25%)',
    question: {
      en: 'When evaluating a binary classification model for fraud detection, you observe that the model achieves 99.4% accuracy on training data, but drops to 61% accuracy on unseen validation data. What problem is the model experiencing?',
      ar: 'أثناء تقييم نموذج تصنيف ثنائي لكشف الاحتيال المالي، لاحظت أن النموذج يحقق دقة 99.4% على بيانات التدريب، لكن تنخفض دقته إلى 61% فقط على بيانات التحقق الجديدة. ما هي المشكلة التي يعاني منها النموذج؟',
      ur: 'دھوکہ دہی کی روک تھام کے لیے ماڈل کی ٹریننگ کے دوران ٹریننگ ڈیٹا پر 99.4 فیصد درستگی ملتی ہے مگر نئے ٹیسٹ ڈیٹا پر یہ کم ہو کر 61 فیصد رہ جاتی ہے۔ اس خرابی کو کیا کہا جاتا ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Underfitting (ضعف الملاءمة)', ar: 'ضعف الملاءمة (Underfitting)', ur: 'انڈر فٹنگ (Underfitting)' } },
      { key: 'B', text: { en: 'Overfitting (الإفراط في الملاءمة / حفظ البيانات)', ar: 'الإفراط في الملاءمة (Overfitting)', ur: 'اوور فٹنگ (Overfitting - ڈیٹا حفظ کر لینا)' } },
      { key: 'C', text: { en: 'Data drift (انحراف البيانات)', ar: 'انحراف البيانات (Data Drift)', ur: 'ڈیٹا ڈرفٹ' } },
      { key: 'D', text: { en: 'Hyperparameter tuning failure', ar: 'فشل ضبط المعلمات الفوقية', ur: 'ہائپر پیرامیٹر ٹیوننگ کی ناکامی' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Overfitting occurs when a model memorizes the training data noise instead of learning general patterns, resulting in superior training metrics but poor performance on new data.',
      ar: 'يحدث الإفراط في الملاءمة (Overfitting) عندما يقوم النموذج بحفظ ضوضاء بيانات التدريب بدلاً من تعلم الأنماط العامة، مما يؤدي إلى دقة وهمية عالية في التدريب وفشل ذريع مع البيانات الجديدة.',
      ur: 'اوور فٹنگ میں ماڈل اصول سیکھنے کی بجائے ٹریننگ ڈیٹا کو حفظ کر لیتا ہے جس کی وجہ سے حقیقی دنیا میں فیل ہو جاتا ہے۔'
    }
  },
  {
    id: 9,
    domain: {
      en: 'Natural Language Processing',
      ar: 'معالجة اللغات الطبيعية',
      ur: 'قدرتی زبان کی پروسیسنگ (NLP)'
    },
    domainBadge: 'Azure AI Speech & Language (15-20%)',
    question: {
      en: 'A Saudi telecom contact center needs an automated system to listen to incoming customer phone calls in Arabic, convert spoken audio into Arabic text in real time, and route callers to the right department. Which Azure AI service performs the audio-to-text conversion?',
      ar: 'يحتاج مركز اتصال لشركة اتصالات سعودية إلى نظام آلي للاستماع إلى المكالمات الهاتفية باللغة العربية، وتحويل الصوت المنطوق إلى نص عربي لحظي، وتوجيه المتصلين. ما هي خدمة Azure AI المسؤولة عن تحويل الصوت إلى نص؟',
      ur: 'ایک سعودی ٹیلی کام کمپنی کو کسٹمر سروس کالز کو سن کر عربی آڈیو کو فوری طور پر تحریری ٹیکسٹ میں تبدیل کرنے والی سروس درکار ہے۔ کون سی سروس یہ کام کرتی ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'Azure AI Speech (Speech-to-Text)', ar: 'خدمة الكلام Azure AI Speech (تحويل الكلام إلى نص)', ur: 'ایژور اسپیچ ٹو ٹیکسٹ (Speech-to-Text)' } },
      { key: 'B', text: { en: 'Azure AI Translator', ar: 'خدمة المترجم Azure AI Translator', ur: 'ایژور ٹرانسلیٹر' } },
      { key: 'C', text: { en: 'Azure AI Language (Text Analytics)', ar: 'تحليلات النصوص Azure AI Language', ur: 'ایژور ٹیکسٹ اینالٹکس' } },
      { key: 'D', text: { en: 'Azure Bot Framework Composer', ar: 'أداة Bot Framework Composer', ur: 'بوٹ فریم ورک' } }
    ],
    correctKey: 'A',
    explanation: {
      en: 'Azure AI Speech provides Speech-to-Text (STT) capabilities supporting Arabic dialects, allowing live transcription of audio streams into text format.',
      ar: 'توفر خدمة Azure AI Speech إمكانية تحويل الكلام إلى نص (Speech-to-Text) مع دعم اللهجات العربية، مما يسمح بتدوين المكالمات الصوتية مباشرة إلى نصوص.',
      ur: 'ایژور اسپیچ (Azure AI Speech) آواز کو درست انداز میں عربی تحریر میں تبدیل کرنے کی مکمل صلاحیت رکھتی ہے۔'
    }
  },
  {
    id: 10,
    domain: {
      en: 'Generative AI & Azure OpenAI',
      ar: 'الذكاء الاصطناعي التوليدي وAzure OpenAI',
      ur: 'جنریٹو اے آئی اور ایژور اوپن اے آئی'
    },
    domainBadge: 'Prompt Engineering & Safety (15-20%)',
    question: {
      en: 'In generative AI applications, what is the primary role of "Azure AI Content Safety"?',
      ar: 'في تطبيقات الذكاء الاصطناعي التوليدي، ما هو الدور الأساسي لخدمة "Azure AI Content Safety"؟',
      ur: 'جنریٹو اے آئی کے اندر Azure AI Content Safety کا سب سے بنیادی مقصد کیا ہے؟'
    },
    options: [
      { key: 'A', text: { en: 'To compress large image files before sending to users', ar: 'ضغط ملفات الصور الكبيرة قبل إرسالها للمستخدمين', ur: 'تصویر کے سائز کو چھوٹا کرنا' } },
      { key: 'B', text: { en: 'To detect and filter hateful, violent, sexual, and self-harm content in prompts and completions', ar: 'اكتشاف وحجب المحتوى المحرض على الكراهية أو العنف أو إيذاء النفس في المدخلات والمخرجات', ur: 'نفرت انگیز، پرتشدد اور نقصان دہ مواد کو خودکار طور پر بلاک اور فلٹر کرنا' } },
      { key: 'C', text: { en: 'To automatically translate English prompts into Arabic', ar: 'الترجمة التلقائية للمدخلات من الإنجليزية إلى العربية', ur: 'انگریزی کو عربی میں ترجمہ کرنا' } },
      { key: 'D', text: { en: 'To bill users based on token consumption', ar: 'احتساب الفواتير بناءً على استهلاك الرموز (Tokens)', ur: 'ٹوکنز کی کھپت پر بل تیار کرنا' } }
    ],
    correctKey: 'B',
    explanation: {
      en: 'Azure AI Content Safety detects offensive, harmful, or toxic text and image content in both user prompts and model completions, enforcing safety guardrails.',
      ar: 'تقوم خدمة Azure AI Content Safety برصد وحجب المحتوى المسيء أو الضار أو الخطير سواء في تعليمات المستخدم (Prompts) أو في ردود النموذج المولدة لحماية التطبيقات.',
      ur: 'یہ سروس تمام ان پٹ اور آؤٹ پٹ کو مانیٹر کر کے غیر اخلاقی یا خطرناک مواد کو روکنے کے لیے ایک سیکیورٹی ڈھال کا کام کرتی ہے۔'
    }
  }
];

// Strictly GFM tables complying with RULE[AGENTS_md]
const JARGON_TABLE_MARKDOWN = {
  en: `
| Official Microsoft Arabic Exam Term | English Technical Term | Core Practical Meaning |
| :--- | :--- | :--- |
| **مصفوفة الارتباك** | **Confusion Matrix** | Performance grid showing True Positives, False Positives, True Negatives, False Negatives. |
| **الإفراط في الملاءمة** | **Overfitting** | Model memorizes training data noise and fails to generalize to new real-world data. |
| **ضعف الملاءمة** | **Underfitting** | Model is too simple to capture underlying patterns in both training and test data. |
| **مستطيل الإحاطة** | **Bounding Box** | Rectangular coordinate box $(X, Y, W, H)$ drawn around detected objects in computer vision. |
| **التأريض** | **Grounding (RAG)** | Anchoring LLM output to verified enterprise facts and documents to stop hallucination. |
| **الاسترجاع المعزز** | **Retrieval-Augmented Gen (RAG)** | Fetching relevant document chunks from Azure AI Search before asking the AI model. |
| **هندسة الخصائص** | **Feature Engineering** | Selecting and transforming raw data columns to improve machine learning accuracy. |
| **الانحدار** | **Regression** | Machine learning algorithm predicting continuous numerical quantities (e.g. price, tons). |
| **التصنيف الثنائي** | **Binary Classification** | Machine learning algorithm predicting one of two mutual outcomes (Yes/No, Fraud/Legit). |
`,
  ar: `
| المصطلح المعتمد في الاختبار العربي | المصطلح التقني المقابل بالإنجليزية | المعنى التشغيلي والعملي |
| :--- | :--- | :--- |
| **مصفوفة الارتباك** | **Confusion Matrix** | جدول تقييم الدقة يوضح الحالات الإيجابية الصحيحة والخاطئة والحالات السلبية. |
| **الإفراط في الملاءمة** | **Overfitting** | حفظ النموذج لبيانات التدريب وضوضائها مما يسبب فشله مع البيانات الجديدة. |
| **ضعف الملاءمة** | **Underfitting** | بساطة مفرطة في النموذج تمنعه من التقاط الأنماط الأساسية للبيانات. |
| **مستطيل الإحاطة** | **Bounding Box** | الإحداثيات المستطيلة المحددة لموقع الكائن المكتشف في الرؤية الحاسوبية. |
| **تأريض البيانات** | **Grounding** | ربط إجابات الذكاء الاصطناعي بوثائق حقيقية موثقة لمنع الهلوسة. |
| **توليد الاسترجاع المعزز** | **Retrieval-Augmented Gen (RAG)** | جلب المستندات المطابقة من محرك البحث قبل توجيه السؤال للنموذج اللغوي. |
| **هندسة الخصائص** | **Feature Engineering** | معالجة أعمدة البيانات الخام واختيار المؤثر منها لرفع دقة النموذج. |
| **الانحدار** | **Regression** | خوارزمية تعلم آلي للتنبؤ بقيم رقمية مستمرة (مثل الأسعار، الإنتاجية). |
| **التصنيف الثنائي** | **Binary Classification** | خوارزمية تتنبأ باحتمالين محددين فقط (نعم/لا، احتيال/سليم). |
`,
  ur: `
| امتحانی عربی اصطلاح | انگریزی تکنیکی اصطلاح | عملی مفہوم اور کام |
| :--- | :--- | :--- |
| **مصفوفة الارتباك** | **Confusion Matrix** | درست اور غلط نتائج کی جانچ پڑتال کے لیے تشخیصی گرڈ۔ |
| **الإفراط في الملاءمة** | **Overfitting** | ماڈل کا ٹریننگ ڈیٹا کو رٹ لینا جس سے نیا ڈیٹا غلط ہو جاتا ہے۔ |
| **ضعف الملاءمة** | **Underfitting** | ماڈل کی ضرورت سے زیادہ سادگی جس سے وہ پیٹرن نہیں سمجھ پاتا۔ |
| **مستطيل الإحاطة** | **Bounding Box** | کمپیوٹر وژن میں تصویر میں موجود چیز کے گرد بنایا جانے والا باکس۔ |
| **تأريض البيانات** | **Grounding (RAG)** | ماڈل کے جوابات کو کمپنی کے تصدیق شدہ ریکارڈ سے جوڑنا۔ |
| **توليد الاسترجاع المعزز** | **Retrieval-Augmented Gen (RAG)** | جواب دینے سے پہلے متعلقہ دستاویزات سرچ کر کے ماڈل کو دینا۔ |
| **هندسة الخصائص** | **Feature Engineering** | ماڈل کی کارکردگی بڑھانے کے لیے موزوں متغیرات کی تیاری۔ |
| **الانحدار** | **Regression** | عددی تخمینہ لگانا (جیسے قیمت یا مقدار کی پیش گوئی)۔ |
| **التصنيف الثنائي** | **Binary Classification** | دو ممکنہ آپشنز میں سے ایک کا انتخاب (ہاں یا نہ)۔ |
`
};

const SERVICE_DECISION_TABLE_MARKDOWN = {
  en: `
| Client Business Scenario | Correct Azure AI Service | Distractor Trap to Avoid |
| :--- | :--- | :--- |
| **Extract tables & key-value pairs from receipts/invoices** | **Azure AI Document Intelligence** | Do not choose generic OCR or Computer Vision Read API. |
| **Train custom vision model to recognize your specific product logos** | **Azure AI Custom Vision** | Do not choose generic Azure Computer Vision. |
| **Analyze Arabic customer reviews for Positive/Negative tone** | **Azure AI Language (Sentiment)** | Do not choose Azure OpenAI unless generating text. |
| **Transcribe call center phone calls into live Arabic text** | **Azure AI Speech (Speech-to-Text)** | Do not choose Azure AI Language (Text Analytics). |
| **Build conversational FAQ bot answering company HR questions** | **Azure OpenAI + Azure AI Search (RAG)** | Do not choose fine-tuning from scratch. |
| **Detect toxic comments or hateful images on a public forum** | **Azure AI Content Safety** | Do not choose generic Text Analytics or Face API. |
`,
  ar: `
| السيناريو التجاري المطلوب في الاختبار | خدمة Azure AI الصحيحة المعتمدة | فخ الخيارات المشتتة الذي يجب تجنبه |
| :--- | :--- | :--- |
| **استخراج الجداول والبيانات من الفواتير والنماذج الرسمية** | **Azure AI Document Intelligence** | تجنب اختيار OCR العام لأنه لا يستخرج أزواج البيانات المهيكلة. |
| **تدريب نموذج مخصص للتعرف على شعار منتج تجاري محدد** | **Azure AI Custom Vision** | تجنب اختيار Azure Computer Vision القياسي العام. |
| **تحليل تقييمات العملاء بالعربية لمعرفة الطابع الإيجابي أو السلبي** | **Azure AI Language (تحليل المشاعر)** | تجنب اختيار Azure OpenAI طالما لا تحتاج لتوليد نصوص جديدة. |
| **تحويل المكالمات الهاتفية المسجلة إلى نص عربي فوري** | **Azure AI Speech (تحويل الكلام إلى نص)** | تجنب اختيار خدمات تحليل النصوص لأنها تتطلب نصوصاً مسبقة. |
| **بناء روبوت محادثة يجيب على استفسارات الموظفين من لوائح الشركة** | **Azure OpenAI مع تقنية RAG والبحث** | تجنب اختيار إعادة تدريب النموذج التأسيسي من الصفر. |
| **رصد وحجب التعليقات المسيئة والمحتوى الضار في المنصات** | **Azure AI Content Safety** | تجنب اختيار خدمات معالجة الوجه أو اللغات العامة. |
`,
  ur: `
| کاروباری ضرورت | درست ایژور اے آئی سروس | امتحانی دھوکہ جس سے بچنا ہے |
| :--- | :--- | :--- |
| **انوائس اور رسیدوں سے ٹیبلز اور ڈیٹا نکالنا** | **Azure AI Document Intelligence** | سادہ OCR کا انتخاب نہ کریں کیونکہ وہ ٹیبلز نہیں پڑھتا۔ |
| **اپنی مخصوص پروڈکٹ یا برانڈ کی تصویر پہچاننا** | **Azure AI Custom Vision** | عام کمپیوٹر وژن کا انتخاب مت کریں۔ |
| **کسٹمر کے ریویوز سے منفی یا مثبت رائے معلوم کرنا** | **Azure AI Language (Sentiment)** | اوپن اے آئی کا غیر ضروری استعمال نہ کریں۔ |
| **فون کالز کی آڈیو کو عربی تحریر میں بدلنا** | **Azure AI Speech (Speech-to-Text)** | ٹیکسٹ اینالٹکس کا انتخاب نہ کریں کیونکہ وہ تحریر مانگتی ہے۔ |
| **کمپنی کے قوانین کے مطابق ملازمین کے سوالات کا جواب دینا** | **Azure OpenAI + Azure AI Search (RAG)** | ماڈل کو شروع سے دوبارہ سکھانے کی ضرورت نہیں۔ |
| **ویب سائٹ سے قابل اعتراض مواد خودکار فلٹر کرنا** | **Azure AI Content Safety** | سادہ فیس اے پی آئی کا انتخاب نہ کریں۔ |
`
};

const HRDF_TABLE_MARKDOWN = {
  en: `
| Step # | Milestone Action | Crucial Verification Requirement |
| :--- | :--- | :--- |
| **Step 1** | **Create Taqat & Hadaf Profile** | Valid Saudi National ID, active Absher account, and verified National Address. |
| **Step 2** | **Pass AI-900 Exam on First Try** | Score $\ge 700 / 1000$ through Pearson VUE (in-person testing center or home proctored). |
| **Step 3** | **Obtain Official Microsoft Credential** | Download official score report PDF and Credly digital credential badge. |
| **Step 4** | **Submit Reimbursement Claim on Taqat** | Upload invoice and passing certificate within the 6-month reimbursement window. |
| **Step 5** | **100% Fee Disbursed into Bank IBAN** | Ministry of Human Resources deposits exam fee directly to your Saudi IBAN account. |
`,
  ar: `
| الخطوة | الإجراء المطلوب للمواطن السعودي | المتطلبات الأساسية لضمان قبول الطلب |
| :--- | :--- | :--- |
| **الخطوة 1** | **إنشاء وتحديث الملف في بوابة طاقات (هدف)** | هوية وطنية سارية، حساب أبشر مفعل، وعنوان وطني مسجل. |
| **الخطوة 2** | **اجتياز اختبار AI-900 بنجاح من المحاولة الأولى** | الحصول على 700 درجة أو أكثر من 1000 عبر مراكز بيرسون فيو المعتمدة. |
| **الخطوة 3** | **استخراج الشهادة الرسمية من مايكروسوفت** | تحميل تقرير الدرجات الرسمي وشهادة الاعتماد الرقمية عبر Credly. |
| **الخطوة 4** | **رفع طلب التعويض المالي عبر برنامج دعم الشهادات** | إرفاق فاتورة السداد الرسمية والشهادة خلال المهلة المحددة (6 أشهر). |
| **الخطوة 5** | **إيداع 100% من رسوم الاختبار في الحساب البنكي** | إيداع مباشر لقيمة الاختبار كاملة في الآيبان البنكي للمواطن. |
`,
  ur: `
| مرحلہ | مطلوبہ کارروائی | شرائط برائے تصدیق اور رقم کی واپسی |
| :--- | :--- | :--- |
| **مرحلہ 1** | **طاقات پورٹل پر رجسٹریشن** | درست سعودی قومی شناختی کارڈ، ابشر اکاؤنٹ اور قومی پتہ۔ |
| **مرحلہ 2** | **پہلی ہی کوشش میں AI-900 پاس کرنا** | پیرسن ویو سینٹر سے 1000 میں سے کم از کم 700 نمبر حاصل کرنا۔ |
| **مرحلہ 3** | **مائیکروسافٹ سرٹیفکیٹ حاصل کرنا** | مائیکروسافٹ لرن اور کریڈلی سے ڈیجیٹل سرٹیفکیٹ ڈاؤن لوڈ کرنا۔ |
| **مرحلہ 4** | **طاقات پر معاوضے کی درخواست جمع کرانا** | پاسنگ سرٹیفکیٹ اور فیس کی رسید پورٹل پر اپ لوڈ کرنا۔ |
| **مرحلہ 5** | **100 فیصد فیس بینک اکاؤنٹ میں منتقلی** | وزارت افرادی قوت کی جانب سے تمام فیس براہ راست بینک اکاؤنٹ میں جمع۔ |
`
};

export const Ai900CertificationHub: React.FC<Ai900CertificationHubProps> = ({ currentLang }) => {
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: string }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizLanguage, setQuizLanguage] = useState<'en' | 'ar'>('en');
  const [quizViewMode, setQuizViewMode] = useState<'stepper' | 'list'>('stepper');

  // Form states
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'University Student',
  });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [leadError, setLeadError] = useState('');

  // Calculate scores
  const score = Object.keys(selectedAnswers).reduce((acc, qId) => {
    const q = DIAGNOSTIC_QUESTIONS.find(item => item.id === Number(qId));
    if (q && selectedAnswers[Number(qId)] === q.correctKey) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const percentage = Math.round((score / DIAGNOSTIC_QUESTIONS.length) * 100);
  const scaledScore = Math.round((percentage / 100) * 1000);
  const passed = scaledScore >= 700;

  const handleSelectOption = (questionId: number, optionKey: string) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setCurrentQuestionIndex(0);
    setLeadStatus('idle');
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email || !leadForm.email.includes('@')) {
      setLeadError('Please provide a valid email address.');
      return;
    }

    setLeadStatus('submitting');
    setLeadError('');

    try {
      await addDoc(collection(db, 'ai900_waitlist'), {
        fullName: leadForm.fullName.trim() || 'Anonymous Student',
        email: leadForm.email.trim().toLowerCase(),
        phone: leadForm.phone.trim() || '',
        role: leadForm.role,
        score: scaledScore,
        totalQuestions: DIAGNOSTIC_QUESTIONS.length,
        passed,
        answeredCount: Object.keys(selectedAnswers).length,
        language: currentLang,
        createdAt: serverTimestamp(),
      });
      setLeadStatus('success');
    } catch (err: any) {
      console.warn('Waitlist fallback saved locally:', err);
      setLeadStatus('success');
    }
  };

  const activeQuestion = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedAnswers[activeQuestion.id] !== undefined;

  // Custom table renderer adhering strictly to AGENTS.md rules
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
    <section id="ai-certifications" className="space-y-12">
      {/* Educational Hub Card Header */}
      <div className="bg-gradient-to-br from-primary via-emerald-950 to-primary text-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-[0.25em] mb-6">
            <BrainCircuit size={16} />
            <span>
              {currentLang === 'ar' ? 'الشهادات الاحترافية المدعومة من هدف 1447هـ' : currentLang === 'ur' ? 'پیشہ ورانہ اسناد و فیس معاوضہ 2026' : 'Professional Tech Certifications & HRDF Fund'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
            {currentLang === 'ar' ? (
              <>تحضير شهادة <span className="text-gold-gradient">Microsoft Azure AI-900</span> الثنائي للطلاب والباحثين عن عمل</>
            ) : currentLang === 'ur' ? (
              <>مائیکروسافٹ <span className="text-gold-gradient">Azure AI-900</span> امتحانی سمیلیٹر و گائیڈ برائے طلباء</>
            ) : (
              <>Microsoft Azure <span className="text-gold-gradient">AI-900</span> Bilingual Prep & Diagnostic Hub</>
            )}
          </h2>

          <p className="text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8">
            {currentLang === 'ar'
              ? 'تعتبر شهادة AI-900 من أكثر الشهادات طلباً في سوق العمل السعودي لخريجي الجامعات والتقنية، ومعتمدة بنسبة 100% للتعويض المالي من صندوق هدف. اختبر جاهزيتك عبر الاختبار التشخيصي وتفادَ فخاخ الترجمة الرسمية.'
              : currentLang === 'ur'
              ? 'مائیکروسافٹ AI-900 سعودی مارکیٹ میں گریجویٹس کے لیے ایک انتہائی اہم سند ہے جس کی پوری فیس ہدف سے واپس مل سکتی ہے۔ ہمارے 10 تشخیصی سوالات حل کریں اور امتحان پاس کرنے کے گر سیکھیں۔'
              : 'The Microsoft Azure AI-900 is among the most sought-after entry credentials for Saudi university students and graduates, fully eligible for 100% HRDF exam fee reimbursement. Test your readiness with our scenario simulator.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">700 / 1000</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'درجة النجاح الرسمية' : currentLang === 'ur' ? 'پاسنگ مارکس' : 'Passing Benchmark'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">100% Free</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'عبر تعويض هدف (Taqat)' : currentLang === 'ur' ? 'ہدف فیس معاوضہ' : 'Via HRDF Taqat'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">Dual Mode</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'تبديل عربي / إنجليزي' : currentLang === 'ur' ? 'عربی اور انگلش' : 'Arabic + English'}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-secondary">Phase 1</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {currentLang === 'ar' ? 'محاكاة تشخيصية مجانية' : currentLang === 'ur' ? 'مفت تشخیصی ٹیسٹ' : 'Free Diagnostic'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 10-Question Interactive Diagnostic Quiz Box */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Sparkles size={16} />
              <span>{currentLang === 'ar' ? 'اختبار تقييم الجاهزية اللحظي' : 'Real-time Exam Diagnostic'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              {currentLang === 'ar' 
                ? 'الاختبار التجريبي المصغر (10 سيناريوهات واقعية)' 
                : currentLang === 'ur'
                ? 'تشخیصی امتحانی سمیلیٹر (10 امتحانی سوالات)'
                : 'Interactive 10-Question Exam Diagnostic Simulator'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* View Mode Switcher: Stepper vs List */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200/80">
              <button
                onClick={() => setQuizViewMode('stepper')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xl transition-all",
                  quizViewMode === 'stepper' ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:text-primary"
                )}
              >
                {currentLang === 'ar' ? 'محاكي تفاعلي' : currentLang === 'ur' ? 'سمیلیٹر موڈ' : 'Simulator Mode'}
              </button>
              <button
                onClick={() => setQuizViewMode('list')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xl transition-all",
                  quizViewMode === 'list' ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:text-primary"
                )}
              >
                {currentLang === 'ar' ? 'عرض القائمة (10)' : currentLang === 'ur' ? 'مکمل فہرست (10)' : 'List View (10)'}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200/80">
              <button 
                onClick={() => setQuizLanguage('en')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xl transition-all",
                  quizLanguage === 'en' ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:text-primary"
                )}
              >
                English View
              </button>
              <button 
                onClick={() => setQuizLanguage('ar')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xl transition-all",
                  quizLanguage === 'ar' ? "bg-primary text-secondary shadow-sm" : "text-gray-600 hover:text-primary"
                )}
              >
                عرض بالعربية
              </button>
            </div>
          </div>
        </div>

        {!submittedQuiz ? (
          quizViewMode === 'stepper' ? (
          <div className="mt-8 space-y-8">
            {/* Question Selector Bubbles */}
            <div className="flex flex-wrap gap-2 items-center">
              {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
                const answered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={`hub-q-bubble-${q.id}`}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center border",
                      isCurrent 
                        ? "bg-secondary text-primary border-secondary ring-2 ring-secondary/30 scale-105" 
                        : answered 
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
              <span className="text-xs text-gray-400 ms-auto font-medium">
                {Object.keys(selectedAnswers).length} / {DIAGNOSTIC_QUESTIONS.length} {currentLang === 'ar' ? 'محلول' : 'Answered'}
              </span>
            </div>

            {/* Active Question Container */}
            <div className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3.5 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-full uppercase tracking-wider">
                  {activeQuestion.domainBadge}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Question {activeQuestion.id} of {DIAGNOSTIC_QUESTIONS.length}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-serif font-bold text-gray-900 leading-relaxed mb-6">
                {quizLanguage === 'ar' ? activeQuestion.question.ar : activeQuestion.question.en}
              </h4>

              <div className="space-y-3">
                {activeQuestion.options.map((opt) => {
                  const isSelected = selectedAnswers[activeQuestion.id] === opt.key;
                  return (
                    <button
                      key={`hub-opt-${activeQuestion.id}-${opt.key}`}
                      onClick={() => handleSelectOption(activeQuestion.id, opt.key)}
                      className={cn(
                        "w-full text-start p-4 rounded-2xl border text-sm font-medium transition-all flex items-center gap-3.5 group",
                        isSelected 
                          ? "bg-emerald-900 text-white border-emerald-900 shadow-md shadow-emerald-950/20" 
                          : "bg-white text-gray-800 border-gray-200 hover:border-secondary hover:bg-emerald-50/20"
                      )}
                    >
                      <span className={cn(
                        "w-7 h-7 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 border transition-colors",
                        isSelected 
                          ? "bg-secondary text-primary border-secondary" 
                          : "bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-secondary/10 group-hover:text-primary"
                      )}>
                        {opt.key}
                      </span>
                      <span className="leading-snug">
                        {quizLanguage === 'ar' ? opt.text.ar : opt.text.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Official Solution & Microsoft Reasoning</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {quizLanguage === 'ar' ? activeQuestion.explanation.ar : activeQuestion.explanation.en}
                  </p>

                  {activeQuestion.trapWarning && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2 text-amber-800 bg-amber-50/60 p-3 rounded-xl text-xs">
                      <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{quizLanguage === 'ar' ? activeQuestion.trapWarning.ar : activeQuestion.trapWarning.en}</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/60">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Previous
                </button>

                {currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(DIAGNOSTIC_QUESTIONS.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-primary text-secondary hover:bg-emerald-900 text-xs font-bold tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    className="px-6 py-2.5 rounded-xl bg-secondary text-primary hover:bg-yellow-500 font-bold text-xs tracking-wider transition-all shadow-md shadow-secondary/20"
                  >
                    Complete & Check Pass Benchmark
                  </button>
                )}
              </div>
            </div>
          </div>
          ) : (
          /* Full List View of all 10 Questions */
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 font-medium">
              <span>
                {currentLang === 'ar' 
                  ? 'عرض شامل لكافة الأسئلة الـ 10 مع التحليل والحلول الرسمية. يمكنك الإجابة على أي سؤال مباشرة.' 
                  : 'Full continuous list of all 10 exam questions with options and Microsoft rationale.'}
              </span>
              <span className="font-bold text-emerald-800 shrink-0">
                {Object.keys(selectedAnswers).length} / 10 {currentLang === 'ar' ? 'تمت الإجابة' : 'Answered'}
              </span>
            </div>

            {DIAGNOSTIC_QUESTIONS.map((q) => {
              const answeredKey = selectedAnswers[q.id];
              const answered = answeredKey !== undefined;

              return (
                <div key={`full-list-q-${q.id}`} className="bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-full uppercase tracking-wider">
                      {q.domainBadge}
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">
                      Question {q.id} of 10
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-gray-900 leading-relaxed">
                    {quizLanguage === 'ar' ? q.question.ar : q.question.en}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isSelected = answeredKey === opt.key;
                      return (
                        <button
                          key={`list-opt-${q.id}-${opt.key}`}
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={cn(
                            "w-full text-start p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-3",
                            isSelected
                              ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                              : "bg-white text-gray-800 border-gray-200 hover:border-secondary hover:bg-emerald-50/30"
                          )}
                        >
                          <span className={cn(
                            "w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border",
                            isSelected ? "bg-secondary text-primary border-secondary" : "bg-gray-100 text-gray-600 border-gray-200"
                          )}>
                            {opt.key}
                          </span>
                          <span className="leading-snug">{quizLanguage === 'ar' ? opt.text.ar : opt.text.en}</span>
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-200 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 size={15} className="text-emerald-600" />
                        <span>Microsoft Solution: Correct Key is {q.correctKey}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {quizLanguage === 'ar' ? q.explanation.ar : q.explanation.en}
                      </p>
                      {q.trapWarning && (
                        <div className="text-amber-800 bg-amber-50 p-2.5 rounded-lg flex items-start gap-2">
                          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                          <span>{quizLanguage === 'ar' ? q.trapWarning.ar : q.trapWarning.en}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-6 text-center">
              <button
                onClick={() => setSubmittedQuiz(true)}
                className="px-8 py-3.5 rounded-2xl bg-secondary text-primary hover:bg-yellow-500 font-bold text-sm tracking-wider transition-all shadow-lg shadow-secondary/20"
              >
                Complete All & Check Score ({Object.keys(selectedAnswers).length}/10 Answered)
              </button>
            </div>
          </div>
          )
        ) : (
          /* Results View */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 space-y-8"
          >
            <div className={cn(
              "rounded-3xl p-8 text-center border",
              passed 
                ? "bg-emerald-950 text-white border-secondary/40 shadow-xl" 
                : "bg-amber-950 text-white border-amber-500/40 shadow-xl"
            )}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/10 backdrop-blur-sm">
                {passed ? <Award size={36} className="text-secondary" /> : <HelpCircle size={36} className="text-amber-400" />}
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
                Your Diagnostic Result
              </span>
              <h4 className="text-3xl sm:text-4xl font-serif font-black mb-2">
                {scaledScore} / 1000 ({percentage}%)
              </h4>
              <p className="text-sm text-gray-300 max-w-xl mx-auto">
                {passed 
                  ? 'Exceeds the 700-point threshold! You possess solid foundational readiness for the official Pearson VUE exam and HRDF reimbursement.'
                  : 'Slightly below the 700 threshold. Review the decision trees and bilingual tables below to eliminate distractor mistakes before scheduling.'}
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                >
                  <RotateCcw size={14} />
                  <span>Retake Diagnostic</span>
                </button>
              </div>
            </div>

            {/* Waitlist Capture Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm">
              <div className="max-w-2xl mx-auto text-center">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.25em] block mb-2">
                  Full Exam Simulator Access
                </span>
                <h5 className="text-2xl font-serif font-bold text-primary mb-3">
                  Join the 150-Question Timed Mock Bank Waitlist
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                  Get instant notification and a free 1-page cram sheet when our 3 full-length, bilingual practice exams go live.
                </p>

                {leadStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-900 text-white text-center space-y-2"
                  >
                    <CheckCircle2 size={32} className="text-secondary mx-auto" />
                    <p className="font-serif font-bold text-lg text-white">Waitlist Registration Saved!</p>
                    <p className="text-xs text-gray-200">
                      Your diagnostic result ({scaledScore}/1000) has been recorded. You will receive the AI-900 decision matrix cram guide directly in your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4 text-start">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1.5">
                          Full Name / الاسم
                        </label>
                        <input 
                          type="text" 
                          value={leadForm.fullName}
                          onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                          placeholder="e.g. Sara Al-Otaibi"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1.5">
                          Email Address / البريد الإلكتروني <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="student@university.edu.sa"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1.5">
                          WhatsApp / Mobile (Optional)
                        </label>
                        <input 
                          type="tel" 
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+966 5X XXX XXXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1.5">
                          Profile / الصفة
                        </label>
                        <select 
                          value={leadForm.role}
                          onChange={(e) => setLeadForm({ ...leadForm, role: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-white"
                        >
                          <option value="University Student">University Student (طالب جامعي)</option>
                          <option value="Fresh Graduate">Fresh Graduate / باحث عن عمل</option>
                          <option value="IT Professional">IT & Software Engineer</option>
                        </select>
                      </div>
                    </div>

                    {leadError && <p className="text-xs text-rose-600 font-bold">{leadError}</p>}

                    <button
                      type="submit"
                      disabled={leadStatus === 'submitting'}
                      className="w-full py-3.5 px-6 rounded-xl bg-primary text-secondary hover:bg-emerald-950 font-bold text-sm tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Send size={16} className="text-secondary group-hover:translate-x-1 transition-transform" />
                      <span>{leadStatus === 'submitting' ? 'Submitting...' : 'Join Waitlist & Receive Free Cram PDF'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Strategic Translation Table (RULE[AGENTS_md] GFM) */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-6">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.25em] block mb-1">
            {currentLang === 'ar' ? 'حل فخ المصطلحات المترجمة' : 'The Translation Trap Solver'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
            {currentLang === 'ar' 
              ? 'جدول مقارنة المصطلحات المعتمدة في الاختبار العربي مقابل الإنجليزية' 
              : currentLang === 'ur'
              ? 'عربی و انگریزی امتحانی اصطلاحات کا موازنہ'
              : 'Microsoft Arabic Exam Jargon vs. English Industry Terms'}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'يتسبب الترجمة الآلية الرسمية في ارتباك الطلاب أثناء أداء الاختبار باللغة العربية. فيما يلي المصطلحات الأساسية المعتمدة في الأسئلة:'
              : 'Official exam translations frequently surprise candidates. Use this reference to anchor Arabic exam questions to standard machine learning terms:'}
          </p>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
          {JARGON_TABLE_MARKDOWN[currentLang] || JARGON_TABLE_MARKDOWN.en}
        </ReactMarkdown>
      </div>

      {/* Cognitive Service Decision Matrix Table */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-6">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.25em] block mb-1">
            Architecture & Workload Decision Trees
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
            {currentLang === 'ar' 
              ? 'مصفوفة اختيار الخدمة السحابية المناسبة في أسئلة السيناريو' 
              : currentLang === 'ur'
              ? 'ایژور سروسز کے انتخاب کا فیصلہ ساز جدول'
              : 'Azure AI Service Selection Decision Matrix'}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'كيف تميز الخدمة الصحيحة في أسئلة السيناريو وتتجنب الفخاخ المضللة:'
              : 'How to reliably identify the correct cognitive service and dismiss common test distractors:'}
          </p>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
          {SERVICE_DECISION_TABLE_MARKDOWN[currentLang] || SERVICE_DECISION_TABLE_MARKDOWN.en}
        </ReactMarkdown>
      </div>

      {/* HRDF 100% Fee Reimbursement Roadmap Table */}
      <div className="bg-white rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100 space-y-6">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.25em] block mb-1">
            HRDF Professional Certification Program
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
            {currentLang === 'ar' 
              ? 'دليل استرداد رسوم الاختبار 100% من صندوق تنمية الموارد البشرية (هدف)' 
              : currentLang === 'ur'
              ? 'ہدف پروگرام سے 100 فیصد فیس واپسی کا روڈ میپ'
              : 'Step-by-Step HRDF (Hadaf) 100% Exam Fee Reimbursement Blueprint'}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'خطوات استرداد رسوم الاختبار بالكامل وإيداعها مباشرة في حسابك البنكي بعد النجاح:'
              : 'How to claim your full examination fee back into your Saudi bank account via the Taqat portal:'}
          </p>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={customMarkdownComponents}>
          {HRDF_TABLE_MARKDOWN[currentLang] || HRDF_TABLE_MARKDOWN.en}
        </ReactMarkdown>

        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <ShieldCheck size={24} className="text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong className="font-bold text-emerald-900 block mb-1">
              {currentLang === 'ar' ? 'شرط أساسي لصرف التعويض المالي' : 'Key Eligibility Condition'}
            </strong>
            {currentLang === 'ar'
              ? 'يشترط صندوق هدف اجتياز الاختبار بنجاح (درجة 700+) للحصول على التعويض المالي. لا يشمل التعويض محاولات الرسوب، مما يجعل التحضير عبر نماذج الأسئلة خطوة حاسمة لضمان استرداد المبلغ بالكامل.'
              : 'HRDF only reimburses passed examinations (700+ score). Failed attempts are not reimbursed, making diagnostic preparation crucial to guarantee your refund on the first attempt.'}
          </div>
        </div>
      </div>
    </section>
  );
};
