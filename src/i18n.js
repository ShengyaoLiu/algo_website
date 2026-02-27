import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "platform": "Platform",
      "solutions": "Solutions", 
      "company": "Company",
      "resources": "Resources",
      "contacts": "Contacts",
      "login": "Log in to ALGO+",
      
      // Hero Section
      "hero.title1": "Quality",
      "hero.title2": "matters",
      "hero.subtitle": "making a difference",
      "hero.description": "Supporting doctors, patients, and pharmaceutical companies in clinical research",
      "hero.card.title": "Innovative and Quality services company",
      "hero.card.description": "Supporting doctors, patients, and pharmaceutical companies in clinical research",
      
      // Services Section
      "services.title": "Powering",
	  "services.title1": "Modern",
	  "services.title2": "Clinical Trials",
      "services.quality.title": "Quality Consulting Services",
      "services.quality.description": "Quality consulting services for audit, SOP writing, QMS, risk management, training, inspection readiness, cross-border data governance and AI governance",
      "services.digital.title": "Digital Health Technology", 
      "services.digital.description": "ALGO+: a first-in-class healthcare technology platform helping doctors to enable, integrate and digitalise the management of patients in clinical research",
      "services.contact.title": "Contact us",
      "services.contact.description": "Get in touch with our team for personalized support and consultation",
      
      // Platform Section
      "platform.title": "See how ALGO+ can transform your trials",
      "platform.video": "(future ALGO+ video)",
      "platform.belief": "We Believe in The Power of Digitalization",
      
      // About Us Section
      "about.title": "About Us",
      "about.singapore": "Singapore Office",
      "about.shanghai": "Shanghai Office",
      "about.email": "Email",
      "about.tel": "Tel",
      "about.address": "Address",
      "about.terms": "Terms & Conditions",
      "about.privacy": "Privacy Policy",
      
      // Footer
      "footer.copyright": "© {{year}} ALGO Quality. All rights reserved.",
      
      // Language Selector
      "language.switch": "Visit English Site",
      "language.english": "English Site",
      "language.chinese": "中文站点"
    }
  },
  zh: {
    translation: {
      // Header
      "platform": "平台",
      "solutions": "解决方案",
      "company": "公司",
      "resources": "资源",
      "contacts": "联系我们",
      "login": "登录 ALGO+",
      
      // Hero Section
      "hero.title1": "质量",
      "hero.title2": "至关重要",
      "hero.subtitle": "创造不同",
      "hero.description": "支持医生、患者和制药公司进行临床研究",
      "hero.card.title": "创新优质服务公司",
      "hero.card.description": "支持医生、患者和制药公司进行临床研究",
      
      // Services Section
      "services.title": "为现代临床试验提供强大支持...",
      "services.quality.title": "质量咨询服务",
      "services.quality.description": "提供审计、SOP编写、QMS、风险管理、培训、检查准备、跨境数据治理和AI治理等质量咨询服务",
      "services.digital.title": "数字健康技术",
      "services.digital.description": "一流的医疗技术平台，帮助医生在临床研究中实现、整合和数字化患者管理",
      "services.contact.title": "联系我们",
      "services.contact.description": "联系我们的团队获得个性化支持和咨询",
      
      // Platform Section
      "platform.title": "在单一平台上获得您需要的一切",
      "platform.video": "(未来的ALGO+视频)",
      "platform.belief": "我们相信数字化的力量",
      
      // About Us Section
      "about.title": "关于我们",
      "about.singapore": "新加坡办公室",
      "about.shanghai": "上海办公室", 
      "about.email": "邮箱",
      "about.tel": "电话",
      "about.address": "地址",
      "about.terms": "条款与条件",
      "about.privacy": "隐私政策",
      
      // Footer
      "footer.copyright": "© 2025 ALGO Quality公司。保留所有权利。",
      
      // Language Selector
      "language.switch": "访问中文站点",
      "language.english": "English Site",
      "language.chinese": "中文站点"
    }
  }
};

// 根据域名自动确定语言
const getLanguageByDomain = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('aiminjia.com')) {
    return 'zh'; // 中文站点
  } else if (hostname.includes('algoquality.com')) {
    return 'en'; // 英文站点
  }
  // 本地开发环境默认英文
  return 'en';
};

const defaultLanguage = getLanguageByDomain();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage, // 根据域名设置默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
      checkWhitelist: true
    },
    whitelist: ['en', 'zh'],
    debug: false // 生产环境设为false
  });

export default i18n; 