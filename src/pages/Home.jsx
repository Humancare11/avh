import { useState, useEffect, useRef } from "react";
import "./home.css";

// ── Icons (inline SVG components) ────────────────────────────────────────────
const Icon = ({ name, size = 24 }) => {
  const icons = {
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    briefcase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    trendingUp: (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
),
    clipboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      </svg>
    ),
    scale: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    arrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    ),
    phone: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 5.99 6l1.03-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.03z"/>
      </svg>
    ),
    mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    mapPin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    linkedin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    twitter: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    facebook: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    trending: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    award: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    quote: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
      </svg>
    ),
  };
  return <span className="icon">{icons[name] || null}</span>;
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <div className="navbar__logo" onClick={() => scrollTo("hero")}>
          <span className="logo__icon"><Icon name="shield" size={20} /></span>
          <span className="logo__text">AVHR <span>SOLUTIONS</span></span>
        </div>
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {["about", "services", "process", "testimonials", "contact"].map((id) => (
            <li key={id}><button onClick={() => scrollTo(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</button></li>
          ))}
          <li><button className="btn btn--nav" onClick={() => scrollTo("contact")}>Get Started</button></li>
        </ul>
        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Icon name={menuOpen ? "x" : "menu"} size={22} />
        </button>
      </div>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>
      <div className="hero__content">
        <div className="hero__badge">
          <Icon name="award" size={14} />
          <span>Trusted HR & Business Partner</span>
        </div>
        <h1 className="hero__headline">
          Empowering Businesses with<br />
          <span className="hero__headline--gradient">Smarter HR Solutions</span>
        </h1>
        <p className="hero__sub">
          From manpower outsourcing to legal compliance and digital support — AVHR Solutions
          delivers end-to-end business services designed for modern enterprises.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
            Get Started <Icon name="arrowRight" size={16} />
          </button>
          <button className="btn btn--outline" onClick={() => scrollTo("services")}>
            Explore Services
          </button>
        </div>
        <div className="hero__stats">
          {[["500+", "Clients Served"], ["10+", "Years Experience"], ["98%", "Retention Rate"]].map(([val, label]) => (
            <div className="hero__stat" key={label}>
              <span className="hero__stat-val">{val}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__card hero__card--main glass">
          <div className="hcard__head">
            <span className="hcard__dot hcard__dot--green" />
            <span className="hcard__title">Active Workforce Dashboard</span>
          </div>
          <div className="hcard__metrics">
            {[["Outsourced Staff", "240", "+12%"], ["Compliance Score", "99.2%", "↑ 2.1"], ["Open Positions", "18", "−3"]].map(([k, v, d]) => (
              <div className="hcard__metric" key={k}>
                <span className="hcard__key">{k}</span>
                <div className="hcard__row">
                  <span className="hcard__val">{v}</span>
                  <span className="hcard__delta">{d}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hcard__bar-group">
            {[80, 65, 90, 55, 75].map((w, i) => (
              <div className="hcard__bar-wrap" key={i}>
                <div className="hcard__bar" style={{ "--w": `${w}%`, "--delay": `${i * 0.12}s` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero__card hero__card--pill glass">
          <Icon name="check" size={14} /><span>Payroll processed on time</span>
        </div>
        <div className="hero__card hero__card--pill glass hero__card--pill2">
          <Icon name="shield" size={14} /><span>100% Legal Compliance</span>
        </div>
      </div>
    </section>
  );
};

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => {
  const reasons = [
    { icon: "shield", title: "Compliance-First", desc: "We keep your business fully aligned with all statutory and legal requirements." },
    { icon: "trending", title: "Scalable Solutions", desc: "Our services grow with your business — from startups to large enterprises." },
    { icon: "award", title: "Expert Team", desc: "Industry veterans with deep HR, legal, and technology expertise." },
    { icon: "users", title: "People-Centric", desc: "We treat your workforce as our own — with care, precision, and professionalism." },
  ];

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <div className="section__badge">About AVHR Solutions</div>
            <h2 className="section__title">Your Dedicated HR &amp; Business Support Partner</h2>
            <p className="about__body">
              AVHR Solutions is a full-spectrum HR and business support firm built for the modern
              enterprise. We partner with organizations across industries to streamline workforce
              management, ensure legal compliance, and accelerate digital growth.
            </p>
            <p className="about__body">
              With a client-first philosophy and a team of seasoned professionals, we bridge the gap
              between people, process, and performance — so you can focus on what truly matters:
              building your business.
            </p>
            <div className="about__pills">
              {["ISO Certified Processes", "Pan-India Presence", "24/7 Support"].map(p => (
                <span className="about__pill" key={p}><Icon name="check" size={13} />{p}</span>
              ))}
            </div>
          </div>
          <div className="about__right">
            {reasons.map((r) => (
              <div className="about__card glass" key={r.title}>
                <div className="about__card-icon"><Icon name={r.icon} size={20} /></div>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "users", title: "Manpower Outsourcing",
    desc: "End-to-end staffing solutions — from sourcing and screening to deployment and management. We provide skilled, semi-skilled, and contract workforce tailored to your needs.",
    features: ["Permanent & Contract Staffing", "Background Verification", "Workforce Deployment"],
  },
  {
    icon: "briefcase", title: "Payroll & Legal Compliances",
    desc: "Accurate, timely payroll processing with full statutory compliance including PF, ESI, PT, TDS, and more. Say goodbye to compliance headaches forever.",
    features: ["PF / ESI / PT Management", "TDS Filing & Returns", "Salary Structuring"],
  },
  {
    icon: "clipboard", title: "HR Consultancy",
    desc: "Strategic HR advisory to optimize your human capital — from policy design, performance frameworks, to culture transformation and organizational restructuring.",
    features: ["HR Policy Drafting", "Performance Management", "Org Development"],
  },
  {
    icon: "scale", title: "Legal Support",
    desc: "Expert legal assistance for labor law compliance, employment contracts, dispute resolution, and regulatory guidance to protect your business at every step.",
    features: ["Employment Contracts", "Labor Law Advisory", "Dispute Resolution"],
  },
  {
    icon: "globe", title: "Website Support",
    desc: "Professional web solutions — design, development, maintenance, and performance optimization — to establish and elevate your digital presence.",
    features: ["Web Design & Development", "SEO & Performance", "Ongoing Maintenance"],
  },
{
  icon: "trending-up",
  title: "Digital Marketing Support",
  desc: "Grow your business online with result-driven digital marketing strategies including SEO, social media, and paid advertising.",
  features: [
    "Social Media Management",
    "SEO Optimization",
    "Google Ads & Meta Ads",
    "Content Strategy & Planning"
  ],
},
];

const Services = () => (
  <section className="services section" id="services">
    <div className="container">
      <div className="section__header">
        <div className="section__badge">What We Offer</div>
        <h2 className="section__title">Comprehensive Business Services</h2>
        <p className="section__sub">Five pillars designed to support every dimension of your business operations.</p>
      </div>
      <div className="services__grid">
        {services.map((s, i) => (
          <div className="service-card glass" key={s.title} style={{ "--i": i }}>
            <div className="service-card__icon"><Icon name={s.icon} size={24} /></div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <ul className="service-card__features">
              {s.features.map(f => <li key={f}><Icon name="check" size={13} />{f}</li>)}
            </ul>
            <div className="service-card__arrow"><Icon name="arrowRight" size={16} /></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Process ───────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Initial Consultation", desc: "We begin with a deep-dive discovery session to understand your business goals, challenges, and workforce requirements." },
  { num: "02", title: "Tailored Proposal", desc: "Our team crafts a customized service plan with clear deliverables, timelines, and transparent pricing." },
  { num: "03", title: "Onboarding & Setup", desc: "Seamless onboarding with dedicated account management, system integration, and team alignment." },
  { num: "04", title: "Execution & Delivery", desc: "We execute with precision — delivering results on time, within budget, and beyond expectations." },
  { num: "05", title: "Review & Optimize", desc: "Continuous performance monitoring, feedback loops, and proactive optimization to ensure lasting value." },
];

const Process = () => (
  <section className="process section" id="process">
    <div className="process__bg"><div className="process__glow" /></div>
    <div className="container">
      <div className="section__header">
        <div className="section__badge">How We Work</div>
        <h2 className="section__title">Our Proven 5-Step Process</h2>
        <p className="section__sub">A structured, transparent approach that delivers results from day one.</p>
      </div>
      <div className="process__steps">
        {steps.map((s, i) => (
          <div className="process__step" key={s.num}>
            <div className="process__step-num">{s.num}</div>
            <div className="process__step-content glass">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
            {i < steps.length - 1 && <div className="process__connector" />}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Rajesh Mehta", role: "CEO, TechNova India", text: "AVHR Solutions transformed our HR operations entirely. Their payroll accuracy and compliance support saved us enormous time and legal risk. Highly recommended.", rating: 5 },
  { name: "Priya Sharma", role: "HR Director, BuildRight Group", text: "Their manpower outsourcing team is exceptional. Placements are precise, onboarding is smooth, and the ongoing support is world-class.", rating: 5 },
  { name: "Anil Kapoor", role: "MD, Vertex Manufacturing", text: "From legal compliance to website development, AVHR handles it all under one roof. It's like having an extended in-house team.", rating: 5 },
];

const Testimonials = () => (
  <section className="testimonials section" id="testimonials">
    <div className="container">
      <div className="section__header">
        <div className="section__badge">Client Stories</div>
        <h2 className="section__title">What Our Clients Say</h2>
        <p className="section__sub">Real results from real businesses that trusted AVHR Solutions.</p>
      </div>
      <div className="testimonials__grid">
        {testimonials.map((t) => (
          <div className="testimonial-card glass" key={t.name}>
            <div className="testimonial-card__quote"><Icon name="quote" size={28} /></div>
            <p className="testimonial-card__text">{t.text}</p>
            <div className="testimonial-card__stars">
              {[...Array(t.rating)].map((_, i) => <Icon name="star" size={14} key={i} />)}
            </div>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">{t.name[0]}</div>
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <div className="container">

        <div className="section__header">
          <div className="section__badge">Get In Touch</div>
          <h2 className="section__title">Contact Us</h2>
          <p className="section__sub">
            Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="contact__cards">

          {/* Phone */}
          <a href="tel:+919890333506" className="contact__card">
            <div className="contact__icon">
              <Icon name="phone" size={22} />
            </div>
            <h3>Call Us</h3>
            <p>+91 9890333506</p>
          </a>

          {/* Email */}
          <a href="mailto:avhrsolutions.india@gmail.com" className="contact__card">
            <div className="contact__icon">
              <Icon name="mail" size={22} />
            </div>
            <h3>Email</h3>
            <p>avhrsolutions.india@gmail.com</p>
          </a>

          {/* Address */}
          <div className="contact__card">
            <div className="contact__icon">
              <Icon name="mapPin" size={22} />
            </div>
            <h3>Location</h3>
            <p>Mumbai, Maharashtra, India</p>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/+919890333506"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card"
          >
            <div className="contact__icon">
              <Icon name="messageCircle" size={22} />
            </div>
            <h3>WhatsApp</h3>
            <p>+919890333506</p>
          </a>

        </div>

      </div>
    </section>
  );
};


// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="navbar__logo footer__logo">
                <span className="logo__icon"><Icon name="shield" size={18} /></span>
                <span className="logo__text">AVHR <span>SOLUTIONS</span></span>
              </div>
              <p>Empowering businesses with smart HR, legal, and digital solutions. Your growth is our mission.</p>
              <div className="footer__socials">
                {[["linkedin", "#"], ["twitter", "#"], ["facebook", "#"]].map(([name, href]) => (
                  <a href={href} key={name} className="footer__social" aria-label={name}><Icon name={name} size={16} /></a>
                ))}
              </div>
            </div>
            <div className="footer__col">
              <h4>Services</h4>
              <ul>{services.map(s => <li key={s.title}><button onClick={() => scrollTo("services")}>{s.title}</button></li>)}</ul>
            </div>
            <div className="footer__col">
              <h4>Quick Links</h4>
              <ul>
                {[["About Us", "about"], ["How We Work", "process"], ["Testimonials", "testimonials"], ["Contact", "contact"]].map(([l, id]) => (
                  <li key={l}><button onClick={() => scrollTo(id)}>{l}</button></li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h4>Contact</h4>
              <ul className="footer__contact-list">
                <li><Icon name="phone" size={14} />+919890333506</li>
                <li><Icon name="mail" size={14} />avhrsolutions.india@gmail.com</li>
                <li><Icon name="mapPin" size={14} />Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} AVHR Solutions. All rights reserved.</p>
          <p>Designed &amp; Developed with <span style={{ color: "#2E90FA" }}>♥</span> for modern enterprises.</p>
        </div>
      </div>
    </footer>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function AVHRSolutions() {
  return (
    <div className="avhr-app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}