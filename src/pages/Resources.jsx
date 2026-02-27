import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay: 0.1 * i, ease: easeOut },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

function ResourceCard({ category, title, desc, link }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {category && (
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
          {category}
        </span>
      )}

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{desc}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Visit →
        </a>
      )}
    </motion.div>
  );
}

export default function Resources() {
  const { t } = useTranslation();

  return (
    <main className="bg-white">
      {/* Hero */}
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-4xl sm:text-5xl font-bold text-gray-900"
          >
            {t("resources.title", "Resources")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-lg text-gray-600 max-w-3xl"
          >
            {t(
              "resources.subtitle",
              "Tools, updates, and practical insights to support quality and digitalisation."
            )}
          </motion.p>
        </div>
      </motion.section>

      {/* ================= TOOLS CENTRE ================= */}
      <motion.section
        className="py-12 bg-slate-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            Tools Centre
          </motion.h2>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <ResourceCard
              category="Platform"
              title="ALGO+ Dashboard Login"
              desc="Access the ALGO+ dashboard for study oversight and patient management."
              link="http://app.algoquality.com/algobackend/"
            />

            <ResourceCard
              category="Registration"
              title="Researcher Registration"
              desc="Register as a researcher to access digital workflows and study tools."
              link="http://app.algoquality.com/registration"
            />

            <ResourceCard
              category="Legal"
              title="Privacy Policy"
              desc="Read our privacy policy and data protection commitments."
              link="http://www.algoquality.com/ALGO+ Privacy Policy.html"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= NEWS ================= */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            News
          </motion.h2>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResourceCard
              category="Announcement"
              title="ALGO+ Platform Update"
              desc="Latest improvements to our compliance dashboard and workflow tools."
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= INSIGHTS ================= */}
      <motion.section
        className="py-12 bg-slate-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-2xl font-bold text-gray-900 mb-8"
          >
            Insights
          </motion.h2>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Existing 3 */}
            <ResourceCard
              category="Compliance"
              title="Preparing for GCP Audits"
              desc="Key operational steps to strengthen documentation and inspection readiness."
            />

            <ResourceCard
              category="Digital Health"
              title="Digitalising Patient Management"
              desc="How structured workflows improve study execution and patient engagement."
            />

            <ResourceCard
              category="Case Study"
              title="Improving Study Oversight Across Sites"
              desc="How a multi-site team reduced compliance delays through workflow redesign."
            />

            {/* 3 Placeholders */}
            <ResourceCard
              category="Insight"
              title="Coming Soon"
              desc="Upcoming article on quality system optimisation."
            />

            <ResourceCard
              category="Insight"
              title="Coming Soon"
              desc="Upcoming article on digital compliance workflows."
            />

            <ResourceCard
              category="Insight"
              title="Coming Soon"
              desc="Upcoming case study on patient engagement strategy."
            />
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}