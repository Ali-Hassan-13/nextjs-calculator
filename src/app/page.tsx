import Calculator from "./components/Calculator";

export default function Page() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-[#0b1420] to-[#070f1f] text-zinc-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Next.js Calculator</h1>
      <Calculator />
    </main>
  );
}
