import type { ReactNode } from "react";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-[3mm]">
      <svg viewBox="0 0 42 42" className="h-[9mm] w-[9mm]" aria-hidden="true">
        <path d="M4 32L15 8l8 17 6-12 9 19H4Z" fill={light ? "#fff" : "#175cd3"} />
        <circle cx="32" cy="10" r="4" fill="#06aed4" />
      </svg>
      <div
        className={`text-[9pt] font-bold tracking-[.13em] uppercase ${light ? "text-white" : "text-navy"}`}
      >
        Northstar
        <br />
        Systems
      </div>
    </div>
  );
}

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`rr-heading mb-[3mm] text-[8pt] font-bold tracking-[.14em] text-slatecopy uppercase ${className}`}
    >
      {children}
    </h2>
  );
}

export const statusClass: Record<string, string> = {
  "on-track": "bg-emerald-100 text-emerald-800",
  watch: "bg-amber-100 text-amber-800",
  complete: "bg-blue-100 text-blue-800",
};

export function RevenueChart({
  values,
}: {
  values: Array<{ label: string; revenue: number; plan: number }>;
}) {
  const max = Math.max(...values.map((item) => item.revenue));
  return (
    <figure className="rounded-[3mm] border border-line bg-white p-[5mm]">
      <div className="flex h-[55mm] items-end gap-[5mm] border-b border-line px-[3mm]">
        {values.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col justify-end self-stretch">
            <div className="mb-[1mm] text-center text-[7pt] font-semibold text-navy">
              €{item.revenue.toFixed(1)}m
            </div>
            <div
              className="relative mx-auto w-[65%] rounded-t-[1.5mm] bg-blue"
              style={{ height: `${(item.revenue / max) * 82}%` }}
            >
              <span
                className="absolute inset-x-[-18%] border-t-2 border-dashed border-cyan"
                style={{ bottom: `${(item.plan / item.revenue) * 78}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-[2mm] grid grid-cols-6 gap-[5mm] px-[3mm] text-center text-[6.5pt] font-medium text-slatecopy">
        {values.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}

export function TrendBadge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-[2mm] py-[.7mm] text-[6.5pt] font-bold ${value === "up" ? "bg-rose-100 text-rose-700" : value === "down" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
    >
      {value === "up" ? "↑ Rising" : value === "down" ? "↓ Improving" : "→ Stable"}
    </span>
  );
}

export function MiniSpark({ values, color = "#175cd3" }: { values: number[]; color?: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map(
      (value, index) =>
        `${(index * 100) / (values.length - 1)},${28 - ((value - min) / Math.max(1, max - min)) * 24}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 32"
      className="h-[11mm] w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 29H100" stroke="#d7deea" strokeWidth="1" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
