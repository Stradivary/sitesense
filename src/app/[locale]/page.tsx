import { ReCaptchaProvider } from "@/presentation/components/providers/ReCaptchaProvider";
import { CTASection } from "@/presentation/sections/cta-section";

export default function Page() {
  return (
    <div className="relative min-h-screen">
        <ReCaptchaProvider>
          <CTASection />
        </ReCaptchaProvider>
    </div>
  );
}
