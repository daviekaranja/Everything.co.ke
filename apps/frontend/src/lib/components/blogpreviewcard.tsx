import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/types/blogs";

export default function BlogPreviewCard({ post }: { post: BlogPost }) {
  return (
    <article className="service-card group cursor-pointer overflow-hidden border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
      {/* 1. Image Header with Category Overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6">
        <Image
          src={post.image.url}
          alt={post.image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="badge-provider shadow-sm backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-700/50">
            {post.category}
          </span>
        </div>
      </div>

      {/* 2. Meta Info: Date & Reading Time */}
      <div className="flex items-center gap-4 text-[12px] text-text-muted mb-3 font-medium tracking-tight">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-accent/70" />
          <time dateTime={post.updatedDate}>
            {new Date(post.updatedDate).toLocaleDateString("en-KE", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-accent/70" />
          <span>6 min read</span>
        </div>
      </div>

      {/* 3. Title & Excerpt */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-black leading-tight text-brand-dark dark:text-text-main mb-3 group-hover:text-accent transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>
      </div>

      {/* 4. Footer: Author & CTA */}
      <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-accent font-bold text-xs">
            {post.author.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-brand-dark dark:text-text-main leading-none">
              {post.author.name}
            </span>
            <span className="text-[10px] text-text-muted mt-1">
              {post.author.role}
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-text-muted group-hover:bg-accent group-hover:text-white transition-all duration-300"
          aria-label={`Read more about ${post.title}`}
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
