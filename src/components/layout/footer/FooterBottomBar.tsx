import { itemVariants } from "@/lib/config/page-animations";
import { motion } from "framer-motion";

export const FooterBottomBar = () => (
  <motion.div
    variants={itemVariants}
    className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
  >
    <p className="text-xs text-foreground/40 font-light">
      © {new Date().getFullYear()}{" "}
      <span className="text-primary/80">Abhishek Sharma</span>. all mine.
    </p>
    <p className="text-[10px] text-foreground/30 tracking-wider uppercase max-w-sm">
      Chandigarh, India · working with anyone, anywhere.
    </p>
  </motion.div>
);
