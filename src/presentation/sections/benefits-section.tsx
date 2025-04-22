import { Button } from "@/presentation/components/atoms/button";
import { BarChart3, MapPin, TrendingUp, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

export function BenefitsSection() {
  const t = useTranslations('BenefitsSection');

  const benefits = [
    {
      icon: <BarChart3 className="text-navy h-8 w-8" />,
      title: t('benefits.0.title'),
      description: t('benefits.0.description'),
    },
    {
      icon: <MapPin className="text-navy h-8 w-8" />,
      title: t('benefits.1.title'),
      description: t('benefits.1.description'),
    },
    {
      icon: <TrendingUp className="text-navy h-8 w-8" />,
      title: t('benefits.2.title'),
      description: t('benefits.2.description'),
    },
    {
      icon: <Users className="text-navy h-8 w-8" />,
      title: t('benefits.3.title'),
      description: t('benefits.3.description'),
    },
  ];

  return (
    <section className="bg-white py-20 md:py-32 px-6 md:px-8 lg:px-10 min-h-[790px]">
      <div className="container container-lg">
        <h2 className="text-navy mb-16 text-center text-3xl font-bold md:text-4xl">
          {t('title')}
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-navy mb-8 text-xl font-semibold">
              {t('subtitle')}
            </h3>

            <div className="mb-8 grid grid-cols-2 gap-8">
              <div>
                <div className="mb-2 text-5xl font-bold text-red-700">
                  8,400
                </div>
                <div className="text-navy font-medium">Telco Data</div>
              </div>
              <div>
                <div className="mb-2 text-5xl font-bold text-red-700">97%</div>
                <div className="text-navy font-medium">
                  {t('accuracy')}
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-red-500 text-white rounded-full hover:bg-red-600"
              asChild
            >
              <a href="#schedule-demo">{
                t('cta')
              }</a>
            </Button>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-navy mb-1 font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
