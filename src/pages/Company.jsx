import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
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

const cardHover = "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}

function ValueCard({ title, desc }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${cardHover}`}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{desc}</p>
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
  viewport={{ once: true, amount: 0.25 }}
  variants={stagger}
>
  {/* Background layers */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
  <div className="absolute pointer-events-none inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_55%)]" />

  {/* Content */}
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    {/* Stats */}


    {/* Mission (now INSIDE the gradient section) */}
    <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <motion.div variants={fadeUp} custom={1}>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
          {t("companyPage.mission.title1", "Our")}{" "}
          <span className="text-gray-900">{t("companyPage.mission.title2", "mission")}</span>
        </h2>

        <p className="mt-5 text-gray-600 leading-relaxed">
          {t(
            "companyPage.mission.body",
            "We combine quality consulting and digital technology to help teams run compliant, efficient, and patient-centric clinical research."
          )}
        </p>

        <div className="mt-12 rounded-2xl bg-slate-900 text-white p-6 overflow-hidden relative">
          <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
          <div className="relative">
            <h3 className="text-lg font-semibold">
              {t("companyPage.mission.calloutTitle", "What we believe")}
            </h3>
            <p className="mt-2 text-slate-200">
              {t(
                "companyPage.mission.calloutBody",
                "Quality and digitalisation enable smarter compliance, clearer oversight, and better patient experiences."
              )}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ValueCard
          title={t("companyPage.values.one.title", "Founded in 2021")}
          desc={t("companyPage.values.one.desc", "....")}
        />
        <ValueCard
          title={t("companyPage.values.two.title", "...")}
          desc={t("companyPage.values.two.desc", "....")}
        />
        <ValueCard
          title={t("companyPage.values.three.title", "...")}
          desc={t("companyPage.values.three.desc", "...")}
        />
        <ValueCard
          title={t("companyPage.values.four.title", "Patient-centre")}
          desc={t("companyPage.values.four.desc", "Support patient management and data flow without creating extra burden for clinicians.")}
        />
      </motion.div>
    </div>
  </div>
</motion.section>




    </main>
  );
}