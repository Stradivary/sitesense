"use client";

import { useParams } from "next/navigation";
import { cn } from "@/presentation/utils";
import { useRouter } from "@/presentation/utils/i18n/routing";
import { FC, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SelectIcon } from "@radix-ui/react-select";

interface LanguageSwitcherSelectProps {
  className?: string;
}

const LanguageSwitcherSelect: FC<LanguageSwitcherSelectProps> = ({ className }) => {
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleLanguageChange = useCallback((value: string) => {
    router.push("/", { locale: value });
  }, [router]);

  return (
    <div className={cn("", className)}>
      <Select defaultValue={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger 
          className={cn(
            "w-44 h-8 bg-white/10 rounded-sm border-none focus:ring-0 focus:ring-offset-0",
            className
          )}
        >
            <SelectIcon className="h-4 w-4 text-white">
                <img src="/translate.svg" alt="Language Icon" />
            </SelectIcon>
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className={cn("w-44 bg-white")}>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="id">Bahasa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcherSelect;