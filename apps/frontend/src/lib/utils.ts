import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** * Utility to merge tailwind classes safely
 * Usually placed in a separate /lib/utils.ts, but included here per
 * "Context Strictness" protocol.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
