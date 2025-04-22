"use client";

import { useParams } from "next/navigation";
import { cn } from "@/presentation/utils";
import { Link } from "@/presentation/utils/i18n/routing";
import { FC } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <div className={cn("flex items-center", className)}>
      <Link
        href="/"
        locale="en"
        className={cn(
          "text-sm transition-colors",
          currentLocale === "en" ? "font-bold" : "font-normal"
        )}
      >
        EN
      </Link>
      <span className="mx-2 text-sm">|</span>
      <Link
        href="/"
        locale="id"
        className={cn(
          "text-sm transition-colors",
          currentLocale === "id" ? "font-bold" : "font-normal"
        )}
      >
        ID
      </Link>
    </div>
  );
};

export default LanguageSwitcher;