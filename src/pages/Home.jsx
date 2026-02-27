import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import { ReactPlugin } from '@stagewise-plugins/react'
import { useTranslation } from 'react-i18next'
import '../App.css'
import { motion } from "framer-motion";
import { Send } from "lucide-react";

// 导入图片资源
import logoImage from '../assets/logo.png'
import heroImage from '../assets/Homepage-new.png'
import businessMeetingImage from '../assets/quality-consulting-service.png'
import digitalTabletImage from '../assets/adobestock-patient with tablet.png'
import callCenterImage from '../assets/contact-us.png'



// import  images here too, if Home uses them
// import heroImage from "../assets/..."  (example)

const easeOut = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14},
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.7 },
  },
};

export default function Home() {
  const { t } = useTranslation();
  const [heroEntered, setHeroEntered] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="relative isolate bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB] py-0 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={stagger}
        onViewportEnter={() => setHeroEntered(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0 relative">
            
            {/* LEFT: Text (always above image) */}
            <div className="relative z-10">
              <motion.h1 variants={fadeUp} custom={0} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-3 whitespace-nowrap text-shadow-lg lg:relative lg:-mr-12 lg:pr-12">
                {t('hero.title1')}{" "}
                <span className="text-[#1567B9]">{t('hero.title2')}</span>
              </motion.h1>

              <motion.h2 variants={fadeUp} custom={1}  className="text-1xl sm:text-1xl md:text-2xl lg:text-3xl text-gray-500 mb-48 lg:relative lg:-mr-12 lg:pr-12 tracking-[0.81em] text-left text-shadow whitespace-nowrap">
                {t('hero.subtitle')}
              </motion.h2>

              <motion.div variants={fadeUp} custom={2} className="bg-[#D9E7F7] p-6 rounded-lg card-shadow max-w-md">
                <h3 className="text-3xl font-regular text-gray-900 mb-6.5">
                  {t('hero.card.title')}
                </h3>
                <p className="text-[#1567B9] text-1xl">
                  {t('hero.card.description')}
                </p>
			</motion.div>
              </div>
            

            {/* RIGHT: image is static */}
<div className="relative z-0 order-1 lg:order-2 lg:-ml-26 overflow-hidden">
  <img
    src={heroImage}
    alt="Healthcare professionals"
    className="w-[800px] h-[420px] sm:h-[520px] lg:h-[640px] object-cover object-right shadow-xl"
  />

  {/* radial mask blur (premium look) */}
  <div
    className="absolute inset-0 pointer-events-none backdrop-blur-lg"
    style={{
      WebkitMaskImage:
        "radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 30%)",
      maskImage:
        "radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 30%)",
    }}
  />
  
  <div
  className="absolute inset-0 pointer-events-none backdrop-blur-lg"
  style={{
    WebkitMaskImage:
      "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 5%)",
    maskImage:
      "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 5%)",
  }}
/>

  {/* optional brighten tint */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      WebkitMaskImage:
        "radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)",
      maskImage:
        "radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)",
      background: "rgba(255,255,255,0.28)",
    }}
  />
	
	  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      WebkitMaskImage:
        "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 50%)",
      maskImage:
        "radial-gradient(circle at top right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 50%)",
      background: "rgba(255,255,255,0.28)",
    }}
  />
  
</div>
</div>
</div>
      </motion.section>


{/* Services Section */}
<section className="py-10 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mt-20 mb-8">

      {/* Title ONLY (no div/p inside h2) */}
      <h2 className="text-6xl font-bold text-gray-900 mb-4 fade-in-up">
        {t("services.title")}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent text-6xl"> {t("services.title1")} </span>
        <span className="text-6xl font-bold text-gray-900"> {t("services.title2")} </span>
      </h2>

      {/* Animated subtitle (outside h2) */}
      <motion.p
        className="text-xl font-normal text-gray-600 max-w-3xl mx-auto mt-10 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Our platform delivers the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">flexibility</span> and{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">efficiency</span> you need for today&apos;s
        <br />
        quality management demands in clinical research
      </motion.p>

    </div>

    {/* Key Benefits */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Quality Consulting Services */}
      <div className="text-center p-8 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="mb-6">
          <img
            src={businessMeetingImage}
            alt="Business Meeting"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {t("services.quality.title")}
        </h3>
        <p className="text-gray-600">{t("services.quality.description")}</p>
      </div>

      {/* Digital Health Technology */}
      <div className="text-center p-8 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="mb-6">
          <img
            src={digitalTabletImage}
            alt="Digital Health Technology"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {t("services.digital.title")}
        </h3>
        <p className="text-gray-600">{t("services.digital.description")}</p>
      </div>

      {/* Contact us */}
      <div className="relative group text-center p-8 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        <div className="mb-6 relative">
          <img
            src={callCenterImage}
            alt="Contact us"
            className="w-full h-48 object-cover rounded-lg"
          />

          <a
            href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"
          >
            <span className="px-5 py-2 bg-white text-[#0A5199] font-semibold rounded-xl shadow-md hover:bg-gray-100 transition">
              Email Us
            </span>
          </a>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {t("services.contact.title")}
        </h3>
        <p className="text-gray-600">{t("services.contact.description")}</p>
      </div>
    </div>
  </div>
</section>


{/* Video Placeholder */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section header */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {t("platformPage.video.title", "See ALGO+ in action")}
      </h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        {t(
          "platformPage.video.subtitle",
          "A short walkthrough of the patient app and doctor dashboard — built for secure, compliant clinical research workflows."
        )}
      </p>
    </div>

    {/* Video card */}
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg">
        {/* 16:9 area */}
        <div className="aspect-video w-full relative">
          {/* Soft “media” background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)]" />

          {/* Center play button */}
          <button
            type="button"
            className="
              absolute inset-0 m-auto
              h-16 w-16 sm:h-20 sm:w-20
              rounded-full
              bg-white/90 backdrop-blur
              border border-white/60
              shadow-xl
              grid place-items-center
              hover:scale-[1.04] hover:shadow-2xl
              active:scale-[0.98]
              transition-all
            "
            aria-label={t("platformPage.video.play", "Play video")}
            onClick={() => {
              // later: open modal / swap to real video
              console.log("Play placeholder");
            }}
          >
            {/* Play icon */}
            <span className="ml-1 inline-block w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-blue-600" />
          </button>

          {/* Bottom label */}
          <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm text-gray-700 border border-gray-200">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>
                {t("platformPage.video.badge", "2-min product overview")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Optional helper text */}
      <p className="mt-4 text-center text-sm text-gray-500">
        {t(
          "platformPage.video.note",
          "Note: will replace this placeholder with video... when ready."
        )}
      </p>
    </div>
  </div>
</section>
	  

      {/* CTA */}
      <section id="platform-cta" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 sm:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
            <div className="absolute pointer-events-none inset-0 opacity-25 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 " />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                {t("platformPage.cta.title", "Interested in our ALGO+ platform or quality consulting services?")}
              </h2>
              <p className="mt-4 text-lg text-slate-200 max-w-3xl">
                {t(
                  "platformPage.cta.subtitle",
                  "Let’s start the conversation."
                )}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
                  className="px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition"
                >
                  {t("platformPage.cta.primary", "Send Us an Email")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

	  
	  
    </div>
  );
}


