import { motion } from "framer-motion";

export const ResurrectionMeter = ({ potential = 0 }: { potential: number }) => {
  const barColor =
    potential > 50
      ? "bg-green-500/50"
      : potential > 25
        ? "bg-amber-500/50"
        : "bg-red-500/40";

  const labelColor =
    potential > 50
      ? "text-green-500/70"
      : potential > 25
        ? "text-amber-500/70"
        : "text-red-500/60";

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
          Resurrection Potential
        </span>
        <span className={`text-[11px] font-light tabular-nums ${labelColor}`}>
          {potential}%
        </span>
      </div>
      <div className="w-full h-px bg-primary/10 relative overflow-visible">
        <motion.div
          className={`absolute top-0 left-0 h-px ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${potential}%` }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};
