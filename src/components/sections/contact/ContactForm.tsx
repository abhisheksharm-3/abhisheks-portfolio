"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { TextMorph } from "@/components/shared/TextMorph";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_INFO } from "@/data/contact";
import { CONTACT_FORM_SCHEMA } from "@/data/contact-schema";
import { submitContactForm } from "@/lib/actions/contact";
import type { ContactFormDataType } from "@/lib/types/components";
import { PRIMARY_BUTTON } from "@/lib/ui/button-classes";

/**
 * Field chrome. `scroll-mt-32` keeps a field that validation just focused clear of the fixed
 * header; placeholders sit at the contrast floor.
 */
const field =
  "scroll-mt-32 border border-foreground/30 bg-foreground/[0.03] shadow-none rounded-none px-3 py-3 h-auto text-base text-foreground placeholder:text-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:ring-offset-0 focus-visible:border-foreground/60 focus-visible:bg-foreground/[0.06] transition-colors duration-200";
const label = "text-[11px] text-primary/60 uppercase tracking-[0.18em] font-light";

/** The submit button's label morphs through the send: "send message", "sending", then "sent" while the success note shows. */
const submitLabel = (isPending: boolean, status: "success" | "error" | null) => {
  if (isPending) return "sending";
  if (status === "success") return "sent";
  return "send message";
};

/**
 * The contact form. Stamping `renderedAt` happens on mount, not during render: Date.now()
 * while prerendering is an unstable value, and it kept the whole form out of the static HTML.
 * `noValidate` hands validation to the schema, so errors speak in the site's voice instead of
 * the browser's bubble. The hidden `company` field is a honeypot: people never see it, scripts fill it.
 */
export const SendMessageCard = () => {
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const renderedAtRef = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(CONTACT_FORM_SCHEMA),
    defaultValues: { name: "", email: "", message: "" },
  });

  const handleSubmit = (data: ContactFormDataType) => {
    setSubmitStatus(null);
    startTransition(async () => {
      try {
        const result = await submitContactForm(data, {
          honeypot: honeypotRef.current?.value ?? "",
          renderedAt: renderedAtRef.current,
        });
        if (result.error) {
          setSubmitStatus("error");
        } else {
          setSubmitStatus("success");
          form.reset();
        }
      } catch {
        setSubmitStatus("error");
      } finally {
        setTimeout(() => setSubmitStatus(null), 6000);
      }
    });
  };

  return (
    <div>
      <noscript>
        <p className="mb-8 text-sm font-light text-foreground/65">
          this form needs javascript to submit. email{" "}
          <a className="underline" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
          </a>{" "}
          instead.
        </p>
      </noscript>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              ref={honeypotRef}
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-x-10">
            <div className="flex flex-col gap-9">
              <FormField
                control={form.control}
                name="name"
                render={({ field: f }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className={label}>name</FormLabel>
                    <FormControl>
                      <Input placeholder="your name" autoComplete="name" className={field} {...f} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field: f }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className={label}>email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={field}
                        {...f}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field: f }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className={label}>message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="what's the project, role, or idea?"
                      className={`${field} min-h-40 resize-y md:h-full`}
                      {...f}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-light" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              className={`group ${PRIMARY_BUTTON}`}
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <TextMorph>{submitLabel(isPending, submitStatus)}</TextMorph>
              {!isPending && submitStatus !== "success" && (
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </button>
          </div>

          <div aria-live="polite" role="status">
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-foreground/65 font-light"
                >
                  <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                  message sent. i&apos;ll get back to you soon.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-foreground/65 font-light"
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  that didn&apos;t send. try again, or email {CONTACT_INFO.email}.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Form>
    </div>
  );
};
