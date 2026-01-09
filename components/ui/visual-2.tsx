"use client"

import * as React from "react"
import { useEffect, useState } from "react"

interface Visual2Props {
  mainColor?: string
  secondaryColor?: string
  gridColor?: string
  tech?: string[]
}

export function Visual2({
  mainColor = "#8b5cf6",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
  tech = ["ReactJS", "MongoDB", "Prisma", "NextJs", "Auth.js", "Stripe"],
}: Visual2Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />
      <div className="relative h-[200px] w-full max-w-[356px] overflow-hidden rounded-t-lg mx-auto">
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
          tech={tech}
        />
        <EllipseGradient color={mainColor} />
      </div>
    </>
  )
}

interface LayerProps {
  color: string
  secondaryColor?: string
  hovered?: boolean
  tech?: string[]
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered, tech = [] }) => {
  const positions = [
    { translateX: "80", translateY: "40" },
    { translateX: "80", translateY: "-40" },
    { translateX: "110", translateY: "0" },
    { translateX: "-110", translateY: "0" },
    { translateX: "-80", translateY: "40" },
    { translateX: "-80", translateY: "-40" },
  ]

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[10] flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
      {tech.map((text, index) => (
        <div
          key={index}
          className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md transition-all duration-700 whitespace-nowrap"
          style={{
            transform: hovered
              ? `translate(${positions[index % positions.length].translateX}px, ${positions[index % positions.length].translateY}px)`
              : "translate(0px, 0px)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            style={{ backgroundColor: index % 2 === 0 ? color : secondaryColor }}
          />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {text}
          </span>
        </div>
      ))}
    </div>
  )
}

