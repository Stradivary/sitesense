"use client"

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/presentation/components/atoms/button";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import { Link } from "@/presentation/utils/i18n/routing";
import { cva } from "class-variance-authority";
import { cn } from "@/presentation/utils";

const logo = {
  imageSrc: "/logo_sitesense.png",
  imageAlt: "SiteSense Logo"
}

const headerVariants = cva(
  "fixed top-0 left-0 right-0 z-50 w-screen transition-all duration-300",
  {
    variants: {
      variant: {
        transparent: "bg-transparent py-2 md:py-4",
        scrolled: "bg-gradient-to-r from-[#001A41] via-[#001A41] to-[#0E336C] py-1 md:py-2 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "transparent",
    },
  }
);

const navLinkVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        transparent: "text-white/90 hover:text-white",
        scrolled: "text-white/90 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "transparent",
    },
  }
);

export function SiteHeader() {
  const t = useTranslations("SiteHeader");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const currentVariant = isScrolled ? "scrolled" : "transparent";

  return (
    <header className={headerVariants({ variant: currentVariant })}>
      <div className={cn("container container-md w-full flex h-16 items-center justify-between",
        isScrolled ? "" : "border-b-[1px]"
      )}>
        <Link href="/" className="items-left flex flex-col gap-0">
          <img
            src={logo.imageSrc}
            alt={logo.imageAlt}
            className={cn(
              "rounded-lg object-cover",
              isScrolled ? "" : "brightness-0 invert"
            )}
            width="127px"
            height="40px"
          />
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            href="#about"
            className={navLinkVariants({ variant: currentVariant })}
          >
            {t("about")}
          </Link>
          <Link
            href="#howItWorks"
            className={navLinkVariants({ variant: currentVariant })}
          >
            {t("howItWorks")}
          </Link>
          <Link
            href="#faqs"
            className={navLinkVariants({ variant: currentVariant })}
          >
            {t("faq")}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            asChild
            className={cn(
              "rounded-sm", "border-white text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <a href="#schedule-demo">{t("scheduleDemo")}</a>
          </Button>
          <LanguageSwitcher className={"text-white"} />
        </div>
      </div>
    </header>
  );
}
