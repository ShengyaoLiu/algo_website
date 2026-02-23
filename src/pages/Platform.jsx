import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { StagewiseToolbar } from '@stagewise/toolbar-react'
import { ReactPlugin } from '@stagewise-plugins/react'
import { useTranslation } from 'react-i18next'
import '../App.css'
import { motion } from "framer-motion";

// 导入图片资源
import logoImage from '../assets/logo.png'
import heroImage from '../assets/Homepage-new.png'
import businessMeetingImage from '../assets/quality-consulting-service.png'
import digitalTabletImage from '../assets/adobestock-patient with tablet.png'
import callCenterImage from '../assets/contact-us.png'



// import your images here too, if Home uses them
// import heroImage from "../assets/..."  (example)

export default function Platform() {
  return (
    <main className="bg-white">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Platform</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            A short, clear description of your platform goes here.
          </p>

          {/* Put your platform sections/cards here */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-100">Feature A</div>
            <div className="p-6 rounded-2xl border border-gray-100">Feature B</div>
            <div className="p-6 rounded-2xl border border-gray-100">Feature C</div>
          </div>
        </div>
      </section>
    </main>
  );
}