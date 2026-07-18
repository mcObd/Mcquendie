import { forwardRef, useEffect, useState, useRef } from 'react'
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

function Nav({ onNavigate, onOpenPrivacy }) {
  const [open, setOpen] = useState(false)
  const handleNavClick = (e, selector) => {
    e.preventDefault()
    if (selector === '#privacy') {
      onOpenPrivacy()
    } else {
      onNavigate()
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  return (
    <nav className="nav container">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="brand">Mcquendie Obodos</div>
      </div>

      <div className="links" aria-hidden={open ? 'false' : 'true'}>
        <a href="#about" onClick={(e)=>handleNavClick(e,'#about')}>About</a>
        <a href="#services" onClick={(e)=>handleNavClick(e,'#services')}>Services</a>
        <a href="#work" onClick={(e)=>handleNavClick(e,'#work')}>Work</a>
        <a href="#contact" onClick={(e)=>handleNavClick(e,'#contact')}>Contact</a>
        <a href="#privacy" onClick={(e)=>handleNavClick(e,'#privacy')}>Privacy</a>
        <a className="cta" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Resume</a>
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
          <a href="#about" onClick={(e) => { handleNavClick(e, '#about') }}>About</a>
          <a href="#services" onClick={(e) => { handleNavClick(e, '#services') }}>Services</a>
          <a href="#work" onClick={(e) => { handleNavClick(e, '#work') }}>Work</a>
          <a href="#contact" onClick={(e) => { handleNavClick(e, '#contact') }}>Contact</a>
          <a href="#privacy" onClick={(e) => { handleNavClick(e, '#privacy') }}>Privacy</a>
          <a className="cta" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Resume</a>
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
      const portrait = document.querySelector('.portrait')
      if (portrait) portrait.style.transform = `translateY(${y * 0.02}px)`
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
        <div className="portrait reveal" style={{ width: '100%', maxWidth: 420 }}>
          <img src={portraitImg} alt="Mcquendie Obodos" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />
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
          <div style={{display:'flex', gap:12, alignItems:'center'}}><FaPaintBrush size={28} style={{color:'var(--accent)'}} /><h3>Web Design</h3></div>
          <p>Interfaces people actually want to use — clean, intentional, and built to convert.</p>
        </div>
        <div className="card">
          <div style={{display:'flex', gap:12, alignItems:'center'}}><FaLaptopCode size={28} style={{color:'var(--accent)'}} /><h3>Web Development</h3></div>
          <p>Fast, responsive builds with clean component architecture, from landing page to full product.</p>
        </div>
        <div className="card">
          <div style={{display:'flex', gap:12, alignItems:'center'}}><FaFileAlt size={28} style={{color:'var(--accent)'}} /><h3>Copywriting & SEO</h3></div>
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
            <img src={p.img} alt={p.title} onError={(e)=>{e.currentTarget.style.background='#f6f4ef'}} />
            <div className="meta">
              <h3>{p.title}</h3>
              <p style={{ color:'var(--text-muted)' }}>{p.desc}</p>
              <div className="tech" style={{ marginTop:8 }}>
                {p.tech.map(t => <span className="chip" key={t}>{t}</span>)}
              </div>
              <div style={{ marginTop:10 }}><a className="btn ghost" href={p.url} target="_blank" rel="noopener noreferrer">View Live</a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Tech() {
  const items = [
    { k: 'HTML5', img: html5Img },
    { k: 'CSS3', img: css3Img },
    { k: 'JavaScript', img: javascriptImg },
    { k: 'React', img: reactImg },
    { k: 'Supabase', img: supabaseImg },
    { k: 'Tailwind', img: tailwindImg },
    { k: 'Figma', img: figmaImg },
    { k: 'Cursor', img: cursorImg },
    { k: 'Codex', img: codexImg },
    { k: 'Vercel', img: vercelImg },
    { k: 'Git', img: gitImg }
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, containScroll: 'trimSnaps', align: 'center', draggable: true, speed: 8 })

  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = setInterval(() => {
      if (!emblaApi) return
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 2800)
    return () => clearInterval(autoScroll)
  }, [emblaApi])

  return (
    <section className="tech container" id="tech">
      <h2>Toolbox</h2>
      <h1>Tech stack</h1>
      <div className="tech-row reveal" style={{ marginTop: 16 }}>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {items.map(i => (
              <div className="embla__slide" key={i.k}>
                <div className="tech-card" title={i.k}>
                  <div className="tech-image">
                    <img src={i.img} alt={i.k} />
                  </div>
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

function Contact() {
    const socials = [
      { name: 'LinkedIn', class: 'linkedin', url: 'https://www.linkedin.com/in/mcquendie-obodos-0536883aa/', icon: <FaLinkedin size={24} /> },
      { name: 'Email', class: 'email', url: 'mailto:obodosmcquendie@gmail.com', icon: <FaGithub size={24} /> },
      { name: 'TikTok', class: 'tiktok', url: 'https://www.tiktok.com/@mcquendie_?_t=ZM-8xchTobGSxk&_r=1', icon: <SiTiktok size={24} /> },
      { name: 'Instagram', class: 'instagram', url: 'https://www.instagram.com/mcquendie_?igsh=MTIveTh3cHhpa2VyaA==', icon: <FaInstagram size={24} /> },
      { name: 'X', class: 'x', url: 'https://x.com/Mcquendie', icon: <FaTwitter size={24} /> },
      { name: 'Facebook', class: 'facebook', url: 'https://www.facebook.com/mcquendie.obodos?rdid=CD2DsSKwCykU5hoo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GrENVQY8S%2F#', icon: <FaFacebook size={24} /> },
      { name: 'Threads', class: 'threads', url: 'https://www.threads.com/@mcquendie_', icon: <SiThreads size={24} /> },
      { name: 'WhatsApp', class: 'whatsapp', url: 'https://wa.me/message/PR6PLI5D6K4MJ1', icon: <FaWhatsapp size={24} /> },
      { name: 'GitHub', class: 'github', url: 'https://github.com/mcObd', icon: <FaGithub size={24} /> }
    ]

  return (
    <section className="contact container" id="contact">
      <h2>Let's Build Something</h2>
      <h1>Got a project in mind, or just want to talk shop?</h1>
      <p style={{ marginTop: 12 }}>I'm always up for a good conversation.</p>
      <div className="cta-row reveal" style={{ marginTop: 18 }}>
        <a className="btn primary" href="mailto:obodosmcquendie@gmail.com">obodosmcquendie@gmail.com</a>
        <a className="btn ghost" href={resumePdf} download="Mcquendie_Obodos_Resume.pdf">Download Resume</a>
      </div>

      <div className="social-grid reveal">
        {socials.map(s => (
          <a key={s.name} className="social" href={s.url} target="_blank" rel="noopener noreferrer">
            <span className="icon">{s.icon}</span>
            <span style={{ marginLeft:8 }}>{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

const PrivacyPolicy = forwardRef(function PrivacyPolicy(_, ref) {
  return (
    <section className="privacy container" id="privacy" ref={ref}>
      <h2>Privacy Policy</h2>
      <h1>How this website handles your information</h1>
      <div className="privacy-content reveal">
        <p>
          This website is a personal portfolio for Mcquendie Obodos. It does not sell, rent, or trade visitor information.
        </p>
        <p>
          If you contact me by email, WhatsApp, or any linked social platform, I may receive the information you choose to send, such as your name, email address, phone number, message, or project details. I use that information only to respond to you and discuss the work you contacted me about.
        </p>
        <p>
          This site may link to third-party websites and platforms, including LinkedIn, GitHub, Instagram, TikTok, X, Facebook, Threads, WhatsApp, and live project links. Those services have their own privacy policies and practices.
        </p>
        <p>
          The site may be hosted by a third-party hosting provider that processes standard technical data such as IP address, browser type, device information, and request logs for security, performance, and reliability.
        </p>
        <p>
          To request access, correction, or deletion of information you have sent directly to me, contact me at <a href="mailto:obodosmcquendie@gmail.com">obodosmcquendie@gmail.com</a>.
        </p>
        <p>Last updated: July 18, 2026.</p>
      </div>
    </section>
  )
})

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


function Footer({ onOpenPrivacy }) {
  return (
    <footer className="footer container">
      <div>© {new Date().getFullYear()} Mcquendie Obodos</div>
      <div style={{ display:'flex', gap:12 }}>
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
        <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenPrivacy() }}>Privacy</a>
      </div>
    </footer>
  )
}

function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const privacyRef = useRef(null)

  useReveal()

  const showPrivacy = () => {
    setPrivacyOpen(true)
    setTimeout(() => {
      const el = privacyRef.current || document.querySelector('#privacy')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  useEffect(() => {
    if (!privacyOpen) return
    const el = privacyRef.current || document.querySelector('#privacy')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [privacyOpen])

  return (
    <div className="app">
      <Nav onNavigate={() => setPrivacyOpen(false)} onOpenPrivacy={showPrivacy} />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Tech />
        <Contact />
        {privacyOpen && <PrivacyPolicy ref={privacyRef} />}
      </main>
      <Footer onOpenPrivacy={showPrivacy} />
    </div>
  )
}

export default App
