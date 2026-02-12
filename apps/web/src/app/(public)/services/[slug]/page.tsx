import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import axiosClient from "@/lib/axios-client";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * SEO: Fetches service metadata from the API
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const { data: service } = await axiosClient.get(
      `/services/by-slug/${resolvedParams.slug}`,
    );
    return {
      title: service.seoTitle || `${service.name} | Everything.co.ke`,
      description: service.seoDescription,
    };
  } catch (err) {
    return { title: "Service Not Found" };
  }
}

/**
 * Static Generation: Tells Next.js which slugs to pre-render
 */
export async function generateStaticParams() {
  try {
    const { data: slugs } = await axiosClient.get("/services/published-slugs");
    return slugs.map((slug: string) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error("Failed to fetch static params:", error);
    return [];
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  let service;

  try {
    // Transitioning from local array to FastAPI endpoint
    const response = await axiosClient.get(
      `/services/by-slug/${resolvedParams.slug}`,
    );
    service = response.data;
  } catch (error) {
    console.error("Error fetching service detail:", error);
    return notFound();
  }

  // Structured Data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription || service.description,
    provider: { "@type": "LocalBusiness", name: "Everything.co.ke" },
    mainEntity: service.faqs?.map((faq: any) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="bg-brand-bg min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-brand-dark pt-12 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-accent/20 text-accent text-[10px] font-black uppercase px-3 py-1 rounded-full border border-accent/30">
              {service.provider}
            </span>
            <span className="bg-white/10 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/20">
              {service.subCategory || service.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            {service.name}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-card-border">
            <h2 className="text-2xl font-black text-text-main mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center text-sm">
                📋
              </span>
              What You Need
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.requirements?.map((req: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-brand-bg rounded-2xl border border-card-border group hover:border-accent/30 transition-colors"
                >
                  <span className="text-accent font-bold mt-0.5">✓</span>
                  <span className="text-sm font-bold text-text-main leading-tight">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {service.faqs && service.faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-text-main px-4">
                Common Questions
              </h2>
              {service.faqs.map((faq: any, i: number) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-slate-900 border border-card-border rounded-3xl overflow-hidden cursor-pointer"
                >
                  <summary className="p-6 font-black text-text-main flex justify-between items-center list-none group-open:text-accent transition-colors">
                    {faq.q}
                    <span className="group-open:rotate-180 transition-transform duration-300">
                      ↓
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </div>
                </details>
              ))}
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border-2 border-accent/20">
              <h3 className="text-xl font-black text-text-main mb-6">
                Price Breakdown
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-text-muted italic">Gov. Fee</span>
                  <span className="text-text-main">
                    KES {Number(service.pricing.governmentFee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-text-muted">Service Fee</span>
                  <span className="text-text-main">
                    KES {Number(service.pricing.serviceFee).toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-dashed border-card-border flex justify-between items-end">
                  <span className="text-lg font-black text-text-main uppercase">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-accent uppercase tracking-widest">
                      Inclusive of VAT
                    </span>
                    <span className="text-3xl font-black text-accent tracking-tighter">
                      KES {Number(service.pricing.total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/checkout/personal-details?service=${service.slug}`}
                className="w-full bg-accent text-white py-5 rounded-2xl font-black shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center text-center"
              >
                Apply Now
              </Link>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Estimated: {service.estimatedTime}
                </div>
              </div>
            </div>

            <div className="bg-brand-dark rounded-3xl p-6 text-white border border-white/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-2">
                Live Session Required
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                After payment, our agent will contact you immediately. Please
                stay near your phone for the <strong>OTP verification</strong>{" "}
                to complete this request.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
