import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/components/atoms/accordion";
import { useTranslations } from "next-intl";

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection() {
  const t = useTranslations("FAQSection");
  const faqs = t.raw("faqs") as FAQ[];

  return (
    <section id="faqs" className=" bg-[#ebf0f8]  py-20 md:py-32">
      <div className="container container-xl px-4 ">
        <div className="mb-16 text-center">
          <h2 className="text-navy text-3xl font-bold md:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mx-auto max-w-8xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq: FAQ, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="shadow-xs border/10 rounded-lg bg-white opacity-75 px-6"
                style={{ boxShadow: '0px 1px 4px 0px #0000000F' }}
              >
                <AccordionTrigger className="text-navy text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
