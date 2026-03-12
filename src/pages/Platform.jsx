import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import { ReactPlugin } from '@stagewise-plugins/react'
import { useTranslation } from 'react-i18next'
import '../App.css'
import { motion } from "framer-motion";

// 导入图片资源
import logoImage from '../assets/logo.png'
import heroWomanImage from '../assets/hero-woman-bubbles.png'
import businessMeetingImage from '../assets/quality-consulting-service.png'
import digitalTabletImage from '../assets/adobestock-patient with tablet.png'
import callCenterImage from '../assets/contact-us.png'
import platformFlow from "../assets/platform-flow.png";




// import your images here too, if Home uses them
// import heroImage from "../assets/..."  (example)

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

function Icon({ children }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradiradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
      {children}
    </div>
  );
}

export default function Platform() {
  const { t } = useTranslation();

  // Safe text fallback if your translation JSON doesn't have these keys yet
  const T = (key, fallback) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const highlights = [
    {
      title: T("platformPage.highlights.ux.title", "Better experience"),
      desc: T(
        "platformPage.highlights.ux.desc",
        "Enhance the doctor-patient partnership and integrity with secure tracking of safety, efficay and clinical actions."
      ),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14-4-4 1.41-1.41L11 12.17l5.59-5.59L18 8l-7 8z" />
        </svg>
      ),
    },
    {
      title: T("platformPage.highlights.scale.title", "Real-time control"),
      desc: T(
        "platformPage.highlights.scale.desc",
        "A time-saving and easy-to-use tool to manage patient accounts, research activities and communications"
      ),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />
        </svg>
      ),
    },
    {
      title: T("platformPage.highlights.network.title", "Designed to scale"),
      desc: T(
        "platformPage.highlights.network.desc",
        "Cloud-ready, integration-friendly, and built to support global teams across sites and regions."
      ),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ];

  const modules = [

	{
  title: T("platformPage.modules.core.title", "Core Modules"),
  bullets: [
    T(
      "platformPage.modules.core.b1",
      "Screening & Eligibility: Register interested participants  at speed and assess inclusion criteria"
    ),
    T(
      "platformPage.modules.core.b2",
      "eConsent: Modernise patient-centered consent experience remotely from the onset"
    ),
    T(
      "platformPage.modules.core.b3",
      "Diary & eCOA: Capture real-time participants’ experience and improve adherence"
    ),
  ],
},
	
	
	{
      title: T("platformPage.modules.integrations.title", "Quality & Compliance"),
      bullets: [
        T("platformPage.modules.integrations.b1", "Streamline and secure routine clinic processes with data integrity and full GCP & HIPAA compliance"),
        T("platformPage.modules.integrations.b2", "GCP- and 21 CFR Part 11-compliant with built-in privacy, security, and audit-ready traceability."),
        T("platformPage.modules.integrations.b3", "Role-based access control and structured approval workflows."),
      ],
    },
	
    {
      title: T("platformPage.modules.analytics.title", "Dashboards & Analytics"),
      bullets: [
        T("platformPage.modules.analytics.b1", "Real-time data for quality and operations"),
        T("platformPage.modules.analytics.b2", "Cross-site trend detection to support proactive oversight and decision-making."),
        T("platformPage.modules.analytics.b3", "Exportable, audit-ready reports for inspections and internal reviews."),
      ],
    },
    
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
	  

<div className="absolute inset-0 pointer-events-none z-0
  bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent" />


<section className="relative pt-16 pb-14 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-0 items-start">

{/* Woman Image */}
<img
  src={heroWomanImage}
  alt=""
  className="
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    h-[100%]
    max-h-[820px]
    object-contain
    pointer-events-none
    select-none
    z-0
  "
/>

<img
  src={logoImage}
  alt=""
  className="
    absolute
    right-[320px]
    top-[18%]
    w-[350px]
    opacity-[90]
	drop-shadow-[0_0_25px_rgba(59,130,246,0.25)]
    pointer-events-none
    select-none
    z-10
  "
/>

{/* Smooth left fade */}
<div
  className="
    absolute inset-0
    bg-gradient-to-l
    from-slate-50/0
    via-slate-50/70
    to-slate-50
    pointer-events-none
    z-0
  "
/>

  {/* Fade left (so text stays readable) */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-l
      from-slate-50/0 via-slate-50/75 to-slate-50
      pointer-events-none
      z-0
    "
  />

  {/* Fade bottom (cleaner bottom edge) */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-t
      from-slate-10 via-slate-30/90 to-transparent
      pointer-events-none
      z-0
    "
  />


      {/* LEFT */}
      <motion.div
        className="relative z-10 max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
      >
	  
	  
        {/* Quote pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
          
          <div className="flex items-center gap-1">
            <span className="text-gray-400 opacity-30 font-serif text-s leading-none select-none -mb-1">
              &ldquo;
            </span>
            <span className="text-gray-800">
              {T("platformPage.hero.tag.quote", "Digital is a much better way of sharing.")}
            </span>
            <span className="text-gray-400 opacity-30 font-serif text-s leading-none select-none -mb-1">
              &rdquo;
            </span>
            <span className="mx-1 text-gray-200">|</span>
            <span className="text-gray-400 font-normal text-xs uppercase tracking-widest">
              {T("platformPage.hero.tag.author", "G. Hinton")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.25]">
          {T("platformPage.hero.title1", "A health technology")}
		  
		  <span className="block mt-2">{T("platformPage.hero.title2","to")}{" "}
		  
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            {T("platformPage.hero.title3", "digitalise")}{" "}
          </span>
		  </span>
          
		  <span className="block mt-2">
            {T("platformPage.hero.title4", "patient management")}
          </span>
		  <span className="block mt-2">
		  {T("platformPage.hero.title5", "in clinical research")}
		  </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-3xl leading-relaxed">
          {T(
            "platformPage.hero.subtitle",
            "A unified platform for seamless communication and secure data collection, making participation effortless and safe"
          )}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#platform-modules"
            className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out
hover:-translate-y-1
hover:shadow-[0_15px_30px_rgba(59,130,246,0.35)]
active:translate-y-0 active:shadow-md"
          >
            {T("platformPage.hero.ctaPrimary", "Explore ALGO+ →")}
          </a>
          <a
  href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
  className="
  px-6 py-3 rounded-lg font-semibold
  border border-gray-300
  bg-white text-gray-800
  transition-all duration-300 ease-out
hover:-translate-y-1
hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]
hover:border-purple-400
active:translate-y-0
"
>
  {T("platformPage.hero.ctaSecondary", "Request a demo")}
</a>
        </div>

        {/* Highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl drop-shadow-xl">
          {[
            { title: "GCP Certified", desc: "Globally recognised quality standards" },
            { title: "Audit-Ready Workflows", desc: "Full documentation traceability" },
            { title: "Real-Time Dashboards", desc: "Instant visibility across teams" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={i}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
            >
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>



    </div>
  </div>
</section>

      {/* Highlights */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {T("platformPage.highlights.title1", "What makes us")}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {T("platformPage.highlights.title2", "different")}
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              {T(
                "platformPage.highlights.subtitle",
                "The first-in-class Digital Health Technology application designed for doctors in clinical studies"
              )}
            </p>
			
			<p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
              {T(
                "platformPage.highlights.subtitle1",
                "Enabling trust, improved recruitment, and enhanced adherence"
              )}
            </p>
			
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((f, i) => (
              <motion.div
                key={f.title}
                className={`rounded-2xl border border-gray-100 bg-white p-7 ${cardHover}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <Icon>{f.icon}</Icon>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{f.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="platform-modules" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {T("platformPage.modules.title", "Tailored to meet the clinical studies needs")}
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-4xl">
                {T(
                  "platformPage.modules.subtitle",
                  "Pick what you need now, expand when you’re ready. Everything stays audit-friendly and consistent."
                )}
              </p>
            </div>
            <a
              href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white border border-gray-200 font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              {T("platformPage.modules.cta", "Talk to us")}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {modules.map((m, i) => (
              <motion.div
                key={m.title}
                className={`rounded-2xl bg-white border border-gray-100 p-7 ${cardHover}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={i}
                variants={fadeUp}
              >
                <h3 className="text-xl font-bold text-gray-900">{m.title}</h3>
                <ul className="mt-4 space-y-3 text-gray-600">
                  {m.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<section className="py-24 bg-gradient-to-b from-white to-slate-50">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Title */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        ALGO+ Platform: Unified digital workflow
      </h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Connecting patients and investigators through secure, real-time collaboration.
      </p>
    </div>

    {/* Big Image */}
<div className="relative mt-12">
  <img
    src={platformFlow}
    alt="Patient App and Doctor Dashboard"
    className="w-full h-auto rounded-2xl"
  />

  {/* Overlay button */}
  <a
    href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
    className="
      absolute top-1 right-1
      px-9 py-9 rounded-full
      bg-white/90 backdrop-blur
      text-blue-900 font-bold text-3xl
      border border-blue-500
      shadow-lg
      hover:-translate-y-0.5 hover:shadow-xl
      transition-all
    "
  >
    Book a demo →
  </a>
</div>
	
	

  </div>
</section>







      {/* CTA */}
      <section id="platform-cta" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 sm:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold">
                {T("platformPage.cta.title", "Ready to transform your clincial research workflow?")}
              </h2>
              <p className="mt-4 text-lg text-slate-200 max-w-3xl">
                {T(
                  "platformPage.cta.subtitle",
                  "Let’s map your current process, identify quick wins, and show how ALGO+ supports compliance without slowing teams down."
                )}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
                  className="px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
                >
                  {T("platformPage.cta.primary", "Contact us")}
                </a>
                <a
                  href="http://app.algoquality.com/algobackend/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  {T("platformPage.cta.secondary", "Login")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}