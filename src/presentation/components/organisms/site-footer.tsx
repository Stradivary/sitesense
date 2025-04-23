import PrivacyPolicyButton from "@/presentation/sections/privacy-policy-button";
import TermsConditionButton from "@/presentation/sections/terms-condition-button";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcherSelect from "../atoms/LanguageSwitcherSelect";
import WhatsAppIcon from "../atoms/whatsapp";
// import Images from "next/image"
// import PrivacyPolicySection from "@/presentation/sections/privacy-policy-section";
// import TermsConditionSection from "@/presentation/sections/terms-condition-button";

// Changed from export function to const SiteFooter with explicit export
const SiteFooter = () => {
  const t = useTranslations("SiteFooter");
  const logo = {
    imageSrc: "/logo_sitesense.png",
    imageAlt: "SiteSense Logo",
  };

  return (
    <footer className="bg-navy pb-8 text-white">
      <div className="px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="items-left flex flex-col gap-[0px]">
            <img
              src={logo.imageSrc}
              alt={logo.imageAlt}
              className="rounded-lg object-cover"
              width="160px"
              height="auto"
            />
          </Link>
          <div className="flex flex-col items-start gap-8 md:items-end">
            <nav
              id="main-footer-nav"
              className="flex flex-col gap-8 md:flex-row"
            >
              <Link href="#about" className="hover:text-white/90">
                {t("about")}
              </Link>
              <Link href="#howItWorks" className="hover:text-white/90">
                {t("howItWorks")}
              </Link>
              <Link href="#faqs" className="hover:text-white/90">
                {t("faq")}
              </Link>
              <TermsConditionButton className="block pl-0 md:hidden" />
              <PrivacyPolicyButton className="block pl-0 md:hidden" />
            </nav>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Mail</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="text-sm text-white/60">{t("copyright")}</p>
          <div className="flex justify-center gap-6 align-middle text-sm text-white/60">
            <TermsConditionButton className="hidden md:block" />
            <PrivacyPolicyButton className="hidden md:block" />
            <LanguageSwitcherSelect className="text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export { SiteFooter };
