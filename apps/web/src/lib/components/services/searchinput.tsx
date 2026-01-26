"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function onChange(value: string) {
    const newParams = new URLSearchParams(params);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    router.push(`/services?${newParams.toString()}`);
  }

  return (
    <input
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search services e.g. KRA PIN, Passport, NTSA..."
      className="input w-full md:max-w-md"
      aria-label="Search services"
    />
  );
}
