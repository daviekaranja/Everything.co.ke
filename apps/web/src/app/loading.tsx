// app/loading.tsx
import BrandedLoader from "@/lib/components/brandedloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md animate-in fade-in duration-500">
      <BrandedLoader />
    </div>
  );
}
