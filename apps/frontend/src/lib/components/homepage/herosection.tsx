import { ArrowRight } from "lucide-react";
import { LinkButton } from "../ui/LinkButton";
export function HeroSection() {
  return (
    <section className="bg-brand-bg mb-4  md:p-12 lg:p-24">
      <div className="container-center md:text-center transition-all duration-300">
        <div className="badge-provider inline-block">
          Direct Access • 2026 Updated
        </div>
        <h1 className="text-h1 max-w-4xl mx-auto">
          <span className="text-accent">
            Everything <span className="text-text-main">.co.ke</span>
          </span>{" "}
          <br />
          is the Direct Way to Access{" "}
          <span className="text-accent">Kenyan Digital Services.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
          Apply for KRA, NTSA, and eCitizen services with guaranteed 24-hour
          processing. No queues, no delays—just results.
        </p>
      </div>

      <div className="p-4 pb-10">
        <div className="flex justify-center">
          <LinkButton
            href="/services"
            variant="main"
            icon={ArrowRight}
            iconPlacement="right"
          >
            See All Services
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
