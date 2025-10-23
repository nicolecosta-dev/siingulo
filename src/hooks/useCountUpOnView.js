import React, { useMemo } from "react";
import { useTweenOnView } from "../hooks/useTweenOnView";

function pickUnit(end) {
  if (end >= 1_000_000_000) return { scale: 1_000_000_000, suffix: " bi" };
  if (end >= 1_000_000) return { scale: 1_000_000, suffix: " mi" };
  if (end >= 1_000) return { scale: 1_000, suffix: " mil" };
  return { scale: 1, suffix: "" };
}

export default function CounterSmooth({
  end,
  start = 0,
  duration = 2000,
  className = "",
  prefix = "",
  forceUnit,
  decimals, // ← NOVA prop opcional
}) {
  const unit = useMemo(() => {
    if (!forceUnit) return pickUnit(end);
    const map = {
      bi: { scale: 1_000_000_000, suffix: " bi" },
      mi: { scale: 1_000_000, suffix: " mi" },
      mil: { scale: 1_000, suffix: " mil" },
      "": { scale: 1, suffix: "" },
    };
    return map[forceUnit] || pickUnit(end);
  }, [end, forceUnit]);

  const from = start / unit.scale;
  const to = end / unit.scale;

  const { ref, t } = useTweenOnView({ duration, once: true });

  const value = useMemo(() => {
    const v = from + (to - from) * t;
    // se decimals foi passado, usa ele; senão usa 0 quando inteiro, 1 quando tem unidade
    const dec = decimals !== undefined ? decimals : unit.scale > 1 ? 1 : 0;
    return v.toLocaleString("pt-BR", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });
  }, [from, to, t, unit.scale, decimals]);

  return (
    <span
      ref={ref}
      className={`count ${className}`}
      style={{
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: "'tnum' 1",
      }}
    >
      {prefix}
      {value}
      {unit.suffix}
    </span>
  );
}
