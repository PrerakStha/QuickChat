const gridStyle = (color) => ({
  backgroundImage: [
    `linear-gradient(${color} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  ].join(","),
  backgroundSize: "24px 24px",
});

// A slightly tighter radial mask to let more grid be seen at the edges
const darkGridMask =
  "radial-gradient(ellipse 70% 60% at 50% 48%, #000 10%, #000 50%, transparent 85%)";

export function AuthHeroPattern() {
  return (
    <>
      {/* 1. Changed Blue glow to Yellow [rgba(255,193,7,0.2)] */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(255,193,7,0.2),transparent_62%)] dark:block"
      />
      
      {/* 2. Reduced opacity of horizontal dark shadow from 70% to 30% */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-black via-transparent to-black opacity-30 dark:block"
      />
      
      {/* 3. Reduced vertical dark shadow (lighter shades from/to) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-b from-black/20 via-transparent to-black/60 dark:block"
      />
      
      {/* LIGHT MODE GRID (UNCHANGED) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 dark:hidden"
        style={gridStyle("rgba(0,0,0,0.11)")}
      />
      
      {/* DARK MODE GRID (SLIGHTLY BRIGHTER GRID LINES & WIDER MASK) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          // Boosted grid opacity slightly to make it pop against the reduced shadow
          ...gridStyle("rgba(255,255,255,0.09)"),
          WebkitMaskImage: darkGridMask,
          maskImage: darkGridMask,
        }}
      />
    </>
  );
}