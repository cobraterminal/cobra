"use client"

import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon"

export default function BannerPage() {
  return (
    <main
      className="relative overflow-hidden bg-[#020202] min-w-[1500px] min-h-[500px] w-[1500px] h-[500px]"
      style={{ width: 1500, height: 500 }}
    >
      <HexagonBackground
        hexagonSize={100}
        hexagonMargin={2}
        gridWidth={1500}
        gridHeight={500}
        className="absolute inset-0 bg-[#020202]"
        hexagonProps={{
          className:
            "before:!bg-[#020202] after:!bg-[#0a0a0a]",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-6xl font-bold tracking-tight text-center font-sans">
          <span className="text-[#f0f0f0]">Deploy. Trade. </span>
          <span className="text-[#00ff88]">Boost.</span>
        </h1>
      </div>
    </main>
  )
}
