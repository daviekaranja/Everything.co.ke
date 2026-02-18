import { blogPosts } from "@/lib/data/blogs";
import { Metadata } from "next";
import BlogPreviewCard from "@/lib/components/blogpreviewcard";
import React from "react";
import AdSlot from "@/lib/components/blog/Adslot";
import Image from "next/image"; // Import Image from next/image

export const metadata: Metadata = {
  title: "Expert Digital Guides Kenya 2026 | Everything.co.ke",
  description:
    "Stay ahead of KRA AI validation and eCitizen biometric updates. Professional guides for Kenyan citizens and business owners.",
  alternates: { canonical: "https://everything.co.ke/blog" },
};

export default function BlogListingPage() {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen pb-20 text-brand-dark dark:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-16 bg-brand-bg dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
              Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-brand-dark dark:text-white leading-[1.1] mb-6">
              Navigating Kenya&apos;s <br />
              <span className="text-accent italic">Digital Frontier</span> in
              2026.
            </h1>
            <p className="text-lg text-text-muted dark:text-slate-400 max-w-2xl leading-relaxed">
              From the new eCitizen biometric recovery to KRA&apos;s automated
              AI tax validation—we break down complex government systems into
              simple, actionable guides.
            </p>
          </div>
        </div>
      </section>

      {/* AD SLOT 1: BLOGLIST_TOP (Between Hero and Featured) */}
      <div className="mt-8">
        <AdSlot slotId={process.env.NEXT_PUBLIC_BLOGLIST_TOP_AD_SLOT_ID!} />
      </div>

      {/* --- FEATURED POST --- */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 mb-20">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-3/5 aspect-video relative rounded-[2rem] overflow-hidden">
              <Image
                src={featuredPost.image.url}
                alt={featuredPost.image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full lg:w-2/5 p-4 lg:pr-10">
              <span className="badge-provider mb-4 inline-block">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl font-black mb-4 group-hover:text-accent transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-text-muted dark:text-slate-400 mb-8 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <a
                href={`/blog/${featuredPost.slug}`}
                className="btn-primary inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-bold transition-all"
              >
                Read Master Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARTICLE GRID --- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
          <h2 className="text-2xl font-black">Recent Insights</h2>
          <div className="hidden md:flex gap-4">
            {["All", "Taxes", "Guides", "Legal"].map((cat) => (
              <button
                key={cat}
                className="text-sm font-bold text-text-muted hover:text-accent transition-colors px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post, index) => (
            <React.Fragment key={post.slug}>
              <BlogPreviewCard post={post} />

              {/* AD SLOT 2: BLOGLIST_MIDDLE (Injected after 3 cards / 1st row) */}
              {index === 2 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 my-8">
                  <AdSlot
                    slotId={process.env.NEXT_PUBLIC_BLOGLIST_MIDDLE_AD_SLOT_ID!}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
