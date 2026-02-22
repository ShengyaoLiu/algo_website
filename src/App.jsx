import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import { ReactPlugin } from '@stagewise-plugins/react'
import { useTranslation } from 'react-i18next'
import './App.css'
import { motion } from "framer-motion";

// 导入图片资源
import logoImage from './assets/logo.png'
import heroImage from './assets/Homepage-new.png'
import businessMeetingImage from './assets/quality-consulting-service.png'
import digitalTabletImage from './assets/adobestock-patient with tablet.png'
import callCenterImage from './assets/contact-us.png'

function App() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const typography = {
    heroTitle: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-gray-900',
    heroSubtitle: 'text-lg md:text-2xl font-medium tracking-wide text-gray-600',
    sectionTitle: 'text-3xl md:text-4xl font-bold text-gray-900',
    body: 'text-base md:text-lg leading-relaxed text-gray-600',
    bodyEmphasis: 'text-lg md:text-xl leading-relaxed font-semibold text-blue-600',
    cardTitle: 'text-2xl md:text-3xl font-semibold text-gray-900',
  };

  const spacing = {
    sectionBlock: 'py-16',
    titleBottom: 'mb-4',
    bodyBottom: 'mb-8',
  };
  
  // 设置HTML语言属性，对SEO和可访问性很重要
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  // 获取当前网站信息
  const getCurrentSite = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('aiminjia.com')) {
      return { current: 'zh', site: 'aiminjia.com' };
    } else if (hostname.includes('algoquality.com')) {
      return { current: 'en', site: 'algoquality.com' };
    }
    // 本地开发环境
    return { current: 'en', site: 'localhost' };
  };

  const currentSite = getCurrentSite();

  const changeLanguage = (lng) => {
    if (lng === 'zh') {
      // 跳转到中文站点
      window.location.href = 'https://aiminjia.com';
    } else if (lng === 'en') {
      // 跳转到英文站点
      window.location.href = 'https://algoquality.com';
    }
    setIsMobileMenuOpen(false); // 切换语言后关闭移动端菜单
  };

  return (
    <div className="min-h-screen bg-white">
      <StagewiseToolbar 
        config={{ 
          plugins: [ReactPlugin],
          // 添加调试配置
          debug: true
        }} 
      />
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="ALGO Quality Logo" 
                className="h-15 w-auto"
              />
              <span className="ml-0 text-2xl font-bold text-gray-800">ALGO Quality</span>
            </div>

            {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#platform" className="nav-link text-gray-700 font-medium">{t('platform')}</a>
                    <a href="#solutions" className="nav-link text-gray-700 font-medium">{t('solutions')}</a>
                    <a href="#company" className="nav-link text-gray-700 font-medium">{t('company')}</a>
                    <a href="#resources" className="nav-link text-gray-700 font-medium">{t('resources')}</a>
                    <a href="#contact" className="nav-link text-gray-700 font-medium">{t('contacts')}</a>
                </div>

            {/* Desktop Right side */}
            <div className="flex items-center space-x-4">
              <a 
                href="http://app.algoquality.com/algobackend/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button variant="outline" className="hidden md:block px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  {t('login')}
                </Button>
              </a>
              
              {/* 智能语言切换按钮 */}
              <div className="flex items-center space-x-2">
                {/* 根据当前网站显示对应的切换按钮 */}
                {currentSite.site === 'localhost' ? (
                  // 本地开发环境显示两个按钮
                  <>
                    <button 
                      onClick={() => changeLanguage('en')}
                      className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      title="Visit algoquality.com"
                    >
                      🇬🇧 EN
                    </button>
                    <button 
                      onClick={() => changeLanguage('zh')}
                      className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      title="访问 aiminjia.com"
                    >
                      🇨🇳 中文
                    </button>
                  </>
                ) : currentSite.current === 'zh' ? (
                  // 中文站点显示英文按钮
                  <button 
                    onClick={() => changeLanguage('en')}
                    className="px-3 py-2 bg-white rounded border text-sm font-medium hover:bg-blue-50"
                    title="Visit algoquality.com"
                  >
                    🇬🇧 English
                  </button>
                ) : (
                  // 英文站点显示中文按钮
                  <button 
                    onClick={() => changeLanguage('zh')}
                    className="px-3 py-2 bg-white rounded border text-sm font-medium hover:bg-blue-50"
                    title="访问 aiminjia.com"
                  >
                    🇨🇳 中文
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">{t('platform')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">{t('solutions')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">{t('company')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">{t('resources')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">{t('contacts')}</a>
              
              {/* 移动端语言切换 */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-500 mb-2">
                    {currentSite.current === 'zh' ? '切换语言' : 'Switch Language'}
                  </p>
                  <div className="flex space-x-2">
                    {/* 根据当前网站显示对应的切换按钮 */}
                    {currentSite.site === 'localhost' ? (
                      // 本地开发环境显示两个按钮
                      <>
                        <button 
                          onClick={() => changeLanguage('en')}
                          className="flex-1 px-3 py-2 bg-gray-100 rounded border text-sm font-medium hover:bg-blue-50"
                          title="Visit algoquality.com"
                        >
                          🇬🇧 English
                        </button>
                        <button 
                          onClick={() => changeLanguage('zh')}
                          className="flex-1 px-3 py-2 bg-gray-100 rounded border text-sm font-medium hover:bg-blue-50"
                          title="访问 aiminjia.com"
                        >
                          🇨🇳 中文
                        </button>
                      </>
                    ) : currentSite.current === 'zh' ? (
                      // 中文站点显示英文按钮
                      <button 
                        onClick={() => changeLanguage('en')}
                        className="w-full px-3 py-2 bg-gray-100 rounded border text-sm font-medium hover:bg-blue-50"
                        title="Visit algoquality.com"
                      >
                        🇬🇧 Visit English Site
                      </button>
                    ) : (
                      // 英文站点显示中文按钮
                      <button 
                        onClick={() => changeLanguage('zh')}
                        className="w-full px-3 py-2 bg-gray-100 rounded border text-sm font-medium hover:bg-blue-50"
                        title="访问 aiminjia.com"
                      >
                        🇨🇳 访问中文站点
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <a 
                  href="http://app.algoquality.com/algobackend/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-3 py-2"
                >
                  <Button variant="outline" className="w-full bg-orange-100 text-orange-700 border-orange-300">
                    {t('login')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-blue-50 py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0 relative">
            <div>
              <h1 className={`${typography.heroTitle} mb-4 whitespace-nowrap text-shadow-lg lg:relative lg:z-10 lg:-mr-12 lg:pr-12`}>
                {t('hero.title1')} <span className="text-[#1567B9]">{t('hero.title2')}</span>
              </h1>
              <h2 className={`${typography.heroSubtitle} mb-4 lg:relative lg:z-10 lg:-mr-12 lg:pr-12 text-left text-shadow`}>
                {t('hero.subtitle')}
              </h2>
              <p className={`${typography.body} mb-6 max-w-xl lg:relative lg:z-10 lg:-mr-12 lg:pr-12`}>
                {t('hero.card.description')}
              </p>

              <div className="bg-[#D9E7F7] p-5 rounded-lg card-shadow max-w-md">
                <h3 className={`${typography.cardTitle} mb-3`}>
                  {t('hero.card.title')}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-[#1567B9]">
                  {t('hero.card.description')}
                </p>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 relative lg:-ml-26">
              <img 
                src={heroImage} 
                alt="Healthcare professionals" 
                className="w-[900px] h-[420px] sm:h-[520px] lg:h-[640px] object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`${spacing.sectionBlock} bg-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-20 mb-16">
            <h2 className={`${typography.sectionTitle} ${spacing.titleBottom} fade-in-up`}>
              {t('services.title')} <span className="gradient-text">{t('services.title1')}</span>{' '}
              {t('services.title2')}
            </h2>
            <motion.p
              className={typography.body}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>
		  
<section className="pt-24 pb-16 hero-gradient">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">

      {/* Tag Line */}
      <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 mb-6 shadow-sm">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Powering modern healthcare with quality management solutions
      </div>
      
      {/* Main Headline */}
      <h3 className={`${typography.sectionTitle} leading-tight mb-6`}>
        Discover the future of{" "}
        <span className="gradient-text">healthcare quality</span>{" "}
        management
      </h3>
      
      {/* Subheadline */}
      <p className={`${typography.body} mb-8 max-w-3xl mx-auto`}>
        Transform your healthcare operations with AI-driven quality management solutions that streamline compliance, improve patient outcomes, and accelerate your organizational excellence.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button className="cta-button px-8 py-4 text-white rounded-lg font-semibold text-lg">
          Explore Quality Solutions →
        </button>
        <button className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
          Schedule Demo
        </button>
      </div>
    </div>
  </div>
</section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Consulting Services */}
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={businessMeetingImage} 
                  alt="Business Meeting" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('services.quality.title')}
              </h3>
              <p className={typography.body}>
                {t('services.quality.description')}
              </p>
            </div>

            {/* Digital Health Technology */}
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={digitalTabletImage} 
                  alt="Digital Health Technology" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('services.digital.title')}
              </h3>
              <p className={typography.body}>
                {t('services.digital.description')}
              </p>
            </div>

            {/* Contact us */}
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={callCenterImage} 
                  alt="Contact us" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('services.contact.title')}
              </h3>
              <p className={typography.body}>
                {t('services.contact.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className={`${spacing.sectionBlock} bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`${typography.sectionTitle} ${spacing.titleBottom}`}>
            {t('platform.title')}
          </h2>
          <p className={`${typography.body} ${spacing.bodyBottom}`}>
            {t('platform.video')}
          </p>
          <p className={typography.bodyEmphasis}>
            {t('platform.belief')}
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className={`${spacing.sectionBlock} bg-white`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${typography.sectionTitle} mb-12 text-center`}>
            {t('about.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Singapore Office */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about.singapore')}</h3>
              <div className="space-y-3">
                <p className={typography.body}>
                  <span className="font-medium">{t('about.email')}:</span> agoh@algoquality.com
                </p>
                <p className={typography.body}>
                  <span className="font-medium">{t('about.tel')}:</span> +65 9731-2557
                </p>
                <p className={typography.body}>
                  <span className="font-medium">{t('about.address')}:</span><br />
                  169 Jln Jurong Kechil<br />
                  Singapore 598669
                </p>
              </div>
            </div>

            {/* Shanghai Office */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('about.shanghai')}</h3>
              <div className="space-y-3">
                <p className={typography.body}>
                  <span className="font-medium">{t('about.email')}:</span> agoh@algoquality.com
                </p>
                <p className={typography.body}>
                  <span className="font-medium">{t('about.tel')}:</span> +86 183-0175-1255
                </p>
                <p className={typography.body}>
                  <span className="font-medium">{t('about.address')}:</span><br />
                  668 Xinzhuan Road, Songjiang District<br />
                  Shanghai, China
                </p>
              </div>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-8">
              <a 
                href="http://www.algoquality.com/ALGO+%20Privacy%20Policy.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                {t('about.terms')}
              </a>
              <a 
                href="http://www.algoquality.com/ALGO+%20Privacy%20Policy.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                {t('about.privacy')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
