"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// --- FORM SCHEMA (Synced with backend) ---
const formSchema = z.object({
  name: z.string().min(2, { message: "name must be at least 2 characters." }),
  email: z.email({ message: "please enter a valid email address." }),
  subject: z
    .string()
    .min(3, { message: "subject must be at least 3 characters." }),
  message: z
    .string()
    .min(10, { message: "message must be at least 10 characters." }),
});
type FormValues = z.infer<typeof formSchema>;

// --- ANIMATION VARIANTS ---
const formContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * A card component containing a contact form with validation and submission handling.
 * @returns {JSX.Element} The SendMessageCard component.
 */
export const SendMessageCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000); // Clear status after 5s
    }
  };

  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative h-full">
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
            <MessageCircle
              className="h-5 w-5 text-primary/70"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-2xl font-serif italic">Send a Message</h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "3rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
        />

        <Form {...form}>
          <motion.form
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div variants={formItemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light text-foreground/70">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="What should I call you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light text-foreground/70">
                      Your Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Where can I reach you?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light text-foreground/70">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="What's this about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light text-foreground/70">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project or inquiry..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div variants={formItemVariants} className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-md text-sm text-green-500 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    Message sent successfully. I&apos;ll get back to you soon!
                  </span>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-sm text-red-500 flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    Oops! Something went wrong. Please try again later.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </Form>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
};
