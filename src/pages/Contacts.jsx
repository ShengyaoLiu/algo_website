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

export default function Contacts() {
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
            {t("contact.title", "Get in touch")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-lg text-gray-600 max-w-2xl"
          >
            {t(
              "contact.subtitle",
              "We’re happy to discuss quality consulting or the ALGO+ platform."
            )}
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Content */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Contact Info */}
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="text-2xl font-bold text-[#135CA5]">
              {t("contact.info", "Contact Information")}
            </h2>

            <div className="mt-6 space-y-6 text-gray-600">
              <div>
                <div className="font-semibold text-gray-900">Email</div>
                <div>agoh@algoquality.com</div>
              </div>

              <div>
                <div className="font-semibold text-gray-900">
                  {t("contact.singapore", "Singapore Office")}
                </div>
                <div>169 Jln Jurong Kechil</div>
                <div>Singapore 598669</div>
                <div>+65 9731-2557</div>
              </div>

              <div>
                <div className="font-semibold text-gray-900">
                  {t("contact.shanghai", "Shanghai Office")}
                </div>
                <div>668 Xinzhuan Road, Songjiang District</div>
                <div>Shanghai, China</div>
                <div>+86 183-0175-1255</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#135CA5] mb-6">
              {t("contact.formTitle", "Send a message")}
            </h2>

            <form
  action="http://www.algoquality.com/fcf-assets/fcf.process.php"
  method="POST"
  className="space-y-5"
>
  <input
    type="text"
    name="Name"
    placeholder="Your name"
    required
    maxLength={100}
    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="email"
    name="Email"
    placeholder="Your email"
    required
    maxLength={100}
    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Optional: Organisation (won’t be sent unless your PHP script supports it) */}
  <input
    type="text"
    name="Organisation"
    placeholder="Organisation (optional)"
    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    rows="4"
    name="Message"
    placeholder="Your message"
    required
    maxLength={3000}
    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
  >
    Send Message
  </button>
</form>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}