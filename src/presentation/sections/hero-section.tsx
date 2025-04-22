import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { AnimatedPOI } from "./AnimatedPOI";
import { Button } from "../components/atoms/button";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className="relative h-[90dvh] overflow-x-clip pb-20 pt-32 md:pb-32 md:pt-48">
      <div className="container">
        <div className="relative z-10 px-2 space-y-8 mx-auto text-center md:text-left md:mx-16 max-w-md sm:max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-6xl"
          >
            {t.rich("title", {
              br: () => <br />,
              b: (chunks) => <span className="text-[#CD0A45]">{chunks}</span>,
            })}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mt-6 text-lg text-white/80"
          >
            {t("subtitle")}
          </motion.p>
          <div className="flex justify-center md:justify-start">
            <Button
              className="bg-hero-cta rounded-full px-20"
              size="lg"
              asChild
            >
              <a href="#schedule-demo" className="text-white">
                {t("cta")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="mix-blend-light absolute inset-0 bottom-[-250px] z-0 bg-hero-pattern bg-cover bg-center opacity-10"
      />

      <div className="absolute inset-0 left-[55dvw] bottom-12 top-[70px] z-20 pointer-events-none h-[100dvh] w-[100dvh] bg-hero-hightlight" />

      {/* Map POI Dots with Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AnimatedPOI style={{ position: 'absolute', left: '50%', top: '40%' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <AnimatedPOI style={{ position: 'absolute', left: '80%', top: '35%' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <AnimatedPOI style={{ position: 'absolute', left: '65%', top: '70%' }} />
        </motion.div>
      </div>

      {/* Hovering Animated Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 1 }}
        className="absolute bottom-8 right-8 z-30 flex flex-col items-center text-white/80"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }} className="h-4 w-[1px] bg-white/80" /> {/* Vertical Line */}
        <motion.span animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }} className="text-xs mt-2">Scroll Down</motion.span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12.75L12 19.5l-7.5-6.75"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;