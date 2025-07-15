import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProjectDetailMoreProjects({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="text-center"
    >
      <h3 className="text-2xl font-serif italic mb-4">Explore More Projects</h3>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "8rem" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
      />
      <Button
        size="lg"
        className="group border-primary/10 bg-primary/5 hover:bg-primary/10 text-foreground px-8 py-6"
        asChild
      >
        <Link href="/projects" className="flex items-center">
          View All Projects
          <motion.div
            className="ml-2 flex items-center justify-center"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </motion.div>
        </Link>
      </Button>
    </motion.div>
  );
}