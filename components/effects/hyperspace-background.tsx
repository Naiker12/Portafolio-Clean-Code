"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HyperspaceBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  starTrailOpacity?: number
  starSpeed?: number
  starColor?: string
  starSize?: number
  backgroundColor?: string
  className?: string
}

interface StarState {
  alpha: number
  angle: number
  x: number
  vX: number
  y: number
  vY: number
  size: number
  active: boolean
}

function hexToRgb(hex: string): [number, number, number] {
  const cleanedHex = hex.replace("#", "")
  const bigint = parseInt(cleanedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

function randomInRange(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function HyperspaceBackground({
  starTrailOpacity = 0.5,
  starSpeed = 1.01,
  starColor = "#FFFFFF",
  starSize = 0.5,
  backgroundColor = "0, 0, 0",
  className,
  ...props
}: HyperspaceBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [r, g, b] = hexToRgb(starColor)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    resizeCanvas()

    const sizeIncrement = 1.01
    const radians = Math.PI / 180

    const createStar = (): StarState => {
        const angle = randomInRange(0, 360) * radians
        const vX = Math.cos(angle)
        const vY = Math.sin(angle)
        const travelled = Math.random() > 0.5
          ? Math.random() * Math.max(canvas.width, canvas.height) + Math.random() * (canvas.width * 0.24)
          : Math.random() * (canvas.width * 0.25)

        return {
          alpha: Math.random(),
          angle: randomInRange(0, 360) * radians,
          x: Math.floor(vX * travelled) + canvas.width / 2,
          vX,
          y: Math.floor(vY * travelled) + canvas.height / 2,
          vY,
          size: starSize,
          active: true,
        }
    }

    const stars = Array.from({ length: 300 }, createStar)
    let animationFrameId: number

    const render = () => {
      const invertedOpacity = 1 - starTrailOpacity
      context.fillStyle = `rgba(${backgroundColor}, ${invertedOpacity})`
      context.fillRect(0, 0, canvas.width, canvas.height)

      for (let index = 0; index < stars.length; index++) {
        const star = stars[index]
        const { x, y, size, vX, vY } = star
        const newX = x + vX
        const newY = y + vY

        if (newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {
          stars[index] = createStar()
        } else {
          stars[index] = {
            ...star,
            x: newX,
            vX: star.vX * starSpeed,
            y: newY,
            vY: star.vY * starSpeed,
            size: size * sizeIncrement,
          }

          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${star.alpha})`
          context.lineWidth = size
          context.beginPath()
          context.moveTo(x, y)
          context.lineTo(newX, newY)
          context.stroke()
        }
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    window.addEventListener("resize", debouncedResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", debouncedResize)
    }
  }, [starTrailOpacity, starSpeed, starColor, starSize, backgroundColor, r, g, b])

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
