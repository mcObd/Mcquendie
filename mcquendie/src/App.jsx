import { forwardRef, useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaFacebook, FaWhatsapp, FaPaintBrush, FaLaptopCode, FaFileAlt } from 'react-icons/fa'
import { SiTiktok, SiThreads } from 'react-icons/si'
import useEmblaCarousel from 'embla-carousel-react'
import digilabImg from './assets/digilab.png'
import greenyImg from './assets/greeny.png'
import polysiteImg from './assets/polysite.png'
import portraitImg from './assets/mcquendie_picture.jpg'
import resumePdf from './assets/Mcquendie_Obodos_Resume.pdf'
import html5Img from './assets/html5.jpg'
import css3Img from './assets/css3.jpg'
import javascriptImg from './assets/javascript.png'
import reactImg from './assets/react.png'
import supabaseImg from './assets/supabase.jpg'
import tailwindImg from './assets/tailwind.jpg'
import figmaImg from './assets/figma.png'
import cursorImg from './assets/cursor.jpg'
import codexImg from './assets/codex.jpg'
import vercelImg from './assets/vercel.jpg'
import gitImg from './assets/git.png'

const TAGLINES = [
  'I design it, build it, and write the words that sell it.',
  'Interfaces that look sharp and work harder.',
  'From first pixel to final line of copy — I build the whole experience.'
]

// ─── Global scroll coordinator ──────────────────────────────────────────────
// Sets --scroll-y on :root so any CSS rule can do parallax with calc()
function useScrollY() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

// ─── Parallax hook ───────────────────────────────────────────────────────────
// Returns a ref; on scroll it applies translateY at `speed` multiplier
function useParallax(speed = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const offset = (window.innerHeight / 2 - center) * speed
          el.style.transform = `translateY(${offset}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(lines, typeSpeed = 40, pause = 1600, active = true) {
  const [text, setText] = useState('')
  const idxRef = useRef(0)
  const charRef = useRef(0)
  useEffect(() => {
    if (!active) return
    let mounted = true
    let timeout
    const tick = () => {
      const line = lines[idxRef.current]
      if (charRef.current <= line.length) {
        setText(line.slice(0, charRef.current))
        charRef.current += 1
        timeout = setTimeout(tick, typeSpeed)
        return
      }
      timeout = setTimeout(() => {
        if (!mounted) return
        setText('')
        charRef.current = 0
        idxRef.current = (idxRef.current + 1) % lines.length
        timeout = setTimeout(tick, 220)
      }, pause)
    }
    tick()
    return () => { mounted = false; clearTimeout(timeout) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join('|'), active])
  return text
}

// ─── Magnetic pull hook ──────────────────────────────────────────────────────
function useMagnetic() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      if (Math.hypot(x, y) < 70) {
        el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`
      } else {
        el.style.transform = 'translate3d(0,0,0)'
      }
    }
    const onLeave = () => {
      el.style.transform = 'translate3d(0,0,0)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
    }
    const onEnter = () => { el.style.transition = 'transform 0.1s ease-out' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return ref
}

// ─── 3D Card Tilt hook ───────────────────────────────────────────────────────
function useTilt(active = true) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !active) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const rX = -(y / (rect.height / 2)) * 8
      const rY = (x / (rect.width / 2)) * 8
      el.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-8px)`
      el.style.transition = 'transform 0.1s ease-out'
    }
    const onLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
      el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [active])
  return ref
}

// ─── Mouse shine position hook ───────────────────────────────────────────────
function useMousePosition(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [ref])
}

// ─── HeadingReveal — char-by-char mask slide-up ──────────────────────────────
function HeadingReveal({ children, delay = 0, as: Tag = 'h3', className = '', style = {} }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setActive(true), delay)
        obs.unobserve(el)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const text = typeof children === 'string' ? children : ''
  const chars = text.split('')

  return (
    <Tag ref={ref} className={`heading-reveal ${className}`} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <span key={i} className="heading-reveal-char-wrap" aria-hidden="true">
          <span
            className={`heading-reveal-char${active ? ' active' : ''}`}
            style={{ transitionDelay: `${delay + i * 18}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// ─── SectionLine — animated underline ────────────────────────────────────────
function SectionLine({ delay = 0 }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setActive(true), delay)
        obs.unobserve(el)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="section-header-line"
      style={{
        width: active ? '120px' : '0px',
        height: '2px',
        background: 'linear-gradient(90deg, var(--text-strong), transparent)',
        marginBottom: '28px',
        transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
        borderRadius: '2px',
      }}
    />
  )
}

// ─── ClipText — single-line title mask ───────────────────────────────────────
function ClipText({ children, delay = 0 }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setActive(true), delay); obs.unobserve(el) }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <span ref={ref} className="clip-text-parent">
      <span className={`clip-text-child ${active ? 'reveal-active' : ''}`}>{children}</span>
    </span>
  )
}

// ─── SplitWordReveal ─────────────────────────────────────────────────────────
function SplitWordReveal({ text, delay = 0 }) {
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setActive(true), delay); obs.unobserve(el) }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return (
    <span ref={ref} style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word-parent">
          <span className={`split-word-child${active ? ' active' : ''}`} style={{ transitionDelay: `${i * 35}ms` }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setWidth(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress-bar" style={{ width: `${width}%` }} />
}

// ─── Preloader ────────────────────────────────────────────────────────────────
function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let start = 0
    const step = 100 / (1200 / 20)
    const timer = setInterval(() => {
      start += step
      if (start >= 100) {
        start = 100
        clearInterval(timer)
        setTimeout(() => { setHidden(true); setTimeout(onComplete, 1200) }, 300)
      }
      setProgress(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [onComplete])
  return (
    <div className={`preloader-overlay${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader-content">
        <h2 className="preloader-logo"><span>Mcquendie Obodos</span></h2>
        <div className="preloader-bar-bg">
          <div className="preloader-bar-progress" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader-percentage">{progress}%</div>
      </div>
    </div>
  )
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [blend, setBlend] = useState(false)
  const [projHover, setProjHover] = useState(false)
  const [active, setActive] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const curPos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; if (!active) setActive(true) }
    const onOver = (e) => {
      const t = e.target
      const interactive = t?.closest('a,button,.social,.tech-card,.mobile-toggle')
      const card = t?.closest('.card,.project')
      if (interactive) { setHovered(true); if (interactive.classList.contains('primary') || interactive.classList.contains('cta')) setBlend(true) }
      if (card) { card.classList.contains('project') ? setProjHover(true) : setHovered(true) }
    }
    const onOut = (e) => {
      const t = e.target; const rt = e.relatedTarget
      if (t?.closest('a,button,.social,.tech-card,.mobile-toggle') && !rt?.closest('a,button,.social,.tech-card,.mobile-toggle')) { setHovered(false); setBlend(false) }
      if (t?.closest('.card,.project') && !rt?.closest('.card,.project')) { setProjHover(false); setHovered(false) }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    let raf
    const tick = () => {
      curPos.current.x += (mouse.current.x - curPos.current.x) * 0.15
      curPos.current.y += (mouse.current.y - curPos.current.y) * 0.15
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.4
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.4
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${curPos.current.x}px,${curPos.current.y}px,0) translate(-50%,-50%)`
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dotPos.current.x}px,${dotPos.current.y}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) document.body.classList.add('custom-cursor-active')
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [active])

  if (!active) return null
  let cls = 'custom-cursor'
  if (hovered) cls += ' hovered'
  if (blend) cls += ' blend-mode'
  if (projHover) cls += ' project-hover'
  return (
    <>
      <div className={cls} ref={cursorRef}><span className="custom-cursor-label">VIEW</span></div>
      <div className="custom-cursor-dot" ref={dotRef} />
    </>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ children, index }) {
  const desktop = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches
  const cardRef = useTilt(desktop)
  useMousePosition(cardRef)
  return (
    <div ref={cardRef} className="card reveal" style={{ '--stagger-index': index }}>
      <div className="card-shine" />
      {children}
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const desktop = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches
  const cardRef = useTilt(desktop)
  useMousePosition(cardRef)
  return (
    <article ref={cardRef} className="project card reveal" style={{ '--stagger-index': index }}>
      <div className="card-shine" />
      <div className="project-img-wrap">
        <img loading="lazy" src={project.img} alt={project.title} onError={e => { e.currentTarget.style.background = '#f6f4ef' }} />
      </div>
      <div className="meta">
        <h3>{project.title}</h3>
        <p style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
        <div className="tech" style={{ marginTop: 8 }}>
          {project.tech.map(t => <span className="chip" key={t}>{t}</span>)}
        </div>
        <div className="project-link">
          <a className="btn ghost" href={project.url} target="_blank" rel="noopener noreferrer">View Live</a>
        </div>
      </div>
    </article>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({ scrolled, activeSection, onNavigate, onOpenPrivacy }) {
  const [open, setOpen] = useState(false)
  const go = (e, sel) => {
    e.preventDefault()
    if (sel === '#privacy') { onOpenPrivacy() } else {
      onNavigate()
      document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }
  return (
    <nav className={`nav container${scrolled ? ' scrolled' : ''}`}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="brand">Mcquendie Obodos</div>
      </div>
      <div className="links" aria-hidden={open ? 'false' : 'true'}>
        {[['about','About'],['services','Services'],['work','Work'],['contact','Contact'],['privacy','Privacy']].map(([id, label]) => (
          <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={e => go(e, `#${id}`)}>{label}</a>
        ))}
        <a className="cta" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Resume</a>
      </div>
      <button className="mobile-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(v => !v)}>
        <span className={`hamburger${open ? ' open' : ''}`} />
      </button>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          {[['about','About'],['services','Services'],['work','Work'],['contact','Contact'],['privacy','Privacy']].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={e => go(e, `#${id}`)}>{label}</a>
          ))}
          <a className="cta" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Resume</a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ active }) {
  const display = useTypewriter(TAGLINES, 34, 1600, active)
  const btn1 = useMagnetic()
  const btn2 = useMagnetic()
  const desktop = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches
  const portraitRef = useTilt(desktop)
  const heroTextRef = useParallax(-0.06)   // text floats up slightly faster
  const blobRef = useParallax(0.12)         // blob drifts down slower

  return (
    <section className="hero-section container" id="home">
      <div className="hero-left" ref={heroTextRef}>
        <div className="tagline reveal" style={{ '--stagger-index': 0 }}>Frontend Developer + UI/UX Designer</div>
        <h1>
          <ClipText delay={200}>Mcquendie Obodos</ClipText>
        </h1>
        <div className="typing reveal" style={{ marginBottom: 16, '--stagger-index': 1 }}>{display}</div>
        <p style={{ marginTop: 8, marginBottom: 24, lineHeight: 1.8, maxWidth: 560, color: 'var(--text-muted)' }}>
          {active
            ? <SplitWordReveal text="I build fast, responsive interfaces and write the copy that turns visitors into clients." delay={120} />
            : "I build fast, responsive interfaces and write the copy that turns visitors into clients."
          }
        </p>
        <div className="actions reveal" style={{ marginTop: 8, '--stagger-index': 3 }}>
          <a ref={btn1} className="btn primary" href="#contact">Let's Build Something</a>
          <a ref={btn2} className="btn ghost" href="#work">View My Work</a>
        </div>
      </div>

      <div className="hero-right">
        <div ref={portraitRef} className="portrait reveal" style={{ width: '100%', maxWidth: 420, '--stagger-index': 2 }}>
          <img loading="eager" src={portraitImg} alt="Mcquendie Obodos" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
        </div>
      </div>

      <div ref={blobRef} className="bg-blob" aria-hidden />
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const paraRef = useParallax(0.04)
  return (
    <section className="about container" id="about">
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>About</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} className="reveal" style={{ '--stagger-index': 1, display: 'block', marginBottom: 24 }}>
        I build polished, responsive interfaces — and write the copy that makes people stick around.
      </HeadingReveal>
      <p ref={paraRef} style={{ marginTop: 0, lineHeight: 1.85, color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 640 }}>
        <SplitWordReveal text="Currently deepening backend skills in C# and Java. Open to freelance, collaboration, and full-time frontend roles." delay={200} />
      </p>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="services container" id="services">
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>Services</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} style={{ '--stagger-index': 1, display: 'block', marginBottom: 40 }}>
        What I do
      </HeadingReveal>
      <div className="services-grid">
        <ServiceCard index={0}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <FaPaintBrush size={26} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Web Design</h3>
          </div>
          <p style={{ lineHeight: 1.75 }}>Interfaces people actually want to use — clean, intentional, and built to convert.</p>
        </ServiceCard>
        <ServiceCard index={1}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <FaLaptopCode size={26} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Web Development</h3>
          </div>
          <p style={{ lineHeight: 1.75 }}>Fast, responsive builds with clean component architecture, from landing page to full product.</p>
        </ServiceCard>
        <ServiceCard index={2}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <FaFileAlt size={26} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Copywriting & SEO</h3>
          </div>
          <p style={{ lineHeight: 1.75 }}>Words that rank, read well, and move people to act.</p>
        </ServiceCard>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const items = [
    { key: 'digilab', title: 'DigiLab', desc: 'Business landing page — sharp, fast, conversion-focused', img: digilabImg, tech: ['HTML','CSS','JS'], url: 'https://digilab-ten.vercel.app/' },
    { key: 'greeny',  title: 'Greeny',  desc: 'Sustainable e-commerce concept — product-first, accessible', img: greenyImg,  tech: ['React','JS','CSS3'],   url: 'https://greeny-three.vercel.app/' },
    { key: 'polysite',title: 'PolySite',desc: 'Creative agency template — bold, scroll-based energy',        img: polysiteImg,tech: ['HTML5','CSS3','JS'],  url: 'https://poly-site-ten.vercel.app/' }
  ]
  return (
    <section className="projects container" id="work">
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>Featured Work</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} style={{ '--stagger-index': 1, display: 'block', marginBottom: 40 }}>
        Selected projects
      </HeadingReveal>
      <div className="projects-grid">
        {items.map((p, idx) => <ProjectCard key={p.key} project={p} index={idx + 2} />)}
      </div>
    </section>
  )
}

// ─── Tech ─────────────────────────────────────────────────────────────────────
function Tech() {
  const items = [
    { k: 'HTML5',      img: html5Img },
    { k: 'CSS3',       img: css3Img },
    { k: 'JavaScript', img: javascriptImg },
    { k: 'React',      img: reactImg },
    { k: 'Supabase',   img: supabaseImg },
    { k: 'Tailwind',   img: tailwindImg },
    { k: 'Figma',      img: figmaImg },
    { k: 'Cursor',     img: cursorImg },
    { k: 'Codex',      img: codexImg },
    { k: 'Vercel',     img: vercelImg },
    { k: 'Git',        img: gitImg }
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, containScroll: 'trimSnaps', align: 'center', draggable: true })
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!emblaApi) return
    let id = null
    const next = () => { emblaApi.canScrollNext() ? emblaApi.scrollNext() : emblaApi.scrollTo(0) }
    const start = () => { clearInterval(id); id = setInterval(next, 2800) }
    const stop = () => { clearInterval(id); clearTimeout(timer.current) }
    paused ? stop() : start()
    return () => { clearInterval(id); clearTimeout(timer.current) }
  }, [emblaApi, paused])

  return (
    <section className="tech container" id="tech">
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>Toolbox</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} style={{ '--stagger-index': 1, display: 'block', marginBottom: 40 }}>
        Tech stack
      </HeadingReveal>
      <div className="tech-row reveal" style={{ '--stagger-index': 2 }}>
        <div
          className="embla" ref={emblaRef}
          onMouseEnter={() => { clearTimeout(timer.current); setPaused(true) }}
          onMouseLeave={() => { timer.current = setTimeout(() => setPaused(false), 260) }}
          onFocus={() => { clearTimeout(timer.current); setPaused(true) }}
          onBlur={() => { timer.current = setTimeout(() => setPaused(false), 260) }}
        >
          <div className="embla__container">
            {items.map(i => (
              <div className="embla__slide" key={i.k}>
                <div className="tech-card" title={i.k}>
                  <div className="tech-image"><img loading="lazy" src={i.img} alt={i.k} /></div>
                  <div className="tech-name">{i.k}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const btn1 = useMagnetic()
  const btn2 = useMagnetic()
  const socials = [
    { name: 'LinkedIn',  cls: 'linkedin',  url: 'https://www.linkedin.com/in/mcquendie-obodos-0536883aa/', icon: <FaLinkedin size={22} /> },
    { name: 'Email',     cls: 'email',     url: 'mailto:obodosmcquendie@gmail.com',                           icon: <FaGithub size={22} /> },
    { name: 'TikTok',   cls: 'tiktok',    url: 'https://www.tiktok.com/@mcquendie_?_t=ZM-8xchTobGSxk&_r=1', icon: <SiTiktok size={22} /> },
    { name: 'Instagram', cls: 'instagram', url: 'https://www.instagram.com/mcquendie_?igsh=MTIveTh3cHhpa2VyaA==', icon: <FaInstagram size={22} /> },
    { name: 'X',         cls: 'x',         url: 'https://x.com/Mcquendie',                                    icon: <FaTwitter size={22} /> },
    { name: 'Facebook',  cls: 'facebook',  url: 'https://www.facebook.com/mcquendie.obodos?rdid=CD2DsSKwCykU5hoo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GrENVQY8S%2F#', icon: <FaFacebook size={22} /> },
    { name: 'Threads',   cls: 'threads',   url: 'https://www.threads.com/@mcquendie_',                        icon: <SiThreads size={22} /> },
    { name: 'WhatsApp',  cls: 'whatsapp',  url: 'https://wa.me/message/PR6PLI5D6K4MJ1',                       icon: <FaWhatsapp size={22} /> },
    { name: 'GitHub',    cls: 'github',    url: 'https://github.com/mcObd',                                   icon: <FaGithub size={22} /> }
  ]
  return (
    <section className="contact container" id="contact">
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>Let's Build Something</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} style={{ '--stagger-index': 1, display: 'block', marginBottom: 20 }}>
        Got a project in mind, or just want to talk shop?
      </HeadingReveal>
      <p style={{ marginBottom: 32, lineHeight: 1.85, color: 'var(--text-muted)', fontSize: '1.05rem' }}>
        <SplitWordReveal text="I'm always up for a good conversation." delay={120} />
      </p>
      <div className="cta-row reveal" style={{ marginBottom: 48, '--stagger-index': 3 }}>
        <a ref={btn1} className="btn primary" href="mailto:obodosmcquendie@gmail.com">obodosmcquendie@gmail.com</a>
        <a ref={btn2} className="btn ghost" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Download Resume</a>
      </div>
      <div className="social-grid">
        {socials.map((s, i) => (
          <a key={s.name} className={`social ${s.cls} reveal`} href={s.url} target="_blank" rel="noopener noreferrer" style={{ '--stagger-index': i + 4 }}>
            <span className="icon">{s.icon}</span>
            <span style={{ marginLeft: 8 }}>{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── Privacy ──────────────────────────────────────────────────────────────────
const PrivacyPolicy = forwardRef(function PrivacyPolicy(_, ref) {
  return (
    <section className="privacy container" id="privacy" ref={ref}>
      <h2 className="reveal" style={{ '--stagger-index': 0 }}>Privacy Policy</h2>
      <SectionLine delay={120} />
      <HeadingReveal delay={80} style={{ '--stagger-index': 1, display: 'block', marginBottom: 32 }}>
        How this website handles your information
      </HeadingReveal>
      <div className="privacy-content reveal" style={{ '--stagger-index': 2 }}>
        <p>This website is a personal portfolio for Mcquendie Obodos. It does not sell, rent, or trade visitor information.</p>
        <p>If you contact me by email, WhatsApp, or any linked social platform, I may receive the information you choose to send, such as your name, email address, phone number, message, or project details. I use that information only to respond to you and discuss the work you contacted me about.</p>
        <p>This site may link to third-party websites and platforms, including LinkedIn, GitHub, Instagram, TikTok, X, Facebook, Threads, WhatsApp, and live project links. Those services have their own privacy policies and practices.</p>
        <p>The site may be hosted by a third-party hosting provider that processes standard technical data such as IP address, browser type, device information, and request logs for security, performance, and reliability.</p>
        <p>To request access, correction, or deletion of information you have sent directly to me, contact me at <a href="mailto:obodosmcquendie@gmail.com">obodosmcquendie@gmail.com</a>.</p>
        <p>Last updated: July 18, 2026.</p>
      </div>
    </section>
  )
})

// ─── Reveal observer ──────────────────────────────────────────────────────────
function useReveal(trigger) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.visible)'))
    if (!els.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [trigger])
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onOpenPrivacy }) {
  return (
    <footer className="footer container">
      <div>© {new Date().getFullYear()} Mcquendie Obodos</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
        <a href="#privacy" onClick={e => { e.preventDefault(); onOpenPrivacy() }}>Privacy</a>
      </div>
    </footer>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const privacyRef = useRef(null)

  // Global --scroll-y coordinator
  useScrollY()

  useReveal(loaded || privacyOpen)

  const showPrivacy = useCallback(() => {
    setPrivacyOpen(true)
    setTimeout(() => {
      const el = privacyRef.current || document.querySelector('#privacy')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  useEffect(() => {
    if (!privacyOpen) return
    const el = privacyRef.current || document.querySelector('#privacy')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [privacyOpen])

  // Navbar shrink on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Scroll Spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    if (!sections.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { rootMargin: '-30% 0px -55% 0px' })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <ScrollProgress />
      <Preloader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <div className="app" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.9s ease' }}>
        <Nav scrolled={scrolled} activeSection={activeSection} onNavigate={() => setPrivacyOpen(false)} onOpenPrivacy={showPrivacy} />
        <main>
          <Hero active={loaded} />
          <About />
          <Services />
          <Projects />
          <Tech />
          <Contact />
          {privacyOpen && <PrivacyPolicy ref={privacyRef} />}
        </main>
        <Footer onOpenPrivacy={showPrivacy} />
      </div>
    </>
  )
}

export default App
