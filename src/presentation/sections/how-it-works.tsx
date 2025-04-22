import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const steps = [
    { key: "step1", dotPosition: "top-[42px]" },
    { key: "step2", dotPosition: "top-[42px]" },
    { key: "step3", dotPosition: "top-[42px]" },
  ] as const;

  return (
    <section
      id="howItWorks"
      className="bg-white  from-white to-gray-50/50 py-10 md:py-10 lg:py-32 "
    >
      <div className="container">
        <div className="mb-16 text-center">
          <p className="text-navy mb-4 text-sm font-semibold">
            {t("sectionTitle")}
          </p>
          <h2 className="text-navy mx-auto max-w-3xl text-3xl font-bold md:text-4xl">
            {t("sectionSubtitle")}
          </h2>
          <p className="mt-4 text-gray-600">{t("sectionDescription")}</p>
        </div>

        <div className="relative mx-auto max-w-5xl px-4">
          {/* Vertical Line */}
          <div className="absolute left-10 md:left-1/2 h-[72%] w-px top-10 md:-translate-x-1/2 transform bg-[#DDDEDF]" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {steps.map(({ key, dotPosition }, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className={`timeline-dot absolute left-4 md:left-1/2 ${dotPosition} h-4 w-4 -translate-y-1/2 md:-translate-x-1/2 transform rounded-full bg-hero-cta ring-[18px] ring-white`} />

                {/* Content */}
                <div className={`flex flex-col md:grid md:grid-cols-2 gap-8 items-start`}>
                  <div 
                    className={`pl-12 md:pl-0 md:pr-16 ${
                      index % 2 === 0 
                        ? 'md:text-right order-2 md:order-none' 
                        : 'md:col-start-2 md:pl-16 order-2 md:order-none'
                    }`}
                  >
                    <p className="mb-2 text-sm font-semibold text-red-500">
                      {t(`${key}.step`)}
                    </p>
                    <h3 className="text-navy mb-2 text-xl font-bold">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-gray-600">{t(`${key}.description`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
