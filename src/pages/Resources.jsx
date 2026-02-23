import React from "react";
import { useTranslation } from "react-i18next";

export default function Resources() {
  const { t } = useTranslation();
  return (
    <main className="bg-white">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("resources")}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Add blog posts, insights, PDFs, downloads, or case studies here.
          </p>
        </div>
      </section>
    </main>
  );
}