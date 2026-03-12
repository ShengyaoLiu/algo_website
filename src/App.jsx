import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import { ReactPlugin } from "@stagewise-plugins/react";
import { useTranslation } from "react-i18next";
import "./App.css";

import { Languages } from "lucide-react";
import { Globe } from "lucide-react";

import ScrollToTop from "./components/ScrollToTop";

import logoImage from "./assets/logo.png";

// router
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Company from "./pages/Company";
import Resources from "./pages/Resources";
import Contacts from "./pages/Contacts";

function App() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // set HTML lang
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  // header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // site/language routing
  const getCurrentSite = () => {
    const hostname = window.location.hostname;
    if (hostname.includes("aiminjia.com")) {
      return { current: "zh", site: "aiminjia.com" };
    } else if (hostname.includes("algoquality.com")) {
      return { current: "en", site: "algoquality.com" };
    }
    return { current: "en", site: "localhost" };
  };

  const currentSite = getCurrentSite();

  const changeLanguage = (lng) => {
    if (lng === "zh") window.location.href = "https://aiminjia.com";
    if (lng === "en") window.location.href = "https://algoquality.com";
    setIsMobileMenuOpen(false);
  };

const navLinkClass = ({ isActive }) =>
  `nav-link font-medium ${isActive ? "nav-link-active text-blue-600" : "text-gray-700"}`;

const mobileNavLinkClass = ({ isActive }) =>
  [
    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
    isActive
      ? "text-blue-600 bg-blue-50"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
  ].join(" ");

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />

      <StagewiseToolbar
        config={{
          plugins: [ReactPlugin],
          debug: true,
        }}
      />

      {/* Header */}
      <header
        className={[
          "sticky top-0 z-50 backdrop-blur-md transition-all duration-300",
          scrolled ? "bg-white/80 shadow-sm border-b border-gray-100" : "bg-white/50",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logoImage} alt="ALGO Quality Logo" className="h-15 w-auto" />
              <span className="ml-0 text-2xl font-bold text-[#135CA5]">ALGO Quality</span>
            </Link>

            {/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-8">
  <NavLink to="/platform" className={navLinkClass}>
    {t("platform")}
  </NavLink>

  <NavLink to="/solutions" className={navLinkClass}>
    {t("solutions")}
  </NavLink>

  <NavLink to="/company" className={navLinkClass}>
    {t("company")}
  </NavLink>

  <NavLink to="/resources" className={navLinkClass}>
    {t("resources")}
  </NavLink>

  <NavLink to="/contacts" className={navLinkClass}>
    {t("contacts")}
  </NavLink>
</div>

            {/* Desktop Right side */}
            <div className="flex items-center space-x-4">
              <a
                href="http://app.algoquality.com/algobackend/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button
                  variant="outline"
                  className="hidden md:block px-4 py-2 text-[#1567B9] border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  {t("login")}
                </Button>
              </a>

{/* Language switch */}
<div className="flex items-center space-x-2">
  {currentSite.site === "localhost" ? (
    <>
      <button
        onClick={() => changeLanguage("en")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        title="Visit algoquality.com"
      >
        <Globe className="h-4 w-4 text-[#1567B9] shrink-0" />
        EN
      </button>

      <button
        onClick={() => changeLanguage("zh")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        title="访问 aiminjia.com"
      >
        <Globe className="h-4 w-4 text-[#1567B9] shrink-0" />
        中文
      </button>
    </>
  ) : currentSite.current === "zh" ? (
    <button
      onClick={() => changeLanguage("en")}
      className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded border text-sm font-medium hover:bg-blue-50 transition-colors"
      title="Visit algoquality.com"
    >
      <Globe className="h-4 w-4 text-[#1567B9] shrink-0" />
      English
    </button>
  ) : (
    <button
      onClick={() => changeLanguage("zh")}
      className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded border text-sm font-medium hover:bg-blue-50 transition-colors"
      title="访问 aiminjia.com"
    >
      <Globe className="h-4 w-4 text-[#1567B9] shrink-0" />
      中文
    </button>
  )}
</div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  aria-label="Toggle menu"
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
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
<NavLink
  to="/platform"
  onClick={() => setIsMobileMenuOpen(false)}
  className={mobileNavLinkClass}
>
  {t("platform")}
</NavLink>

<NavLink
  to="/solutions"
  onClick={() => setIsMobileMenuOpen(false)}
  className={mobileNavLinkClass}
>
  {t("solutions")}
</NavLink>

<NavLink
  to="/company"
  onClick={() => setIsMobileMenuOpen(false)}
  className={mobileNavLinkClass}
>
  {t("company")}
</NavLink>

<NavLink
  to="/resources"
  onClick={() => setIsMobileMenuOpen(false)}
  className={mobileNavLinkClass}
>
  {t("resources")}
</NavLink>

<NavLink
  to="/contacts"
  onClick={() => setIsMobileMenuOpen(false)}
  className={mobileNavLinkClass}
>
  {t("contacts")}
</NavLink>

              <div className="pt-4 pb-3 border-t border-gray-200">
                <a
                  href="http://app.algoquality.com/algobackend/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2"
                >
                  <Button variant="outline" className="w-full bg-orange-100 text-orange-700 border-orange-300">
                    {t("login")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/company" element={<Company />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ALGO Quality</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{t(" ")}</p>

              <div className="mt-4 flex items-center gap-5 text-sm">
                <a
                  href="http://www.algoquality.com/ALGO+%20Privacy%20Policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  {t("about.terms")}
                </a>
                <a
                  href="http://www.algoquality.com/ALGO+%20Privacy%20Policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  {t("about.privacy")}
                </a>
              </div>
            </div>

            <div className="text-sm">
              <h4 className="text-gray-900 font-semibold">{t("about.singapore")}</h4>
              <div className="mt-3 space-y-1 text-gray-600">
                <div>agoh@algoquality.com</div>
                <div>+65 9731-2557</div>
                <div className="leading-relaxed">
                  169 Jln Jurong Kechil
                  <br />
                  Singapore 598669
                </div>
              </div>
            </div>

            <div className="text-sm">
              <h4 className="text-gray-900 font-semibold">{t("about.shanghai")}</h4>
              <div className="mt-3 space-y-1 text-gray-600">
                <div>agoh@aiminjia.com</div>
                <div>+86 183-0175-1255</div>
                <div className="leading-relaxed">
                  668 Xinzhuan Road, Songjiang District
                  <br />
                  Shanghai, China
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-500">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="text-xs text-gray-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;