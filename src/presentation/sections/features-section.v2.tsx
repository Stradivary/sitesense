import { useTranslations } from "next-intl";
import Image from "next/image";

export const FeaturesSection = () => {
    const t = useTranslations("FeaturesSectionV2");

    const features = [
        {
            icon: "/assets/images/comprehensive.svg",
            title: t("features.0.title"),
            description: t("features.0.description")
        },
        {
            icon: "/assets/images/target.svg",
            title: t("features.1.title"),
            description: t("features.1.description")
        },
        {
            icon: "/assets/images/stopwatch.svg",
            title: t("features.2.title"),
            description: t("features.2.description")
        }
    ];

    return (
        <section className="py-32 min-h-[80vh] relative overflow-hidden">
            {/* Radial gradient background - sunrise effect */}
            <div 
                className="absolute w-[80vw] aspect-square left-1/2 -translate-x-1/2 bottom-0 translate-y-[50%]" 
                style={{
                    background: 'radial-gradient(50% 50% at 50% 50%, #0067FF 0%, rgba(0, 138, 255, 0.24) 64.5%, rgba(1, 26, 65, 0) 100%)'
                }}
            ></div>
            
            {/* Content */}
            <div className="container px-8 mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-32">{t("title")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-white">
                            <Image src={feature.icon} alt={feature.title} width={80} height={80} className="mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-white/80">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Triangle mask for transition */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <div 
                    className="h-12 bg-white" 
                    style={{ 
                        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
                        transformOrigin: "bottom center",
                        marginBottom: "-2px" // Ensures no gap between sections
                    }}
                ></div>
            </div>
        </section>
    );
};