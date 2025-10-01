"use client";
import { useEffect, useState } from "react";

const btn =
  "h-14 rounded-xl bg-zinc-800 text-zinc-100 text-lg font-medium shadow-inner active:scale-95 transition";
const op =
  "bg-cyan-400 text-cyan-950 font-semibold";

export default function Calculator() {
  const [expr, setExpr] = useState<string>("");
  const [last, setLast] = useState<string>("0");
  const [history, setHistory] = useState<{ e: string; r: string }[]>([]);

  const update = (v: string) => {
    if (/[+\-*/]/.test(v)) {
      if (!expr && v !== "-") return; // cannot start with +*/ (allow -)
      if (/[+\-*/]$/.test(expr)) {
        setExpr(expr.slice(0, -1) + v); // replace last op
        return;
      }
    }
    setExpr(expr + v);
  };

  const back = () => setExpr((s) => s.slice(0, -1));
  const clear = () => { setExpr(""); setLast("0"); };

  const safeEval = (input: string): number => {
    const sanitized = input.replace(/×/g, "*").replace(/÷/g, "/").trim();
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) throw new Error("bad chars");
    if (/\*\*|\/\/|;|[A-Za-z]/.test(sanitized)) throw new Error("bad seq");
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${sanitized})`);
    const val = fn();
    if (typeof val === "number" && isFinite(val)) return val;
    throw new Error("NaN");
  };

  const calc = () => {
    if (!expr) return;
    try {
      const res = safeEval(expr);
      const r = String(res);
      setLast(r);
      setHistory((h) => [{ e: expr, r }, ...h].slice(0, 10));
      setExpr(r); // chaining
    } catch {
      setLast("Error");
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "Enter") { e.preventDefault(); calc(); return; }
      if (k === "Backspace") { e.preventDefault(); back(); return; }
      if (k === "Escape") { e.preventDefault(); clear(); return; }
      if (/^[0-9+\-*/().]$/.test(k)) { e.preventDefault(); update(k); }
      if (k === "=") { e.preventDefault(); calc(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr]);

  return (
    <div className="mx-auto max-w-sm p-4">
      <div className="rounded-2xl bg-zinc-900 p-4 shadow-2xl">
        <div className="mb-3 rounded-xl bg-zinc-950/50 p-3">
          <div className="text-right text-sm text-zinc-400 break-words">{expr || "0"}</div>
          <div className="text-right text-3xl font-semibold">{last}</div>
        </div>

        {/* Buttons grid */}
<div className="grid grid-cols-4 gap-3">
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => clear()}>AC</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("(")}>(</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update(")")}>)</button>
  <button className="h-14 rounded-xl bg-cyan-400 text-cyan-950 font-semibold" onClick={() => update("/")}>÷</button>

  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("7")}>7</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("8")}>8</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("9")}>9</button>
  <button className="h-14 rounded-xl bg-cyan-400 text-cyan-950 font-semibold" onClick={() => update("*")}>×</button>

  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("4")}>4</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("5")}>5</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("6")}>6</button>
  <button className="h-14 rounded-xl bg-cyan-400 text-cyan-950 font-semibold" onClick={() => update("-")}>−</button>

  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("1")}>1</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("2")}>2</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update("3")}>3</button>
  <button className="h-14 rounded-xl bg-cyan-400 text-cyan-950 font-semibold" onClick={() => update("+")}>+</button>

  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100 col-span-2" onClick={() => update("0")}>0</button>
  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100" onClick={() => update(".")}>.</button>
  <button className="h-14 rounded-xl bg-cyan-400 text-cyan-950 font-semibold" onClick={calc}>=</button>

  <button className="h-14 rounded-xl bg-zinc-800 text-zinc-100 col-span-2" onClick={() => back()}>⌫</button>
  <div className="col-span-2 text-right self-center text-sm text-zinc-400">Enter = equals</div>
</div>

        {/* History */}
        <div className="mt-4 max-h-28 overflow-auto border-t border-white/5 pt-2 text-sm text-zinc-400">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <span className="truncate">{h.e}</span>
              <span className="font-semibold text-zinc-200">{h.r}</span>
            </div>
          ))}
        </div>

        {/* Footer text */}
       <div className="mt-4 text-center text-xs text-zinc-500 border-t border-white/10 pt-3">
  Developed by <span className="font-medium text-zinc-300">Ali Hassan</span> | 
  <span className="inline"> Contact: </span>
  <a 
    href="mailto:alihassanaslam13@gmail.com" 
    className="underline text-cyan-400 inline"
  >
    alihassanaslam13@gmail.com
  </a>
</div>
      </div>
    </div>
  );
}
