import { motion } from "framer-motion";
import Image from "next/image";

export function ProjectDetailImage({
  src,
  alt,
  isInView,
}: {
  src: string;
  alt: string;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-12"
    >
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl border border-primary/10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
    </motion.div>
  );
}