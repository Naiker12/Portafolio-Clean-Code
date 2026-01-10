"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Point {
    x: number
    y: number
    vx: number
    vy: number
    opacity: number
    icon?: HTMLImageElement
}

import nextjsIcon from "@/app/assets/icon-dark/nextjs_icon_dark.svg";
import postgresqlIcon from "@/app/assets/icon-dark/postgresql.svg";
import mysqlIcon from "@/app/assets/icon-dark/mysql-icon-dark.svg";
import mongodbIcon from "@/app/assets/icon-dark/mongodb-icon-dark.svg";
import redisIcon from "@/app/assets/icon-dark/redis.svg";
import fastapiIcon from "@/app/assets/icon-dark/fastapi.svg";
import tailwindIcon from "@/app/assets/icon-dark/tailwindcss.svg";
import githubIcon from "@/app/assets/icon-dark/github_dark.svg";

const ICONS = [
    nextjsIcon.src,
    postgresqlIcon.src,
    mysqlIcon.src,
    mongodbIcon.src,
    redisIcon.src,
    fastapiIcon.src,
    tailwindIcon.src,
    githubIcon.src,
];

export function TechNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const iconsRef = useRef<HTMLImageElement[]>([])

    useEffect(() => {
        setMounted(true)
        // Preload icons
        ICONS.forEach((src) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                iconsRef.current.push(img)
            }
        })
    }, [])

    useEffect(() => {
        if (!mounted) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let points: Point[] = []
        const pointCount = 40
        const connectionDistance = 150
        const mouse = { x: -1000, y: -1000 }

        const isDark = resolvedTheme === "dark" || theme === "dark"

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initPoints()
        }

        const initPoints = () => {
            points = []
            for (let i = 0; i < pointCount; i++) {
                const hasIcon = Math.random() < 0.3 && iconsRef.current.length > 0
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    icon: hasIcon ? iconsRef.current[Math.floor(Math.random() * iconsRef.current.length)] : undefined
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const dotColor = isDark ? "255, 255, 255" : "0, 0, 0"
            const lineColor = isDark ? "59, 130, 246" : "37, 99, 235"

            points.forEach((p, i) => {
                // Update position
                p.x += p.vx
                p.y += p.vy

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1

                // Draw point or icon
                if (p.icon) {
                    ctx.globalAlpha = p.opacity * (isDark ? 0.8 : 0.4)
                    if (isDark) {
                        ctx.shadowBlur = 15
                        ctx.shadowColor = `rgba(${lineColor}, 0.5)`
                    }
                    ctx.drawImage(p.icon, p.x - 20, p.y - 20, 40, 40)
                    ctx.shadowBlur = 0
                    ctx.globalAlpha = 1
                } else {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${dotColor}, ${p.opacity * 0.4})`
                    ctx.fill()
                }

                // Draw connections
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        const alpha = (1 - dist / connectionDistance) * 0.15
                        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }

                // Mouse interaction
                const mdx = p.x - mouse.x
                const mdy = p.y - mouse.y
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
                if (mdist < 200) {
                    const force = (200 - mdist) / 2000
                    p.vx += mdx * force * 0.2
                    p.vy += mdy * force * 0.2
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", onMouseMove)
        resize()
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", onMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [mounted, theme, resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1] opacity-60 dark:opacity-40"
        />
    )
}
