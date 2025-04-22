"use client";

import { Button } from "@/presentation/components/atoms/button";
import { Check } from "lucide-react";
import { Card } from "../components/atoms/card";
import LanguageSwitcher from "../components/atoms/LanguageSwitcher";
import { Link } from "../utils/i18n/routing";

export default function SuccessScreen() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#00134d] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="items-left flex flex-col gap-0 text-white">
            <span className="text-xs font-bold">Telkomsel</span>
            <span className="text-xl font-bold">POTLOC</span>
          </Link>
          <LanguageSwitcher className="text-white" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-slate-100">
        <Card className="max-w-md w-full mx-auto p-4 text-center space-y-6 bg-white">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Permintaan berhasil dikirim</h1>
            <p className="text-gray-600">Harap menunggu, tim Potloc akan segera menghubungi Anda.</p>
          </div>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Kembali ke Home</Button>
        </Card>
      </main>

      {/* Footer */}
      <footer className="p-4 pb-8 text-center text-gray-500 text-sm bg-slate-100">Potloc copyright ©2024</footer>
    </div>
  );
}
