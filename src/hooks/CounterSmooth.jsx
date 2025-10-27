import React, { useMemo } from "react";
import { useTweenOnView } from "./useTweenOnView";

// escolha automática de unidade em pt-BR
function pickUnit(end) {
  if (end >= 1_000_000_000) return { scale: 1_000_000_000, suffix: " bi" }; // bilhão(ões)
  if (end >= 1_000_000)     return { scale: 1_000_000,     suffix: " mi" }; // milhão(ões)
  if (end >= 1_000)         return { scale: 1_000,         suffix: " mil" }; // milhar(es)
  return { scale: 1, suffix: "" };
}

export default function CounterSmooth({
  end,
  start = 0,
  duration = 2000,
  className = "",
  prefix = "",
  forceUnit,   // "mil" | "mi" | "bi" | ""
  decimals,    // casas decimais fixas (opcional)
  stripZeros = true, // remove “,0” automático
}) {
  const unit = useMemo(() => {
    if (!forceUnit) return pickUnit(end);
    const map = {
      bi:  { scale: 1_000_000_000, suffix: " bi" },
      mi:  { scale: 1_000_000,     suffix: " mi" },
      mil: { scale: 1_000,         suffix: " mil" },
      "":  { scale: 1,             suffix: "" },
    };
    return map[forceUnit] || pickUnit(end);
  }, [end, forceUnit]);

  const from = start / unit.scale;
  const to = end / unit.scale;
  const { ref, t } = useTweenOnView({ duration, once: true });

  const { text, suffix } = useMemo(() => {
    const v = from + (to - from) * t;

    // decimais: auto (1 para k/mi/bi, 0 para unidade) ou forçado
    const autoDecimals = unit.scale > 1 ? 1 : 0;
    let dec = decimals != null ? decimals : autoDecimals;

    if (stripZeros && dec > 0) {
      const rounded = Math.round(v * Math.pow(10, dec)) / Math.pow(10, dec);
      if (Number.isInteger(rounded)) dec = 0;
    }

    const formatted = v.toLocaleString("pt-BR", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

    return { text: formatted, suffix: unit.suffix };
  }, [from, to, t, unit.scale, unit.suffix, decimals, stripZeros]);

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
      {text}
      {suffix}
    </span>
  );
}
