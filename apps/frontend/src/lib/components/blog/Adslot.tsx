// // src/components/blog/AdSlot.tsx
// "use client";
// import { useEffect } from "react";

// declare global {
//   interface Window {
//     adsbygoogle?: any;
//   }
// }

// export default function AdSlot({ slotId }: { slotId: string }) {
//   useEffect(() => {
//     try {
//       // This triggers the specific ad unit to load
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (e) {
//       console.error("AdSense error", e);
//     }
//   }, []);

//   return (
//     <div className="my-10 w-full overflow-hidden text-center">
//       <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-2">
//         Advertisement
//       </span>
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client={`${process.env.AD_PUBLISHER_ID}`}
//         data-ad-slot={slotId}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ slotId }: { slotId: string }) {
  // Check if we are in production
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    // Only push the ad if we are in production AND the library exists
    if (isProduction) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [isProduction]);

  // In development, show a gray placeholder so you can see your layout
  if (!isProduction) {
    return (
      <div className="my-10 w-full p-8 border-2 border-dashed border-gray-300 bg-gray-50 text-center">
        <span className="text-xs font-bold text-gray-400 uppercase">
          AdSlot Placeholder ({slotId})
        </span>
        <p className="text-[10px] text-gray-400">
          Ads are hidden in Development Mode
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 w-full overflow-hidden text-center">
      <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-2">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_AD_PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
