export interface BlogPost {
  id: string;
  title: {
    en: string;
    ar: string;
    ur: string;
  };
  excerpt: {
    en: string;
    ar: string;
    ur: string;
  };
  content: {
    en: string;
    ar: string;
    ur: string;
  };
  category: string;
  author: string;
  date: string;
  images: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: string;
}
