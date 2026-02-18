import { blogPosts } from "@/lib/data/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ChevronRight } from "lucide-react";
import AdSlot from "@/lib/components/blog/Adslot";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `https://everything.co.ke/blog/${slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: [{ url: post.image.url, alt: post.image.alt }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image.url,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-brand-bg text-text-main pb-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto pt-16 px-4 mb-12 text-center md:text-left">
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
          <span className="badge-provider">{post.category}</span>
          <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Clock size={12} /> 6 Min Read
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-brand-dark dark:text-white">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 p-2 pl-2 pr-6 w-fit rounded-full bg-card-bg border border-card-border shadow-sm mx-auto md:mx-0">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-black text-sm">
            {post.author.name.charAt(0)}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold leading-none">{post.author.name}</p>
            <p className="text-[10px] text-text-muted mt-1 uppercase font-bold">
              {post.author.role}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <article>
          {/* Featured Image */}
          <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-12 border border-card-border shadow-2xl">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              priority
              className="object-cover w-full h-full"
            />
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            {/* Introduction - No Ads Before This */}
            <p className="text-xl leading-relaxed text-text-main/80 font-medium mb-12 border-l-4 border-accent pl-6 italic">
              {post.content.introduction}
            </p>

            {/* AD 1: TOP SLOT - Displayed ONLY after the introduction */}
            <div className="my-12">
              <AdSlot slotId={process.env.NEXT_PUBLIC_TOP_AD_SLOT_ID!} />
            </div>

            {/* Content Sections */}
            {post.content.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-black mb-4 text-brand-dark dark:text-white">
                  {section.heading}
                </h2>
                <div
                  className="text-lg leading-relaxed text-text-main/90 mb-8"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />

                {/* AD 2: MIDDLE SLOT - Triggers based on your manual interface flag */}
                {section.hasAdAfter && (
                  <div className="my-12">
                    <AdSlot
                      slotId={process.env.NEXT_PUBLIC_MIDDLE_AD_SLOT_ID!}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* CTA Section */}
            {post.primaryCTA && (
              <div className="my-16 p-8 md:p-12 rounded-[2.5rem] bg-brand-dark text-white shadow-2xl overflow-hidden group relative text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <h4 className="text-3xl font-black mb-6 relative z-10">
                  {post.primaryCTA.title}
                </h4>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed relative z-10 max-w-2xl mx-auto">
                  {post.primaryCTA.description}
                </p>
                <a
                  href={post.primaryCTA.link}
                  className="w-full md:w-auto px-10 py-5 bg-accent hover:bg-accent-hover text-white inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all relative z-10 text-lg"
                >
                  {post.primaryCTA.buttonText} <ArrowRight size={20} />
                </a>
              </div>
            )}

            {/* AD 3: BOTTOM SLOT - Placed after content/CTA but before FAQs */}
            <div className="my-16 pt-12 border-t border-card-border">
              <AdSlot slotId={process.env.NEXT_PUBLIC_BOTTOM_AD_SLOT_ID!} />
            </div>
          </div>

          {/* FAQs */}
          <section className="mt-16 bg-card-bg border border-card-border rounded-3xl p-8">
            <h3 className="text-2xl font-black mb-8">Related Questions</h3>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="group">
                  <p className="font-bold text-lg text-brand-dark dark:text-white mb-2 flex gap-2">
                    <span className="text-accent italic">?</span> {faq.q}
                  </p>
                  <p className="text-text-muted pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Services */}
          <div className="mt-16">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-header mb-8 text-center">
              Our Professional Solutions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.relatedServices.map((service) => (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between p-5 rounded-2xl bg-card-bg border border-card-border hover:border-accent/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                >
                  <div>
                    <p className="text-base font-bold group-hover:text-accent transition-colors">
                      {service.name}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {service.priceHint || "Inquire for pricing"}
                    </p>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
