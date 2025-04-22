"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/components/atoms/tabs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

const tabs = [
  {
    value: "area",
    label: "Personalized",
    imageSrc: "/potloc-feature.png",
    imageAlt: "Area Analysis Interface",
  },
  {
    value: "grid",
    label: "Acurate",
    imageSrc: "/potloc-feature.png",
    imageAlt: "Grid Detail Interface",
  },
  {
    value: "heatmap",
    label: "Cost-effective",
    imageSrc: "/potloc-feature.png",
    imageAlt: "Heatmap Interface",
  },
];

export function FeaturesSection() {
  const t = useTranslations("FeaturesSection");

  return (
    <section id="about" className="relative min-h-screen bg-navy py-8 md:py-12">
      {/* White background divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-white" />

      <div className="container container-xl relative z-10">
        <Tabs id="headerTabs" defaultValue="area" className="flex min-h-[inherit] flex-col">
          {/* Header content - Fixed at top */}
          <div className="mx-auto w-full max-w-3xl px-2 text-center">
            <motion.h2
              className="mb-4 text-[32px] font-bold text-white md:mb-6 md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t("title")}
            </motion.h2>
            <motion.p
              className="text-[16px] text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t("description")}
            </motion.p>
            <TabsList className="mt-6 w-full justify-center bg-transparent p-0 md:mt-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 text-white/70 md:px-6 md:py-3 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content - Below header */}
          <div className="relative mt-8 flex-1 md:mt-12">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="h-full"
              >
                <div className="flex h-full items-center justify-center p-4">
                  <div className="relative w-full max-w-[min(85vw,1200px)] aspect-[16/9]">
                    {/* Shadow elements */}
                    <div className="absolute inset-0 rounded-lg">
                      {/* Top shadow (navy background) */}
                      <div className="absolute inset-x-0 top-0 h-[25%] rounded-t-lg bg-white shadow-lg drop-shadow-navy" />
                      {/* Bottom shadow (white background) */}
                      <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-lg bg-white shadow-lg shoadow-xl" />
                    </div>

                    {/* Main content */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg bg-white shadow-xl">
                      <Image
                        src={tab.imageSrc}
                        alt={tab.imageAlt}
                        fill={true}
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1200px"
                        priority={true}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
