import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import companyImage from "../assets/company picture edited by Sharon.png";

const easeOut = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.12 * i, ease: easeOut },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

function PillarCard({ title, subtitle, desc }) {
  return (
    <div
      className={`rounded-3xl border border-gray-100 bg-white p-7 shadow-sm ${cardHover} h-full`}
    >
      <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
        {title}
      </h3>

      <p className="mt-2 text-base sm:text-lg font-semibold text-blue-600">
        {subtitle}
      </p>

      <p className="mt-5 text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function Company() {
  const { t } = useTranslation();

  return (
    <main className="bg-white">
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.14),transparent_55%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
{/* Top section: image + main content */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
  {/* Left image */}
  <motion.div
    variants={fadeUp}
    custom={0}
    className="lg:col-span-6"
  >
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-gray-100">
      <img
        src={companyImage}
        alt="Urban scene with quote about digitalisation"
        className="block w-full h-auto"
      />
    </div>
  </motion.div>

  {/* Right content */}
  <motion.div
    variants={fadeUp}
    custom={1}
    className="lg:col-span-6 pt-4"
  >
    <p className="text-sm font-semibold tracking-[0.22em] text-blue-600 uppercase">
      {t("companyPage.eyebrow", "Our mission")}
    </p>

    <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
      {t("companyPage.hero.title", "To change the world")}
    </h1>



    <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed font-medium">
      {t(
        "companyPage.hero.body",
        "We are on a mission to help a billion people; to bring quality and innovation to improve clinical research faster."
      )}
    </p>
  </motion.div>
</div>

          {/* Two core pillars */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <PillarCard
              title={t(
                "companyPage.pillars.one.title",
                "Commitment to Modern Quality"
              )}
			  
              subtitle={
				  <span className="gradient-text-soft">
      {t("companyPage.pillars.one.subtitle", "By simplification.")}
    </span>
              }
             desc={
  <>
    Clinical research is hampered by complex and demanding processes that hinder the discovery and development of treatments for patients. With more than two decades of clinical research quality experience,{" "}
    <span className="text-blue-600 font-regular">we simplify the approach to quality for researchers</span>{" "}and drive operations-based improvements to clinical trial experience for all.
  </>
}
            />

            <PillarCard
              title={t(
                "companyPage.pillars.two.title",
                "Effective Connection"
              )}
              subtitle={<span className="gradient-text-soft">
      {t("companyPage.pillars.one.subtitle", "Powered by innovation.")}
    </span>}
              desc={
				<>
				Technology advancements aiming to improve the experience of researchers and patients are often designed in silos and costly for widespread use. With more than two decades of hands-on clinical research operational experience,{" "}
    <span className="text-blue-600 font-regular">we have designed a novel user- and cost-friendly platform</span>{" "}that prioritises the personal experience of patients and researchers by minimising challenges and accelerating research.
				
                </>}
            />
          </motion.div>

          {/* Company profile block moved back to the end */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-14 rounded-[2rem] bg-slate-900 text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
            <div className="relative px-8 py-10 sm:px-10 sm:py-12 lg:px-12">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold tracking-[0.22em] uppercase text-white/75">
                  {t("companyPage.profile.eyebrow", "ALGO QUALITY")}
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
                  {t("companyPage.profile.title", "Established in 2020")}
                </h2>

                <p className="mt-6 text-white/90 text-lg leading-relaxed">
                  {t(
                    "companyPage.profile.body",
                    "We are a team of experienced subject matter expert quality professionals providing clinical research operational capacity and capability in project management, together with GxP quality risk management and quality assurance support."
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}