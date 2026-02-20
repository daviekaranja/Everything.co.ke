import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function ServiceTag({ service }: { service: any }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex items-center justify-center px-6 py-3 shrink-0 snap-center rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/5 active:scale-95"
    >
      {/* Subtle Glow behind the text on hover */}
      <div className="absolute inset-0 rounded-xl bg-bg-dark/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-10" />

      <span className="relative z-10 text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-accent whitespace-nowrap tracking-wide">
        {service.name} <span>{<ChevronRight />}</span>
      </span>
    </Link>
  );
}
