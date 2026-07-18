import { useEffect, useState } from 'react'
import './App.css'

const TAGLINES = [
  'I design it, build it, and write the words that sell it.',
  'Interfaces that look sharp and work harder.',
  'From first pixel to final line of copy — I build the whole experience.'
]

function useTyping(lines, speed = 60, pause = 1800) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    let mounted = true
    let i = 0
    let forward = true

    const tick = () => {
      const full = lines[i]
      let pos = 0
      const typer = setInterval(() => {
        if (!mounted) return clearInterval(typer)
        setText((t) => full.slice(0, t.length + 1))
        if (text === full) {
          clearInterval(typer)
          setTimeout(() => {
            // start next
            i = (i + 1) % lines.length
            setIdx(i)
            setText('')
          }, pause)
        }
      }, speed)
    }

    tick()
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}

function Nav() {
  return (
    <nav className="nav container">
      <div className="brand">Mcquendie Obodos</div>
      <div className="links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
        <a className="cta" href="/Mcquendie_Obodos_Resume.pdf" target="_blank">Resume</a>
      </div>
    </nav>
  )
}

function Hero() {
  const [i, setI] = useState(0)
  const [display, setDisplay] = useState(TAGLINES[0])

  useEffect(() => {
    const timer = setInterval(() => {
      setI((v) => (v + 1) % TAGLINES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => setDisplay(TAGLINES[i]), [i])

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
        <h1>Mcquendie Obodos</h1>
        <div className="typing" style={{ marginBottom: 8 }}>{display}</div>
        <p>I build fast, responsive interfaces and write the copy that turns visitors into clients.</p>
        <div className="actions" style={{ marginTop: 18 }}>
          <a className="btn primary" href="#contact">Let's Build Something</a>
          <a className="btn ghost" href="#work">View My Work</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="portrait" style={{ width: 420, maxWidth: '92%' }}>
          <img src="/assets/portrait.jpg" alt="Mcquendie Obodos" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
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
      <h2>About</h2>
      <h1>I build polished, responsive interfaces — and write the copy that makes people stick around.</h1>
      <p style={{ marginTop: 12 }}>Currently deepening backend skills in C# and Java. Open to freelance, collaboration, and full-time frontend roles.</p>
      <div className="chips">
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
      <div className="services-grid" style={{ marginTop: 18 }}>
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
    { key: 'digilab', title: 'DigiLab', desc: 'Business landing page — sharp, fast, conversion-focused', img: '/assets/digilab.jpg', tech: ['HTML','CSS','JS'] },
    { key: 'greeny', title: 'Greeny', desc: 'Sustainable e-commerce concept — product-first, accessible', img: '/assets/greeny.jpg', tech: ['React','JS','CSS3'] },
    { key: 'polysite', title: 'PolySite', desc: 'Creative agency template — bold, scroll-based energy', img: '/assets/polysite.jpg', tech: ['HTML5','CSS3','JS'] }
  ]

  return (
    <section className="projects container" id="work">
      <h2>Featured Work</h2>
      <h1>Selected projects</h1>
      <div className="projects-grid" style={{ marginTop: 18 }}>
        {items.map(p => (
          <article className="project card" key={p.key}>
            <img src={p.img} alt={p.title} onError={(e)=>{e.currentTarget.style.background='#2f231a'}} />
            <div className="meta">
              <h3>{p.title}</h3>
              <p style={{ color:'var(--text-muted)' }}>{p.desc}</p>
              <div className="tech" style={{ marginTop:8 }}>
                {p.tech.map(t => <span className="chip" key={t}>{t}</span>)}
              </div>
              <div style={{ marginTop:10 }}><a className="btn ghost" href="#" target="_blank">View Live</a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Tech() {
  const items = ['HTML5','CSS3','JavaScript','React','Supabase','Tailwind','Figma','Cursor','Codex','Vercel','Git']
  return (
    <section className="tech container" id="tech">
      <h2>Toolbox</h2>
      <h1>Tech stack</h1>
      <div className="tech-row" style={{ marginTop: 16 }}>
        {items.map(i => <div className="tech-item" key={i}>{i}</div>)}
      </div>
    </section>
  )
}

function Contact() {
  const socials = [
    ['LinkedIn','https://www.linkedin.com'],
    ['GitHub','https://github.com'],
    ['Instagram','https://instagram.com'],
    ['TikTok','https://tiktok.com'],
    ['X','https://x.com'],
    ['Facebook','https://facebook.com'],
    ['Threads','https://www.threads.net'],
    ['WhatsApp','https://wa.me/']
  ]

  return (
    <section className="contact container" id="contact">
      <h2>Let's Build Something</h2>
      <h1>Got a project in mind, or just want to talk shop?</h1>
      <p style={{ marginTop: 12 }}>I'm always up for a good conversation.</p>
      <div className="cta-row" style={{ marginTop: 18 }}>
        <a className="btn primary" href="mailto:hello@mcquendie.com">hello@mcquendie.com</a>
        <a className="btn ghost" href="/Mcquendie_Obodos_Resume.pdf" target="_blank">Download Resume</a>
      </div>

      <div className="social-grid">
        {socials.map(s => (
          <a key={s[0]} className="social" href={s[1]} target="_blank" rel="noreferrer">
            <span style={{ width:12, height:12, borderRadius:4, background: 'linear-gradient(90deg,var(--caramel),var(--copper))' }} />
            <span>{s[0]}</span>
          </a>
        ))}
      </div>
    </section>
  )
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
