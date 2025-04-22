import * as motion from "motion/react-client";
import { CSSProperties } from "react";


export const AnimatedPOI = ({ style }: { style?: CSSProperties; }) => (
  <div className="relative" style={style}>
    {/* Pulsing gradient background */}
    <motion.div
      animate={{
        scale: [1, 2, 1],
        opacity: [0.5, 0.1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        damping: 10,
      }}
      className="absolute w-16 h-16 "
      style={{
        background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 82%)",
      }} />
    {/* Point dot */}
    <div className="absolute w-2 h-2 translate-x-7 translate-y-7 rounded-full bg-white/30 border border-white/50" />
  </div>
);
