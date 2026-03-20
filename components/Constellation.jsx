'use client'

import { useEffect, useRef } from 'react'

const FNS = [
  { label: 'Messaging',         angle: 145 },
  { label: 'Positioning',       angle: 168 },
  { label: 'Launch GTM',        angle: 191 },
  { label: 'Competitive Intel', angle: 214 },
  { label: 'Sales Enablement',  angle: 235 },
]

const ICONS = [
  '<polyline points="4 7 12 3 20 7"/><polyline points="4 12 12 8 20 12"/><polyline points="4 17 12 13 20 17"/>',
  '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>',
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  '<path d="M18 20V10M12 20V4M6 20v-6"/>',
  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
]

const HARD_SKILLS = [
  'Positioning frameworks', 'GTM strategy', 'Sales enablement',
  'Narrative architecture', 'Competitive intel', 'ICP research',
  'A/B messaging tests', 'Launch playbooks', 'Pricing strategy',
]

const SOFT_SKILLS = [
  'Curiosity', 'Empathy', 'Clarity', 'Boldness', 'Rigor',
  'Collaboration', 'Intuition', 'Adaptability', 'Storytelling',
  'Creativity', 'Precision', 'Energy',
]

export default function Constellation() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const cnodeRef   = useRef(null)
  const bubRef     = useRef(null)
  const pilRef     = useRef(null)
  const rafRef     = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas  = canvasRef.current
    const cnode   = cnodeRef.current
    const bubWrap = bubRef.current
    const pilWrap = pilRef.current
    const ctx     = canvas.getContext('2d')

    let W, H, cx, cy, pills = [], lastTs = null

    function resize() {
      W = section.offsetWidth
      H = section.offsetHeight
      canvas.width  = W
      canvas.height = H
      cx = W * 0.44
      cy = H * 0.50
      cnode.style.left = cx + 'px'
      cnode.style.top  = cy + 'px'
      renderBubbles()
      drawLines()
      resetPills()
    }

    function renderBubbles() {
      bubWrap.innerHTML = ''
      const r = 195
      FNS.forEach((fn, i) => {
        const rad = fn.angle * Math.PI / 180
        const bx  = cx + r * Math.cos(rad)
        const by  = cy + r * Math.sin(rad)
        const bub = document.createElement('div')
        bub.className  = 'pmm-bubble'
        bub.style.left = bx + 'px'
        bub.style.top  = by + 'px'
        bub.innerHTML  = `<svg class="bubble-svg" viewBox="0 0 24 24">${ICONS[i]}</svg>`
        bubWrap.appendChild(bub)
        const lr  = r + 60
        const lx  = cx + lr * Math.cos(rad)
        const ly  = cy + lr * Math.sin(rad)
        const lbl = document.createElement('div')
        lbl.className       = 'bubble-label'
        lbl.style.left      = lx + 'px'
        lbl.style.top       = ly + 'px'
        lbl.style.transform = 'translate(-50%, -50%)'
        lbl.textContent     = fn.label
        bubWrap.appendChild(lbl)
      })
    }

    function drawLines() {
      ctx.clearRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(107,30,46,0.1)'
      ctx.lineWidth   = 0.8
      const r = 195
      FNS.forEach(fn => {
        const rad = fn.angle * Math.PI / 180
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + r * Math.cos(rad), cy + r * Math.sin(rad))
        ctx.stroke()
      })
    }

    function resetPills() {
      pilWrap.innerHTML = ''
      pills = []
      const all = [
        ...HARD_SKILLS.map(s => ({ text: s, cls: 'pill-maroon' })),
        ...SOFT_SKILLS.map(s => ({ text: s, cls: 'pill-warm'   })),
      ]
      const spawnLeft = cx + 160
      all.forEach((sk, i) => {
        const el = document.createElement('div')
        el.className     = `skill-pill ${sk.cls}`
        el.textContent   = sk.text
        el.style.opacity = '0'
        const sx = spawnLeft + Math.random() * (W - spawnLeft - 40)
        const sy = 60 + Math.random() * (H - 120)
        el.style.left = sx + 'px'
        el.style.top  = sy + 'px'
        pilWrap.appendChild(el)
        pills.push({
          el, sx, sy,
          delay: i * 185 + Math.random() * 350,
          dur: 3200 + Math.random() * 2000,
          t: -(i * 185 + Math.random() * 350),
          w: 0, h: 0,
        })
      })
      requestAnimationFrame(() => {
        pills.forEach(p => {
          const r = p.el.getBoundingClientRect()
          p.w = r.width
          p.h = r.height
        })
      })
    }

    function animate(ts = 0) {
      const dt = lastTs ? Math.min(ts - lastTs, 50) : 16
      lastTs = ts
      pills.forEach(p => {
        p.t += dt
        if (p.t < 0) return
        const prog = Math.min(p.t / p.dur, 1)
        if (prog < 1) {
          const ease = 1 - Math.pow(1 - prog, 3)
          p.el.style.left = (p.sx + (cx - p.w / 2 - p.sx) * ease) + 'px'
          p.el.style.top  = (p.sy + (cy - p.h / 2 - p.sy) * ease) + 'px'
          const fi = Math.min(prog * 6, 1)
          const fo = prog > 0.70 ? 1 - (prog - 0.70) / 0.30 : 1
          p.el.style.opacity = fi * fo
        } else {
          p.el.style.opacity = '0'
          p.t  = -(900 + Math.random() * 2600)
          const spawnLeft = cx + 160
          p.sx = spawnLeft + Math.random() * (W - spawnLeft - 40)
          p.sy = 60 + Math.random() * (H - 120)
          p.el.style.left = p.sx + 'px'
          p.el.style.top  = p.sy + 'px'
        }
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current)
      lastTs = null
      resize()
      animate()
    })
    ro.observe(section)
    resize()
    animate()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="constellation-section" id="about" ref={sectionRef}>
      <div className="c-label">who i am · what i do</div>
      <canvas id="ccanvas" ref={canvasRef} />
      <div className="center-headshot" ref={cnodeRef}>
        <div className="hs-inner">
          <div className="hs-circle" />
          <div className="hs-line" />
          <div className="hs-line2" />
          <div className="hs-hint">your<br />headshot</div>
        </div>
      </div>
      <div ref={bubRef} />
      <div ref={pilRef} />
    </section>
  )
}
