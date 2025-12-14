export default function GlowGrid() {
  return (
    <div className="absolute inset-0 opacity-[0.22]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(60% 50% at 50% 30%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60% 50% at 50% 30%, black 40%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 35% at 50% 30%, rgba(124,58,237,.22), transparent 70%), radial-gradient(40% 35% at 70% 60%, rgba(34,211,238,.18), transparent 70%)",
        }}
      />
    </div>
  );
}
