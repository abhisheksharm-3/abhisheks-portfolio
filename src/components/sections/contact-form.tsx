"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message should be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setSubmitStatus("success");
      form.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-light text-foreground/70">Name</FormLabel>
              </div>
              <FormControl>
                <input
                  {...field}
                  className="w-full px-4 py-2 bg-background border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm"
                  placeholder="Your name"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-light text-foreground/70">Email</FormLabel>
              </div>
              <FormControl>
                <input
                  {...field}
                  type="email"
                  className="w-full px-4 py-2 bg-background border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm"
                  placeholder="your.email@example.com"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        
        {/* Subject Field */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-light text-foreground/70">Subject</FormLabel>
              </div>
              <FormControl>
                <input
                  {...field}
                  className="w-full px-4 py-2 bg-background border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm"
                  placeholder="What's this about?"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        
        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-light text-foreground/70">Message</FormLabel>
              </div>
              <FormControl>
                <textarea
                  {...field}
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-primary/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <motion.div
                  className="ml-2 flex items-center justify-center"
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <Send className="h-4 w-4" />
                </motion.div>
              </>
            )}
          </Button>
        </div>
        
        {/* Status Messages */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-md text-sm text-green-500"
          >
            Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
          </motion.div>
        )}
        
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md text-sm text-red-500"
          >
            Oops! Something went wrong. Please try again later or contact me directly via email.
          </motion.div>
        )}
      </form>
    </Form>
  );
} 