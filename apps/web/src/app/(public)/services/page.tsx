// "use client";

// import { useState, useMemo } from "react";
// import GlobalSearch from "@/lib/components/services/searchBar";
// import ServiceCard from "@/lib/components/services/servicecard";

// import { services, Service } from "@/lib/data/services";

// export default function ServicesPage() {
//   const [activeCategory, setActiveCategory] = useState<string>("All");

//   // Get unique categories for the filter bar
//   const categories = useMemo(() => {
//     return ["All", ...Array.from(new Set(services.map((s) => s.category)))];
//   }, []);

//   // Filter logic for the grid
//   const displayedServices = useMemo(() => {
//     if (activeCategory === "All") return services;
//     return services.filter((s) => s.category === activeCategory);
//   }, [activeCategory]);

//   return (
//     <div className="bg-brand-bg min-h-screen transition-colors duration-300 pb-24">
//       {/* ================= HEADER SECTION ================= */}
//       {/* Dark themed header to make the search bar pop */}
//       <header className="bg-brand-dark pt-20 pb-28 px-6 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
//             Our <span className="text-accent">Services.</span>
//           </h1>
//           <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
//             Find the exact government or professional service you need in
//             seconds. Transparent pricing, expert handling, and zero stress.
//           </p>

//           {/* INTEGRATED GLOBAL SEARCH */}
//           <div className="relative z-50 max-w-2xl mx-auto">
//             <GlobalSearch />
//           </div>
//         </div>
//       </header>

//       {/* ================= CATEGORY FILTER BAR ================= */}
//       {/* Sticky nav for the "1st Click" filtering experience */}
//       <nav className="sticky top-0 bg-brand-bg/80 backdrop-blur-xl border-b border-card-border z-40 py-5">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 justify-start md:justify-center">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`whitespace-nowrap px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 ${
//                   activeCategory === cat
//                     ? "bg-accent text-white shadow-xl shadow-orange-500/20"
//                     : "bg-card-bg text-text-muted hover:text-text-main border border-card-border"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* ================= SERVICE GRID ================= */}
//       <main className="max-w-7xl mx-auto px-6 mt-16">
//         {/* Responsive grid layout */}
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {displayedServices.map((service: Service) => (
//             <ServiceCard key={service.slug} service={service} />
//           ))}
//         </div>

//         {/* Empty State: If a category has no items */}
//         {displayedServices.length === 0 && (
//           <div className="py-32 text-center animate-in fade-in zoom-in duration-300">
//             <div className="text-6xl mb-4 text-slate-300">🔎</div>
//             <p className="text-2xl font-black text-text-muted italic">
//               No services found in this category.
//             </p>
//             <button
//               onClick={() => setActiveCategory("All")}
//               className="mt-6 text-accent font-black underline hover:text-accent-hover"
//             >
//               View all services
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// import { ServiceCard } from "@/components/services/ServiceCard";
import CategoryFilter from "@/lib/components/services/CategoryFilter";
import axiosClient from "@/lib/axios-client";

export default async function ServicesPage() {
  // Fetch the filter manifest
  const { data: manifest } = await axiosClient.get(
    "/services/filters-manifest",
  );

  // Initial load: Fetch all services (or featured ones)
  const { data: initialServices } = await axiosClient.get(
    "/services/filtered?limit=20",
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 bg-brand-bg min-h-screen transition-colors duration-300">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Services</h1>
        <p className="text-slate-500">
          Fast tracking government & professional services in Kenya.
        </p>
      </header>

      {/* Pass manifest to client component for interactivity */}
      <CategoryFilter manifest={manifest} initialServices={initialServices} />
    </main>
  );
}
