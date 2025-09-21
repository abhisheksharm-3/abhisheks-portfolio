import { Button } from "@/components/ui/button";
import {
  footerContainerVariants,
  footerItemVariants,
} from "@/lib/config/footer-config";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

/** Renders the contact column with email and a call-to-action button. */
export const FooterContactColumn = () => (
  <motion.div
    variants={footerItemVariants}
    className="md:text-right flex flex-col items-start md:items-end"
  >
    <h3 className="text-sm font-medium text-foreground/70 mb-5">
      Let’s Connect
    </h3>
    <motion.div
      variants={footerContainerVariants}
      className="space-y-4 flex flex-col items-start md:items-end"
    >
      <motion.a
        href="mailto:abhishek@abhisheksan.com"
        className="inline-flex items-center text-sm text-foreground/50 hover:text-primary transition-colors group"
        variants={footerItemVariants}
      >
        <Mail className="h-3.5 w-3.5 mr-2 text-primary/50 group-hover:text-primary transition-colors" />
        abhishek@abhisheksan.com
      </motion.a>
      <motion.div variants={footerItemVariants}>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-primary/10 bg-primary/5 hover:bg-primary/10 group"
          asChild
        >
          <Link href="/contact">
            Let’s build together
            <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  </motion.div>
);
