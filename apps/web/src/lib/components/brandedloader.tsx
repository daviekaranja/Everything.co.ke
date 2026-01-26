// "use client";

// import React, { useState, useEffect } from "react";

// const LOADING_MESSAGES = [
//   "Securing connection...",
//   "Encrypting data...",
//   "Connecting portal...",
//   "Validating...",
//   "Finalizing...",
// ];

// export default function BrandedLoader() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(
//       () => setIndex((i) => (i + 1) % LOADING_MESSAGES.length),
//       2500 // Slightly slower for better readability
//     );
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[450px] w-full bg-transparent px-6 animate-in fade-in duration-700">
//       <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
//         {/* 1. LAYERED OUTER SPINS */}
//         {/* Slow outer ghost ring */}
//         <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-800 opacity-20" />

//         {/* Fast accent rings */}
//         <div className="absolute inset-0 rounded-full border-b-2 border-accent animate-[spin_2s_linear_infinite] opacity-30" />
//         <div className="absolute inset-2 rounded-full border-t-2 border-accent animate-[spin_1s_linear_infinite]" />

//         {/* 2. THE LOGO BOX (Professional Glass Look) */}
//         <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center overflow-hidden rounded-[2rem]  dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white dark:border-slate-800">
//           {/* LOGO FROM PUBLIC FOLDER */}
//           <img
//             src="/favicon.svg"
//             alt="Everything Logo"
//             className="w-14 h-14 md:w-16 md:h-16 z-10 object-contain animate-pulse"
//           />

//           {/* 3. PREMIUM SHINE SWEEP */}
//           <div className="absolute inset-0 z-20 pointer-events-none">
//             <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent skew-x-[-20deg] animate-[shimmer_2.5s_infinite]" />
//           </div>
//         </div>
//       </div>

//       {/* 4. DYNAMIC STATUS TEXT */}
//       <div className="mt-10 text-center">
//         <div className="h-4 flex items-center justify-center">
//           <span
//             key={index}
//             className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-800 dark:text-white transition-all duration-700 animate-in fade-in slide-in-from-bottom-2"
//           >
//             {LOADING_MESSAGES[index]}
//           </span>
//         </div>

//         <div className="mt-4 flex items-center justify-center gap-2">
//           <span className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
//           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
//             End-to-End Encrypted
//           </span>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes shimmer {
//           0% {
//             left: -150%;
//           }
//           30% {
//             left: 150%;
//           }
//           100% {
//             left: 150%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const LOADING_MESSAGES = [
  "Securing connection...",
  "Encrypting data...",
  "Connecting portal...",
  "Validating...",
  "Finalizing...",
];

export default function BrandedLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % LOADING_MESSAGES.length),
      2500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] w-full bg-transparent px-6 animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
        {/* 1. LAYERED OUTER SPINS */}
        <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-800 opacity-10" />

        {/* Fast accent rings */}
        <div className="absolute inset-0 rounded-full border-b-2 border-accent animate-[spin_3s_linear_infinite] opacity-20" />
        <div className="absolute inset-4 rounded-full border-t-2 border-accent animate-[spin_2s_linear_infinite] opacity-60" />

        {/* 2. THE LOGO CONTAINER (No BG, No Border) */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center overflow-hidden">
          {/* OPTIMIZED NEXT/IMAGE */}
          <div className="relative w-14 h-14 md:w-18 md:h-18 z-10 animate-pulse">
            <Image
              src="/logo.svg"
              alt="Everything Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 3. PREMIUM SHINE SWEEP (Floating over logo) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent skew-x-[-25deg] animate-[shimmer_3s_infinite]" />
          </div>
        </div>
      </div>

      {/* 4. DYNAMIC STATUS TEXT */}
      <div className="mt-10 text-center">
        <div className="h-5 flex items-center justify-center">
          <span
            key={index}
            className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-800 dark:text-white transition-all duration-700 animate-in fade-in slide-in-from-bottom-2"
          >
            {LOADING_MESSAGES[index]}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Secure Transaction Active
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            left: -150%;
          }
          30% {
            left: 150%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </div>
  );
}