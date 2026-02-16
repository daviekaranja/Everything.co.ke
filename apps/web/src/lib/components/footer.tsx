// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Send,
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";

// const footerLinks = {
//   services: [
//     { name: "KRA Services", href: "/services/kra" },
//     { name: "NTSA (TIMS/Transport)", href: "/services/ntsa" },
//     { name: "eCitizen Assistance", href: "/services/ecitizen" },
//     { name: "Business Registration", href: "/services/business" },
//     { name: "Land & Property", href: "/services/land" },
//   ],
//   company: [
//     { name: "About Us", href: "/about" },
//     // { name: "How it Works", href: "/how-it-works" },
//     // { name: "Service Pricing", href: "/pricing" },
//     // { name: "Agent Portal", href: "/agents" },
//     { name: "Contact Support", href: "/contact" },
//   ],
//   legal: [
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms of Service", href: "/terms" },
//     { name: "Refund Policy", href: "/refunds" },
//     { name: "Disclaimer", href: "/disclaimer" },
//   ],
// };

// export function Footer() {
//   return (
//     <footer className="bg-card-bg border-t border-card-border pt-16 pb-12">
//       <div className="container-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
//           {/* Brand + Newsletter */}
//           <div className="space-y-6">
//             <Link href="/" className="inline-flex items-center gap-2.5">
//               <Image
//                 src="/logo.svg"
//                 alt="EverythingKe"
//                 width={28}
//                 height={28}
//                 className="shrink-0"
//               />
//               <span className="text-lg font-black tracking-tight text-text-main">
//                 Everything<span className="text-accent">Ke</span>
//               </span>
//             </Link>

//             <p className="text-sm text-text-muted leading-relaxed max-w-xs">
//               Simplifying government services in Kenya so you can focus on what
//               matters.
//             </p>

//             {/* Newsletter - using your search-input style, adjusted scale */}
//             <form className="relative max-w-sm">
//               <input
//                 type="email"
//                 placeholder="Get updates by email..."
//                 className={`
//                   search-input
//                   !text-sm !py-3 !pl-4 !pr-12
//                 `}
//                 aria-label="Email for newsletter"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-accent-hover transition-colors"
//                 aria-label="Subscribe"
//               >
//                 <Send size={18} />
//               </button>
//             </form>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="font-semibold text-text-main mb-5 text-sm tracking-wide">
//               Services
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.services.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-sm text-text-muted hover:text-accent transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company / Support */}
//           <div>
//             <h4 className="font-semibold text-text-main mb-5 text-sm tracking-wide">
//               Company
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.company.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-sm text-text-muted hover:text-accent transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="space-y-6">
//             <h4 className="font-semibold text-text-main mb-5 text-sm tracking-wide">
//               Get in Touch
//             </h4>
//             <div className="space-y-5 text-sm">
//               <div className="flex items-center gap-3 group">
//                 <div className="p-2 rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors">
//                   <Phone size={16} />
//                 </div>
//                 <div>
//                   <p className="text-text-header text-xs font-medium uppercase tracking-wide">
//                     WhatsApp / Call
//                   </p>
//                   <p className="font-medium text-text-main">+254 783 202 527</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 group">
//                 <div className="p-2 rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors">
//                   <Mail size={16} />
//                 </div>
//                 <div>
//                   <p className="text-text-header text-xs font-medium uppercase tracking-wide">
//                     Email
//                   </p>
//                   <p className="font-medium text-text-main">
//                     support@everything.co.ke
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-accent-soft text-accent">
//                   <MapPin size={16} />
//                 </div>
//                 <div>
//                   <p className="text-text-header text-xs font-medium uppercase tracking-wide">
//                     Office
//                   </p>
//                   <p className="font-medium text-text-main">
//                     Westlands, Nairobi
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom section */}
//         <div className="pt-10 border-t border-card-border">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
//             {/* Social + Disclaimer */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//               <div className="flex gap-4">
//                 <Link
//                   href="https://www.facebook.com/everythingke"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-colors"
//                   aria-label="Facebook"
//                 >
//                   <Facebook size={18} />
//                 </Link>
//                 <Link
//                   href="#"
//                   className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-colors"
//                   aria-label="Twitter"
//                 >
//                   <Twitter size={18} />
//                 </Link>
//                 <Link
//                   href="#"
//                   className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-accent hover:text-white transition-colors"
//                   aria-label="Instagram"
//                 >
//                   <Instagram size={18} />
//                 </Link>
//               </div>

//               <p className="text-xs text-text-muted max-w-md">
//                 <strong className="text-text-main">Disclaimer:</strong>{" "}
//                 everything.co.ke is an independent service provider and is not
//                 affiliated with any government agency or the Government of
//                 Kenya.
//               </p>
//             </div>

//             {/* Legal links */}
//             <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-2 text-xs font-medium text-text-header">
//               {footerLinks.legal.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="hover:text-accent transition-colors"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mt-8 text-center">
//             <p className="text-xs text-text-header tracking-wide font-medium">
//               © {new Date().getFullYear()} everything.co.ke • Nairobi
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "KRA Services", href: "/services/kra" },
    { name: "NTSA Services", href: "/services/ntsa" },
    { name: "eCitizen", href: "/services/ecitizen" },
    { name: "Business Registration", href: "/services/business" },
    { name: "Land & Property", href: "/services/land" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refunds" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card-bg border-t border-card-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand + Newsletter */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="EverythingKe"
                width={32}
                height={32}
                className="shrink-0"
                priority
              />
              <span className="text-xl font-black tracking-tight text-text-main">
                Everything<span className="text-accent">Ke</span>
              </span>
            </Link>

            <p className="text-sm text-text-muted leading-relaxed">
              Fast-tracking Kenyan government services — so you can get on with
              life.
            </p>

            <form className="relative max-w-xs">
              <input
                type="email"
                placeholder="Stay updated — enter email"
                className="
                  w-full rounded-lg border border-card-border
                  bg-background px-4 py-3 text-sm
                  placeholder:text-text-muted/70
                  focus:border-accent focus:ring-1 focus:ring-accent/30
                  outline-none transition-all
                "
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-accent-hover transition-colors"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-text-main">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-text-main">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-text-main">
              Contact
            </h4>
            <div className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-header">
                    WhatsApp / Call
                  </p>
                  <p className="font-medium text-text-main">+254 783 202 527</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-header">
                    Email
                  </p>
                  <p className="font-medium text-text-main">
                    support@everything.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-header">
                    Office
                  </p>
                  <p className="font-medium text-text-main">
                    Westlands, Nairobi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-card-border py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Social + Disclaimer */}
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <div className="flex gap-4">
                <SocialIcon
                  href="https://www.facebook.com/everythingke"
                  icon={Facebook}
                  label="Facebook"
                />
                <SocialIcon href="#" icon={Twitter} label="Twitter" />
                <SocialIcon href="#" icon={Instagram} label="Instagram" />
              </div>

              <p className="max-w-md text-center text-xs text-text-muted sm:text-left">
                <strong className="text-text-main">Important:</strong>{" "}
                everything.co.ke is an independent service provider and is not
                affiliated with any government agency or the Government of
                Kenya.
              </p>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-header sm:justify-end">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-xs text-text-header">
            © {new Date().getFullYear()} everything.co.ke • Made in Nairobi
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 hover:bg-accent/10 text-text-muted hover:text-accent transition-colors duration-200"
      aria-label={label}
    >
      <Icon size={18} />
    </Link>
  );
}
