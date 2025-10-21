import React from "react";
import { useCountUpOnView } from "../hooks/useCountUpOnView";

function formatAbbrev(n) {
  if (n >= 1_000_000_000)
    return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "");
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + " K";
  return n.toString();
}

export default function CounterOnView({
  end,
  start = 0,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const { ref, value } = useCountUpOnView({ end, start, duration, once: true });
  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix}
      {formatAbbrev(value)}
      {suffix}
    </span>
  );
}
