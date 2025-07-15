import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/contact-form";

export default function SendMessageCard() {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative h-full">
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
            <MessageCircle className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">Send a Message</h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
        />
        <ContactForm />
      </div>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
}