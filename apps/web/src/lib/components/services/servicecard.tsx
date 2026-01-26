import Link from "next/link";
import { Service } from "@/lib/data/services"; // Importing the type we created

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col bg-card-bg border border-card-border p-6 rounded-[2.5rem] transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_40px_-15px_rgba(255,102,0,0.15)] active:scale-[0.98]"
    >
      {/* 1. Header: Icon & Provider */}
      <div className="flex justify-between items-start mb-5">
        <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-card-border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {service.icon}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            {service.provider}
          </span>
          {/* Mobile-friendly speed badge */}
          <span className="text-[9px] font-bold text-text-muted flex items-center gap-1 uppercase">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {service.estimatedTime}
          </span>
        </div>
      </div>

      {/* 2. Content */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-text-main group-hover:text-accent transition-colors mb-2 leading-tight tracking-tight">
          {service.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-2 font-medium">
          {service.description}
        </p>
      </div>

      {/* 3. Footer: Pricing & Arrow */}
      <div className="mt-auto pt-5 border-t border-dashed border-card-border flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">
            Total Cost
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-black text-text-main">KES</span>
            <span className="text-2xl font-black text-text-main tracking-tighter">
              {service.pricing.total.replace("KES", "").trim()}
            </span>
          </div>
        </div>

        {/* Dynamic CTA Button */}
        <div className="relative overflow-hidden w-12 h-12 rounded-2xl bg-brand-bg border border-card-border flex items-center justify-center text-text-main group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
          <span className="text-xl group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>

      {/* Subtle background glow on hover (Desktop only) */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] -z-10" />
    </Link>
  );
}
