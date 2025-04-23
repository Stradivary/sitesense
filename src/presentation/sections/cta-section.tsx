"use client";

import { ContactForm } from "@/presentation/components/molecules/contact-form";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("CTASection");
  return (
    <section id="schedule-demo" className="relative overflow-hidden bg-custom-gradient py-20 md:py-32">
      <div className="container p-8 md:p-10 lg:p-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-white font-poppins text-[16px] leading-[24px] font-[600]">
              JOIN WITH US
            </span>
            <h2 className="font-poppins font-[700] text-[40px] leading-[60px] tracking-normal text-white">
              {
                t.rich("title", {
                  br: () => <br />,
                  b: (children) => <span className="bg-hero-cta bg-clip-text text-transparent">{children}</span>
                })
              }
            </h2>
          </div>

          <div className="relative ">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
