import { useTranslations } from "next-intl"
import { Button } from "../components/atoms/button"
import Image from "next/image"

export function BusinessFeaturesSection() {
    const t = useTranslations("BusinessFeatures")

    const businessFeatures = [
        {
            image: "/assets/images/001-people.svg",
            title: t("features.0.title"),
            description: t("features.0.description"),
        },
        {
            image: "/assets/images/002-stack.svg",
            title: t("features.1.title"),
            description: t("features.1.description"),
        },
        {
            image: "/assets/images/003-easy-to-use.svg",
            title: t("features.2.title"),
            description: t("features.2.description"),
        },
    ]

    return (
        <section className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white py-12 md:py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
                    {t("title")}
                </h2>

                <div className="space-y-6 md:space-y-8">
                    {businessFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm justify-start rounded-2xl py-4 md:py-6 px-4 md:px-8 mx-auto"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        >
                            <div className="flex flex-col  md:flex-row md:items-center gap-4 md:gap-8">
                                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center md:mx-0">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={48}
                                        height={48}
                                        className="w-8 h-8"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:text-left">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-blue-100 md:text-left">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:mt-12 text-center">
                    <Button
                        className="text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg font-medium"
                        style={{
                            background: "linear-gradient(79.31deg, #CD0A45 62.91%, #FD2B77 101.75%)",
                        }}
                        asChild
                    >
                        <a href="#schedule-demo" className="block">
                            {t("cta")}
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}

