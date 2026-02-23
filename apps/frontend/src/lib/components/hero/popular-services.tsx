"use client";

import { PopularCard } from "../ui-elements";
import { LinkButton } from "../ui/LinkButton";
import { ArrowRight } from "lucide-react";
import useServices from "@/lib/hooks/services/useservices";
import { SuggestionsResponse } from "@/lib/types/api";

export default function PopularServices() {
  const { data } = useServices("trending", { limit: 3 });

  return (
    <div className="w-full flex flex-col gap-8 py-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {data?.map((service: SuggestionsResponse, index: number) => (
          <div key={index} className="w-full md:w-auto">
            <PopularCard
              n={service.n}
              s={service.s}
              c={service.c}
              p={service.p}
              d={service.d}
            />
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
