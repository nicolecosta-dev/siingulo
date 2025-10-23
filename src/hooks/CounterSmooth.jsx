import React, { useMemo } from "react";
import { useTweenOnView } from "../hooks/useTweenOnView";

function pickUnit(end) {
  if (end >= 1_000_000_000) return { scale: 1_000_000_000, suffix: " bi" };
  if (end >= 1_000_000) return { scale: 1_000_000, suffix: " k" };
  if (end >= 1_000) return { scale: 1_000, suffix: " mi" };
  return { scale: 1, suffix: "" };
}

export default function CounterSmooth({
  end,
  start = 0,
  duration = 2000,
  className = "",
  prefix = "",
  forceUnit, // opcional: "mil" | "mi" | "bi" | ""
  decimals, // opcional: nº de casas fixas
  stripZeros = true, // <- NOVO: remove “,0” automaticamente
}) {
  const unit = useMemo(() => {
    if (!forceUnit) return pickUnit(end);
    if (!forceUnit) return pickUnit(end);

    const map = {
      bi: { scale: 1_000_000_000, suffix: "bi" }, // bilhão
      mi: { scale: 1_000_000, suffix: "K" }, // milhão → K
      mil: { scale: 1_000, suffix: "mi" }, // milhar → mil
      "": { scale: 1, suffix: "" },
    };

    return map[forceUnit] || pickUnit(end);
  }, [end, forceUnit]);

  const from = start / unit.scale;
  const to = end / unit.scale;

  const { ref, t } = useTweenOnView({ duration, once: true });

  const { text, suffix } = useMemo(() => {
    const v = from + (to - from) * t;

    // casas decimais: se não veio "decimals", usa 1 p/ unidades > 1 e 0 p/ inteiro
    const autoDecimals = unit.scale > 1 ? 1 : 0;
    let dec = decimals != null ? decimals : autoDecimals;

    // se stripZeros e o valor arredondado não tem parte fracionária, zera decimais
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
