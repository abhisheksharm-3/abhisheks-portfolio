"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate form submission - replace with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would send the form data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Failed to submit form');
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="name" className="text-sm font-light text-foreground/70">
            Name
          </label>
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-background border ${
              errors.name ? "border-red-500" : "border-primary/10"
            } focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm`}
            placeholder="Your name"
          />
        </div>
      </div>
      
      {/* Email Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="text-sm font-light text-foreground/70">
            Email
          </label>
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email}</span>
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-background border ${
              errors.email ? "border-red-500" : "border-primary/10"
            } focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm`}
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      {/* Subject Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="subject" className="text-sm font-light text-foreground/70">
            Subject
          </label>
          {errors.subject && (
            <span className="text-xs text-red-500">{errors.subject}</span>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-background border ${
              errors.subject ? "border-red-500" : "border-primary/10"
            } focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm`}
            placeholder="What&apos;s this about?"
          />
        </div>
      </div>
      
      {/* Message Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="text-sm font-light text-foreground/70">
            Message
          </label>
          {errors.message && (
            <span className="text-xs text-red-500">{errors.message}</span>
          )}
        </div>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-2 bg-background border ${
              errors.message ? "border-red-500" : "border-primary/10"
            } focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-md outline-none transition-colors duration-300 text-sm resize-none`}
            placeholder="Tell me about your project or inquiry..."
          />
        </div>
      </div>
      
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
  );
} 