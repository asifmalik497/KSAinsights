import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        logo: 'The Saudi Insights',
        home: 'Home',
        faq: 'SAUDI BUSINESS FAQ',
        blog: 'Blog',
        services: 'Guides',
        about: 'About',
        contact: 'Contact',
        expatHub: 'EXPAT HUB',
        consultancy: 'CONSULTANCY',
        news: 'News',
        guides: 'Guides',
        login: 'Login',
        categories: {
          all: 'All',
          regulatory: 'Regulatory',
          residency: 'Residency & Visas',
          opportunity: 'Opportunities',
          macro: 'Macro',
          local: 'Local Impact',
          lifestyle: 'Lifestyle',
          community: 'Community',
          fashion: 'Fashion',
        }
      },
      common: {
        search: 'Search',
        add: 'Add',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        success: 'Success',
        error: 'Error',
        medicines: 'Medicines',
        suppliers: 'Suppliers',
        dashboard: 'Dashboard',
        total: 'Total',
        status: 'Status',
        actions: 'Actions',
        date: 'Date',
        loading: 'Loading...',
        noData: 'No data found',
      },
      pos: {
        title: 'Point of Sale',
        receipt: 'Receipt',
        addItem: 'Add Item',
        qty: 'Qty',
        price: 'Price',
        total: 'Total',
        discount: 'Discount',
        finalAmount: 'Final Amount',
        cashReceived: 'Cash Received',
        change: 'Change',
        completeSale: 'Complete Sale',
        print: 'Print Receipt',
        customerName: 'Customer Name',
        contact: 'Contact',
        outOfStock: 'Out of Stock',
        notEnoughStock: 'Not enough stock available',
        insufficientCash: 'Insufficient cash received',
        checkoutFailed: 'Failed to complete checkout',
        pdfFailed: 'PDF generation failed',
      },
      suppliers: {
        title: 'Supplier Management',
        subtitle: 'Manage your vendors, purchases, and payables.',
        addSupplier: 'Add Supplier',
        editSupplier: 'Edit Supplier',
        supplierName: 'Supplier Name',
        contactPerson: 'Contact Person',
        mobile: 'Mobile',
        email: 'Email',
        type: 'Type',
        category: 'Category',
        status: 'Status',
        balance: 'Balance',
        ledger: 'Ledger',
        purchases: 'Purchases',
        payments: 'Payments',
        returns: 'Returns',
        newPurchase: 'New Purchase',
        recordPayment: 'Record Payment',
        newReturn: 'New Return',
        contactInfo: 'Contact Info',
        typeCategory: 'Type & Category',
        legalInfo: 'Legal Info',
        searchSuppliers: 'Search suppliers...',
        purchaseHistory: 'Purchase History',
        supplierPayments: 'Supplier Payments',
        purchaseReturns: 'Purchase Returns',
        invoiceNo: 'Invoice No',
        totalAmount: 'Total Amount',
        pendingPayables: 'Pending Payables',
        totalPaid: 'Total Paid',
        totalReturns: 'Total Returns',
        recentPurchases: 'Recent Purchases',
        recentPayments: 'Recent Payments',
        recordPurchase: 'Record New Purchase',
        addStockDesc: 'Add stock and update supplier balance.',
        selectSupplier: 'Select Supplier',
        paymentMethod: 'Payment Method',
        reference: 'Reference',
        debit: 'Debit (+)',
        credit: 'Credit (-)',
        description: 'Description',
        ledgerDesc: 'Select a supplier from the list above to view their detailed accounting ledger and transaction history.',
        confirmDelete: 'Are you sure you want to delete this supplier?',
        accountTitle: 'Account Title',
        accountNumber: 'Account Number / IBAN',
        purchaseSettings: 'Purchase Settings',
        defaultDiscount: 'Default Discount %',
        supplyCategory: 'Supply Category',
        preferredSupplier: 'Preferred Supplier',
        ntn: 'NTN',
        strn: 'STRN',
        drugLicense: 'Drug License',
        licenseExpiry: 'License Expiry',
        registrationNo: 'Registration No',
        openingBalance: 'Opening Balance',
        creditLimit: 'Credit Limit',
        creditDays: 'Credit Days',
        paymentTerms: 'Payment Terms',
        priority: 'Priority',
        address: 'Address',
        city: 'City',
        state: 'State',
        country: 'Country',
        postalCode: 'Postal Code',
        supplierType: 'Supplier Type',
      },
      medicines: {
        title: 'Medicine Management',
        addMedicine: 'Add Medicine',
        editMedicine: 'Edit Medicine',
        name: 'Medicine Name',
        batch: 'Batch No',
        expiry: 'Expiry Date',
        stock: 'Stock Qty',
        purchasePrice: 'Purchase Price',
        salePrice: 'Sale Price',
        barcode: 'Barcode',
        prescription: 'Prescription Required',
      },
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Real-time overview of your pharmacy operations.',
        totalSales: 'Total Sales (Today)',
        lowStock: 'Low Stock Items',
        expiredSoon: 'Expiring Soon',
        recentSales: 'Recent Sales (Today)',
        lowStockAlerts: 'Low Stock Alerts',
        recentTransactions: 'Recent Transactions',
        manage: 'Manage',
        viewAll: 'View All',
      },
      layout: {
        breaking: 'Strategic Alert',
        source: 'SOURCE',
        readFullAnalysis: 'Read Full Analysis',
        close: 'Dismiss',
        welcome: 'Welcome to',
        selectLanguage: 'Please select your preferred language to continue',
        vision2030: 'Vision 2030 Intelligence Portal',
      },
      hero: {
        title: 'KSA Insights',
        subtitle: 'The #1 source for real-time insights, market trends, and Vision 2030 analysis for global investors.',
        cta: 'Read Latest News',
      },
      blog: {
        title: 'Business Intelligence Portal',
        subtitle: 'Top trending topics and expert analysis for the modern Saudi business landscape.',
        latest: 'Market Intelligence',
        readMore: 'Full Analysis',
        searchPlaceholder: 'Search articles...',
        all: 'All',
        closeArticle: 'Close Article',
        authorRole: 'Senior Business Analyst'
      },
      contact: {
        title: 'Connect with Experts',
        subtitle: 'Looking for specific services? We can connect you with the right legal and business partners in KSA.',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        success: 'Thank you! Our team will review your request and connect you with a partner shortly.',
        info: {
          email: { title: 'Email Us', subtitle: 'We reply within 24 hours.' },
          phone: { title: 'Call Us', subtitle: 'Sun - Thu, 9am - 5pm' }
        },
        form: {
          subject: 'Subject',
          subjects: {
            general: 'General Inquiry',
            setup: 'Business Setup Assistance',
            legal: 'Legal Consultation',
            investment: 'Investment Opportunities'
          },
          placeholders: {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'How can we help you?'
          }
        },
        faq: {
          title: 'Common Questions',
          subtitle: 'Quick answers to frequently asked questions.',
          q1: { q: 'How long does it take to get a MISA license?', a: 'Typically 3-5 working days once all documents are submitted correctly.' },
          q2: { q: 'What are your working hours?', a: 'We are open Sunday to Thursday, from 9:00 AM to 5:00 PM (AST).' }
        }
      },
      expatHub: {
        title: 'Expat Intelligence Hub',
        subtitle: 'Your comprehensive guide to living, working, and investing in Saudi Arabia.',
        regulatoryFeed: 'Live Regulatory Feed',
        spaSource: 'This data is pulled directly from the Saudi Press Agency (SPA) and HRSD to ensure 100% accuracy for our expats.',
        officialSource: 'Official Source',
        publicServices: {
          title: 'Essential Public & Private Services',
          subtitle: 'Major private sector providers with full Arabic, English, and Urdu support.',
          banking: 'Banking & Remittance',
          telecom: 'Telecom & Digital',
          retail: 'Retail & Lifestyle',
          visitWebsite: 'Visit Website'
        }
      },
      footer: {
        rights: 'All rights reserved.',
        tagline: 'Your bridge to Saudi business excellence.',
        expertInsights: 'Expert Business Insights',
        faqTitle: 'SAUDI BUSINESS FAQ',
        disclaimerTitle: 'Legal Disclaimer',
        disclaimerText: 'The information provided on this portal is for general informational purposes only. While we strive for accuracy, it does not constitute legal, financial, or professional advice. We encourage all investors to consult with certified local professionals before making any business decisions.',
        aiContentLab: 'AI Content Lab',
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last Updated',
        intro: {
          title: 'Introduction',
          content: 'Welcome to KSA Insights. We are committed to protecting your personal data and your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, in compliance with the Saudi Personal Data Protection Law (PDPL), GDPR, and Google AdSense requirements.'
        },
        collection: {
          title: 'Data Collection',
          content: 'We may collect certain information about you in the following ways:',
          item1: 'Information you provide directly (e.g., via contact forms or consultancy requests).',
          item2: 'Automated information collected through cookies and similar technologies.',
          item3: 'Log data such as your IP address, browser type, and pages visited.'
        },
        adsense: {
          title: 'Google AdSense & Cookies',
          content: 'We use Google AdSense to serve ads on our site. Google uses cookies to serve ads based on a user\'s prior visits to our website or other websites.',
          item1: 'Google\'s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.',
          item2: 'Users may opt out of personalized advertising by visiting Ads Settings.',
          item3: 'We also use cookies to analyze traffic and improve user experience.'
        },
        pdpl: {
          title: 'Saudi PDPL Compliance',
          content: 'In accordance with the Saudi Personal Data Protection Law, we ensure that your data is processed lawfully, fairly, and transparently. We implement strict security measures to prevent unauthorized access or disclosure of your personal information within the Kingdom.'
        },
        gdpr: {
          title: 'GDPR Rights',
          content: 'If you are visiting from the European Economic Area, you have certain rights under the GDPR, including the right to access, correct, or delete your personal data, and the right to data portability.'
        },
        contact: {
          title: 'Contact Us',
          content: 'If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:'
        }
      },
      cookies: {
        title: 'Cookie Consent',
        message: 'We use cookies to ensure you get the best experience on our website.',
        accept: 'Accept All',
        reject: 'Reject All',
        settings: 'Settings'
      },
      support: {
        welcome: 'Hello! 👋 How may we help you? Just send us a message now to get assistance.',
        startChat: 'Start Chat with:',
      },
      login: {
        title: 'Intelligence Portal',
        selectAccount: 'Select your analyst profile',
        enterSystem: 'Access Portal',
        localDataNote: 'All data is stored locally for maximum privacy and security.'
      },
      home: {
        whyChoose: 'Why Choose KSA Insights?',
        whyChooseDesc: 'We bridge the gap between global investors and the local Saudi market with data-driven research and practical legal advice.',
        latestReports: 'Latest Intelligence Reports',
        latestReportsDesc: 'Stay ahead of the curve with our expert analysis.',
        viewAllReports: 'View All Reports',
        trendingNow: 'Trending Now',
        tadawulWatch: 'Tadawul Market Watch',
        viewFullMarket: 'View Full Market Analysis',
        newsletterTitle: 'Subscribe to Our Business Insights',
        newsletterDesc: 'Get the latest updates on Vision 2030 and investment opportunities in the Kingdom directly to your inbox.',
        emailPlaceholder: 'Your Email Address',
        subscribeBtn: 'Subscribe Now',
        privacyNote: 'We respect your privacy. Your data is never shared.'
      },
      features: {
        market: {
          title: 'Market Growth',
          desc: 'Real-time analysis of the fastest growing sectors in the Saudi economy.'
        },
        legal: {
          title: 'Legal Compliance',
          desc: 'Step-by-step roadmaps for MISA licenses and CR registration.'
        },
        vision: {
          title: 'Vision 2030',
          desc: 'Latest updates on government initiatives and mega-projects like NEOM.'
        },
        expert: {
          title: 'Expert Network',
          desc: 'Connect with local consultants and business setup specialists.'
        }
      },
      about: {
        hero: {
          title: 'The Bridge to Saudi Intelligence',
          subtitle: 'KSA Insights is the Kingdom\'s premier digital intelligence portal, dedicated to providing global investors with the data they need to navigate Vision 2030.',
          description: 'We don\'t just provide news; we provide a gateway. By curating the most critical market movements and connecting our global audience with verified local legal and business partners, we ensure your journey into the Saudi market is backed by intelligence and the right connections.',
          expertise: 'Years of Local Expertise'
        },
        values: {
          title: 'Our Core Values',
          precision: { title: 'Precision', desc: 'Accurate data and legal roadmaps that leave no room for error.' },
          integrity: { title: 'Integrity', desc: 'Transparent advice that prioritizes your business interests.' },
          excellence: { title: 'Excellence', desc: 'World-class service standards in every interaction.' },
          commitment: { title: 'Commitment', desc: 'Dedicated to your long-term success in the Kingdom.' }
        },
        vision: {
          title: 'Aligned with Vision 2030',
          text: 'We are proud to support the Kingdom\'s ambitious goals by facilitating foreign direct investment and fostering a vibrant business ecosystem for the next generation.',
          cta: 'Building the Future Together'
        }
      },
      consultancy: {
        hero: {
          title: 'Expert Business & Legal Support',
          subtitle: 'Navigate the Saudi market with confidence. We connect you with verified local partners to handle your legal, licensing, and business setup needs.',
          badge: 'Verified Partner Network'
        },
        services: {
          title: 'Our Partner Services',
          clickForDetails: 'Click for Details',
          modal: {
            requirements: 'Key Requirements',
            resources: 'Official Resources',
            timeline: 'Estimated Timeline',
            cost: 'Estimated Cost',
            cta: 'Start My Application'
          },
          misa: { 
            title: 'MISA Licensing', 
            desc: 'Full support for foreign investment licenses and company registration.',
            details: {
              overview: 'The Ministry of Investment (MISA) issues licenses to foreign investors. This is the first step to entering the Kingdom.',
              requirements: ['Minimum capital (varies by sector)', 'Commercial Registration (CR) from home country', 'Board resolution to invest in KSA'],
              timeline: '3-5 business days for the license; 2-4 weeks for full setup.',
              cost: 'MISA license fee is approx. SAR 2,000 for the first year (plus service fees).',
              officialLink: 'https://www.google.com/search?q=MISA+Saudi+Arabia+Official+Portal',
              officialName: 'MISA Official Portal (Search)',
              note: 'Note: .gov.sa sites may be blocked outside KSA. Use a VPN or search on Google.'
            }
          },
          legal: { 
            title: 'Legal Compliance', 
            desc: 'Expert advice on Saudi labor laws, contracts, and dispute resolution.',
            details: {
              overview: 'Saudi Labor Law is strict regarding employee rights, GOSI registration, and Saudization (Nitaqat) targets.',
              requirements: ['Standardized employment contracts', 'GOSI (Social Insurance) registration', 'Qiwa platform compliance'],
              timeline: 'Ongoing compliance monitoring.',
              cost: 'Varies based on company size and number of employees.',
              officialLink: 'https://www.google.com/search?q=Qiwa+Platform+Saudi+Arabia',
              officialName: 'Qiwa Platform (Search)',
              note: 'Note: .gov.sa sites may be blocked outside KSA. Use a VPN or search on Google.'
            }
          },
          tax: { 
            title: 'Tax & Zakat', 
            desc: 'Navigate the KSA tax landscape with certified local accountants.',
            details: {
              overview: 'Foreign companies pay 20% Corporate Income Tax. Saudi/GCC-owned companies pay 2.5% Zakat.',
              requirements: ['VAT registration (if revenue > SAR 375k)', 'ZATCA E-invoicing compliance', 'Annual audited financial statements'],
              timeline: 'Monthly/Quarterly VAT filings; Annual Tax/Zakat returns.',
              cost: 'Standard VAT rate is 15%.',
              officialLink: 'https://www.google.com/search?q=ZATCA+Portal+Saudi+Arabia',
              officialName: 'ZATCA Portal (Search)',
              note: 'Note: .gov.sa sites may be blocked outside KSA. Use a VPN or search on Google.'
            }
          },
          office: { 
            title: 'Office & Logistics', 
            desc: 'Find the right physical presence and handle local PRO requirements.',
            details: {
              overview: 'A physical office address is mandatory for obtaining a Commercial Registration (CR).',
              requirements: ['Lease agreement (Ejar)', 'National Address (Wasel)', 'Municipality License (Baladiya)'],
              timeline: '1-2 weeks for lease and address setup.',
              cost: 'Varies by location (Riyadh, Jeddah, Dammam).',
              officialLink: 'https://www.google.com/search?q=Ejar+System+Saudi+Arabia',
              officialName: 'Ejar System (Search)',
              note: 'Note: .gov.sa sites may be blocked outside KSA. Use a VPN or search on Google.'
            }
          }
        },
        form: {
          title: 'Request a Consultation',
          subtitle: 'Tell us about your project and we will match you with the right expert within 24 hours.',
          name: 'Full Name',
          company: 'Company Name',
          email: 'Business Email',
          sector: 'Industry Sector',
          budget: 'Investment Budget',
          needs: 'Specific Requirements',
          submit: 'Request Expert Match',
          success: 'Thank you! Our team will review your request and connect you with a partner shortly.',
          process: {
            step1: { title: 'Submit Your Inquiry', desc: 'Fill out the form with your business details and specific requirements.' },
            step2: { title: 'Expert Matching', desc: 'Our team reviews your needs and selects the most qualified local partner.' },
            step3: { title: 'Direct Introduction', desc: 'You receive a direct introduction to the partner to start your consultation.' },
            successTitle: 'Inquiry Received',
            anotherRequest: 'Send another request'
          }
        },
        faq: {
          q_top10: {
            q: 'What are the top 10 businesses for expats in Saudi Arabia?',
            a: 'Establishing a business in Saudi Arabia as an expat has never been more promising, thanks to the transformative Vision 2030 initiative. The Kingdom is actively diversifying its economy away from oil, creating a fertile ground for foreign investment across various sectors. Below are the top 10 business opportunities for expats, detailed with their reasons, legal, financial, and other requirements.\n\n### 1. E-commerce and Logistics\n**Reason:** Saudi Arabia has one of the highest smartphone and internet penetration rates globally. The shift towards online shopping is permanent, creating a massive demand for both digital storefronts and the physical infrastructure to deliver goods.\n**Legal Requirements:** A MISA investment license is required. You must also obtain a Commercial Registration (CR) and, for logistics, a license from the Transport General Authority (TGA).\n**Financial Requirements:** While e-commerce can start small, logistics requires significant capital for a delivery fleet and warehousing. Minimum capital for MISA varies but expect to show proof of investment capability.\n**Other Requirements:** Robust cybersecurity measures and integration with local payment gateways like Mada.\n\n### 2. Healthcare and Medical Services\n**Reason:** The government is privatizing many health services, and there is a growing demand for specialized clinics, diagnostic centers, and home healthcare.\n**Legal Requirements:** Requires dual approval from MISA and the Ministry of Health (MOH). Professional licenses for all medical staff are mandatory.\n**Financial Requirements:** High initial investment for medical equipment, facility leasing, and insurance.\n**Other Requirements:** Strict adherence to Saudi Central Board for Accreditation of Healthcare Institutions (CBAHI) standards.\n\n### 3. Construction and Real Estate Development\n**Reason:** With "Giga-projects" like NEOM, the Red Sea Project, and massive housing initiatives, the construction sector is booming.\n**Legal Requirements:** MISA license and classification from the Ministry of Municipal and Rural Affairs (MOMRA).\n**Financial Requirements:** High working capital and performance bonds for government contracts.\n**Other Requirements:** Specialized engineering talent and heavy machinery.\n\n### 4. Information Technology and Software Development\n**Reason:** Every sector in KSA is undergoing digital transformation. There is a critical need for custom software, AI solutions, and cloud services.\n**Legal Requirements:** MISA license. Certain activities may require registration with the Communications, Space and Technology Commission (CST).\n**Financial Requirements:** Relatively lower compared to industrial sectors, focused mainly on talent acquisition and high-end hardware.\n**Other Requirements:** Compliance with National Cybersecurity Authority (NCA) guidelines.\n\n### 5. Renewable Energy and Solar Solutions\n**Reason:** Saudi Arabia aims to generate 50% of its energy from renewable sources by 2030. The National Renewable Energy Program (NREP) offers massive tenders.\n**Legal Requirements:** Ministry of Energy approvals and MISA license.\n**Financial Requirements:** High R&D and infrastructure costs.\n**Other Requirements:** Technical partnerships with global technology providers are often beneficial.\n\n### 6. Education and Vocational Training\n**Reason:** There is a high demand for high-quality international schools and vocational training to upskill the Saudi workforce.\n**Legal Requirements:** Licenses from the Ministry of Education (MOE) or the Technical and Vocational Training Corporation (TVTC).\n**Financial Requirements:** Significant investment in school facilities and international curriculum licensing.\n**Other Requirements:** Strict teacher qualification standards and safety certifications.\n\n### 7. Tourism and Hospitality\n**Reason:** The new tourist visa and the development of luxury destinations have made tourism a pillar of the new economy.\n**Legal Requirements:** Ministry of Tourism license and MISA license.\n**Financial Requirements:** Large capital for hotel development or boutique travel agency operations.\n**Other Requirements:** Focus on "Saudi Hospitality" and cultural sensitivity.\n\n### 8. Food and Beverage (F&B)\n**Reason:** A young, urban population with high disposable income makes the F&B sector highly lucrative, especially for unique international concepts.\n**Legal Requirements:** Baladiya (Municipality) license and Saudi Food and Drug Authority (SFDA) approvals.\n**Financial Requirements:** Costs for interior design, professional kitchen equipment, and potentially franchise fees.\n**Other Requirements:** Strict hygiene standards and supply chain reliability.\n\n### 10. Professional Services and Consultancy\n**Reason:** As regulations change, businesses need expert advice on legal, financial, and strategic matters to ensure compliance.\n**Legal Requirements:** MISA license (Service category). Professional indemnity insurance is often required.\n**Financial Requirements:** Mainly focused on office space and high-level professional salaries.\n**Other Requirements:** Deep understanding of the local market and networking capabilities.\n\nIn conclusion, while the opportunities are vast, success in the Saudi market requires a long-term commitment, local partnerships, and a deep respect for the Kingdom\'s cultural and regulatory framework.'
          },
          q1: { q: 'How can a foreigner start a business in Saudi Arabia?', a: 'Foreign investors can establish a 100% foreign-owned entity in Saudi Arabia by obtaining an investment license from the Ministry of Investment (MISA). According to the Saudi Investment Law, this process involves submitting a business plan and corporate documents through the MISA e-services portal. Once the license is issued, the company must register with the Ministry of Commerce to obtain a Commercial Registration (CR). This streamlined process is part of the National Investment Strategy under Vision 2030 to attract global capital.' },
          q2: { q: 'What is the minimum capital for a MISA license?', a: 'The minimum capital requirement varies significantly depending on the specific business sector and activity. For most service-oriented activities, MISA does not mandate a fixed minimum capital, allowing for greater flexibility for startups. However, industrial and agricultural projects often require higher capital commitments as per the Ministry of Industry and Mineral Resources guidelines. It is essential to verify the latest capital requirements for your specific ISIC activity code on the MISA official website.' },
          q3: { q: 'What is Saudization (Nitaqat)?', a: 'Saudization, officially known as the Nitaqat program, is a policy implemented by the Ministry of Human Resources and Social Development (MHRSD). It requires companies to employ a specific percentage of Saudi nationals based on their industry classification and total headcount. Companies are categorized into color zones (Platinum, Green, Yellow, Red) which determine their access to government services and ability to hire foreign workers. Compliance is monitored in real-time through the Qiwa platform to ensure alignment with Vision 2030 employment goals.' },
          q4: { q: 'Are there taxes for foreign companies?', a: 'Foreign-owned companies in Saudi Arabia are subject to a 20% Corporate Income Tax on their net adjusted profits as regulated by the Zakat, Tax and Customs Authority (ZATCA). Additionally, companies must register for Value Added Tax (VAT) if their annual taxable supplies exceed SAR 375,000, with a standard rate currently set at 15%. There is no personal income tax for employees in the Kingdom, making it an attractive destination for global talent. Companies must also comply with E-invoicing (Fatoora) requirements for all B2B and B2C transactions.' },
          q5: { q: 'Can I open a bank account as a foreign investor?', a: 'Yes, foreign investors are fully entitled to open corporate bank accounts at any local or international bank operating within the Kingdom. This process requires a valid Commercial Registration (CR) issued by the Ministry of Commerce and a MISA investment license. Banks will also require the company\'s Articles of Association and proof of a registered National Address (Wasel). The Saudi Central Bank (SAMA) oversees these regulations to ensure a secure and transparent financial environment for all business entities.' },
          q6: { q: 'What is the Premium Residency (Saudi Green Card)?', a: 'The Saudi Premium Residency program, managed by the Premium Residency Center, offers eligible foreigners the right to live, work, and own property in the Kingdom without a Saudi sponsor. There are several tracks available, including Limited Duration, Permanent, and specialized tracks for talent, investors, and entrepreneurs. Holders enjoy benefits such as the ability to conduct business under the Investment Law and simplified exit/entry procedures. This initiative is a key pillar of Vision 2030 to attract high-net-worth individuals and skilled professionals.' },
          q7: { q: 'How long does it take to get a Commercial Registration (CR)?', a: 'Once the MISA investment license is successfully issued, obtaining a Commercial Registration (CR) from the Ministry of Commerce is remarkably fast, often taking less than 24 hours. The entire process is digitized through the Saudi Business Center (SBC) and the Ministry\'s online portal. This efficiency is a result of the "Start Your Business" initiative, which integrates various government approvals into a single digital journey. However, additional municipality licenses (Baladiya) and civil defense approvals may be required depending on the physical office location.' },
          q8: { q: 'What are the Regional Headquarters (RHQ) requirements?', a: 'As per the latest government regulations effective from January 2024, multinational companies with government contracts must establish their Regional Headquarters (RHQ) in Riyadh. The RHQ must be a center of administrative power, providing strategic direction and management for the company\'s operations across the MENA region. MISA offers a specialized RHQ license which includes incentives such as a 30-year corporate tax holiday and exemptions from certain Saudization requirements. This policy aims to transform Riyadh into a global business hub and increase the contribution of the non-oil sector.' },
          q9: { q: 'Is 100% foreign ownership allowed in retail?', a: 'Yes, 100% foreign ownership is permitted in the retail and wholesale sectors, provided the investor meets specific criteria set by the Ministry of Investment (MISA). These criteria typically include a minimum investment capital of SAR 30 million over the first five years and a commitment to achieving specific Saudization targets. Companies must also demonstrate a global presence and provide a clear plan for localizing supply chains and training Saudi staff. This opening of the retail sector is designed to modernize the market and introduce global best practices to the Kingdom.' },
          q10: { q: 'What is the role of the Qiwa platform?', a: 'The Qiwa platform, launched by the Ministry of Human Resources and Social Development (MHRSD), serves as the unified digital gateway for all labor-related services in Saudi Arabia. It centralizes functions such as issuing work permits, managing employment contracts, and monitoring Saudization (Nitaqat) compliance. Through Qiwa, businesses can access their "Labor Office" services electronically, reducing paperwork and increasing transparency in the labor market. It is an essential tool for every business owner to manage their workforce and ensure full compliance with Saudi Labor Law.' }
        }
      },
      guides: {
        title: 'Strategic Regulatory Guides',
        subtitle: 'Access our premium collection of regulatory frameworks and operational guides designed for professionals in Saudi Arabia.',
        searchPlaceholder: 'Search intelligence guides...',
        verifiedRepository: 'Verified Repository',
        readDetails: 'Read Details',
        documentId: 'Document ID',
        legalNotice: 'Legal Repository Notice',
        legalNoticeContent: 'This document is for educational purposes. Regulatory environments are dynamic. Please verify with official government portals or legal partners before execution.',
        closeDocument: 'Close Document',
        guideVersion: 'Guide',
        legislativeIntelligence: 'Legislative Intelligence',
        officialPolicyDatabase: 'Official Policy Database',
        processingContent: 'Processing content...'
      },
      news: {
        title: 'Strategic Market Alerts',
        subtitle: 'Intelligence-driven reporting on Saudi Arabia\'s most critical market movements.',
        searchPlaceholder: 'Search strategic alerts...',
        categories: {
          all: 'All intelligence',
          regulatory: 'Regulatory',
          energy: 'Energy',
          finance: 'Finance',
          residency: 'Residency'
        },
        impact: {
          high: 'High Impact',
          medium: 'Medium Impact',
          low: 'Low Impact'
        },
        modal: {
          close: 'Close Briefing',
          downloadPdf: 'Download PDF Briefing',
          originalSource: 'Original Source',
          marketBriefing: 'Market Briefing',
          aiStrategicNarrative: 'AI Strategic Narrative',
          intelligenceVerified: 'Intelligence Verified',
          exportNote: 'High-fidelity briefing generated. You may now export this intelligence for downstream executive consumption.',
          calculating: 'The engine is currently calculating the strategic impact.',
          synthesizing: 'Market intelligence summary is currently being synthesized.'
        }
      }
    }
  },
  ar: {
    translation: {
      nav: {
        logo: 'The Saudi Insights',
        home: 'الرئيسية',
        faq: 'أسئلة الأعمال السعودية',
        blog: 'المدونة',
        services: 'الخدمات',
        about: 'من نحن',
        contact: 'اتصل بنا',
        expatHub: 'مركز الوافدين',
        consultancy: 'الاستشارات',
        news: 'الأخبار',
        guides: 'الأدلة الإرشادية',
        login: 'دخول',
        categories: {
          all: 'الكل',
          regulatory: 'تنظيمي',
          residency: 'الإقامة والتأشيرات',
          opportunity: 'فرص',
          macro: 'ماكرو',
          local: 'تأثير محلي',
          lifestyle: 'نمط الحياة',
          community: 'المجتمع',
          fashion: 'الأزياء',
        }
      },
      common: {
        search: 'بحث',
        add: 'إضافة',
        save: 'حفظ',
        cancel: 'إلغاء',
        edit: 'تعديل',
        delete: 'حذف',
        success: 'نجاح',
        error: 'خطأ',
        medicines: 'الأدوية',
        suppliers: 'الموردين',
        dashboard: 'لوحة القيادة',
        total: 'الإجمالي',
        status: 'الحالة',
        actions: 'الإجراءات',
        date: 'التاريخ',
        loading: 'جاري التحميل...',
        noData: 'لا توجد بيانات',
      },
      pos: {
        title: 'نقطة البيع',
        receipt: 'الفاتورة',
        addItem: 'إضافة مادة',
        qty: 'الكمية',
        price: 'السعر',
        total: 'الإجمالي',
        discount: 'الخصم',
        finalAmount: 'المبلغ النهائي',
        cashReceived: 'المبلغ المستلم',
        change: 'الباقي',
        completeSale: 'إتمام البيع',
        print: 'طباعة الفاتورة',
        customerName: 'اسم العميل',
        contact: 'الاتصال',
        outOfStock: 'نفذت الكمية',
        notEnoughStock: 'الكمية المتوفرة غير كافية',
        insufficientCash: 'المبلغ المستلم غير كافٍ',
        checkoutFailed: 'فشل إتمام عملية البيع',
        pdfFailed: 'فشل إنشاء ملف PDF',
      },
      suppliers: {
        title: 'إدارة الموردين',
        subtitle: 'إدارة البائعين والمشتريات والمدفوعات الخاصة بك.',
        addSupplier: 'إضافة مورد',
        editSupplier: 'تعديل مورد',
        supplierName: 'اسم المورد',
        contactPerson: 'الشخص المسؤول',
        mobile: 'الجوال',
        email: 'البريد الإلكتروني',
        type: 'النوع',
        category: 'الفئة',
        status: 'الحالة',
        balance: 'الرصيد',
        ledger: 'دفتر الأستاذ',
        purchases: 'المشتريات',
        payments: 'المدفوعات',
        returns: 'المرتجعات',
        newPurchase: 'شراء جديد',
        recordPayment: 'تسجيل دفعة',
        newReturn: 'مرتجع جديد',
        contactInfo: 'معلومات الاتصال',
        typeCategory: 'النوع والفئة',
        legalInfo: 'المعلومات القانونية',
        searchSuppliers: 'البحث عن الموردين...',
        purchaseHistory: 'سجل المشتريات',
        supplierPayments: 'مدفوعات الموردين',
        purchaseReturns: 'مرتجعات المشتريات',
        invoiceNo: 'رقم الفاتورة',
        totalAmount: 'المبلغ الإجمالي',
        pendingPayables: 'المدفوعات المعلقة',
        totalPaid: 'إجمالي المدفوعات',
        totalReturns: 'إجمالي المرتجعات',
        recentPurchases: 'المشتريات الأخيرة',
        recentPayments: 'المدفوعات الأخيرة',
        recordPurchase: 'تسجيل شراء جديد',
        addStockDesc: 'إضافة مخزون وتحديث رصيد المورد.',
        selectSupplier: 'اختر المورد',
        paymentMethod: 'طريقة الدفع',
        reference: 'المرجع',
        debit: 'مدين (+)',
        credit: 'دائن (-)',
        description: 'الوصف',
        ledgerDesc: 'اختر مورداً من القائمة أعلاه لعرض دفتر الأستاذ المحاسبي المفصل وسجل المعاملات.',
        confirmDelete: 'هل أنت متأكد أنك تريد حذف هذا المورد؟',
        accountTitle: 'عنوان الحساب',
        accountNumber: 'رقم الحساب / IBAN',
        purchaseSettings: 'إعدادات الشراء',
        defaultDiscount: 'نسبة الخصم الافتراضية %',
        supplyCategory: 'فئة التوريد',
        preferredSupplier: 'المورد المفضل',
        ntn: 'الرقم الضريبي (NTN)',
        strn: 'رقم التسجيل الضريبي (STRN)',
        drugLicense: 'رخصة الدواء',
        licenseExpiry: 'انتهاء الرخصة',
        registrationNo: 'رقم التسجيل',
        openingBalance: 'الرصيد الافتتاحي',
        creditLimit: 'الحد الائتماني',
        creditDays: 'أيام الائتمان',
        paymentTerms: 'شروط الدفع',
        priority: 'الأولوية',
        address: 'العنوان',
        city: 'المدينة',
        state: 'الولاية/المقاطعة',
        country: 'البلد',
        postalCode: 'الرمز البريدي',
        supplierType: 'نوع المورد',
      },
      medicines: {
        title: 'إدارة الأدوية',
        addMedicine: 'إضافة دواء',
        editMedicine: 'تعديل دواء',
        name: 'اسم الدواء',
        batch: 'رقم التشغيلة',
        expiry: 'تاريخ الانتهاء',
        stock: 'الكمية المتوفرة',
        purchasePrice: 'سعر الشراء',
        salePrice: 'سعر البيع',
        barcode: 'الباركود',
        prescription: 'يتطلب وصفة طبية',
      },
      dashboard: {
        title: 'لوحة القيادة',
        subtitle: 'نظرة عامة في الوقت الفعلي على عمليات الصيدلية الخاصة بك.',
        totalSales: 'إجمالي المبيعات (اليوم)',
        lowStock: 'الأصناف منخفضة المخزون',
        expiredSoon: 'تنتهي صلاحيتها قريباً',
        recentSales: 'المبيعات الأخيرة (اليوم)',
        lowStockAlerts: 'تنبيهات انخفاض المخزون',
        recentTransactions: 'المعاملات الأخيرة',
        manage: 'إدارة',
        viewAll: 'عرض الكل',
      },
      layout: {
        breaking: 'تنبيه استراتيجي',
        source: 'المصدر',
        readFullAnalysis: 'قراءة التحليل الكامل',
        close: 'تجاهل',
        welcome: 'مرحباً بكم في',
        selectLanguage: 'يرجى اختيار لغتك المفضلة للمتابعة',
        vision2030: 'بوابة استخبارات رؤية 2030',
      },
      hero: {
        title: 'بصائر السعودية',
        subtitle: 'المصدر الأول للرؤى في الوقت الفعلي، واتجاهات السوق، وتحليل رؤية 2030 للمستثمرين العالميين.',
        cta: 'اقرأ أحدث الأخبار',
      },
      blog: {
        title: 'بوابة استخبارات الأعمال',
        subtitle: 'أحدث المواضيع والتحليلات المتخصصة لمشهد الأعمال السعودي الحديث.',
        latest: 'استخبارات السوق',
        readMore: 'التحليل الكامل',
        searchPlaceholder: 'بحث في المقالات...',
        all: 'الكل',
        closeArticle: 'إغلاق المقال',
        authorRole: 'محلل أعمال أول'
      },
      contact: {
        title: 'تواصل مع الخبراء',
        subtitle: 'هل تبحث عن خدمات محددة؟ يمكننا توصيلك بالشركاء القانونيين والتجاريين المناسبين في المملكة.',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        success: 'شكراً لك! سيقوم فريقنا بمراجعة طلبك وتوصيلك بشريك قريباً.',
        info: {
          email: { title: 'راسلنا', subtitle: 'نرد خلال 24 ساعة.' },
          phone: { title: 'اتصل بنا', subtitle: 'الأحد - الخميس، 9 صباحاً - 5 مساءً' }
        },
        form: {
          subject: 'الموضوع',
          subjects: {
            general: 'استفسار عام',
            setup: 'مساعدة في تأسيس الأعمال',
            legal: 'استشارة قانونية',
            investment: 'فرص استثمارية'
          },
          placeholders: {
            name: 'جون دو',
            email: 'john@example.com',
            message: 'كيف يمكننا مساعدتك؟'
          }
        },
        faq: {
          title: 'الأسئلة الشائعة',
          subtitle: 'إجابات سريعة على الأسئلة المتكررة.',
          q1: { q: 'كم من الوقت يستغرق الحصول على ترخيص ميزا؟', a: 'عادة من 3-5 أيام عمل بمجرد تقديم جميع المستندات بشكل صحيح.' },
          q2: { q: 'ما هي ساعات العمل لديكم؟', a: 'نحن متاحون من الأحد إلى الخميس، من 9:00 صباحاً إلى 5:00 مساءً (توقيت مكة).' }
        }
      },
      expatHub: {
        title: 'مركز استخبارات الوافدين',
        subtitle: 'دليلك الشامل للعيش والعمل والاستثمار في المملكة العربية السعودية.',
        regulatoryFeed: 'تحديثات الأنظمة المباشرة',
        spaSource: 'يتم سحب هذه البيانات مباشرة من وكالة الأنباء السعودية ووزارة الموارد البشرية لضمان الدقة.',
        officialSource: 'المصدر الرسمي',
        publicServices: {
          title: 'الخدمات العامة والخاصة الأساسية',
          subtitle: 'أبرز مزودي القطاع الخاص الذين يقدمون دعماً كاملاً باللغات العربية والإنجليزية والأردية.',
          banking: 'الخدمات المصرفية والحوالات',
          telecom: 'الاتصالات والخدمات الرقمية',
          retail: 'التجزئة ونمط الحياة',
          visitWebsite: 'زيارة الموقع'
        }
      },
      footer: {
        rights: 'جميع الحقوق محفوظة.',
        tagline: 'جسرك نحو التميز في الأعمال السعودية.',
        expertInsights: 'رؤى خبيرة في الأعمال',
        faqTitle: 'أسئلة الأعمال السعودية الشائعة',
        disclaimerTitle: 'إخلاء المسؤولية القانونية',
        disclaimerText: 'المعلومات المقدمة في هذه البوابة هي لأغراض إعلامية عامة فقط. بينما نسعى جاهدين لتحقيق الدقة، إلا أنها لا تشكل نصيحة قانونية أو مالية أو مهنية. نحن نشجع جميع المستثمرين على استشارة المهنيين المحليين المعتمدين قبل اتخاذ أي قرارات تجارية.',
        aiContentLab: 'مختبر محتوى الذكاء الاصطناعي',
      },
      privacy: {
        title: 'سياسة الخصوصية',
        lastUpdated: 'آخر تحديث',
        intro: {
          title: 'مقدمة',
          content: 'مرحباً بكم في "بصائر السعودية". نحن ملتزمون بحماية بياناتكم الشخصية وخصوصيتكم. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتكم عند زيارة موقعنا، بما يتماشى مع نظام حماية البيانات الشخصية السعودي (PDPL)، واللائحة العامة للحماية البيانات (GDPR)، ومتطلبات جوجل أدسنس.'
        },
        collection: {
          title: 'جمع البيانات',
          content: 'قد نقوم بجمع معلومات معينة عنكم بالطرق التالية:',
          item1: 'المعلومات التي تقدمونها مباشرة (مثل نماذج الاتصال أو طلبات الاستشارة).',
          item2: 'المعلومات التلقائية التي يتم جمعها من خلال ملفات تعريف الارتباط والتقنيات المشابهة.',
          item3: 'بيانات السجل مثل عنوان IP ونوع المتصفح والصفحات التي تمت زيارتها.'
        },
        adsense: {
          title: 'جوجل أدسنس وملفات تعريف الارتباط',
          content: 'نحن نستخدم جوجل أدسنس لعرض الإعلانات على موقعنا. تستخدم جوجل ملفات تعريف الارتباط لعرض الإعلانات بناءً على زيارات المستخدم السابقة لموقعنا أو مواقع الويب الأخرى.',
          item1: 'يسمح استخدام جوجل لملفات تعريف الارتباط الإعلانية لها ولشركائها بعرض الإعلانات لمستخدمينا بناءً على زيارتهم لمواقعنا و/أو المواقع الأخرى على الإنترنت.',
          item2: 'يمكن للمستخدمين اختيار عدم قبول الإعلانات المخصصة من خلال زيارة إعدادات الإعلانات.',
          item3: 'نستخدم أيضاً ملفات تعريف الارتباط لتحليل حركة المرور وتحسين تجربة المستخدم.'
        },
        pdpl: {
          title: 'الامتثال لنظام حماية البيانات الشخصية السعودي',
          content: 'وفقاً لنظام حماية البيانات الشخصية السعودي، نضمن معالجة بياناتكم بشكل قانوني وعادل وشفاف. نحن نطبق تدابير أمنية صارمة لمنع الوصول غير المصرح به أو الكشف عن معلوماتكم الشخصية داخل المملكة.'
        },
        gdpr: {
          title: 'حقوق GDPR',
          content: 'إذا كنت تزورنا من المنطقة الاقتصادية الأوروبية، فلديك حقوق معينة بموجب GDPR، بما في ذلك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها، والحق في نقل البيانات.'
        },
        contact: {
          title: 'اتصل بنا',
          content: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بمسؤول حماية البيانات لدينا على:'
        }
      },
      cookies: {
        title: 'الموافقة على ملفات تعريف الارتباط',
        message: 'نحن نستخدم ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا.',
        accept: 'قبول الكل',
        reject: 'رفض الكل',
        settings: 'الإعدادات'
      },
      support: {
        welcome: 'مرحباً! 👋 كيف يمكننا مساعدتك؟ أرسل لنا رسالة الآن للحصول على الدعم.',
        startChat: 'ابدأ الدردشة مع:',
      },
      login: {
        title: 'بوابة الاستخبارات',
        selectAccount: 'اختر ملف المحلل الخاص بك',
        enterSystem: 'دخول البوابة',
        localDataNote: 'يتم تخزين جميع البيانات محلياً لضمان أقصى قدر من الخصوصية والأمان.'
      },
      home: {
        whyChoose: 'لماذا تختار "بصائر السعودية"؟',
        whyChooseDesc: 'نحن نسد الفجوة بين المستثمرين العالميين والسوق السعودي المحلي من خلال أبحاث تعتمد على البيانات ومشورة قانونية عملية.',
        latestReports: 'أحدث التقارير الاستخباراتية',
        latestReportsDesc: 'ابق في الصدارة مع تحليلاتنا المتخصصة.',
        viewAllReports: 'عرض جميع التقارير',
        trendingNow: 'المواضيع الرائجة الآن',
        tadawulWatch: 'سوق الأسهم السعودي',
        viewFullMarket: 'عرض التحليل الكامل للسوق',
        newsletterTitle: 'اشترك في نشرتنا الإخبارية للأعمال',
        newsletterDesc: 'احصل على آخر التحديثات حول رؤية 2030 والفرص الاستثمارية في المملكة مباشرة في بريدك الوارد.',
        emailPlaceholder: 'بريدك الإلكتروني',
        subscribeBtn: 'اشترك الآن',
        privacyNote: 'نحن نحترم خصوصيتك. لن نقوم بمشاركة بياناتك أبداً.'
      },
      features: {
        market: {
          title: 'نمو السوق',
          desc: 'تحليل في الوقت الفعلي لأسرع القطاعات نمواً في الاقتصاد السعودي.'
        },
        legal: {
          title: 'الامتثال القانوني',
          desc: 'خرائط طريق خطوة بخطوة لتراخيص وزارة الاستثمار وتسجيل السجل التجاري.'
        },
        vision: {
          title: 'رؤية 2030',
          desc: 'أحدث التحديثات حول المبادرات الحكومية والمشاريع العملاقة مثل نيوم.'
        },
        expert: {
          title: 'شبكة الخبراء',
          desc: 'تواصل مع الاستشاريين المحليين والمتخصصين في تأسيس الأعمال.'
        }
      },
      about: {
        hero: {
          title: 'الجسر نحو الاستخبارات السعودية',
          subtitle: 'بصائر سعودية هي البوابة الرقمية الرائدة للاستخبارات في المملكة، والمخصصة لتزويد المستثمرين العالميين بالبيانات التي يحتاجونها للتنقل في رؤية 2030.',
          description: 'نحن لا نقدم الأخبار فحسب؛ بل نقدم بوابة. من خلال تنسيق أهم تحركات السوق وربط جمهورنا العالمي بشركاء قانونيين وتجاريين محليين معتمدين، نضمن أن تكون رحلتك إلى السوق السعودي مدعومة بالمعلومات والاتصالات الصحيحة.',
          expertise: 'سنوات من الخبرة المحلية'
        },
        values: {
          title: 'قيمنا الأساسية',
          precision: { title: 'الدقة', desc: 'بيانات دقيقة وخرائط طريق قانونية لا تترك مجالاً للخطأ.' },
          integrity: { title: 'النزاهة', desc: 'نصيحة شفافة تضع مصالح عملك في المقام الأول.' },
          excellence: { title: 'التميز', desc: 'معايير خدمة عالمية المستوى في كل تفاعل.' },
          commitment: { title: 'الالتزام', desc: 'مكرسون لنجاحك على المدى الطويل في المملكة.' }
        },
        vision: {
          title: 'متوافقون مع رؤية 2030',
          text: 'نحن فخورون بدعم أهداف المملكة الطموحة من خلال تسهيل الاستثمار الأجنبي المباشر وتعزيز نظام بيئي حيوي للأعمال للجيل القادم.',
          cta: 'نبني المستقبل معاً'
        }
      },
      consultancy: {
        hero: {
          title: 'دعم الأعمال والقانون الخبير',
          subtitle: 'تنقل في السوق السعودي بثقة. نحن نصلك بشركاء محليين معتمدين للتعامل مع احتياجاتك القانونية والترخيص وتأسيس الأعمال.',
          badge: 'شبكة الشركاء المعتمدين'
        },
        services: {
          title: 'خدمات شركائنا',
          clickForDetails: 'اضغط للتفاصيل',
          modal: {
            requirements: 'المتطلبات الأساسية',
            resources: 'المصادر الرسمية',
            timeline: 'الجدول الزمني التقديري',
            cost: 'التكلفة التقديرية',
            cta: 'ابدأ طلبي'
          },
          misa: { 
            title: 'تراخيص "ميزا"', 
            desc: 'دعم كامل لتراخيص الاستثمار الأجنبي وتسجيل الشركات.',
            details: {
              overview: 'تصدر وزارة الاستثمار (MISA) تراخيص للمستثمرين الأجانب. هذه هي الخطوة الأولى لدخول المملكة.',
              requirements: ['رأس المال الأدنى (يختلف حسب القطاع)', 'السجل التجاري (CR) من البلد الأم', 'قرار مجلس الإدارة للاستثمار في المملكة'],
              timeline: '3-5 أيام عمل للترخيص؛ 2-4 أسابيع للتأسيس الكامل.',
              cost: 'رسوم ترخيص ميزا حوالي 2000 ريال للسنة الأولى (بالإضافة إلى رسوم الخدمة).',
              officialLink: 'https://www.google.com/search?q=MISA+Saudi+Arabia+Official+Portal',
              officialName: 'بوابة ميزا الرسمية (بحث جوجل)',
              note: 'ملاحظة: قد تكون المواقع الحكومية محجوبة خارج المملكة. استخدم VPN أو ابحث في جوجل.'
            }
          },
          legal: { 
            title: 'الامتثال القانوني', 
            desc: 'نصيحة خبيرة بشأن قوانين العمل السعودية والعقود وتسوية النزاعات.',
            details: {
              overview: 'قانون العمل السعودي صارم فيما يتعلق بحقوق الموظفين، وتسجيل التأمينات الاجتماعية (GOSI)، وأهداف التوطين (نطاقات).',
              requirements: ['عقود عمل موحدة', 'التسجيل في التأمينات الاجتماعية (GOSI)', 'الامتثال لمنصة "قوى"'],
              timeline: 'مراقبة الامتثال المستمرة.',
              cost: 'يختلف بناءً على حجم الشركة وعدد الموظفين.',
              officialLink: 'https://www.google.com/search?q=Qiwa+Platform+Saudi+Arabia',
              officialName: 'منصة قوى (بحث جوجل)',
              note: 'ملاحظة: قد تكون المواقع الحكومية محجوبة خارج المملكة. استخدم VPN أو ابحث في جوجل.'
            }
          },
          tax: { 
            title: 'الضرائب والزكاة', 
            desc: 'تنقل في المشهد الضريبي السعودي مع محاسبين محليين معتمدين.',
            details: {
              overview: 'تدفع الشركات الأجنبية ضريبة دخل الشركات بنسبة 20%. تدفع الشركات المملوكة للسعوديين/دول الخليج زكاة بنسبة 2.5%.',
              requirements: ['التسجيل في ضريبة القيمة المضافة (إذا كانت الإيرادات > 375 ألف ريال)', 'الامتثال للفواتير الإلكترونية (ZATCA)', 'البيانات المالية السنوية المدققة'],
              timeline: 'إقرارات ضريبة القيمة المضافة شهرية/ربع سنوية؛ إقرارات الزكاة/الضريبة سنوية.',
              cost: 'معدل ضريبة القيمة المضافة القياسي هو 15%.',
              officialLink: 'https://www.google.com/search?q=ZATCA+Portal+Saudi+Arabia',
              officialName: 'بوابة زاتكا (بحث جوجل)',
              note: 'ملاحظة: قد تكون المواقع الحكومية محجوبة خارج المملكة. استخدم VPN أو ابحث في جوجل.'
            }
          },
          office: { 
            title: 'المكاتب والخدمات اللوجستية', 
            desc: 'ابحث عن التواجد المادي المناسب وتعامل مع متطلبات التعقيب المحلية.',
            details: {
              overview: 'عنوان المكتب الفعلي إلزامي للحصول على السجل التجاري (CR).',
              requirements: ['عقد إيجار (إيجار)', 'العنوان الوطني (واصل)', 'رخصة البلدية'],
              timeline: '1-2 أسبوع لعقد الإيجار وإعداد العنوان.',
              cost: 'يختلف حسب الموقع (الرياض، جدة، الدمام).',
              officialLink: 'https://www.google.com/search?q=Ejar+System+Saudi+Arabia',
              officialName: 'نظام إيجار (بحث جوجل)',
              note: 'ملاحظة: قد تكون المواقع الحكومية محجوبة خارج المملكة. استخدم VPN أو ابحث في جوجل.'
            }
          }
        },
        form: {
          title: 'طلب استشارة',
          subtitle: 'أخبرنا عن مشروعك وسنقوم بمطابقتك مع الخبير المناسب خلال 24 ساعة.',
          name: 'الاسم الكامل',
          company: 'اسم الشركة',
          email: 'البريد الإلكتروني للعمل',
          sector: 'قطاع الصناعة',
          budget: 'ميزانية الاستثمار',
          needs: 'متطلبات محددة',
          submit: 'طلب مطابقة خبير',
          success: 'شكراً لك! سيقوم فريقنا بمراجعة طلبك وتوصيلك بشريك قريباً.',
          process: {
            step1: { title: 'أرسل استفسارك', desc: 'املأ النموذج بتفاصيل عملك ومتطلباتك المحددة.' },
            step2: { title: 'مطابقة الخبراء', desc: 'يقوم فريقنا بمراجعة احتياجاتك واختيار الشريك المحلي الأكثر تأهيلاً.' },
            step3: { title: 'مقدمة مباشرة', desc: 'تتلقى مقدمة مباشرة للشريك لبدء استشارتك.' },
            successTitle: 'تم استلام الطلب',
            anotherRequest: 'إرسال طلب آخر'
          }
        },
        faq: {
          q_top10: {
            q: 'ما هي أفضل 10 أعمال تجارية للوافدين في المملكة العربية السعودية؟',
            a: 'لم يكن تأسيس عمل تجاري في المملكة العربية السعودية كوافد أكثر واعدة مما هو عليه الآن، بفضل مبادرة رؤية 2030 التحويلية. تعمل المملكة بنشاط على تنويع اقتصادها بعيداً عن النفط، مما يخلق أرضية خصبة للاستثمار الأجنبي في مختلف القطاعات. فيما يلي أفضل 10 فرص تجارية للوافدين، مفصلة بأسبابها ومتطلباتها القانونية والمالية وغيرها.\n\n### 1. التجارة الإلكترونية والخدمات اللوجستية\n**السبب:** تمتلك المملكة العربية السعودية واحدة من أعلى معدلات انتشار الهواتف الذكية والإنترنت عالمياً. التحول نحو التسوق عبر الإنترنت دائم، مما يخلق طلباً هائلاً على كل من المتاجر الرقمية والبنية التحتية المادية لتسليم البضائع.\n**المتطلبات القانونية:** مطلوب ترخيص استثمار من وزارة الاستثمار (MISA). يجب عليك أيضاً الحصول على سجل تجاري (CR) وللخدمات اللوجستية، ترخيص من الهيئة العامة للنقل (TGA).\n**المتطلبات المالية:** بينما يمكن أن تبدأ التجارة الإلكترونية صغيرة، تتطلب الخدمات اللوجستية رأسمالاً كبيراً لأسطول التوصيل والمستودعات.\n**متطلبات أخرى:** تدابير قوية للأمن السيبراني والتكامل مع بوابات الدفع المحلية مثل "مدى".\n\n### 2. الرعاية الصحية والخدمات الطبية\n**السبب:** تقوم الحكومة بخصخصة العديد من الخدمات الصحية، وهناك طلب متزايد على العيادات المتخصصة ومراكز التشخيص والرعاية الصحية المنزلية.\n**المتطلبات القانونية:** يتطلب موافقة مزدوجة من وزارة الاستثمار ووزارة الصحة (MOH). التراخيص المهنية لجميع الكوادر الطبية إلزامية.\n**المتطلبات المالية:** استثمار أولي مرتفع للمعدات الطبية واستئجار المرافق والتأمين.\n**متطلبات أخرى:** الالتزام الصارم بمعايير المركز السعودي لاعتماد المنشآت الصحية (سباهي).\n\n### 3. الإنشاءات والتطوير العقاري\n**السبب:** مع "المشاريع العملاقة" مثل نيوم ومشروع البحر الأحمر ومبادرات الإسكان الضخمة، يشهد قطاع الإنشاءات ازدهاراً.\n**المتطلبات القانونية:** ترخيص وزارة الاستثمار وتصنيف من وزارة الشؤون البلدية والقروية والإسكان.\n**المتطلبات المالية:** رأس مال عامل مرتفع وضمانات حسن التنفيذ للعقود الحكومية.\n**متطلبات أخرى:** مواهب هندسية متخصصة وآلات ثقيلة.\n\n### 4. تكنولوجيا المعلومات وتطوير البرمجيات\n**السبب:** يمر كل قطاع في المملكة بتحول رقمي. هناك حاجة ماسة للبرمجيات المخصصة وحلول الذكاء الاصطناعي والخدمات السحابية.\n**المتطلبات القانونية:** ترخيص وزارة الاستثمار. قد تتطلب بعض الأنشطة التسجيل لدى هيئة الاتصالات والفضاء والتقنية (CST).\n**المتطلبات المالية:** أقل نسبياً مقارنة بالقطاعات الصناعية، وتركز بشكل أساسي على استقطاب المواهب والأجهزة المتطورة.\n**متطلبات أخرى:** الامتثال لإرشادات الهيئة الوطنية للأمن السيبراني (NCA).\n\n### 5. الطاقة المتجددة وحلول الطاقة الشمسية\n**السبب:** تهدف المملكة العربية السعودية إلى توليد 50% من طاقتها من مصادر متجددة بحلول عام 2030. يقدم البرنامج الوطني للطاقة المتجددة مناقصات ضخمة.\n**المتطلبات القانونية:** موافقات وزارة الطاقة وترخيص وزارة الاستثمار.\n**المتطلبات المالية:** تكاليف عالية للبحث والتطوير والبنية التحتية.\n**متطلبات أخرى:** الشراكات التقنية مع مزودي التكنولوجيا العالميين غالباً ما تكون مفيدة.\n\n### 6. التعليم والتدريب المهني\n**السبب:** هناك طلب كبير على التعليم المدرسي الدولي عالي الجودة والتدريب المهني لرفع مهارات القوى العاملة السعودية.\n**المتطلبات القانونية:** تراخيص من وزارة التعليم أو المؤسسة العامة للتدريب التقني والمهني (TVTC).\n**المتطلبات المالية:** استثمار كبير في المرافق المدرسية وترخيص المناهج الدولية.\n**متطلبات أخرى:** معايير صارمة لتأهيل المعلمين وشهادات السلامة.\n\n### 7. السياحة والضيافة\n**السبب:** جعلت تأشيرة السياحة الجديدة وتطوير الوجهات الفاخرة من السياحة ركيزة للاقتصاد الجديد.\n**المتطلبات القانونية:** ترخيص وزارة السياحة وترخيص وزارة الاستثمار.\n**المتطلبات المالية:** رأس مال كبير لتطوير الفنادق أو عمليات وكالات السفر الفاخرة.\n**متطلبات أخرى:** التركيز على "الضيافة السعودية" والحساسية الثقافية.\n\n### 8. الأغذية والمشروبات (F&B)\n**السبب:** الشباب والنمو الحضري مع دخل متاح مرتفع يجعل قطاع الأغذية والمشروبات مربحاً للغاية، خاصة للمفاهيم الدولية الفريدة.\n**المتطلبات القانونية:** رخصة البلدية وموافقات الهيئة العامة للغذاء والدواء (SFDA).\n**المتطلبات المالية:** تكاليف التصميم الداخلي ومعدات المطبخ المهنية ورسوم الامتياز المحتملة.\n**متطلبات أخرى:** معايير نظافة صارمة وموثوقية سلسلة التوريد.\n\n### 9. التصنيع والخدمات الصناعية\n**السبب:** توفر مبادرة "صنع في السعودية" حوافز للشركات التي توطن عمليات التصنيع الخاصة بها.\n**المتطلبات القانونية:** ترخيص وزارة الصناعة والثروة المعدنية وترخيص وزارة الاستثمار.\n**المتطلبات المالية:** الاستثمار في الأراضي الصناعية والمصانع والآلات.\n**متطلبات أخرى:** التصاريح البيئية وتأمين المواد الخام.\n\n### 10. الخدمات المهنية والاستشارات\n**السبب:** مع تغير اللوائح، تحتاج الشركات إلى مشورة خبراء في الأمور القانونية والمالية والاستراتيجية لضمان الامتثال.\n**المتطلبات القانونية:** ترخيص وزارة الاستثمار (فئة الخدمات). غالباً ما يكون التأمين ضد المسؤولية المهنية مطلوباً.\n**المتطلبات المالية:** تركز بشكل أساسي على المساحات المكتبية ورواتب المهنيين رفيعي المستوى.\n**متطلبات أخرى:** فهم عميق للسوق المحلي وقدرات التواصل.'
          },
          q1: { q: 'كيف يمكن للأجنبي بدء عمل تجاري في السعودية؟', a: 'يمكن للمستثمرين الأجانب تأسيس كيان مملوك بنسبة 100٪ في المملكة العربية السعودية من خلال الحصول على ترخيص استثمار من وزارة الاستثمار (MISA). وفقًا لنظام الاستثمار السعودي، تتضمن هذه العملية تقديم خطة عمل ومستندات الشركة عبر بوابة الخدمات الإلكترونية لوزارة الاستثمار. بمجرد إصدار الترخيص، يجب على الشركة التسجيل لدى وزارة التجارة للحصول على سجل تجاري (CR). تعد هذه العملية المبسطة جزءًا من الاستراتيجية الوطنية للاستثمار ضمن رؤية 2030 لجذب رأس المال العالمي.' },
          q2: { q: 'ما هو الحد الأدنى لرأس المال لترخيص ميزا؟', a: 'يختلف متطلب الحد الأدنى لرأس المال بشكل كبير حسب قطاع الأعمال والنشاط المحدد. بالنسبة لمعظم الأنشطة الموجهة نحو الخدمات، لا تفرض وزارة الاستثمار حداً أدنى ثابتاً لرأس المال، مما يتيح مرونة أكبر للشركات الناشئة. ومع ذلك، غالباً ما تتطلب المشاريع الصناعية والزراعية التزامات رأسمالية أعلى وفقاً لإرشادات وزارة الصناعة والثروة المعدنية. من الضروري التحقق من أحدث متطلبات رأس المال لكود نشاط "آيسك" الخاص بك على الموقع الرسمي لوزارة الاستثمار.' },
          q3: { q: 'ما هو التوطين (نطاقات)؟', a: 'التوطين، المعروف رسمياً ببرنامج "نطاقات"، هو سياسة تنفذها وزارة الموارد البشرية والتنمية الاجتماعية (MHRSD). وهي تتطلب من الشركات توظيف نسبة مئوية محددة من المواطنين السعوديين بناءً على تصنيف صناعتهم وإجمالي عدد الموظفين. يتم تصنيف الشركات إلى نطاقات ملونة (البلاتيني، الأخضر، الأصفر، الأحمر) والتي تحدد وصولهم إلى الخدمات الحكومية وقدرتهم على توظيف العمال الأجانب. يتم مراقبة الامتثال في الوقت الفعلي عبر منصة "قوى" لضمان التوافق مع أهداف التوظيف في رؤية 2030.' },
          q4: { q: 'هل توجد ضرائب على الشركات الأجنبية؟', a: 'تخضع الشركات المملوكة للأجانب في المملكة العربية السعودية لضريبة دخل شركات بنسبة 20٪ على صافي أرباحها المعدلة كما تنظمها هيئة الزكاة والضريبة والجمارك (ZATCA). بالإضافة إلى ذلك، يجب على الشركات التسجيل في ضريبة القيمة المضافة (VAT) إذا تجاوزت توريداتها السنوية الخاضعة للضريبة 375,000 ريال، مع تحديد المعدل القياسي حالياً عند 15٪. لا توجد ضريبة دخل شخصي للموظفين في المملكة، مما يجعلها وجهة جذابة للمواهب العالمية. يجب على الشركات أيضاً الامتثال لمتطلبات الفوترة الإلكترونية (فاتورة) لجميع المعاملات.' },
          q5: { q: 'هل يمكنني فتح حساب بنكي كمستثمر أجنبي؟', a: 'نعم، يحق للمستثمرين الأجانب تماماً فتح حسابات بنكية للشركات في أي بنك محلي أو دولي يعمل داخل المملكة. تتطلب هذه العملية سجلاً تجارياً سارياً (CR) صادراً عن وزارة التجارة وترخيص استثمار من وزارة الاستثمار. ستطلب البنوك أيضاً عقد تأسيس الشركة وإثباتاً لعنوان وطني مسجل (واصل). يشرف البنك المركزي السعودي (SAMA) على هذه اللوائح لضمان بيئة مالية آمنة وشفافة لجميع الكيانات التجارية.' },
          q6: { q: 'ما هي الإقامة المميزة (البطاقة الخضراء السعودية)؟', a: 'يقدم برنامج الإقامة المميزة السعودية، الذي يديره مركز الإقامة المميزة، للأجانب المؤهلين الحق في العيش والعمل وامتلاك العقارات في المملكة دون كفيل سعودي. هناك عدة مسارات متاحة، بما في ذلك الإقامة محددة المدة، والدائمة، ومسارات متخصصة للمواهب والمستثمرين ورواد الأعمال. يتمتع حاملوها بمزايا مثل القدرة على ممارسة الأعمال التجارية بموجب نظام الاستثمار وإجراءات خروج وعودة مبسطة. تعد هذه المبادرة ركيزة أساسية لرؤية 2030 لجذب الأفراد ذوي الملاءة المالية العالية والمهنيين المهرة.' },
          q7: { q: 'كم من الوقت يستغرق الحصول على السجل التجاري (CR)؟', a: 'بمجرد إصدار ترخيص الاستثمار من وزارة الاستثمار بنجاح، يكون الحصول على السجل التجاري (CR) من وزارة التجارة سريعاً بشكل ملحوظ، وغالباً ما يستغرق أقل من 24 ساعة. تتم العملية بالكامل رقمياً عبر المركز السعودي للأعمال (SBC) والبوابة الإلكترونية للوزارة. هذه الكفاءة هي نتيجة لمبادرة "ابدأ عملك"، التي تدمج مختلف الموافقات الحكومية في رحلة رقمية واحدة. ومع ذلك، قد تكون هناك حاجة لتراخيص بلدية إضافية وموافقات الدفاع المدني بناءً على موقع المكتب الفعلي.' },
          q8: { q: 'ما هي متطلبات المقر الإقليمي (RHQ)؟', a: 'وفقاً لأحدث اللوائح الحكومية السارية اعتباراً من يناير 2024، يجب على الشركات متعددة الجنسيات التي لديها عقود حكومية تأسيس مقرها الإقليمي (RHQ) في الرياض. يجب أن يكون المقر الإقليمي مركزاً للسلطة الإدارية، حيث يوفر التوجيه الاستراتيجي والإدارة لعمليات الشركة عبر منطقة الشرق الأوسط وشمال أفريقيا. تقدم وزارة الاستثمار ترخيصاً متخصصاً للمقر الإقليمي يتضمن حوافز مثل إعفاء ضريبي للشركات لمدة 30 عاماً وإعفاءات من بعض متطلبات التوطين. تهدف هذه السياسة إلى تحويل الرياض إلى مركز أعمال عالمي وزيادة مساهمة القطاع غير النفطي.' },
          q9: { q: 'هل يسمح بالملكية الأجنبية بنسبة 100% في قطاع التجزئة؟', a: 'نعم، يسمح بالملكية الأجنبية بنسبة 100٪ في قطاعي التجزئة والجملة، بشرط أن يستوفي المستثمر معايير محددة وضعتها وزارة الاستثمار (MISA). تتضمن هذه المعايير عادةً حداً أدنى لرأس المال الاستثماري يبلغ 30 مليون ريال على مدى السنوات الخمس الأولى والالتزام بتحقيق أهداف توطين محددة. يجب على الشركات أيضاً إثبات وجود عالمي وتقديم خطة واضحة لتوطين سلاسل التوريد وتدريب الكوادر السعودية. تم تصميم هذا الانفتاح في قطاع التجزئة لتحديث السوق وإدخال أفضل الممارسات العالمية إلى المملكة.' },
          q10: { q: 'ما هو دور منصة "قوى"؟', a: 'تعد منصة "قوى"، التي أطلقتها وزارة الموارد البشرية والتنمية الاجتماعية (MHRSD)، بمثابة البوابة الرقمية الموحدة لجميع الخدمات المتعلقة بالعمل في المملكة العربية السعودية. وهي تدمج وظائف مثل إصدار تصاريح العمل، وإدارة عقود التوظيف، ومراقبة الامتثال للتوطين (نطاقات). من خلال "قوى"، يمكن للشركات الوصول إلى خدمات "مكتب العمل" إلكترونياً، مما يقلل من الأعمال الورقية ويزيد من الشفافية في سوق العمل. إنها أداة أساسية لكل صاحب عمل لإدارة القوى العاملة لديه وضمان الامتثال الكامل لقانون العمل السعودي.' }
        }
      },
      guides: {
        title: 'الأدلة التنظيمية الاستراتيجية',
        subtitle: 'الوصول إلى مجموعتنا المتميزة من الأطر التنظيمية والأدلة التشغيلية المصممة للمهنيين في المملكة العربية السعودية.',
        searchPlaceholder: 'ابحث في الأدلة الاستخباراتية...',
        verifiedRepository: 'مستودع موثق',
        readDetails: 'اقرأ التفاصيل',
        documentId: 'رقم المستند',
        legalNotice: 'تنبيه المستودع القانوني',
        legalNoticeContent: 'هذا المستند لأغراض تعليمية. البيئات التنظيمية ديناميكية. يرجى التحقق من البوابات الحكومية الرسمية أو الشركاء القانونيين قبل التنفيذ.',
        closeDocument: 'إغلاق المستند',
        guideVersion: 'دليل',
        legislativeIntelligence: 'الذكاء التشريعي',
        officialPolicyDatabase: 'قاعدة بيانات السياسة الرسمية',
        processingContent: 'جاري معالجة المحتوى...'
      },
      news: {
        title: 'تنبيهات السوق الاستراتيجية',
        subtitle: 'تقارير مدفوعة بالبيانات حول أهم تحركات السوق في المملكة العربية السعودية.',
        searchPlaceholder: 'البحث في التنبيهات الاستراتيجية...',
        categories: {
          all: 'جميع المعلومات',
          regulatory: 'تنظيمي',
          energy: 'طاقة',
          finance: 'مالية',
          residency: 'إقامة'
        },
        impact: {
          high: 'تأثير مرتفع',
          medium: 'تأثير متوسط',
          low: 'تأثير منخفض'
        },
        modal: {
          close: 'إغلاق التقرير',
          downloadPdf: 'تحميل ملخص PDF',
          originalSource: 'المصدر الأصلي',
          marketBriefing: 'ملخص السوق',
          aiStrategicNarrative: 'السرد الاستراتيجي للذكاء الاصطناعي',
          intelligenceVerified: 'تم التحقق من المعلومات',
          exportNote: 'تم إنشاء تقرير عالي الدقة. يمكنك الآن تصدير هذه المعلومات للاستخدام التنفيذي.',
          calculating: 'يقوم المحرك حالياً بحساب الأثر الاستراتيجي.',
          synthesizing: 'يتم حالياً تجميع ملخص معلومات السوق.'
        }
      }
    }
  },
  ur: {
    translation: {
      nav: {
        logo: 'سعودی بصیرتیں',
        home: 'ہوم',
        faq: 'سعودی بزنس سوالات',
        blog: 'بلاگ',
        services: 'سروسز',
        about: 'ہمارے بارے میں',
        contact: 'رابطہ کریں',
        expatHub: 'ایکسپٹ ہب',
        consultancy: 'کنسلٹنسی',
        news: 'خبریں',
        guides: 'رہنما کتب',
        login: 'لاگ ان',
        categories: {
          all: 'تمام',
          regulatory: 'ریگولیٹری',
          residency: 'رہائش اور ویزا',
          opportunity: 'مواقع',
          macro: 'ماکرو',
          local: 'مقامی اثر',
          lifestyle: 'طرز زندگی',
          community: 'کمیونٹی',
          fashion: 'فیشن',
        }
      },
      common: {
        search: 'تلاش کریں',
        add: 'شامل کریں',
        save: 'محفوظ کریں',
        cancel: 'منسوخ کریں',
        edit: 'ترمیم کریں',
        delete: 'حذف کریں',
        success: 'کامیابی',
        error: 'غلطی',
        medicines: 'ادویات',
        suppliers: 'سپلائرز',
        dashboard: 'ڈیش بورڈ',
        total: 'کل',
        status: 'حالت',
        actions: 'اقدامات',
        date: 'تاریخ',
        loading: 'لوڈنگ ہو رہی ہے...',
        noData: 'کوئی ڈیٹا نہیں ملا',
      },
      pos: {
        title: 'پوائنٹ آف سیل',
        receipt: 'رسید',
        addItem: 'آئٹم شامل کریں',
        qty: 'مقدار',
        price: 'قیمت',
        total: 'کل',
        discount: 'رعایت',
        finalAmount: 'حتمی رقم',
        cashReceived: 'نقد وصولی',
        change: 'بقیہ',
        completeSale: 'فروخت مکمل کریں',
        print: 'رسید پرنٹ کریں',
        customerName: 'گاہک کا نام',
        contact: 'رابطہ',
        outOfStock: 'اسٹاک ختم',
        notEnoughStock: 'کافی اسٹاک دستیاب نہیں ہے',
        insufficientCash: 'موصولہ رقم ناکافی ہے',
        checkoutFailed: 'چیک آؤٹ مکمل کرنے میں ناکامی',
        pdfFailed: 'پی ڈی ایف بنانے میں ناکامی',
      },
      suppliers: {
        title: 'سپلائر مینجمنٹ',
        subtitle: 'اپنے وینڈرز، خریداری اور واجبات کا انتظام کریں۔',
        addSupplier: 'سپلائر شامل کریں',
        editSupplier: 'سپلائر ترمیم کریں',
        supplierName: 'سپلائر کا نام',
        contactPerson: 'رابطہ شخص',
        mobile: 'موبائل',
        email: 'ای میل',
        type: 'قسم',
        category: 'زمرہ',
        status: 'حالت',
        balance: 'بقیہ رقم',
        ledger: 'لیجر',
        purchases: 'خریداری',
        payments: 'ادائیگیاں',
        returns: 'واپسی',
        newPurchase: 'نئی خریداری',
        recordPayment: 'ادائیگی درج کریں',
        newReturn: 'نئی واپسی',
        contactInfo: 'رابطہ کی معلومات',
        typeCategory: 'قسم اور زمرہ',
        legalInfo: 'قانونی معلومات',
        searchSuppliers: 'سپلائرز تلاش کریں...',
        purchaseHistory: 'خریداری کی تاریخ',
        supplierPayments: 'سپلائر کی ادائیگیاں',
        purchaseReturns: 'خریداری کی واپسی',
        invoiceNo: 'انوائس نمبر',
        totalAmount: 'کل رقم',
        pendingPayables: 'زیر التوا واجبات',
        totalPaid: 'کل ادائیگی',
        totalReturns: 'کل واپسی',
        recentPurchases: 'حالیہ خریداری',
        recentPayments: 'حالیہ ادائیگیاں',
        recordPurchase: 'نئی خریداری درج کریں',
        addStockDesc: 'اسٹاک شامل کریں اور سپلائر کا بیلنس اپ ڈیٹ کریں۔',
        selectSupplier: 'سپلائر منتخب کریں',
        paymentMethod: 'ادائیگی کا طریقہ',
        reference: 'حوالہ',
        debit: 'ڈیبٹ (+)',
        credit: 'کریڈٹ (-)',
        description: 'تفصیل',
        ledgerDesc: 'تفصیلی اکاؤنٹنگ لیجر اور لین دین کی تاریخ دیکھنے کے لیے اوپر دی گئی فہرست سے سپلائر منتخب کریں۔',
        confirmDelete: 'کیا آپ واقعی اس سپلائر کو حذف کرنا چاہتے ہیں؟',
        accountTitle: 'اکاؤنٹ کا عنوان',
        accountNumber: 'اکاؤنٹ نمبر / IBAN',
        purchaseSettings: 'خریداری کی ترتیبات',
        defaultDiscount: 'ڈیفالٹ ڈسکاؤنٹ %',
        supplyCategory: 'سپلائی زمرہ',
        preferredSupplier: 'ترجیحی سپلائر',
        ntn: 'NTN',
        strn: 'STRN',
        drugLicense: 'ڈرگ لائسنس',
        licenseExpiry: 'لائسنس کی میعاد',
        registrationNo: 'رجسٹریشن نمبر',
        openingBalance: 'ابتدائی بیلنس',
        creditLimit: 'ادھار کی حد',
        creditDays: 'ادھار کے دن',
        paymentTerms: 'ادائیگی کی شرائط',
        priority: 'ترجیح',
        address: 'پتہ',
        city: 'شہر',
        state: 'صوبہ',
        country: 'ملک',
        postalCode: 'پوسٹل کوڈ',
        supplierType: 'سپلائر کی قسم',
      },
      medicines: {
        title: 'ادویات کا انتظام',
        addMedicine: 'دوا شامل کریں',
        editMedicine: 'دوا ترمیم کریں',
        name: 'دوا کا نام',
        batch: 'بیچ نمبر',
        expiry: 'تاریخ ختم',
        stock: 'اسٹاک کی مقدار',
        purchasePrice: 'خریداری کی قیمت',
        salePrice: 'فروخت کی قیمت',
        barcode: 'بار کوڈ',
        prescription: 'نسخہ درکار ہے',
      },
      dashboard: {
        title: 'ڈیش بورڈ',
        subtitle: 'آپ کے فارمیسی آپریشنز کا حقیقی وقت کا جائزہ۔',
        totalSales: 'کل فروخت (آج)',
        lowStock: 'کم اسٹاک والی اشیاء',
        expiredSoon: 'جلد ختم ہونے والی',
        recentSales: 'حالیہ فروخت (آج)',
        lowStockAlerts: 'کم اسٹاک الرٹس',
        recentTransactions: 'حالیہ لین دین',
        manage: 'انتظام کریں',
        viewAll: 'سب دیکھیں',
      },
      layout: {
        breaking: 'اسٹریٹجک الرٹ',
        source: 'ذریعہ',
        readFullAnalysis: 'مکمل تجزیہ پڑھیں',
        close: 'رد کریں',
        welcome: 'خوش آمدید',
        selectLanguage: 'جاری رکھنے کے لیے براہ کرم اپنی پسندیدہ زبان منتخب کریں',
        vision2030: 'ویژن 2030 انٹیلیجنس پورٹل',
      },
      hero: {
        title: 'سعودی بصیرتیں',
        subtitle: 'عالمی سرمایہ کاروں کے لیے ریئل ٹائم بصیرت، مارکیٹ کے رجحانات، اور ویژن 2030 کے تجزیہ کا پہلا ذریعہ۔',
        cta: 'تازہ ترین خبریں پڑھیں',
      },
      blog: {
        title: 'بزنس انٹیلیجنس پورٹل',
        subtitle: 'جدید سعودی کاروباری منظر نامے کے لیے تازہ ترین موضوعات اور ماہرانہ تجزیہ۔',
        latest: 'مارکیٹ انٹیلیجنس',
        readMore: 'مکمل تجزیہ',
        searchPlaceholder: 'مضامین تلاش کریں...',
        all: 'تمام',
        closeArticle: 'مضمون بند کریں',
        authorRole: 'سینئر بزنس اینالسٹ'
      },
      contact: {
        title: 'ماہرین سے رابطہ کریں',
        subtitle: 'کیا آپ مخصوص خدمات تلاش کر رہے ہیں؟ ہم آپ کو مملکت میں صحیح قانونی اور کاروباری شراکت داروں سے جوڑ سکتے ہیں۔',
        name: 'نام',
        email: 'ای میل',
        message: 'پیغام',
        success: 'شکریہ! ہماری ٹیم آپ کی درخواست کا جائزہ لے گی اور جلد ہی آپ کو ایک پارٹنر سے جوڑ دے گی۔',
        info: {
          email: { title: 'ہمیں ای میل کریں', subtitle: 'ہم 24 گھنٹوں کے اندر جواب دیتے ہیں۔' },
          phone: { title: 'ہمیں کال کریں', subtitle: 'اتوار - جمعرات، صبح 9 بجے - شام 5 بجے' }
        },
        form: {
          subject: 'موضوع',
          subjects: {
            general: 'عام انکوائری',
            setup: 'بزنس سیٹ اپ میں مدد',
            legal: 'قانونی مشاورت',
            investment: 'سرمایہ کاری کے مواقع'
          },
          placeholders: {
            name: 'جان ڈو',
            email: 'john@example.com',
            message: 'ہم آپ کی کیسے مدد کر سکتے ہیں؟'
          }
        },
        faq: {
          title: 'عام سوالات',
          subtitle: 'اکثر پوچھے گئے سوالات کے فوری جوابات۔',
          q1: { q: 'میسا لائسنس حاصل کرنے میں کتنا وقت لگتا ہے؟', a: 'تمام دستاویزات درست طریقے سے جمع کرانے کے بعد عام طور پر 3-5 کاروباری دن۔' },
          q2: { q: 'آپ کے کام کے اوقات کیا ہیں؟', a: 'ہم اتوار سے جمعرات، صبح 9:00 بجے سے شام 5:00 بجے تک (AST) کھلے ہیں۔' }
        }
      },
      expatHub: {
        title: 'ایکسپٹ انٹیلیجنس ہب',
        subtitle: 'سعودی عرب میں رہنے، کام کرنے اور سرمایہ کاری کرنے کے لیے آپ کی جامع گائیڈ۔',
        regulatoryFeed: 'لائیو ریگولیٹری اپ ڈیٹس',
        spaSource: 'درستگی کو یقینی بنانے کے لیے یہ ڈیٹا براہ راست SPA اور HRSD سے لیا گیا ہے۔',
        officialSource: 'سرکاری ذریعہ',
        publicServices: {
          title: 'ضروری عوامی اور نجی خدمات',
          subtitle: 'بڑے نجی شعبے کے فراہم کنندگان جو عربی، انگریزی اور اردو میں مکمل مدد فراہم کرتے ہیں۔',
          banking: 'بینکاری اور ترسیل زر',
          telecom: 'ٹیلی کام اور ڈیجیٹل',
          retail: 'ریٹیل اور طرز زندگی',
          visitWebsite: 'ویب سائٹ ملاحظہ کریں'
        }
      },
      footer: {
        rights: 'تمام حقوق محفوظ ہیں۔',
        tagline: 'سعودی بزنس ایکسی لینس کے لیے آپ کا پل۔',
        expertInsights: 'ماہر کاروباری بصیرت',
        faqTitle: 'سعودی بزنس کے بارے میں اکثر پوچھے گئے سوالات',
        disclaimerTitle: 'قانونی دستبرداری',
        disclaimerText: 'اس پورٹل پر فراہم کردہ معلومات صرف عام معلوماتی مقاصد کے لیے ہیں۔ اگرچہ ہم درستگی کے لیے کوشاں ہیں، لیکن یہ قانونی، مالی یا پیشہ ورانہ مشورہ نہیں ہے۔ ہم تمام سرمایہ کاروں کی حوصلہ افزائی کرتے ہیں کہ وہ کسی بھی کاروباری فیصلے سے پہلے تصدیق شدہ مقامی پیشہ ور افراد سے مشورہ کریں۔',
        aiContentLab: 'اے آئی مواد لیب',
      },
      privacy: {
        title: 'رازداری کی پالیسی',
        lastUpdated: 'آخری اپ ڈیٹ',
        intro: {
          title: 'تعارف',
          content: 'دی سعودی انسائٹس میں خوش آمدید۔ ہم آپ کے ذاتی ڈیٹا اور آپ کی رازداری کے تحفظ کے لیے پرعزم ہیں۔ یہ رازداری کی پالیسی بتاتی ہے کہ جب آپ ہماری ویب سائٹ پر آتے ہیں تو ہم آپ کی معلومات کو کس طرح جمع، استعمال اور محفوظ کرتے ہیں، سعودی پرسنل ڈیٹا پروٹیکشن لا (PDPL)، GDPR، اور گوگل ایڈسینس کے تقاضوں کے مطابق۔'
        },
        collection: {
          title: 'ڈیٹا کا مجموعہ',
          content: 'ہم درج ذیل طریقوں سے آپ کے بارے میں کچھ معلومات جمع کر سکتے ہیں:',
          item1: 'وہ معلومات جو آپ براہ راست فراہم کرتے ہیں (مثلاً رابطہ فارم یا مشاورت کی درخواستوں کے ذریعے)۔',
          item2: 'کوکیز اور اسی طرح کی ٹیکنالوجیز کے ذریعے جمع کی گئی خودکار معلومات۔',
          item3: 'لاگ ڈیٹا جیسے آپ کا IP ایڈریس، براؤزر کی قسم، اور وزٹ کیے گئے صفحات۔'
        },
        adsense: {
          title: 'گوگل ایڈسینس اور کوکیز',
          content: 'ہم اپنی سائٹ پر اشتہارات دکھانے کے لیے گوگل ایڈسینس کا استعمال کرتے ہیں۔ گوگل ہماری ویب سائٹ یا دیگر ویب سائٹس پر صارف کے پچھلے دوروں کی بنیاد پر اشتہارات دکھانے کے لیے کوکیز کا استعمال کرتا ہے۔',
          item1: 'گوگل کی اشتہاری کوکیز کا استعمال اسے اور اس کے شراکت داروں کو ہماری سائٹس اور/یا انٹرنیٹ پر دیگر سائٹس کے دورے کی بنیاد پر ہمارے صارفین کو اشتہارات دکھانے کے قابل بناتا ہے۔',
          item2: 'صارفین اشتہارات کی ترتیبات پر جا کر ذاتی نوعیت کے اشتہارات سے آپٹ آؤٹ کر سکتے ہیں۔',
          item3: 'ہم ٹریفک کا تجزیہ کرنے اور صارف کے تجربے کو بہتر بنانے کے لیے کوکیز کا بھی استعمال کرتے ہیں۔'
        },
        pdpl: {
          title: 'سعودی PDPL تعمیل',
          content: 'سعودی پرسنل ڈیٹا پروٹیکشن لا کے مطابق، ہم اس بات کو یقینی بناتے ہیں کہ آپ کے ڈیٹا پر قانونی، منصفانہ اور شفاف طریقے سے کارروائی کی جائے۔ ہم مملکت کے اندر آپ کی ذاتی معلومات تک غیر مجاز رسائی یا انکشاف کو روکنے کے لیے سخت حفاظتی اقدامات نافذ کرتے ہیں۔'
        },
        gdpr: {
          title: 'GDPR حقوق',
          content: 'اگر آپ یورپی اقتصادی علاقے سے تشریف لا رہے ہیں، تو آپ کو GDPR کے تحت کچھ حقوق حاصل ہیں، بشمول آپ کے ذاتی ڈیٹا تک رسائی، اسے درست کرنے یا حذف کرنے کا حق، اور ڈیٹا کی پورٹیبلٹی کا حق۔'
        },
        contact: {
          title: 'ہم سے رابطہ کریں',
          content: 'اگر آپ کے پاس اس رازداری کی پالیسی کے بارے میں کوئی سوالات ہیں، تو براہ کرم ہمارے ڈیٹا پروٹیکشن آفیسر سے اس پر رابطہ کریں:'
        }
      },
      cookies: {
        title: 'کوکی کی رضامندی',
        message: 'ہم اپنی ویب سائٹ پر آپ کو بہترین تجربہ فراہم کرنے کے لیے کوکیز کا استعمال کرتے ہیں۔',
        accept: 'سب قبول کریں',
        reject: 'سب مسترد کریں',
        settings: 'ترتیبات'
      },
      support: {
        welcome: 'ہیلو! 👋 ہم آپ کی کیسے مدد کر سکتے ہیں؟ مدد حاصل کرنے کے لیے ابھی ہمیں پیغام بھیجیں۔',
        startChat: 'چیٹ شروع کریں:',
      },
      login: {
        title: 'انٹیلیجنس پورٹل',
        selectAccount: 'اپنا تجزیہ کار پروفائل منتخب کریں',
        enterSystem: 'پورٹل تک رسائی حاصل کریں',
        localDataNote: 'تمام ڈیٹا زیادہ سے زیادہ رازداری اور سیکیورٹی کے لیے مقامی طور پر محفوظ کیا جاتا ہے۔'
      },
      home: {
        whyChoose: 'سعودی بصیرتوں کا انتخاب کیوں کریں؟',
        whyChooseDesc: 'ہم ڈیٹا پر مبنی تحقیق اور عملی قانونی مشورے کے ساتھ عالمی سرمایہ کاروں اور مقامی سعودی مارکیٹ کے درمیان فرق کو ختم کرتے ہیں۔',
        latestReports: 'تازہ ترین انٹیلیجنس رپورٹس',
        latestReportsDesc: 'ہمارے ماہرانہ تجزیے کے ساتھ باخبر رہیں۔',
        viewAllReports: 'تمام رپورٹس دیکھیں',
        trendingNow: 'ابھی رجحان ساز',
        tadawulWatch: 'سعودی اسٹاک مارکیٹ',
        viewFullMarket: 'مکمل مارکیٹ تجزیہ دیکھیں',
        newsletterTitle: 'ہماری بزنس نیوز لیٹر کو سبسکرائب کریں',
        newsletterDesc: 'ویژن 2030 اور مملکت میں سرمایہ کاری کے مواقع کے بارے میں تازہ ترین اپ ڈیٹس براہ راست اپنے ان باکس میں حاصل کریں۔',
        emailPlaceholder: 'آپ کا ای میل ایڈریس',
        subscribeBtn: 'ابھی سبسکرائب کریں',
        privacyNote: 'ہم آپ کی رازداری کا احترام کرتے ہیں۔ آپ کا ڈیٹا کبھی شیئر نہیں کیا جائے گا۔'
      },
      features: {
        market: {
          title: 'مارکیٹ کی ترقی',
          desc: 'سعودی معیشت میں تیزی سے ترقی کرنے والے شعبوں کا ریئل ٹائم تجزیہ۔'
        },
        legal: {
          title: 'قانونی تعمیل',
          desc: 'میسا (MISA) لائسنس اور سی آر رجسٹریشن کے لیے مرحلہ وار روڈ میپس۔'
        },
        vision: {
          title: 'ویژن 2030',
          desc: 'حکومتی اقدامات اور نیوم جیسے میگا پروجیکٹس کے بارے میں تازہ ترین اپ ڈیٹس۔'
        },
        expert: {
          title: 'ماہرین کا نیٹ ورک',
          desc: 'مقامی مشیروں اور بزنس سیٹ اپ کے ماہرین سے رابطہ کریں۔'
        }
      },
      about: {
        hero: {
          title: 'سعودی انٹیلیجنس کا پل',
          subtitle: 'سعودی بصیرتیں مملکت کی معروف ڈیجیٹل انٹیلیجنس پورٹل ہے، جو عالمی سرمایہ کاروں کو ویژن 2030 کو سمجھنے کے لیے ضروری ڈیٹا فراہم کرنے کے لیے وقف ہے۔',
          description: 'ہم صرف خبریں فراہم نہیں کرتے؛ ہم ایک راستہ فراہم کرتے ہیں۔ مارکیٹ کی اہم ترین تبدیلیوں کو ترتیب دے کر اور اپنے عالمی سامعین کو تصدیق شدہ مقامی قانونی اور کاروباری شراکت داروں سے جوڑ کر، ہم اس بات کو یقینی بناتے ہیں کہ آپ کا سعودی مارکیٹ کا سفر درست معلومات اور رابطوں پر مبنی ہو۔',
          expertise: 'برسوں کا مقامی تجربہ'
        },
        values: {
          title: 'ہماری بنیادی اقدار',
          precision: { title: 'درستگی', desc: 'درست ڈیٹا اور قانونی روڈ میپس جو غلطی کی گنجائش نہیں چھوڑتے۔' },
          integrity: { title: 'دیانت داری', desc: 'شفاف مشورہ جو آپ کے کاروباری مفادات کو مقدم رکھتا ہے۔' },
          excellence: { title: 'اعلیٰ معیار', desc: 'ہر بات چیت میں عالمی معیار کی خدمات۔' },
          commitment: { title: 'عزم', desc: 'مملکت میں آپ کی طویل مدتی کامیابی کے لیے وقف۔' }
        },
        vision: {
          title: 'ویژن 2030 کے ساتھ ہم آہنگ',
          text: 'ہم براہ راست غیر ملکی سرمایہ کاری کو آسان بنا کر اور اگلی نسل کے لیے ایک متحرک کاروباری ماحولیاتی نظام کو فروغ دے کر مملکت کے عزائم کی حمایت کرنے پر فخر محسوس کرتے ہیں۔',
          cta: 'مل کر مستقبل کی تعمیر'
        }
      },
      consultancy: {
        hero: {
          title: 'ماہر کاروباری اور قانونی مدد',
          subtitle: 'اعتماد کے ساتھ سعودی مارکیٹ میں قدم رکھیں۔ ہم آپ کو قانونی ضروریات، لائسنسنگ اور بزنس سیٹ اپ کے لیے تصدیق شدہ مقامی شراکت داروں سے جوڑتے ہیں۔',
          badge: 'تصدیق شدہ پارٹنر نیٹ ورک'
        },
        services: {
          title: 'ہمارے پارٹنرز کی خدمات',
          clickForDetails: 'تفصیلات کے لیے کلک کریں',
          modal: {
            requirements: 'بنیادی ضروریات',
            resources: 'سرکاری ذرائع',
            timeline: 'تخمینی وقت',
            cost: 'تخمینی لاگت',
            cta: 'میرا آرڈر شروع کریں'
          },
          misa: { 
            title: 'میسا (MISA) لائسنس', 
            desc: 'غیر ملکی سرمایہ کاری کے لائسنس اور کمپنی کی رجسٹریشن کے لیے مکمل مدد۔',
            details: {
              overview: 'وزارت سرمایہ کاری (MISA) غیر ملکی سرمایہ کاروں کو لائسنس جاری کرتی ہے۔ یہ مملکت میں داخلے کا پہلا قدم ہے۔',
              requirements: ['کم از کم سرمایہ (شعبے کے لحاظ سے مختلف)', 'آبائی ملک سے کمرشل رجسٹریشن (CR)', 'مملکت میں سرمایہ کاری کے لیے بورڈ کی قرارداد'],
              timeline: 'لائسنس کے لیے 3-5 کاروباری دن؛ مکمل سیٹ اپ کے لیے 2-4 ہفتے۔',
              cost: 'میسا لائسنس کی فیس پہلے سال کے لیے تقریباً 2000 ریال ہے (علاوہ سروس فیس)۔',
              officialLink: 'https://www.google.com/search?q=MISA+Saudi+Arabia+Official+Portal',
              officialName: 'میسا آفیشل پورٹل (گوگل سرچ)',
              note: 'نوٹ: سرکاری ویب سائٹس سعودی عرب سے باہر بلاک ہو سکتی ہیں۔ وی پی این استعمال کریں یا گوگل پر تلاش کریں۔'
            }
          },
          legal: { 
            title: 'قانونی تعمیل', 
            desc: 'سعودی لیبر قوانین، معاہدوں اور تنازعات کے حل کے بارے میں ماہرانہ مشورہ۔',
            details: {
              overview: 'سعودی لیبر قانون ملازمین کے حقوق، سماجی انشورنس (GOSI) کی رجسٹریشن، اور سعودائزیشن (نطاقات) کے اہداف کے بارے میں سخت ہے۔',
              requirements: ['یونیفائیڈ لیبر کنٹریکٹس', 'سوشل انشورنس (GOSI) رجسٹریشن', 'قوی (Qiwa) پلیٹ فارم کی تعمیل'],
              timeline: 'مسلسل تعمیل کی نگرانی۔',
              cost: 'کمپنی کے سائز اور ملازمین کی تعداد کی بنیاد پر مختلف ہوتا ہے۔',
              officialLink: 'https://www.google.com/search?q=Qiwa+Platform+Saudi+Arabia',
              officialName: 'قوی پلیٹ فارم (گوگل سرچ)',
              note: 'نوٹ: سرکاری ویب سائٹس سعودی عرب سے باہر بلاک ہو سکتی ہیں۔ وی پی این استعمال کریں یا گوگل پر تلاش کریں۔'
            }
          },
          tax: { 
            title: 'ٹیکس اور زکوٰۃ', 
            desc: 'تصدیق شدہ مقامی اکاؤنٹنٹس کے ساتھ سعودی ٹیکس کے نظام کو سمجھیں۔',
            details: {
              overview: 'غیر ملکی کمپنیاں 20% کارپوریٹ انکم ٹیکس ادا کرتی ہیں۔ سعودی/جی سی سی کی ملکیتی کمپنیاں 2.5% زکوٰۃ ادا کرتی ہیں۔',
              requirements: ['VAT رجسٹریشن (اگر آمدنی > 375k ریال ہو)', 'ای-انوائسنگ (ZATCA) کی تعمیل', 'سالانہ آڈٹ شدہ مالیاتی گوشوارے'],
              timeline: 'VAT ریٹرن ماہانہ/سہ ماہی؛ زکوٰۃ/ٹیکس ریٹرن سالانہ۔',
              cost: 'معیاری VAT کی شرح 15% ہے۔',
              officialLink: 'https://www.google.com/search?q=ZATCA+Portal+Saudi+Arabia',
              officialName: 'زاتکا پورٹل (گوگل سرچ)',
              note: 'نوٹ: سرکاری ویب سائٹس سعودی عرب سے باہر بلاک ہو سکتی ہیں۔ وی پی این استعمال کریں یا گوگل پر تلاش کریں۔'
            }
          },
          office: { 
            title: 'دفتر اور لاجسٹکس', 
            desc: 'صحیح جسمانی موجودگی تلاش کریں اور مقامی حکومتی ضروریات کو پورا کریں۔',
            details: {
              overview: 'کمرشل رجسٹریشن (CR) حاصل کرنے کے لیے جسمانی دفتر کا پتہ لازمی ہے۔',
              requirements: ['کرایہ کا معاہدہ (ایجار)', 'قومی پتہ (واصل)', 'بلدیہ کا لائسنس'],
              timeline: 'کرایہ کے معاہدے اور پتے کے سیٹ اپ کے لیے 1-2 ہفتے۔',
              cost: 'مقام (ریاض، جدہ، دمام) کے لحاظ سے مختلف ہوتا ہے۔',
              officialLink: 'https://www.google.com/search?q=Ejar+System+Saudi+Arabia',
              officialName: 'ایجار سسٹم (گوگل سرچ)',
              note: 'نوٹ: سرکاری ویب سائٹس سعودی عرب سے باہر بلاک ہو سکتی ہیں۔ وی پی این استعمال کریں یا گوگل پر تلاش کریں۔'
            }
          }
        },
        form: {
          title: 'مشاورت کی درخواست کریں',
          subtitle: 'ہمیں اپنے پروجیکٹ کے بارے میں بتائیں اور ہم 24 گھنٹوں کے اندر آپ کو صحیح ماہر سے جوڑ دیں گے۔',
          name: 'پورا نام',
          company: 'کمپنی کا نام',
          email: 'کاروباری ای میل',
          sector: 'صنعتی شعبہ',
          budget: 'سرمایہ کاری کا بجٹ',
          needs: 'مخصوص ضروریات',
          submit: 'ماہر کی تلاش کی درخواست کریں',
          success: 'شکریہ! ہماری ٹیم آپ کی درخواست کا جائزہ لے گی اور جلد ہی آپ کو ایک پارٹنر سے جوڑ دے گی۔',
          process: {
            step1: { title: 'اپنی انکوائری جمع کروائیں', desc: 'اپنے کاروباری تفصیلات اور مخصوص ضروریات کے ساتھ فارم پُر کریں۔' },
            step2: { title: 'ماہر کی تلاش', desc: 'ہماری ٹیم آپ کی ضروریات کا جائزہ لیتی ہے اور موزوں ترین مقامی پارٹنر کا انتخاب کرتی ہے۔' },
            step3: { title: 'براہ راست تعارف', desc: 'آپ کو اپنی مشاورت شروع کرنے کے لیے پارٹنر سے براہ راست تعارف کرایا جاتا ہے۔' },
            successTitle: 'انکوائری موصول ہوگئی',
            anotherRequest: 'دوسری درخواست بھیجیں'
          }
        },
        faq: {
          q_top10: {
            q: 'سعودی عرب میں غیر ملکیوں کے لیے ٹاپ 10 کاروبار کون سے ہیں؟',
            a: 'ویژن 2030 کے اقدامات کی بدولت سعودی عرب میں بطور غیر ملکی کاروبار شروع کرنا پہلے سے کہیں زیادہ امید افزا ہو گیا ہے۔ مملکت اپنی معیشت کو تیل سے ہٹ کر متنوع بنا رہی ہے، جس سے مختلف شعبوں میں غیر ملکی سرمایہ کاری کے لیے سازگار ماحول پیدا ہو رہا ہے۔ ذیل میں غیر ملکیوں کے لیے کاروبار کے ٹاپ 10 مواقع، ان کی وجوہات، قانونی، مالی اور دیگر ضروریات کے ساتھ تفصیل سے بیان کیے گئے ہیں۔\n\n### 1. ای کامرس اور لاجسٹکس\n**وجہ:** سعودی عرب میں اسمارٹ فون اور انٹرنیٹ کے استعمال کی شرح عالمی سطح پر سب سے زیادہ ہے۔ آن لائن شاپنگ کا رجحان مستقل ہے، جس سے ڈیجیٹل اسٹورز اور سامان کی ترسیل کے لیے جسمانی انفراسٹرکچر کی بڑے پیمانے پر مانگ پیدا ہو رہی ہے۔\n**قانونی ضروریات:** میسا (MISA) سرمایہ کاری لائسنس درکار ہے۔ آپ کو کمرشل رجسٹریشن (CR) اور لاجسٹکس کے لیے ٹرانسپورٹ جنرل اتھارٹی (TGA) سے لائسنس بھی حاصل کرنا ہوگا۔\n**مالی ضروریات:** ای کامرس چھوٹے پیمانے سے شروع ہو سکتا ہے، لیکن لاجسٹکس کے لیے گاڑیوں کے بیڑے اور گوداموں کے لیے بڑے سرمائے کی ضرورت ہوتی ہے۔\n**دیگر ضروریات:** مضبوط سائبر سیکیورٹی اقدامات اور مقامی پیمنٹ گیٹ ویز جیسے "مدیٰ" کے ساتھ انضمام۔\n\n### 2. صحت کی دیکھ بھال اور طبی خدمات\n**وجہ:** حکومت صحت کی بہت سے خدمات کو نجی شعبے کے حوالے کر رہی ہے، اور خصوصی کلینکس، تشخیصی مراکز اور ہوم ہیلتھ کیئر کی مانگ بڑھ رہی ہے۔\n**قانونی ضروریات:** میسا اور وزارت صحت (MOH) دونوں سے منظوری درکار ہے۔ تمام طبی عملے کے لیے پیشہ ورانہ لائسنس لازمی ہیں۔\n**مالی ضروریات:** طبی آلات، سہولت کی لیزنگ اور انشورنس کے لیے زیادہ ابتدائی سرمایہ کاری۔\n**دیگر ضروریات:** سعودی سینٹرل بورڈ فار ایکریڈیٹیشن آف ہیلتھ کیئر انسٹی ٹیوشنز (CBAHI) کے معیارات کی سخت تعمیل۔\n\n### 3. تعمیرات اور رئیل اسٹیٹ ڈویلپمنٹ\n**وجہ:** نیوم، بحیرہ احمر پروجیکٹ اور بڑے ہاؤسنگ اقدامات جیسے "گیگا پروجیکٹس" کے ساتھ تعمیراتی شعبہ عروج پر ہے۔\n**قانونی ضروریات:** میسا لائسنس اور وزارت بلدیات و دیہی امور (MOMRA) سے درجہ بندی۔\n**مالی ضروریات:** سرکاری ٹھیکوں کے لیے زیادہ ورکنگ کیپیٹل اور پرفارمنس بانڈز۔\n**دیگر ضروریات:** خصوصی انجینئرنگ ٹیلنٹ اور بھاری مشینری۔\n\n### 4. انفارمیشن ٹیکنالوجی اور سافٹ ویئر ڈویلپمنٹ\n**وجہ:** سعودی عرب میں ہر شعبہ ڈیجیٹل تبدیلی سے گزر رہا ہے۔ کسٹم سافٹ ویئر، اے آئی (AI) حل اور کلاؤڈ سروسز کی اشد ضرورت ہے۔\n**قانونی ضروریات:** میسا لائسنس۔ بعض سرگرمیوں کے لیے کمیونیکیشن، اسپیس اینڈ ٹیکنالوجی کمیشن (CST) کے ساتھ رجسٹریشن درکار ہو سکتی ہے۔\n**مالی ضروریات:** صنعتی شعبوں کے مقابلے میں نسبتاً کم، بنیادی طور پر ٹیلنٹ کے حصول اور جدید ہارڈ ویئر پر توجہ۔\n**دیگر ضروریات:** نیشنل سائبر سیکیورٹی اتھارٹی (NCA) کے رہنما خطوط کی تعمیل۔\n\n### 5. قابل تجدید توانائی اور سولر حل\n**وجہ:** سعودی عرب کا ہدف 2030 تک اپنی توانائی کا 50 فیصد قابل تجدید ذرائع سے پیدا کرنا ہے۔ نیشنل رینیو ایبل انرجی پروگرام (NREP) بڑے ٹینڈرز پیش کرتا ہے۔\n**قانونی ضروریات:** وزارت توانائی کی منظوری اور میسا لائسنس۔\n**مالی ضروریات:** تحقیق و ترقی اور انفراسٹرکچر کے زیادہ اخراجات۔\n**دیگر ضروریات:** عالمی ٹیکنالوجی فراہم کنندگان کے ساتھ تکنیکی شراکت داری اکثر فائدہ مند ہوتی ہے۔\n\n### 6. تعلیم اور پیشہ ورانہ تربیت\n**وجہ:** سعودی افرادی قوت کی مہارتوں کو بڑھانے کے لیے اعلیٰ معیار کے بین الاقوامی اسکولوں اور پیشہ ورانہ تربیت کی بہت زیادہ مانگ ہے۔\n**قانونی ضروریات:** وزارت تعلیم (MOE) یا ٹیکنیکل اینڈ ووکیشنل ٹریننگ کارپوریشن (TVTC) سے لائسنس۔\n**مالی ضروریات:** اسکول کی سہولیات اور بین الاقوامی نصاب کے لائسنسنگ میں نمایاں سرمایہ کاری۔\n**دیگر ضروریات:** اساتذہ کی اہلیت کے سخت معیارات اور حفاظتی سرٹیفیکیشن۔\n\n### 7. سیاحت اور مہمان نوازی\n**وجہ:** نئے سیاحتی ویزا اور پرتعیش مقامات کی ترقی نے سیاحت کو نئی معیشت کا ستون بنا دیا ہے۔\n**قانونی ضروریات:** وزارت سیاحت کا لائسنس اور میسا لائسنس۔\n**مالی ضروریات:** ہوٹل کی ترقی یا بوتیک ٹریول ایجنسی کے آپریشنز کے لیے بڑا سرمایہ۔\n**دیگر ضروریات:** "سعودی مہمان نوازی" اور ثقافتی حساسیت پر توجہ۔\n\n### 8. خوراک اور مشروبات (F&B)\n**وجہ:** زیادہ آمدنی والی نوجوان شہری آبادی خوراک اور مشروبات کے شعبے کو انتہائی منافع بخش بناتی ہے، خاص طور پر منفرد بین الاقوامی تصورات کے لیے۔\n**قانونی ضروریات:** بلدیہ لائسنس اور سعودی فوڈ اینڈ ڈرگ اتھارٹی (SFDA) کی منظوری۔\n**مالی ضروریات:** انٹیریئر ڈیزائن، پیشہ ورانہ کچن کے آلات اور ممکنہ طور پر فرنچائز فیس کے اخراجات۔\n**دیگر ضروریات:** صفائی کے سخت معیارات اور سپلائی چین کی وشوسنییتا۔\n\n### 9. مینوفیکچرنگ اور صنعتی خدمات\n**وجہ:** "میڈ ان سعودی" اقدام ان کمپنیوں کو مراعات فراہم کرتا ہے جو اپنے مینوفیکچرنگ کے عمل کو مقامی بناتی ہیں۔\n**قانونی ضروریات:** وزارت صنعت و معدنی وسائل کا لائسنس اور میسا لائسنس۔\n**مالی ضروریات:** صنعتی زمین، فیکٹریوں اور مشینری میں سرمایہ کاری۔\n**دیگر ضروریات:** ماحولیاتی اجازت نامے اور خام مال کا حصول۔\n\n### 10. پیشہ ورانہ خدمات اور مشاورت\n**وجہ:** جیسے جیسے ضوابط بدل رہے ہیں، کاروباروں کو تعمیل یقینی بنانے کے لیے قانونی، مالی اور اسٹریٹجک معاملات پر ماہرانہ مشورے کی ضرورت ہے۔\n**قانونی ضروریات:** میسا لائسنس (سروس کیٹیگری)۔ پیشہ ورانہ معاوضے کی انشورنس اکثر درکار ہوتی ہے۔\n**مالی ضروریات:** بنیادی طور پر دفتر کی جگہ اور اعلیٰ سطح کے پیشہ ور افراد کی تنخواہوں پر توجہ۔\n**دیگر ضروریات:** مقامی مارکیٹ کی گہری سمجھ اور نیٹ ورکنگ کی صلاحیتیں۔'
          },
          q1: { q: 'سعودی عرب میں غیر ملکی کاروبار کیسے شروع کر سکتا ہے؟', a: 'غیر ملکی سرمایہ کار وزارت سرمایہ کاری (MISA) سے سرمایہ کاری کا لائسنس حاصل کر کے سعودی عرب میں 100% غیر ملکی ملکیتی ادارہ قائم کر سکتے ہیں۔ سعودی سرمایہ کاری کے قانون کے مطابق، اس عمل میں میسا کے ای-سروسز پورٹل کے ذریعے بزنس پلان اور کارپوریٹ دستاویزات جمع کرانا شامل ہے۔ ایک بار لائسنس جاری ہونے کے بعد، کمپنی کو کمرشل رجسٹریشن (CR) حاصل کرنے کے لیے وزارت تجارت کے ساتھ رجسٹر ہونا ضروری ہے۔ یہ ہموار عمل ویژن 2030 کے تحت قومی سرمایہ کاری کی حکمت عملی کا حصہ ہے تاکہ عالمی سرمائے کو راغب کیا جا سکے۔' },
          q2: { q: 'میسا لائسنس کے لیے کم از کم سرمایہ کتنا ہے؟', a: 'کم از کم سرمائے کی ضرورت مخصوص کاروباری شعبے اور سرگرمی کے لحاظ سے نمایاں طور پر مختلف ہوتی ہے۔ زیادہ تر سروس بیسڈ سرگرمیوں کے لیے، میسا کسی مقررہ کم از کم سرمائے کا تقاضا نہیں کرتا، جس سے اسٹارٹ اپس کے لیے زیادہ لچک پیدا ہوتی ہے۔ تاہم، صنعتی اور زرعی منصوبوں کے لیے اکثر وزارت صنعت و معدنی وسائل کی ہدایات کے مطابق زیادہ سرمائے کی ضرورت ہوتی ہے۔ اپنی مخصوص ISIC سرگرمی کوڈ کے لیے تازہ ترین سرمائے کی ضروریات کو میسا کی آفیشل ویب سائٹ پر دیکھنا ضروری ہے۔' },
          q3: { q: 'سعودائزیشن (نطاقات) کیا ہے؟', a: 'سعودائزیشن، جسے سرکاری طور پر "نطاقات" پروگرام کہا جاتا ہے، وزارت انسانی وسائل اور سماجی ترقی (MHRSD) کی طرف سے نافذ کردہ ایک پالیسی ہے۔ اس کے تحت کمپنیوں کو اپنی صنعت کی درجہ بندی اور ملازمین کی کل تعداد کی بنیاد پر سعودی شہریوں کی ایک مخصوص فیصد ملازمت پر رکھنے کی ضرورت ہوتی ہے۔ کمپنیوں کو رنگین زونز (پلاٹینم، گرین، یلو، ریڈ) میں تقسیم کیا گیا ہے جو سرکاری خدمات تک ان کی رسائی اور غیر ملکی کارکنوں کی خدمات حاصل کرنے کی صلاحیت کا تعین کرتے ہیں۔ ویژن 2030 کے روزگار کے اہداف کے ساتھ ہم آہنگی کو یقینی بنانے کے لیے قوی (Qiwa) پلیٹ فارم کے ذریعے ریئل ٹائم میں تعمیل کی نگرانی کی جاتی ہے۔' },
          q4: { q: 'کیا غیر ملکی کمپنیوں کے لیے ٹیکس ہیں؟', a: 'سعودی عرب میں غیر ملکی ملکیتی کمپنیاں اپنے خالص منافع پر 20% کارپوریٹ انکم ٹیکس ادا کرتی ہیں جیسا کہ زکوٰۃ، ٹیکس اور کسٹمز اتھارٹی (ZATCA) کے ذریعے ریگولیٹ کیا جاتا ہے۔ مزید برآں، کمپنیوں کو ویلیو ایڈڈ ٹیکس (VAT) کے لیے رجسٹر ہونا ضروری ہے اگر ان کی سالانہ ٹیکس کے قابل سپلائیز 375,000 ریال سے تجاوز کر جائیں، جس کی شرح فی الحال 15% مقرر ہے۔ مملکت میں ملازمین کے لیے کوئی ذاتی انکم ٹیکس نہیں ہے، جو اسے عالمی ٹیلنٹ کے لیے ایک پرکشش مقام بناتا ہے۔ کمپنیوں کو تمام کاروباری لین دین کے لیے ای-انوائسنگ (فاتورہ) کی ضروریات کو بھی پورا کرنا ہوگا۔' },
          q5: { q: 'کیا میں بطور غیر ملکی سرمایہ کار بینک اکاؤنٹ کھول سکتا ہوں؟', a: 'جی ہاں، غیر ملکی سرمایہ کاروں کو مملکت کے اندر کام کرنے والے کسی بھی مقامی یا بین الاقوامی بینک میں کارپوریٹ بینک اکاؤنٹ کھولنے کا مکمل حق حاصل ہے۔ اس عمل کے لیے وزارت تجارت کی طرف سے جاری کردہ درست کمرشل رجسٹریشن (CR) اور میسا سرمایہ کاری لائسنس کی ضرورت ہوتی ہے۔ بینک کمپنی کے آرٹیکلز آف ایسوسی ایشن اور رجسٹرڈ قومی پتہ (واصل) کا ثبوت بھی طلب کریں گے۔ سعودی سینٹرل بینک (SAMA) ان ضوابط کی نگرانی کرتا ہے تاکہ تمام کاروباری اداروں کے لیے ایک محفوظ اور شفاف مالیاتی ماحول کو یقینی بنایا جا سکے۔' },
          q6: { q: 'پریمیم ریذیڈنسی (سعودی گرین کارڈ) کیا ہے؟', a: 'سعودی پریمیم ریذیڈنسی پروگرام، جس کا انتظام پریمیم ریذیڈنسی سینٹر کرتا ہے، اہل غیر ملکیوں کو سعودی کفیل کے بغیر مملکت میں رہنے، کام کرنے اور جائیداد کے مالک بننے کا حق دیتا ہے۔ اس میں کئی راستے دستیاب ہیں، بشمول محدود مدت، مستقل، اور ٹیلنٹ، سرمایہ کاروں اور کاروباری افراد کے لیے مخصوص راستے۔ ہولڈرز سرمایہ کاری کے قانون کے تحت کاروبار کرنے کی صلاحیت اور آسان ایگزٹ/انٹری طریقہ کار جیسے فوائد سے لطف اندوز ہوتے ہیں۔ یہ اقدام ویژن 2030 کا ایک اہم ستون ہے تاکہ اعلیٰ مالیت والے افراد اور ہنر مند پیشہ ور افراد کو راغب کیا جا سکے۔' },
          q7: { q: 'کمرشل رجسٹریشن (CR) حاصل کرنے میں کتنا وقت لگتا ہے؟', a: 'ایک بار میسا سرمایہ کاری لائسنس کامیابی سے جاری ہونے کے بعد، وزارت تجارت سے کمرشل رجسٹریشن (CR) حاصل کرنا انتہائی تیز ہے، جس میں اکثر 24 گھنٹے سے بھی کم وقت لگتا ہے۔ پورا عمل سعودی بزنس سینٹر (SBC) اور وزارت کے آن لائن پورٹل کے ذریعے ڈیجیٹل کیا گیا ہے۔ یہ کارکردگی "اپنا کاروبار شروع کریں" اقدام کا نتیجہ ہے، جو مختلف حکومتی منظوریوں کو ایک ہی ڈیجیٹل سفر میں ضم کرتا ہے۔ تاہم، دفتر کے مقام کی بنیاد پر اضافی بلدیہ لائسنس اور سول ڈیفنس کی منظوریوں کی ضرورت پڑ سکتی ہے۔' },
          q8: { q: 'ریجنل ہیڈ کوارٹر (RHQ) کی ضروریات کیا ہیں؟', a: 'جنوری 2024 سے نافذ العمل تازہ ترین حکومتی ضوابط کے مطابق، سرکاری ٹھیکوں والی ملٹی نیشنل کمپنیوں کو ریاض میں اپنا علاقائی ہیڈ کوارٹر (RHQ) قائم کرنا ہوگا۔ RHQ کو انتظامی طاقت کا مرکز ہونا چاہیے، جو پورے مشرق وسطیٰ اور شمالی افریقہ (MENA) کے خطے میں کمپنی کے آپریشنز کے لیے اسٹریٹجک سمت اور انتظام فراہم کرے۔ میسا ایک مخصوص RHQ لائسنس پیش کرتا ہے جس میں 30 سالہ کارپوریٹ ٹیکس کی چھٹی اور سعودائزیشن کی بعض ضروریات سے استثنیٰ جیسی مراعات شامل ہیں۔ اس پالیسی کا مقصد ریاض کو ایک عالمی کاروباری مرکز میں تبدیل کرنا ہے۔' },
          q9: { q: 'کیا ریٹیل میں 100% غیر ملکی ملکیت کی اجازت ہے؟', a: 'جی ہاں، ریٹیل اور ہول سیل کے شعبوں میں 100% غیر ملکی ملکیت کی اجازت ہے، بشرطیکہ سرمایہ کار وزارت سرمایہ کاری (MISA) کے مقرر کردہ مخصوص معیار پر پورا اترے۔ ان معیارات میں عام طور پر پہلے پانچ سالوں میں 30 ملین ریال کا کم از کم سرمایہ کاری اور مخصوص سعودائزیشن اہداف کو حاصل کرنے کا عزم شامل ہے۔ کمپنیوں کو عالمی موجودگی کا مظاہرہ کرنا اور مقامی سپلائی چینز کو بہتر بنانے اور سعودی عملے کی تربیت کے لیے ایک واضح منصوبہ بھی فراہم کرنا ہوگا۔ ریٹیل سیکٹر کا یہ افتتاح مارکیٹ کو جدید بنانے کے لیے ڈیزائن کیا گیا ہے۔' },
          q10: { q: 'قوی (Qiwa) پلیٹ فارم کا کیا کردار ہے؟', a: 'قوی پلیٹ فارم، جسے وزارت انسانی وسائل اور سماجی ترقی (MHRSD) نے شروع کیا ہے، سعودی عرب میں محنت سے متعلق تمام خدمات کے لیے ایک متحد ڈیجیٹل گیٹ وے کے طور پر کام کرتا ہے۔ یہ ورک پرمٹ جاری کرنے، ملازمت کے معاہدوں کا انتظام کرنے، اور سعودائزیشن (نطاقات) کی تعمیل کی نگرانی جیسے کاموں کو مرکزی بناتا ہے۔ قوی کے ذریعے، کاروبار اپنی "لیبر آفس" خدمات تک الیکٹرانک طریقے سے رسائی حاصل کر سکتے ہیں، جس سے کاغذی کارروائی کم ہوتی ہے اور لیبر مارکیٹ میں شفافیت بڑھتی ہے۔ یہ ہر کاروباری مالک کے لیے اپنی افرادی قوت کا انتظام کرنے اور سعودی لیبر قانون کی مکمل تعمیل کو یقینی بنانے کے لیے ایک لازمی ذریعہ ہے۔' }
        }
      },
      guides: {
        title: 'اسٹریٹجک ریگولیٹری گائیڈز',
        subtitle: 'سعودی عرب میں پیشہ ور افراد کے لیے ڈیزائن کیے گئے ریگولیٹری فریم ورکس اور آپریشنل گائیڈز کے ہمارے پریمیم مجموعہ تک رسائی حاصل کریں۔',
        searchPlaceholder: 'انٹیلی جنس گائیڈز تلاش کریں...',
        verifiedRepository: 'تصدیق شدہ ریپوزٹری',
        readDetails: 'تفصیلات پڑھیں',
        documentId: 'دستاویز آئی ڈی',
        legalNotice: 'قانونی ریپوزٹری نوٹس',
        legalNoticeContent: 'یہ دستاویز تعلیمی مقاصد کے لیے ہے۔ ریگولیٹری ماحول متحرک ہے۔ براہ کرم عمل درآمد سے پہلے سرکاری سرکاری پورٹلز یا قانونی شراکت داروں سے تصدیق کریں۔',
        closeDocument: 'دستاویز بند کریں',
        guideVersion: 'گائیڈ',
        legislativeIntelligence: 'قانون ساز ذہانت',
        officialPolicyDatabase: 'سرکاری پالیسی ڈیٹا بیس',
        processingContent: 'مواد پر کارروائی ہو رہی ہے...'
      },
      news: {
        title: 'اسٹریٹجک مارکیٹ الرٹس',
        subtitle: 'سعودی عرب کی اہم ترین مارکیٹ نقل و حرکت پر مبنی رپورٹس۔',
        searchPlaceholder: 'اسٹریٹجک الرٹس تلاش کریں...',
        categories: {
          all: 'تمام معلومات',
          regulatory: 'ریگولیٹری',
          energy: 'توانائی',
          finance: 'مالیہ',
          residency: 'رہائش'
        },
        impact: {
          high: 'اعلی اثر',
          medium: 'درمیانہ اثر',
          low: 'کم اثر'
        },
        modal: {
          close: 'بریفنگ بند کریں',
          downloadPdf: 'پی ڈی ایف بریفنگ ڈاؤن لوڈ کریں',
          originalSource: 'اصل ذریعہ',
          marketBriefing: 'مارکیٹ بریفنگ',
          aiStrategicNarrative: 'اے آئی اسٹریٹجک تجزیہ',
          intelligenceVerified: 'معلومات کی تصدیق شدہ',
          exportNote: 'اعلی معیار کی بریفنگ تیار کر لی گئی ہے۔ اب آپ اسے مزید استعمال کے لیے ایکسپورٹ کر سکتے ہیں۔',
          calculating: 'انجن فی حال اسٹریٹجک اثرات کا حساب لگا رہا ہے۔',
          synthesizing: 'مارکیٹ انٹیلیجنس کا خلاصہ تیار کیا جا رہا ہے۔'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
