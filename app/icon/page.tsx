"use client"

import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon"

export default function IconPage() {
  return (
    <main
      className="relative overflow-hidden bg-[#020202] w-[400px] h-[400px] shrink-0"
      style={{ width: 400, height: 400 }}
    >
      <HexagonBackground
        hexagonSize={100}
        hexagonMargin={2}
        gridWidth={400}
        gridHeight={400}
        className="absolute inset-0 bg-[#020202]"
        hexagonProps={{
          className:
            "before:!bg-[#020202] after:!bg-[#0a0a0a]",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src="/logocobra.svg"
          alt="Cobra Terminal"
          className="w-[400px] h-[400px] object-contain"
        />
      </div>
    </main>
  )
}
