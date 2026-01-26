"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 8, 2026";

  return (
    <div className="bg-brand-bg min-h-screen transition-colors duration-300">
      {/* ================= MINIMAL HEADER ================= */}
      <header className="bg-card-bg border-b border-card-border py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent font-black uppercase tracking-widest text-[10px] bg-accent/10 px-3 py-1 rounded-full">
            Legal Transparency
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-text-main mt-4 mb-4 tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-text-muted font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-text-main leading-relaxed mb-12">
            At <strong>Everything.co.ke</strong>, we take your data security
            seriously. Because we assist with sensitive government applications,
            we have implemented strict protocols to ensure your personal
            identifiable information (PII) is protected under the laws of Kenya.
          </p>

          <PolicySection title="1. Information We Collect">
            <p className="mb-4">
              To provide our services (KRA, NTSA, eCitizen), we may collect:
            </p>
            <ul className="grid gap-2 text-text-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Full name and contact details (Phone/Email)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Government IDs and KRA PIN numbers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Vehicle logbooks and business registration documents
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. How We Use Your Data">
            <p>
              Your data is used <strong>only</strong> for the specific task you
              request. We do not build databases for marketing or sell your
              phone number to third-party advertisers. Once a KRA return is
              filed or a DL is renewed, your sensitive document files are
              flagged for deletion.
            </p>
          </PolicySection>

          <PolicySection title="3. Data Retention & Deletion">
            <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl italic text-text-main">
              &quot;We maintain a strict &apos;Clear Chat&apos; policy. Once your service is
              confirmed and delivered, we encourage clients to use WhatsApp&apos;s
              &apos;Delete for Everyone&apos; feature for any uploaded ID copies or
              sensitive documents.&quot;
            </div>
          </PolicySection>

          <PolicySection title="4. Third-Party Portals">
            <p>
              Our services involve interacting with official government portals
              (KRA iTax, eCitizen, NTSA TIMS). While we process your data on
              these platforms, their respective privacy policies also apply to
              how the government stores your data.
            </p>
          </PolicySection>

          <PolicySection title="5. Your Consent">
            <p>
              By sharing your details with Everything.co.ke via WhatsApp, Email,
              or In-Person, you authorize us to use that information to perform
              the requested digital service on your behalf.
            </p>
          </PolicySection>

          <div className="mt-20 p-10 bg-brand-dark rounded-[2.5rem] text-white text-center">
            <h3 className="text-2xl font-black mb-4">Questions?</h3>
            <p className="text-text-header mb-8">
              If you want to request a permanent deletion of your records from
              our system:
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform"
            >
              Contact Data Officer
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -----------------------------------------------------
    HELPER COMPONENT
----------------------------------------------------- */

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-black text-text-main mb-6 tracking-tight flex items-center gap-3">
        <span className="w-8 h-1 bg-accent/20 rounded-full" />
        {title}
      </h2>
      <div className="text-text-muted leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}