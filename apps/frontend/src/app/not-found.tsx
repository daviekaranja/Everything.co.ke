import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Large Brand 404 Header */}
        <div className="relative inline-block">
          <h1 className="text-[120px] md:text-[180px] font-black tracking-tighter leading-none text-brand-dark dark:text-white opacity-10">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl md:text-4xl font-black tracking-tight text-brand-dark dark:text-white">
              Page <span className="text-accent">Not Found</span>
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-text-muted text-lg md:text-xl font-medium max-w-md mx-auto">
            Oops! It seems the page you&apos;re looking for has moved or
            doesn&apos;t exist in our directory.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-dark dark:bg-white text-white dark:text-brand-dark px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl"
          >
            <MoveLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-4 rounded-2xl font-black hover:bg-accent hover:text-white transition-all"
          >
            <Headset className="w-5 h-5" />
            Contact Support
          </a> */}
        </div>

        {/* Decorative Element */}
        <div className="pt-12">
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-accent opacity-20 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
