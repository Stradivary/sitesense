/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { Lead, LeadSource, RecordType } from "@/domain/entities/lead";
import { Button } from "@/presentation/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/presentation/components/atoms/form";
import { Input } from "@/presentation/components/atoms/input";
// import TermsConditionSection from "@/presentation/sections/terms-condition-button";
import { Dialog, DialogContent, DialogTitle } from "../atoms/dialog";
import { ReCaptcha } from "../atoms/ReCaptcha";
import { useReCaptcha } from "../providers/ReCaptchaProvider";
import { PhoneInput } from "./phone-input";
import TermsConditionButton from "@/presentation/sections/terms-condition-button";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Cannot exceed 50 Characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(50, "Cannot exceed 50 Characters"),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(50, "Cannot exceed 50 Characters"),
  phone: z.string().regex(/^8\d{8,11}$/, {
    message: "Phone number must start with 8 followed by 8-12 digits",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export function ContactForm() {
  const t = useTranslations("CTASection");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { recaptchaRef } = useReCaptcha();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        throw new Error("reCAPTCHA verification failed");
      }

      const lead: Lead = {
        TransactionID: uuidv4(),
        Name: data.name,
        Email: data.email,
        Company: data.company,
        RecordType: "Consultative" as RecordType,
        MobilePhone: `62${data.phone}`,
        LeadSource: "Website Potloc" as LeadSource,
        SendEmail: "true",
        Description: "Potloc",
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Recaptcha-Token": token,
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create lead";
        try {
          const errorJson = await response.json();
          errorMessage = errorJson.error || errorMessage;
        } catch (e) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      } else {
        form.reset();
        setShowSuccessDialog(true);
      }
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="max-w-[450px] rounded-2xl border border-white bg-[#D0DFF6]/65 p-8 backdrop-blur-md">
      <p className="mb-6">{t("description")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("form.fullName")}
                      className="border-blue-200 bg-white/90 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("form.email")}
                      className="border-blue-200 bg-white/90 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("form.businessName")}
                      className="border-blue-200 bg-white/90 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      onChange={field.onChange}
                      className="border-blue-200 bg-white/90 placeholder:text-gray-500"
                      props={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <div role='alert' className="rounded-md bg-red-100 p-3 text-sm text-red-600">
              {form.formState.errors.root.message}
            </div>
          )}
          <div className="prose max-w-none py-4">
            {t.rich("form.agreement", {
              a: (children) => (
                <TermsConditionButton className="pl-0 font-semibold text-black hover:text-black hover:underline">
                  {children}
                </TermsConditionButton>
              ),
            })}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-red-500 py-4 text-white hover:bg-red-600"
          >
            {t("form.submit")}
          </Button>
        </form>
      </Form>{" "}
      <br />
      <ReCaptcha ref={recaptchaRef} />
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-white p-4">
          <DialogTitle className="hidden">
            Permintaan berhasil dikirim
          </DialogTitle>
          <div className="max-w-md space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Permintaan berhasil dikirim
              </h2>
              <p className="text-gray-600">
                Harap menunggu, tim Potloc akan segera menghubungi Anda.
              </p>
            </div>
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
