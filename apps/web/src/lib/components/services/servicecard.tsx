import Link from "next/link";
import { ServiceRead } from "@/lib/types/api";

interface ServiceCardProps {
  service: ServiceRead;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card group relative overflow-hidden isolate flex flex-col">
      {/* 1. Top Bar: Category & Status */}
      <div className="flex justify-between items-center mb-6">
        <span className="badge-provider">{service.provider}</span>
        {service.featured && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-[9px] font-black text-green-600 uppercase tracking-wider border border-green-500/20">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            Popular
          </span>
        )}
      </div>

      {/* 2. Visual Centerpiece: Icon & Name */}
      <div className="flex gap-4 items-center mb-4">
        <div className="shrink-0 w-16 h-16 bg-brand-bg rounded-[1.25rem] flex items-center justify-center text-4xl shadow-inner border border-card-border group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
          {service.icon}
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-black text-text-main group-hover:text-accent transition-colors leading-tight tracking-tight">
            {service.name}
          </h3>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
            Est: {service.estimatedTime}
          </span>
        </div>
      </div>

      {/* 3. Description */}
      <p className="text-text-muted text-xs leading-relaxed line-clamp-2 font-medium mb-6">
        {service.description}
      </p>

      {/* 4. Action Footer */}
      <div className="mt-auto pt-4 border-t border-dashed border-card-border flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">
            Investment
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-black text-text-main opacity-60">
              KES
            </span>
            <span className="text-xl font-black text-text-main tracking-tighter">
              {Number(service.pricing.total).toLocaleString()}
            </span>
          </div>
        </div>

        {/* CTA: the ONLY clickable element */}
        <Link
          href={`/services/${service.slug}`}
          className="h-10 px-4 rounded-xl bg-brand-bg border border-card-border flex items-center gap-2 text-text-main font-black text-[10px] uppercase tracking-widest transition-all duration-300
                     hover:bg-accent hover:text-white hover:border-accent
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Apply</span>
          <span className="text-sm transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Visual-only background */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none -z-10" />
    </article>
  );
}
