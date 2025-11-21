import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTWMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": []
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return customTWMerge(clsx(inputs));
}
