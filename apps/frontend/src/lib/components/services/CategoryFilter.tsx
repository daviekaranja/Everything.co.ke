"use client";

import { motion } from "framer-motion";
import ServiceCard from "./popularcard";
import useServices from "@/lib/hooks/services/useservices";
import { ServiceRead } from "@/lib/types/api";

export default function ServiceGrid() {
  const { data, isLoading, error } = useServices("filtered", { limit: 50 });

  if (isLoading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading services: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 ">
      <div className="w-full">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05, // Visual rhythm: cards appear one after another
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data?.map((service: ServiceRead) => (
            <motion.div
              key={service.id || service.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
