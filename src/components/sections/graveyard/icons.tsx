import React from "react";

// Custom Tombstone icon
export function TombstoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 22h10" />
      <path d="M10 22v-6.3a.7.7 0 0 1 .7-.7h2.6a.7.7 0 0 1 .7.7V22" />
      <path d="M17 4v18H7V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Z" />
      <path d="M11 10h2" />
      <path d="M12 6v4" />
    </svg>
  );
}

// Custom Ghost icon
export function GhostIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M12 20h.01" />
      <path d="M14 16h.01" />
      <path d="M10 16h.01" />
      <path d="M18 8c0-4.4-3.6-8-8-8S2 3.6 2 8v12l3-3 2 2 3-3 2 2 3-3 3 3V8Z" />
    </svg>
  );
}