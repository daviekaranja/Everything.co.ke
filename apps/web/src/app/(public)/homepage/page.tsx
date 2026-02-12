// import { Navbar } from "@/components/navbar";
import { Navbar } from "@/lib/components/navbar/Navbar";
// import { Hero, ServiceGrid, FAQSection } from "@/components/homepage-ui";
import { Shield, Clock, Zap } from "lucide-react";
import { Hero, ServiceGrid, FAQSection } from "@/lib/components/homepage-ui";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Scrollable content starts here */}
      <div className="pt-20">
        <Hero />

        {/* 3-Step Trust Bar */}
        <section className="border-y border-card-border bg-white dark:bg-slate-900/50 py-12">
          <div className="container-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-soft rounded-2xl text-accent">
                  <Shield size={32} />
                </div>
                <div>
                  <h4 className="font-bold">Secure Payments</h4>
                  <p className="text-xs text-text-muted">
                    Encrypted M-Pesa transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-soft rounded-2xl text-accent">
                  <Zap size={32} />
                </div>
                <div>
                  <h4 className="font-bold">Fast Delivery</h4>
                  <p className="text-xs text-text-muted">
                    Average turnaround of 6 hours
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-soft rounded-2xl text-accent">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="font-bold">24/7 Support</h4>
                  <p className="text-xs text-text-muted">
                    Real-time help on WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceGrid />

        {/* SEO Category Block */}
        <section className="py-20 bg-brand-dark text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-[120px]" />
          <div className="container-center relative z-10">
            <h2 className="text-h2 text-white mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {["Business & Tax", "Transport", "Legal", "Land"].map((cat) => (
                <div
                  key={cat}
                  className="p-8 border border-white/10 rounded-3xl hover:border-accent transition-all cursor-pointer bg-white/5 group"
                >
                  <span className="text-xs text-accent font-bold uppercase tracking-widest block mb-2">
                    Service Hub
                  </span>
                  <h3 className="text-xl font-bold mb-4">{cat}</h3>
                  <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    Find KRA, NTSA and more specifically for {cat.toLowerCase()}
                    .
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        <footer className="py-12 border-t border-card-border bg-white dark:bg-slate-950">
          <div className="container-center text-center">
            <p className="text-sm text-text-muted">
              © 2026 EverythingKe. All Rights Reserved. Not a government agency.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
