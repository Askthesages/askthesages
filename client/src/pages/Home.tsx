import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  Star, Moon, Brain, Heart, Target, Sparkles, Zap,
  ChevronRight, Sun, Compass, ExternalLink, Map
} from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663245540972/YY5XDNPyQ9dVwNGQnjcsSf/ATSlogo_3b4d0acb.PNG";

// ─── FLAGSHIP PRODUCT URLS ───────────────────────────────────────────────────
const CONSCIOUSNESS_MAP_URL = "#consciousness-map";
const ENERGY_ARCHETYPE_URL  = "#energy-archetype";
const JUNGIAN_ARCHETYPE_URL = "#jungian-archetype";
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Moon,
    title: "Birth Chart Reading",
    description: "Discover your cosmic blueprint. AI-powered Vedic birth chart analysis — validated by human behavior specialists — reveals your life path, strengths, and destiny.",
    href: "/birth-chart",
    color: "#C4705A",
    bg: "#FDF0EC",
  },
  {
    icon: Brain,
    title: "Personality Quiz",
    description: "Uncover your entrepreneurial archetype with our AI-driven personality assessment, developed with real psychologists and human behavior specialists. Know your edge.",
    href: "/quiz",
    color: "#8B6914",
    bg: "#FDF6E3",
  },
  {
    icon: Sun,
    title: "Zodiac Profiles",
    description: "Explore deep entrepreneur insights for all 12 zodiac signs. Understand your cosmic strengths in business.",
    href: "/zodiac",
    color: "#B85C00",
    bg: "#FEF3E8",
  },
  {
    icon: Compass,
    title: "Planetary Influences",
    description: "Track how planetary transits affect your business decisions, energy, and opportunities in real time.",
    href: "/planets",
    color: "#5C7A3E",
    bg: "#F0F5EB",
  },
  {
    icon: Heart,
    title: "Daily Affirmations",
    description: "Sacred affirmations from the Vedas, Upanishads, and Bhagavad Gita — AI-curated and reviewed by human behavior specialists. Start each day empowered.",
    href: "/affirmations",
    color: "#8B2E2E",
    bg: "#FDF0F0",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Align your business goals with cosmic timing. AI-guided frameworks co-designed with psychologists to help you set intentions that resonate with your astrological blueprint.",
    href: "/goals",
    color: "#5C4A8B",
    bg: "#F3F0FA",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "Tech Founder",
    text: "The birth chart reading was mind-blowing. It pinpointed my leadership style and blind spots with uncanny accuracy.",
    sign: "♏ Scorpio",
  },
  {
    name: "Marcus T.",
    role: "Serial Entrepreneur",
    text: "I use the daily affirmations every morning. They're perfectly aligned with where I am in my business cycle.",
    sign: "♈ Aries",
  },
  {
    name: "Aisha K.",
    role: "Business Coach",
    text: "The personality quiz gave me language for my strengths I never had before. Game changer for my coaching practice.",
    sign: "♎ Libra",
  },
];

// Vedic decorative SVG divider
const VedicDivider = () => (
  <div className="flex items-center justify-center gap-3 my-6">
    <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, transparent, #C9A227)" }} />
    <span style={{ color: "#C9A227", fontSize: "1.4rem", fontFamily: "serif" }}>ॐ</span>
    <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, #C9A227, transparent)" }} />
  </div>
);

// Lotus petal background decoration
const LotusDecoration = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
    <svg viewBox="0 0 800 800" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="400" cy="400" rx="180" ry="80"
          fill="none" stroke="#B85C00" strokeWidth="1.5"
          transform={`rotate(${i * 30} 400 400)`}
        />
      ))}
      <circle cx="400" cy="400" r="60" fill="none" stroke="#B85C00" strokeWidth="1.5" />
      <circle cx="400" cy="400" r="120" fill="none" stroke="#B85C00" strokeWidth="1" />
      <circle cx="400" cy="400" r="200" fill="none" stroke="#B85C00" strokeWidth="0.8" />
    </svg>
  </div>
);

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #F9F3E8 0%, #F5EDD8 40%, #F8F1E4 70%, #F6EDE0 100%)" }}
      >
        <LotusDecoration />

        {/* Temple arch top border */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 20%, #B85C00 50%, #C9A227 80%, transparent 100%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <div className="absolute inset-0 rounded-full blur-2xl scale-150" style={{ background: "radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)" }} />
              <div className="relative rounded-full p-1" style={{ background: "linear-gradient(135deg, #C9A227, #B85C00, #C9A227)", padding: "3px" }}>
                <img
                  src={LOGO_URL}
                  alt="Ask The Sages"
                  className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full object-cover"
                  style={{ background: "#F9F3E8" }}
                />
              </div>
            </div>
          </div>

          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ border: "1px solid rgba(201,162,39,0.4)", background: "rgba(201,162,39,0.08)" }}
          >
            <span style={{ color: "#C9A227", fontSize: "0.9rem" }}>ॐ</span>
            <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "#8B6914" }}>
              Ancient Wisdom · Modern Soul
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-cinzel font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4"
            style={{ color: "#3D1C02" }}
          >
            Unlock Your
            <br />
            <span style={{ background: "linear-gradient(135deg, #B85C00, #C9A227, #8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Cosmic Blueprint
            </span>
          </h1>

          <VedicDivider />

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#6B4C2A" }}>
            Where Vedic astrology meets modern psychology — powerful AI-driven insights, crafted in collaboration with{" "}
            <span className="font-semibold" style={{ color: "#B85C00" }}>real human psychologists and behavior specialists</span>,
            for seekers ready to align their purpose with the cosmos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="font-cinzel font-bold text-base px-8 py-6 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0", boxShadow: "0 4px 20px rgba(184,92,0,0.35)", border: "none" }}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button
                  size="lg"
                  className="font-cinzel font-bold text-base px-8 py-6 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0", boxShadow: "0 4px 20px rgba(184,92,0,0.35)", border: "none" }}
                >
                  <Star className="h-5 w-5 mr-2" />
                  Begin Your Journey
                </Button>
              </a>
            )}
            <Link href="/birth-chart">
              <Button
                size="lg"
                variant="outline"
                className="font-cinzel font-semibold text-base px-8 py-6 rounded-xl bg-transparent"
                style={{ border: "2px solid rgba(184,92,0,0.5)", color: "#B85C00" }}
              >
                <Moon className="h-5 w-5 mr-2" />
                Read My Chart
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-xs font-cinzel tracking-wider" style={{ color: "#A07840" }}>
            — Trusted by seekers worldwide —
          </p>
        </div>

        {/* Flagship CTA Cards */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-16 px-4">
          <p className="text-center text-xs font-cinzel uppercase tracking-widest mb-6" style={{ color: "#A07840" }}>
            ✦ Our Flagship Tools ✦
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 — Consciousness Map */}
            <a href={CONSCIOUSNESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 text-center"
                style={{ background: "#FDF6E8", border: "1px solid rgba(201,162,39,0.35)", boxShadow: "0 2px 12px rgba(184,92,0,0.08)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)" }}
                >
                  <Map className="h-6 w-6" style={{ color: "#8B6914" }} />
                </div>
                <p className="font-cinzel font-bold text-sm mb-1" style={{ color: "#3D1C02" }}>Consciousness Map</p>
                <p className="text-[11px] mb-3" style={{ color: "#8A7E72" }}>Vedic birth chart AI reading</p>
                <div className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs px-4 py-2 rounded-lg"
                  style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0" }}
                >
                  Start Reading <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>

            {/* Card 2 — Energy Archetype */}
            <a href={ENERGY_ARCHETYPE_URL} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 text-center"
                style={{ background: "#FEF3E8", border: "1px solid rgba(184,92,0,0.3)", boxShadow: "0 2px 12px rgba(184,92,0,0.08)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(184,92,0,0.10)", border: "1px solid rgba(184,92,0,0.25)" }}
                >
                  <Zap className="h-6 w-6" style={{ color: "#B85C00" }} />
                </div>
                <p className="font-cinzel font-bold text-sm mb-1" style={{ color: "#3D1C02" }}>Energy Archetype</p>
                <p className="text-[11px] mb-3" style={{ color: "#8A7E72" }}>Free assessment · Instant results</p>
                <div className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs px-4 py-2 rounded-lg"
                  style={{ background: "transparent", border: "1.5px solid #B85C00", color: "#B85C00" }}
                >
                  Free Test <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>

            {/* Card 3 — Jungian Archetype */}
            <a href={JUNGIAN_ARCHETYPE_URL} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 text-center"
                style={{ background: "#F3F0FA", border: "1px solid rgba(92,74,139,0.25)", boxShadow: "0 2px 12px rgba(92,74,139,0.06)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(92,74,139,0.10)", border: "1px solid rgba(92,74,139,0.25)" }}
                >
                  <Brain className="h-6 w-6" style={{ color: "#5C4A8B" }} />
                </div>
                <p className="font-cinzel font-bold text-sm mb-1" style={{ color: "#3D1C02" }}>Jungian Archetype</p>
                <p className="text-[11px] mb-3" style={{ color: "#8A7E72" }}>Modern psychology · Deep insight</p>
                <div className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs px-4 py-2 rounded-lg"
                  style={{ background: "transparent", border: "1.5px solid #5C4A8B", color: "#5C4A8B" }}
                >
                  Take Test <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(201,162,39,0.4)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: "#C9A227" }} />
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-20 px-4" style={{ background: "#F9F3E8" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.07)" }}
            >
              <Star className="h-3 w-3" style={{ color: "#C9A227" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "#8B6914" }}>Sacred Instruments</span>
            </div>
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl mb-4" style={{ color: "#3D1C02" }}>
              Your Complete{" "}
              <span style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Vedic Toolkit
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base" style={{ color: "#6B4C2A" }}>
              Six AI-powered tools designed to help you understand yourself, align with cosmic timing, and build with purpose.
            </p>
            <VedicDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href}>
                  <div className="group rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 h-full"
                    style={{
                      background: feature.bg,
                      border: `1px solid ${feature.color}30`,
                      boxShadow: "0 2px 12px rgba(61,28,2,0.06)"
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}35` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="font-cinzel font-semibold text-base mb-2" style={{ color: "#3D1C02" }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B4C2A" }}>
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 transition-colors" style={{ color: feature.color }}>
                      <span className="text-xs font-cinzel">Explore</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-4" style={{ background: "#F2E8D5" }}>
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl mb-4" style={{ color: "#3D1C02" }}>
              The{" "}
              <span style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Sacred Path
              </span>
            </h2>
            <VedicDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Create Your Profile", desc: "Sign in and enter your birth details to unlock your personalized Vedic cosmic dashboard.", icon: Star },
              { step: "02", title: "Explore Your Tools", desc: "Access AI-powered birth chart readings, personality quizzes, and daily mindset resources.", icon: Compass },
              { step: "03", title: "Align & Grow", desc: "Apply cosmic insights to your life strategy, daily habits, and entrepreneurial goals.", icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ border: "2px solid rgba(201,162,39,0.4)", background: "rgba(201,162,39,0.08)", boxShadow: "0 0 15px rgba(201,162,39,0.15)" }}
                  >
                    <Icon className="h-7 w-7" style={{ color: "#C9A227" }} />
                    <span className="absolute -top-2 -right-2 text-[10px] font-cinzel font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ background: "#B85C00", color: "#FFF8F0" }}
                    >
                      {item.step.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-cinzel font-semibold text-base mb-2" style={{ color: "#3D1C02" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B4C2A" }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4" style={{ background: "#F9F3E8" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl mb-4" style={{ color: "#3D1C02" }}>
              Voices of the{" "}
              <span style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Seekers
              </span>
            </h2>
            <VedicDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl p-6"
                style={{ background: "#FFFAF2", border: "1px solid rgba(201,162,39,0.25)", boxShadow: "0 2px 16px rgba(61,28,2,0.06)" }}
              >
                {/* Quote mark */}
                <div className="text-4xl font-serif mb-2 leading-none" style={{ color: "rgba(184,92,0,0.25)" }}>"</div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" style={{ fill: "#C9A227", color: "#C9A227" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#4A3520" }}>"{t.text}"</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(201,162,39,0.2)" }}>
                  <div>
                    <p className="font-cinzel font-semibold text-sm" style={{ color: "#3D1C02" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#8A7E72" }}>{t.role}</p>
                  </div>
                  <span className="text-lg" style={{ color: "#B85C00" }}>{t.sign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-4" style={{ background: "#F2E8D5" }}>
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #3D1C02 0%, #6B3A1F 40%, #4A2810 100%)",
              boxShadow: "0 8px 40px rgba(61,28,2,0.30)"
            }}
          >
            {/* Decorative lotus overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
              <svg viewBox="0 0 800 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <ellipse key={i} cx="400" cy="200" rx="300" ry="100"
                    fill="none" stroke="#C9A227" strokeWidth="1.5"
                    transform={`rotate(${i * 22.5} 400 200)`}
                  />
                ))}
              </svg>
            </div>

            {/* Top gold border */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #C9A227, #B85C00, #C9A227, transparent)" }} />

            <div className="relative z-10">
              <div className="text-3xl mb-4" style={{ color: "#C9A227" }}>ॐ</div>
              <h2 className="font-cinzel font-bold text-2xl sm:text-3xl mb-3" style={{ color: "#F9F3E8" }}>
                Ancient Wisdom for the{" "}
                <span style={{ background: "linear-gradient(135deg, #C9A227, #E8B84B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Modern Soul Searcher
                </span>
              </h2>
              <p className="mb-8 max-w-lg mx-auto text-sm sm:text-base" style={{ color: "#D4B896" }}>
                Unlock your cosmic blueprint. Our tools bridge the timeless wisdom of the Vedic sages with cutting-edge AI — validated by real human psychologists — for today's most conscious seekers.
              </p>
              <a href={getLoginUrl()}>
                <Button
                  size="lg"
                  className="font-cinzel font-bold text-base px-10 py-6 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #C9A227, #E8B84B)", color: "#3D1C02", boxShadow: "0 4px 20px rgba(201,162,39,0.4)", border: "none" }}
                >
                  <Star className="h-5 w-5 mr-2" />
                  Start for Free
                </Button>
              </a>
            </div>

            {/* Bottom gold border */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, #C9A227, #B85C00, #C9A227, transparent)" }} />
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
