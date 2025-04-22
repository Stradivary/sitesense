"use client";

import { Input } from "@/presentation/components/atoms/input";
import { sanitizePhoneNumber } from "@/presentation/utils";
import { ChangeEvent } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  props?:any;
}

export function PhoneInput({ value, onChange, className = "", props }: PhoneInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhoneNumber(e.target.value);
    onChange(sanitized);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const sanitized = sanitizePhoneNumber(pastedText);
    onChange(sanitized);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 text-sm">+62</span>
      </div>
      <Input
        type="tel"
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        className={`pl-12 ${className}`}
        placeholder="8xxxxxxxxx"
        pattern="^8\d{8,12}$"
        {...props}
      />
    </div>
  );
}
