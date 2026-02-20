"use client";

import { PopularCard } from "../ui-elements";
import { getPopularServices } from "@/lib/actions/services";
import { useState, useEffect } from "react";
import { LinkButton } from "../ui/LinkButton";
import { ArrowRight } from "lucide-react";

export default function PopularServices() {
  const [service, setService] = useState([]);

  const fetchData = async () => {
    const data = await getPopularServices();
    setService(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 py-4">
      {/* flex-col: Stacks vertically on mobile
          md:flex-row: Side-by-side on desktop
          flex-wrap: Wraps to new lines if there are many services (no more crashing/overflow)
      */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {service.map((data, i) => (
          <div key={i} className="w-full md:w-auto">
            <PopularCard service={data} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <LinkButton
          href="/services"
          variant="secondary"
          icon={ArrowRight}
          iconPlacement="right"
        >
          See All Services
        </LinkButton>
      </div>
    </div>
  );
}
