import { useEffect, useRef, useState } from 'react'

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const IconLeaf = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)
const IconCup = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
)
const IconHeart = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)
const IconMapPin = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const IconClock = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconMail = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const IconInstagram = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const IconArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
)
const IconStar = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

/* ─── hook: progress within hero sticky zone ────────────────────────────── */
function useHeroProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      // hero container is 200vh; sticky area is 100vh
      // so scrollable distance = 100vh
      const zone = ref.current.offsetHeight - window.innerHeight
      setP(Math.min(1, Math.max(0, window.scrollY / zone)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return p
}

/* ─── animated wave surface ─────────────────────────────────────────────── */
function WaveSurface({ color }: { color: string }) {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf: number
    const loop = () => { setT(x => x + 0.022); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const W = 1440
  const pts = Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * W
    const y = 28 + Math.sin((x / W) * Math.PI * 5 + t) * 14 + Math.sin((x / W) * Math.PI * 9 - t * 1.2) * 8
    return `${x},${y}`
  })
  return (
    <svg viewBox={`0 0 ${W} 80`} preserveAspectRatio="none"
      style={{ width: '100%', height: 50, display: 'block', marginBottom: -2 }}>
      <path d={`M0,28 L${pts.join(' L')} L${W},80 L0,80 Z`} fill={color} />
    </svg>
  )
}

/* ─── bubble tea cup SVG ─────────────────────────────────────────────────── */
function BubbleCup({ fill }: { fill: number }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let raf: number
    const loop = () => { setPhase(p => p + 0.025); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const liquidTop = 260 - fill * 180
  const w1 = Math.sin(phase) * 7, w2 = Math.sin(phase + 2) * 5
  const pearls = [[68,240],[88,250],[108,244],[132,252],[78,232],[118,258],[148,246],[60,256],[100,262]]

  return (
    <svg viewBox="0 0 200 290" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 16px 36px rgba(61,32,16,0.28))' }}>
      <defs>
        <clipPath id="cc2"><path d="M42,22 L36,266 Q36,274 46,274 L154,274 Q164,274 164,266 L158,22 Z" /></clipPath>
        <linearGradient id="liq2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a96d" />
          <stop offset="100%" stopColor="#9e6428" />
        </linearGradient>
        <linearGradient id="cup2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8d5b8" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#f7f0e5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ddc9a6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M42,22 L36,266 Q36,274 46,274 L154,274 Q164,274 164,266 L158,22 Z" fill="url(#cup2)" stroke="#c9a87c" strokeWidth="1.5" />
      {fill > 0 && (
        <g clipPath="url(#cc2)">
          <path d={`M36,${liquidTop+w1} Q68,${liquidTop+w2} 100,${liquidTop+w1} Q132,${liquidTop-w2} 164,${liquidTop+w1} L164,280 L36,280 Z`} fill="url(#liq2)" />
          {pearls.map(([cx,cy],i) => cy > liquidTop + 8 && (
            <circle key={i} cx={cx} cy={cy} r={7} fill="#1a0f05" />
          ))}
        </g>
      )}
      <path d="M42,22 L36,266 Q36,274 46,274 L154,274 Q164,274 164,266 L158,22 Z" fill="none" stroke="#c9a87c" strokeWidth="1.5" />
      <path d="M52,24 L47,248" stroke="white" strokeWidth="2.5" strokeOpacity="0.25" strokeLinecap="round" />
      {/* green leaf on cup */}
      <ellipse cx="145" cy="80" rx="10" ry="6" fill="#4a7c3a" opacity="0.7" transform="rotate(-30 145 80)" />
      <line x1="145" y1="80" x2="148" y2="72" stroke="#4a7c3a" strokeWidth="1.2" strokeOpacity="0.8" />
      {/* lid */}
      <rect x="30" y="14" width="140" height="13" rx="6.5" fill="#c9a87c" />
      <rect x="36" y="11" width="128" height="8" rx="4" fill="#e0be92" />
      {/* straw */}
      <rect x="92" y="-6" width="16" height="108" rx="8" fill="#3d2010" opacity="0.9" />
      <rect x="94" y="-6" width="5" height="108" rx="2.5" fill="#5a3018" opacity="0.35" />
    </svg>
  )
}

/* ─── pour stream ───────────────────────────────────────────────────────── */
function PourStream({ progress }: { progress: number }) {
  if (progress < 0.06) return null
  const length = Math.min(1, (progress - 0.06) / 0.55)
  const sway = Math.sin(progress * 16) * 12
  return (
    <div style={{
      position: 'absolute', top: '100%', left: '50%',
      transform: `translateX(calc(-50% + ${sway * 0.5}px))`,
      width: 70, pointerEvents: 'none', zIndex: 20,
      height: `${length * 420}px`, overflow: 'visible',
    }}>
      <svg viewBox="0 0 70 420" preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a56a" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#a07030" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a07030" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M35,0 Q${35+sway},100 ${35-sway*0.4},210 Q${35+sway*0.2},330 35,420`}
          stroke="url(#sg2)" strokeWidth={Math.max(3, 13 - length * 8)}
          fill="none" strokeLinecap="round" />
        {([0.25, 0.52, 0.78] as const).map((t, i) => length > t && (
          <circle key={i} cx={35 + Math.sin(t * 8) * sway * 0.4} cy={t * 420}
            r={5 - i * 1.2} fill="#d4a56a" opacity={0.72} />
        ))}
      </svg>
    </div>
  )
}

/* ─── floating pearl dot ─────────────────────────────────────────────────── */
function Pearl({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      width: 14, height: 14, borderRadius: '50%', position: 'absolute', pointerEvents: 'none',
      background: 'radial-gradient(circle at 35% 30%, #4a2810 0%, #1a0f05 70%)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)',
      animation: 'floatPearl 4s ease-in-out infinite',
      ...style,
    }} />
  )
}

/* ─── decorative leaf ───────────────────────────────────────────────────── */
function Leaf({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute', pointerEvents: 'none',
      animation: 'leafSway 5s ease-in-out infinite',
      ...style,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28 C16 28 4 22 4 12 C4 6 10 2 16 2 C22 2 28 6 28 12 C28 22 16 28 16 28Z" fill="#4a7c3a" opacity="0.75" />
        <path d="M16 2 L16 28" stroke="#3a6030" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  )
}

/* ─── products ───────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { name: 'Thé au lait classique', desc: "L'indémodable", tag: 'Classique', tagColor: '#c9a87c', bg: '#ede0cc',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=440&fit=crop&auto=format' },
  { name: 'Matcha Latte', desc: 'Douceur et caractère', tag: 'Populaire', tagColor: '#4a7c3a', bg: '#e2eeda',
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&h=440&fit=crop&auto=format' },
  { name: 'Fraise Gourmande', desc: 'Un goût irrésistible', tag: 'Fruité', tagColor: '#c0485a', bg: '#f5e0e4',
    img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=440&fit=crop&auto=format' },
  { name: 'Brown Sugar', desc: 'Intense et délicieux', tag: 'Signature', tagColor: '#7c4f27', bg: '#ede0cc',
    img: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=440&fit=crop&auto=format' },
]

function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: p.bg, borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s',
        transform: hov ? 'translateY(-8px) scale(1.015)' : 'none',
        boxShadow: hov ? '0 20px 44px rgba(61,32,16,0.18)' : '0 2px 12px rgba(61,32,16,0.07)',
      }}>
      <div style={{ height: 200, overflow: 'hidden', background: p.bg }}>
        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover',
          transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.5s' }} />
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <span style={{ display: 'inline-block', background: p.tagColor, color: '#fff',
            borderRadius: 20, padding: '2px 9px', fontSize: 10, fontWeight: 600,
            marginBottom: 5, letterSpacing: '0.05em' }}>{p.tag}</span>
          <p style={{ margin: 0, fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: '#3d2010', lineHeight: 1.2 }}>{p.name}</p>
          <p style={{ margin: '3px 0 0', fontSize: 11, color: '#7c4f27' }}>{p.desc}</p>
        </div>
        <button style={{ width: 34, height: 34, borderRadius: '50%', background: '#3d2010',
          color: '#f5ede0', border: 'none', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'transform 0.2s, background 0.2s',
          transform: hov ? 'scale(1.1)' : 'scale(1)' }}>
          <IconArrowRight size={15} color="#f5ede0" />
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const p = useHeroProgress(heroRef as React.RefObject<HTMLElement>)

  // Cup: 0° → 115° tilt
  const cupTilt   = Math.min(115, p * 125)
  // Liquid drains out of cup
  const fillLevel = Math.max(0, 1 - p * 1.25)
  // Cup drifts horizontally as it tips (pivot at bottom-right corner feel)
  const cupDrift  = Math.sin((cupTilt / 115) * Math.PI * 0.5) * 36
  // Flood rises from bottom: starts at p=0.1, full at p=0.9
  const floodP    = Math.min(1, Math.max(0, (p - 0.1) / 0.78))
  const floodVh   = floodP * 100

  return (
    <div style={{ background: '#f5ede0', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: `rgba(245,237,224,${0.7 + floodP * 0.25})`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid rgba(74,124,58,${floodP * 0.3})`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 20px', maxWidth: 1160, margin: '0 auto',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#4a7c3a',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconLeaf size={14} color="#f5ede0" />
            </div>
            <span style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 700, color: '#3d2010', letterSpacing: '-0.01em' }}>
              Super Thé
            </span>
          </div>

          {/* Links */}
          <ul style={{ display: 'none', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}
            className="md:flex" suppressHydrationWarning>
            {(['Accueil', 'Nos boissons', 'À propos', 'Nos adresses', 'Contact'] as const).map(l => (
              <li key={l}><a href="#" style={{ color: '#3d2010', fontSize: 13, fontWeight: 500,
                textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}>{l}</a></li>
            ))}
          </ul>

          <button style={{ background: '#4a7c3a', color: '#fff', border: 'none',
            borderRadius: 24, padding: '7px 16px', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
            fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(74,124,58,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}>
            Commander
            <IconArrowRight size={13} color="#fff" />
          </button>
        </div>
      </nav>

      {/* ── HERO sticky zone (200vh = 100vh sticky + 100vh scrollable) ─── */}
      <div ref={heroRef} style={{ height: '200vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* bg */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(145deg, #f5ede0 0%, #ecdcc6 50%, #e2eeda 100%)' }} />

          {/* green accent band top-right */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '40%',
            background: 'radial-gradient(ellipse at 100% 0%, rgba(74,124,58,0.12) 0%, transparent 70%)',
            pointerEvents: 'none' }} />

          {/* decorative leaves */}
          <Leaf style={{ left: '4%', top: '18%', animationDelay: '0s' }} />
          <Leaf style={{ right: '6%', top: '24%', animationDelay: '1.2s', transform: 'scaleX(-1)' }} />
          <Leaf style={{ left: '8%', bottom: '20%', animationDelay: '2.1s' }} />
          <Leaf style={{ right: '10%', bottom: '28%', animationDelay: '0.7s', transform: 'scaleX(-1) rotate(-10deg)' }} />

          {/* floating pearls */}
          <Pearl style={{ left: '6%',  top: '28%', animationDelay: '0s',   width: 18, height: 18 }} />
          <Pearl style={{ left: '11%', top: '66%', animationDelay: '0.9s', width: 12, height: 12 }} />
          <Pearl style={{ right: '8%', top: '20%', animationDelay: '0.5s', width: 20, height: 20 }} />
          <Pearl style={{ right: '5%', top: '62%', animationDelay: '1.4s', width: 11, height: 11 }} />
          <Pearl style={{ left: '24%', top: '8%',  animationDelay: '0.3s', width: 9,  height: 9  }} />
          <Pearl style={{ right: '22%',top: '88%', animationDelay: '1.8s', width: 13, height: 13 }} />

          {/* ── cup — centered, small enough to always be in view ──── */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${cupDrift}px), -50%)`,
            width: 'clamp(130px, 18vw, 180px)',
            transition: 'transform 0.06s ease-out',
          }}>
            {/* rotating wrapper */}
            <div style={{
              width: '100%',
              paddingBottom: '145%',
              position: 'relative',
              transform: `rotate(${cupTilt}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.06s ease-out',
            }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <BubbleCup fill={fillLevel} />
              </div>
            </div>
            {/* pour stream beneath cup */}
            <PourStream progress={p} />
          </div>

          {/* ── hero copy — left side, fades as flood rises ─────────── */}
          <div style={{
            position: 'absolute',
            left: '5%', bottom: '14%',
            opacity: Math.max(0, 1 - floodP * 2.8),
            transform: `translateY(${floodP * -30}px)`,
            transition: 'opacity 0.06s, transform 0.06s',
            pointerEvents: 'none',
            maxWidth: 340,
          }}>
            <p style={{ color: '#4a7c3a', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', margin: '0 0 8px', fontFamily: 'Outfit, sans-serif' }}>
              Plus qu'un thé, une expérience
            </p>
            <h1 style={{ fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 700, color: '#3d2010', margin: '0 0 10px', lineHeight: 1.0 }}>
              Super<br /><em style={{ color: '#4a7c3a', fontStyle: 'italic' }}>Thé</em>
            </h1>
            <p style={{ color: '#7c4f27', fontSize: 14, lineHeight: 1.65, margin: '0 0 18px',
              fontFamily: 'Outfit, sans-serif' }}>
              Des bubble teas gourmands, faits avec passion pour illuminer vos journées.
            </p>
            <button style={{ background: '#3d2010', color: '#f5ede0', border: 'none',
              borderRadius: 40, padding: '11px 22px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif', display: 'flex',
              alignItems: 'center', gap: 7,
              boxShadow: '0 4px 18px rgba(61,32,16,0.25)' }}>
              Découvrir nos boissons <IconArrowRight size={14} color="#f5ede0" />
            </button>
          </div>

          {/* ── right badge — fades out ───────────────────────────────── */}
          <div style={{
            position: 'absolute', right: '5%', bottom: '18%',
            opacity: Math.max(0, 1 - floodP * 2.5),
            pointerEvents: 'none',
            textAlign: 'right',
          }}>
            <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic',
              fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#7c4f27', margin: 0, lineHeight: 1.4 }}>
              Good Tea<br /><strong>Good Mood</strong>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 8 }}>
              {[1,2,3,4,5].map(i => <IconStar key={i} size={13} color="#4a7c3a" />)}
            </div>
          </div>

          {/* ── FLOOD overlay ─────────────────────────────────────────── */}
          {floodP > 0 && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: `${floodVh}vh`,
              pointerEvents: 'none', zIndex: 10,
            }}>
              {/* wave surface */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: 'translateY(-46px)', zIndex: 11 }}>
                <WaveSurface color="rgba(178,118,45,0.8)" />
              </div>
              {/* liquid body */}
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(190,128,48,0.76) 0%, rgba(130,78,20,0.88) 100%)' }} />
              {/* green tint layer */}
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(74,124,58,0.08) 0%, transparent 50%, rgba(74,124,58,0.06) 100%)' }} />
              {/* pearls in flood */}
              {floodP > 0.25 && (
                <>
                  <Pearl style={{ left: '12%', top: '25%', animationDelay: '0.2s', opacity: 0.7 }} />
                  <Pearl style={{ left: '38%', top: '55%', animationDelay: '1s',   opacity: 0.65 }} />
                  <Pearl style={{ left: '62%', top: '32%', animationDelay: '0.6s', opacity: 0.7 }} />
                  <Pearl style={{ left: '80%', top: '68%', animationDelay: '1.5s', opacity: 0.6 }} />
                  <Pearl style={{ left: '26%', top: '75%', animationDelay: '0.9s', opacity: 0.55 }} />
                </>
              )}
            </div>
          )}

          {/* scroll cue */}
          <div style={{
            position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
            opacity: Math.max(0, 1 - p * 6), display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 5, pointerEvents: 'none', zIndex: 5,
          }}>
            <span style={{ fontSize: 10, color: '#4a7c3a', fontFamily: 'Outfit, sans-serif',
              letterSpacing: '0.18em', textTransform: 'uppercase' }}>Faites défiler</span>
            <div style={{ width: 1, height: 28, background: 'linear-gradient(#4a7c3a, transparent)' }} />
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ────────────────────────────────────────────────────── */}
      <section style={{ background: '#ecdcc6', padding: '80px 20px', position: 'relative', zIndex: 2 }}>
        {/* green accent top border */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #4a7c3a, #c9a87c, #4a7c3a)',
          position: 'absolute', top: 0, left: 0, right: 0 }} />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <IconLeaf size={14} color="#4a7c3a" />
                <p style={{ color: '#4a7c3a', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0,
                  fontFamily: 'Outfit, sans-serif' }}>Nos boissons phares</p>
              </div>
              <h2 style={{ fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 600, color: '#3d2010', margin: 0, lineHeight: 1.1 }}>
                Des saveurs qui font<br />la différence
              </h2>
            </div>
            <a href="#" style={{ color: '#4a7c3a', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', fontFamily: 'Outfit, sans-serif',
              display: 'flex', alignItems: 'center', gap: 5 }}>
              Voir toutes nos boissons <IconArrowRight size={14} color="#4a7c3a" />
            </a>
          </div>

          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
            {PRODUCTS.map(p => <ProductCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ─────────────────────────────────────────────────── */}
      <section style={{ background: '#4a7c3a', padding: '48px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {[
            { icon: <IconLeaf size={22} color="#f5ede0" />, title: 'Ingrédients naturels', desc: 'Sélectionnés avec soin, sans additifs' },
            { icon: <IconCup size={22} color="#f5ede0" />, title: 'Recettes uniques', desc: 'Préparées à la commande, chaque fois' },
            { icon: <IconHeart size={22} color="#f5ede0" />, title: 'Fait avec passion', desc: 'Une équipe passionnée derrière chaque verre' },
            { icon: <IconMapPin size={22} color="#f5ede0" />, title: '12 boutiques', desc: 'Retrouvez-nous près de chez vous' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12,
                background: 'rgba(255,255,255,0.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#fff',
                  fontFamily: 'Outfit, sans-serif' }}>{title}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'Outfit, sans-serif' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#f5ede0', padding: '88px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <IconLeaf size={13} color="#4a7c3a" />
              <p style={{ color: '#4a7c3a', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0,
                fontFamily: 'Outfit, sans-serif' }}>Notre histoire</p>
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 600, color: '#3d2010', margin: '0 0 18px', lineHeight: 1.1 }}>
              Fait avec<br /><em style={{ color: '#4a7c3a' }}>passion</em>
            </h2>
            <p style={{ color: '#7c4f27', lineHeight: 1.75, margin: '0 0 12px',
              fontFamily: 'Outfit, sans-serif', fontSize: 14 }}>
              Depuis 2018, nous sélectionnons les meilleures feuilles de thé et les perles de tapioca les plus savoureuses pour vous offrir une expérience unique à chaque gorgée.
            </p>
            <p style={{ color: '#7c4f27', lineHeight: 1.75, margin: '0 0 36px',
              fontFamily: 'Outfit, sans-serif', fontSize: 14 }}>
              Chaque boisson est préparée à la commande, avec des ingrédients frais et naturels, sans colorants ni conservateurs artificiels.
            </p>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              {[['50+', 'Saveurs'], ['12', 'Boutiques'], ['200k', 'Clients']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 700,
                    color: '#4a7c3a', margin: 0, lineHeight: 1 }}>{n}</p>
                  <p style={{ color: '#c9a87c', fontSize: 12, margin: '2px 0 0',
                    fontFamily: 'Outfit, sans-serif' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 420,
            background: '#ecdcc6', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1627487923834-c34ff10c0fe5?w=600&h=500&fit=crop&auto=format"
              alt="Préparation bubble tea" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(61,32,16,0.38) 0%, transparent 55%)' }} />
            {/* green badge */}
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#4a7c3a',
              borderRadius: 12, padding: '8px 14px' }}>
              <p style={{ margin: 0, color: '#fff', fontFamily: 'Outfit, sans-serif',
                fontSize: 11, fontWeight: 600 }}>100% Naturel</p>
            </div>
            <p style={{ position: 'absolute', bottom: 18, left: 18, right: 18,
              fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'white',
              fontSize: 20, margin: 0, lineHeight: 1.35 }}>
              Thé · Bubbles · Bonne humeur · Toujours !
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ background: '#3d2010', color: '#ecdcc6', padding: '44px 20px 28px' }}>
        {/* green top rule */}
        <div style={{ height: 3, background: '#4a7c3a', borderRadius: 2,
          marginBottom: 36, opacity: 0.7 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: 24, paddingBottom: 28, marginBottom: 24,
            borderBottom: '1px solid rgba(201,168,124,0.2)' }}>
            {[
              { icon: <IconMapPin size={16} color="#4a7c3a" />, title: 'Nos adresses', sub: 'Retrouvez-nous près de chez vous' },
              { icon: <IconClock size={16} color="#4a7c3a" />, title: 'Horaires', sub: 'Ouverts tous les jours' },
              { icon: <IconMail size={16} color="#4a7c3a" />, title: 'Contact', sub: 'Une question ? Écrivez-nous' },
            ].map(({ icon, title, sub }) => (
              <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ marginTop: 1 }}>{icon}</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>{title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, opacity: 0.5, fontFamily: 'Outfit, sans-serif' }}>{sub}</p>
                </div>
              </div>
            ))}
            <div>
              <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>Suivez-nous</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[<IconInstagram size={15} color="#ecdcc6" />, 'f', 'tt', '▶'].map((ic, i) => (
                  <button key={i} style={{ width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(74,124,58,0.22)', color: '#ecdcc6', border: 'none',
                    cursor: 'pointer', fontSize: 12, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s' }}>
                    {typeof ic === 'string' ? ic : ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#4a7c3a',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconLeaf size={13} color="#fff" />
              </div>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600 }}>Super Thé</span>
            </div>
            <p style={{ margin: 0, fontSize: 11, opacity: 0.3, fontFamily: 'Outfit, sans-serif' }}>
              © 2026 Super Thé. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
