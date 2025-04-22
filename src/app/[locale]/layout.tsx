import { env } from "@/infrastructure/config/env";
import { routing } from "@/presentation/utils/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "@fontsource/poppins"
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

export const metadata: Metadata = {
  title: "SiteSense - Temukan Lokasi Ideal Untuk Bisnis Anda",
  description:
    "Analisa potensi pasar dilokasi yang Anda inginkan secara detail dan akurat.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=explicit`}
          strategy="beforeInteractive"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.RECAPTCHA_SITE_KEY = "${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}";`,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-clip">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
