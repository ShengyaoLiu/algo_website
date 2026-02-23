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



// import your images here too, if Home uses them
// import heroImage from "../assets/..."  (example)

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* paste your homepage sections here */}
	  

	
	        {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#F9FAFB] to-[#F9FAFB] py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0 relative">
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-3 whitespace-nowrap text-shadow-lg lg:relative lg:z-10 lg:-mr-12 lg:pr-12">
                {t('hero.title1')} <span className="text-[#1567B9]">{t('hero.title2')}</span>
              </h1>
              <h2 className="text-1xl sm:text-1xl md:text-2xl lg:text-3xl text-gray-500 mb-48 lg:relative lg:z-10 lg:-mr-12 lg:pr-12 tracking-[0.81em] text-left text-shadow whitespace-nowrap">{t('hero.subtitle')}</h2>

              
              <div className="bg-[#D9E7F7] p-6 rounded-lg card-shadow max-w-md">
                <h3 className="text-3xl font-regular text-gray-900 mb-6.5">
                  {t('hero.card.title')}
                </h3>
                <p className="text-[#1567B9] text-1xl">
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
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-20 mb-8">
            <h2 className="text-7xl font-bold text-gray-900 mb-4 fade-in-up">
              {t('services.title')} <span className="gradient-text text-6xl"> {t('services.title1')} </span> <span className="text-6xl font-bold text-gray-900 mb-4"> {t('services.title2')} </span> 
			  <motion.p
  className="text-2xl text-gray-700"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.2 }} // 20% visible triggers it, runs once
>
 
</motion.p>

    {/* Section Header */}
    <div className="text-center mb-15">

      <p className="text-xl font-normal text-gray-600 max-w-3xl mx-auto mt-10 leading-relaxed">
        Our platform delivers the <span className="gradient-text">flexibility</span> and <span className="gradient-text">efficiency</span> you need for today's <br /> quality management demands in clinical research
      </p>
    </div>
            </h2>
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
                {t('services.quality.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.quality.description')}
              </p>
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
                {t('services.digital.title')}
              </h3>
              <p className="text-gray-600">
                {t('services.digital.description')}
              </p>
            </div>

            {/* Contact us */}
<div className="relative group text-center p-8 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">

  {/* Image */}
  <div className="mb-6 relative">
    <img
      src={callCenterImage}
      alt="Contact us"
      className="w-full h-48 object-cover rounded-lg"
    />

    {/* Hover Overlay */}
    <a
      href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"
    >
      <span className="px-5 py-2 bg-white text-[#0A5199] font-semibold rounded-xl shadow-md hover:bg-gray-100 transition">
        Email Us
      </span>
    </a>
  </div>

  {/* Text */}
  <h3 className="text-xl font-bold text-gray-900 mb-4">
    {t("services.contact.title")}
  </h3>

  <p className="text-gray-600">
    {t("services.contact.description")}
  </p>
</div>


          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('platform.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('platform.video')}
          </p>
          <p className="text-xl text-[#1567B9] font-semibold">
            {t('platform.belief')}
          </p>
        </div>
      </section>
	  

<div className="mt-12 text-center mb-12">
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
    Interested in our ALGO+ platform or quality consulting services?
    <br />
    Let’s start the conversation.
  </p>

  <a
    href="mailto:agoh@algoquality.com?subject=Inquiry%20about%20ALGO%20Quality"
    className="inline-flex items-center gap-3 px-7 py-3 bg-[#0A5199] text-white rounded-xl font-semibold hover:bg-[#083E73] transition-all duration-300 shadow-sm hover:shadow-md"
  >
    <Send size={18} />
    Send Us an Email
  </a>
</div>
	  
	  
    </div>
  );
}


