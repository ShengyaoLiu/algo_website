import React from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <main className="bg-white">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("contacts")}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Add contact info and a simple call-to-action here.
          </p>

          <div className="mt-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-700">
              Email:{" "}
              <a className="text-[#0A5199] font-semibold hover:underline" href="mailto:agoh@algoquality.com">
                agoh@algoquality.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}