"use client";

import { useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitContactForm } from "@/lib/actions";
import { CONTACT_FORM_SCHEMA } from "@/data/contact";
import { ContactFormDataType } from "@/lib/types";

const field =
  "border border-foreground/10 bg-foreground/[0.03] rounded-none px-3 py-3 h-auto text-base text-foreground placeholder:text-foreground/20 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground/25 focus-visible:bg-foreground/[0.06] transition-all duration-200";
const label =
  "text-[10px] text-primary/35 uppercase tracking-[0.18em] font-light";

export const SendMessageCard = () => {
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [renderedAt] = useState(() => Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(CONTACT_FORM_SCHEMA),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const handleSubmit = (data: ContactFormDataType) => {
    setSubmitStatus(null);
    startTransition(async () => {
      try {
        const result = await submitContactForm(data, {
          honeypot: honeypotRef.current?.value ?? "",
          renderedAt,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] mb-10 font-light">
        send a message
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          {/* Honeypot: hidden from people, attracts automated submissions */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            <FormField
              control={form.control}
              name="name"
              render={({ field: f }) => (
                <FormItem className="space-y-2">
                  <FormLabel className={label}>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" className={field} {...f} />
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
                  <FormLabel className={label}>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" className={field} {...f} />
                  </FormControl>
                  <FormMessage className="text-xs font-light" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field: f }) => (
              <FormItem className="space-y-2">
                <FormLabel className={label}>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="What's on your mind?" className={field} {...f} />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field: f }) => (
              <FormItem className="space-y-2">
                <FormLabel className={label}>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about the project, role, or idea..."
                    rows={7}
                    className={`${field} resize-none`}
                    {...f}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 group disabled:opacity-40 disabled:cursor-default cursor-pointer font-light border border-foreground/15 hover:border-foreground/30 focus-visible:outline-none focus-visible:border-foreground/45 px-5 py-2.5"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
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
                className="flex items-center gap-2 text-sm text-foreground/50 font-light"
              >
                <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                Message sent. I&apos;ll get back to you soon.
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-foreground/50 font-light"
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Something went wrong. Try again.
              </motion.p>
            )}
          </AnimatePresence>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
