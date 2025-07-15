import { motion } from "framer-motion";

export function ResurrectionMeter({ potential = 0 }: { potential: number }) {
  const color =
    potential > 50
      ? "text-green-500"
      : potential > 25
      ? "text-amber-500"
      : "text-red-500";

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-light text-foreground/60">Resurrection Potential</span>
        <span className={`text-xs font-medium ${color}`}>{potential}%</span>
      </div>
      <div className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}/70`}
          initial={{ width: 0 }}
          animate={{ width: `${potential}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
}