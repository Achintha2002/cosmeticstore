"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  defaultValue: string;
  options: SortOption[];
}

export default function SortSelect({ defaultValue, options }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-select" className="text-xs font-semibold tracking-wider uppercase text-[#4A4A4C]">
        Sort
      </label>
      <select
        id="sort-select"
        name="sort"
        value={defaultValue}
        onChange={handleChange}
        className="text-sm bg-white border border-[#E0DAD4] rounded-xl px-3 py-2 text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#B76E79] cursor-pointer"
        aria-label="Sort by"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
