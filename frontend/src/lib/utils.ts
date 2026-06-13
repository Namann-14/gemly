import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCdnUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL || "https://humarapandit.com/cdn/shop/files";
  return `${cdnBase}/${path}`;
}

