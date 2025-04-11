import React from "react";

interface ArtworkListSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArtworkListSection({
  children,
  className = "",
}: ArtworkListSectionProps) {
  return (
    <section
      className={`bg-white rounded-t-[var(--radius-ps)] px-4 py-6 ${className}`}
    >
      {children}
    </section>
  );
}
