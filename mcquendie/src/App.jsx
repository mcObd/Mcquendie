import { useEffect, useState, useRef } from 'react'
import './App.css'
import digilabImg from './assets/digilab.png'
import greenyImg from './assets/greeny.png'
import polysiteImg from './assets/polysite.png'
import portraitImg from './assets/mcquendie_picture.jpg'

const TAGLINES = [
  'I design it, build it, and write the words that sell it.',
  'Interfaces that look sharp and work harder.',
  'From first pixel to final line of copy — I build the whole experience.'
]

// Typewriter hook: types a line, pauses, clears, and types next
function useTypewriter(lines, typeSpeed = 40, pause = 1600) {
  const [text, setText] = useState('')
  const idxRef = useRef(0)
  const charRef = useRef(0)
  useEffect(() => {
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
      // pause, then clear and move to next
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
  }, [lines.join('|')])
  return text
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="nav container">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="brand">Mcquendie Obodos</div>
      </div>

      <div className="links" aria-hidden={open ? 'false' : 'true'}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#services" onClick={() => setOpen(false)}>Services</a>
        <a href="#work" onClick={() => setOpen(false)}>Work</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        <a className="cta" href="/Mcquendie_Obodos_Resume.pdf" target="_blank">Resume</a>
      </div>

      <button
        className="mobile-toggle"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`hamburger ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#work" onClick={() => setOpen(false)}>Work</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          <a className="cta" href="/Mcquendie_Obodos_Resume.pdf" target="_blank">Resume</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const display = useTypewriter(TAGLINES, 34, 1600)

  // parallax blob
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      document.documentElement.style.setProperty('--blob-y', `${y * 0.06}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero-section container" id="home">
      <div className="hero-left">
        <div className="tagline">Frontend Developer + UI/UX Designer</div>
        <h1 className="reveal">Mcquendie Obodos</h1>
        <div className="typing reveal" style={{ marginBottom: 8 }}>{display}</div>
        <p>I build fast, responsive interfaces and write the copy that turns visitors into clients.</p>
        <div className="actions" style={{ marginTop: 18 }}>
          <a className="btn primary" href="#contact">Let's Build Something</a>
          <a className="btn ghost" href="#work">View My Work</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="portrait reveal" style={{ width: 420, maxWidth: '92%' }}>
          <img src={portraitImg} alt="Mcquendie Obodos" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      <div className="bg-blob" style={{ transform: `translateY(var(--blob-y,0))` }} aria-hidden />
    </section>
  )
}

function About() {
  const chips = ['React', 'JavaScript', 'Supabase', 'Tailwind CSS', 'Figma', 'Cursor', 'Codex', 'Git']
  return (
    <section className="about container" id="about">
      <h2 className="reveal">About</h2>
      <h1 className="reveal">I build polished, responsive interfaces — and write the copy that makes people stick around.</h1>
      <p className="reveal" style={{ marginTop: 12 }}>Currently deepening backend skills in C# and Java. Open to freelance, collaboration, and full-time frontend roles.</p>
      <div className="chips reveal">
        {chips.map((c) => <span className="chip" key={c}>{c}</span>)}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="services container" id="services">
      <h2>Services</h2>
      <h1>What I do</h1>
      <div className="services-grid reveal" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Web Design</h3>
          <p>Interfaces people actually want to use — clean, intentional, and built to convert.</p>
        </div>
        <div className="card">
          <h3>Web Development</h3>
          <p>Fast, responsive builds with clean component architecture, from landing page to full product.</p>
        </div>
        <div className="card">
          <h3>Copywriting & SEO</h3>
          <p>Words that rank, read well, and move people to act.</p>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const items = [
    { key: 'digilab', title: 'DigiLab', desc: 'Business landing page — sharp, fast, conversion-focused', img: digilabImg, tech: ['HTML','CSS','JS'], url: 'https://digilab-ten.vercel.app/' },
    { key: 'greeny', title: 'Greeny', desc: 'Sustainable e-commerce concept — product-first, accessible', img: greenyImg, tech: ['React','JS','CSS3'], url: 'https://greeny-three.vercel.app/' },
    { key: 'polysite', title: 'PolySite', desc: 'Creative agency template — bold, scroll-based energy', img: polysiteImg, tech: ['HTML5','CSS3','JS'], url: 'https://poly-site-ten.vercel.app/' }
  ]

  return (
    <section className="projects container" id="work">
      <h2>Featured Work</h2>
      <h1>Selected projects</h1>
      <div className="projects-grid reveal" style={{ marginTop: 18 }}>
        {items.map(p => (
          <article className="project card" key={p.key}>
            <img src={p.img} alt={p.title} onError={(e)=>{e.currentTarget.style.background='#2f231a'}} />
            <div className="meta">
              <h3>{p.title}</h3>
              <p style={{ color:'var(--text-muted)' }}>{p.desc}</p>
              <div className="tech" style={{ marginTop:8 }}>
                {p.tech.map(t => <span className="chip" key={t}>{t}</span>)}
              </div>
              <div style={{ marginTop:10 }}><a className="btn ghost" href={p.url} target="_blank" rel="noreferrer">View Live</a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Tech() {
  const items = [
    { k: 'HTML5', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2l1.8 18L12 22l7.2-2L21 2H3z" stroke="currentColor" strokeWidth="0.8" fill="none"/></svg>) },
    { k: 'CSS3', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 3h16l-1.4 16L12 21l-6.6-2L4 3z" stroke="currentColor" strokeWidth="0.8" fill="none"/></svg>) },
    { k: 'JavaScript', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none"/></svg>) },
    { k: 'React', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="0.9"/><path d="M2 12c4-6 8-6 10-6s6 0 10 6c-4 6-8 6-10 6S6 18 2 12z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { k: 'Supabase', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="currentColor" strokeWidth="0.9"/></svg>) },
    { k: 'Tailwind', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 15c4-6 8-6 20-4" stroke="currentColor" strokeWidth="0.9"/></svg>) },
    { k: 'Figma', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="7" r="2" stroke="currentColor" strokeWidth="0.9"/><rect x="7" y="10" width="2" height="6" rx="1" stroke="currentColor" strokeWidth="0.9"/></svg>) },
    { k: 'Cursor', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 9-18 9V3z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { k: 'Codex', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { k: 'Vercel', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l8 16H4l8-16z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { k: 'Git', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="currentColor" strokeWidth="0.9"/></svg>) }
  ]
  return (
    <section className="tech container" id="tech">
      <h2>Toolbox</h2>
      <h1>Tech stack</h1>
      <div className="tech-row reveal" style={{ marginTop: 16 }}>
        {items.map(i => (
          <div className="tech-item" key={i.k} title={i.k}>
            <span style={{ width:18, height:18, display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--sand)' }}>{i.svg}</span>
            <span style={{ marginLeft:8 }}>{i.k}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M6 9H6.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6 12V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 12V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 12C10 10 14 10 14 12V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>) },
    { name: 'GitHub', url: 'https://github.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10C4 13.64 6.44 16.5 9.44 17.48C9.94 17.57 10.11 17.27 10.11 17.01C10.11 16.77 10.1 16.07 10.1 15.28C7.58 15.99 6.86 14.27 6.86 14.27C6.36 13.17 5.58 12.9 5.58 12.9C4.47 12.28 5.66 12.29 5.66 12.29C6.89 12.36 7.5 13.54 7.5 13.54C8.6 15.46 10.4 15 11.12 14.73C11.21 13.97 11.52 13.44 11.86 13.12C8.99 12.83 6.03 11.84 6.03 8.37C6.03 7.39 6.39 6.58 7 5.93C6.9 5.64 6.58 4.69 7.09 3.33C7.09 3.33 7.88 3.02 10.1 4.3C10.89 4.08 11.73 3.97 12.58 3.97C13.43 3.97 14.27 4.08 15.06 4.3C17.28 3.02 18.07 3.33 18.07 3.33C18.58 4.69 18.26 5.64 18.16 5.93C18.78 6.58 19.13 7.39 19.13 8.37C19.13 11.85 16.16 12.83 13.29 13.12C13.73 13.53 14.11 14.24 14.11 15.3C14.11 16.79 14.09 17.98 14.09 17.01C14.09 17.27 14.26 17.58 14.77 17.48C17.76 16.5 20.19 13.64 20.19 10C20.19 5.58 16.61 2 12.19 2H12Z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { name: 'Instagram', url: 'https://instagram.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>) },
    { name: 'TikTok', url: 'https://tiktok.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 8v8a4 4 0 1 0 4-4V6h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
    { name: 'X', url: 'https://x.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18M21 3L3 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>) },
    { name: 'Facebook', url: 'https://facebook.com', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h3v4h-3v10h-4V7H9V4h2V2.5C11 1.7 11.7 1 12.5 1H15v2z" stroke="currentColor" strokeWidth="0.9" fill="none"/></svg>) },
    { name: 'Threads', url: 'https://www.threads.net', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7 2 4 6 4 10c0 5 4 9 8 12 4-3 8-7 8-12 0-4-3-8-8-8z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { name: 'WhatsApp', url: 'https://wa.me/', svg: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.5a8.38 8.38 0 0 1-1.9 5.4L21 21l-3.1-2.1a8.5 8.5 0 1 1 3.1-6.4z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) }
  ]

  return (
    <section className="contact container" id="contact">
      <h2>Let's Build Something</h2>
      <h1>Got a project in mind, or just want to talk shop?</h1>
      <p style={{ marginTop: 12 }}>I'm always up for a good conversation.</p>
      <div className="cta-row reveal" style={{ marginTop: 18 }}>
        <a className="btn primary" href="mailto:obodosmcquendie@gmail.com">obodosmcquendie@gmail.com</a>
        <a className="btn ghost" href="/Mcquendie_Obodos_Resume.pdf" target="_blank">Download Resume</a>
      </div>

      <div className="social-grid reveal">
        {socials.map(s => (
          <a key={s.name} className="social" href={s.url} target="_blank" rel="noreferrer">
            <span style={{ width:18, height:18, display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--sand)' }}>{s.svg}</span>
            <span style={{ marginLeft:8 }}>{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

// small intersection observer for reveal-on-scroll
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    if (!els.length) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}


function Footer() {
  return (
    <footer className="footer container">
      <div>© {new Date().getFullYear()} Mcquendie Obodos</div>
      <div style={{ display:'flex', gap:12 }}>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  )
}

function App() {
  useReveal()
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Tech />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
