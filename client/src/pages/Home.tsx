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
// TODO: Replace placeholder hrefs with real URLs when ready
const CONSCIOUSNESS_MAP_URL = "#consciousness-map";   // ← Replace with your Claude/Jyotish prompt URL
const ENERGY_ARCHETYPE_URL  = "#energy-archetype";    // ← Replace with your Energy Archetype Test URL
const JUNGIAN_ARCHETYPE_URL = "#jungian-archetype";   // ← Replace with your Jungian Archetype Test URL
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Moon,
    title: "Birth Chart Reading",
    description: "Discover your cosmic blueprint. AI-powered Vedic birth chart analysis — validated by human behavior specialists — reveals your life path, strengths, and destiny.",
    href: "/birth-chart",
    color: "oklch(0.65 0.18 290)",
  },
  {
    icon: Brain,
    title: "Personality Quiz",
    description: "Uncover your entrepreneurial archetype with our AI-driven personality assessment, developed with real psychologists and human behavior specialists. Know your edge.",
    href: "/quiz",
    color: "oklch(0.78 0.14 80)",
  },
  {
    icon: Sun,
    title: "Zodiac Profiles",
    description: "Explore deep entrepreneur insights for all 12 zodiac signs. Understand your cosmic strengths in business.",
    href: "/zodiac",
    color: "oklch(0.70 0.18 50)",
  },
  {
    icon: Compass,
    title: "Planetary Influences",
    description: "Track how planetary transits affect your business decisions, energy, and opportunities in real time.",
    href: "/planets",
    color: "oklch(0.60 0.20 200)",
  },
  {
    icon: Heart,
    title: "Daily Affirmations",
    description: "Sacred affirmations from the Vedas, Upanishads, and Bhagavad Gita — AI-curated and reviewed by human behavior specialists. Start each day empowered.",
    href: "/affirmations",
    color: "oklch(0.65 0.22 350)",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Align your business goals with cosmic timing. AI-guided frameworks co-designed with psychologists to help you set intentions that resonate with your astrological blueprint.",
    href: "/goals",
    color: "oklch(0.65 0.18 150)",
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

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
        {/* Cosmic background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.30_0.12_290/0.12)] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[oklch(0.78_0.14_80/0.06)] blur-3xl" />
          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-foreground/40 animate-twinkle"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <div className="absolute inset-0 rounded-full bg-[oklch(0.78_0.14_80/0.2)] blur-2xl scale-150" />
              <img
                src={LOGO_URL}
                alt="Ask The Sages"
                className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full object-cover border-2 border-[oklch(0.78_0.14_80/0.5)] glow-gold"
              />
            </div>
          </div>

          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.78_0.14_80/0.3)] bg-[oklch(0.78_0.14_80/0.08)] mb-6">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-cinzel text-gold tracking-widest uppercase">
              Ancient Wisdom for the Modern Soul Searcher
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-cinzel font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="gradient-text-gold">Unlock Your</span>
            <br />
            <span className="text-foreground">Cosmic Blueprint</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Where Vedic astrology meets modern psychology — powerful AI-driven insights, crafted in collaboration with <span className="text-gold/80 font-medium">real human psychologists and human behavior specialists</span>, for entrepreneurs ready to align their ambition with the cosmos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold text-base px-8 py-6 rounded-2xl glow-gold animate-pulse-gold"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button
                  size="lg"
                  className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold text-base px-8 py-6 rounded-2xl glow-gold animate-pulse-gold"
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
                className="border-[oklch(0.78_0.14_80/0.4)] text-gold hover:bg-[oklch(0.78_0.14_80/0.08)] font-cinzel font-semibold text-base px-8 py-6 rounded-2xl bg-transparent"
              >
                <Moon className="h-5 w-5 mr-2" />
                Read My Chart
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-xs text-muted-foreground font-cinzel tracking-wider">
            ✦ Trusted by entrepreneurs worldwide ✦
          </p>
        </div>

        {/* Flagship CTA Cards */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-16 px-4">
          <p className="text-center text-xs font-cinzel text-muted-foreground uppercase tracking-widest mb-6">✦ Our Flagship Tools ✦</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 — Consciousness Map */}
            <a
              href={CONSCIOUSNESS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-2xl p-5 border border-[oklch(0.78_0.14_80/0.3)] bg-gradient-to-br from-[oklch(0.65_0.18_290/0.12)] to-[oklch(0.78_0.14_80/0.06)] hover:border-gold hover:glow-gold-sm transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.78_0.14_80/0.12)] border border-[oklch(0.78_0.14_80/0.25)] flex items-center justify-center mx-auto mb-3">
                  <Map className="h-6 w-6 text-gold" />
                </div>
                <p className="font-cinzel font-bold text-gold text-sm mb-1">Consciousness Map</p>
                <p className="text-[11px] text-muted-foreground mb-3">Vedic birth chart AI reading</p>
                <div className="inline-flex items-center gap-1.5 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold text-xs px-4 py-2 rounded-xl">
                  Start Reading <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>

            {/* Card 2 — Energy Archetype */}
            <a
              href={ENERGY_ARCHETYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-2xl p-5 border border-[oklch(0.70_0.18_50/0.3)] bg-gradient-to-br from-[oklch(0.70_0.18_50/0.10)] to-[oklch(0.65_0.22_350/0.05)] hover:border-[oklch(0.70_0.18_50)] hover:shadow-[0_0_20px_oklch(0.70_0.18_50/0.2)] transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.70_0.18_50/0.12)] border border-[oklch(0.70_0.18_50/0.25)] flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6" style={{ color: "oklch(0.70 0.18 50)" }} />
                </div>
                <p className="font-cinzel font-bold text-sm mb-1" style={{ color: "oklch(0.70 0.18 50)" }}>Energy Archetype</p>
                <p className="text-[11px] text-muted-foreground mb-3">Free assessment · Instant results</p>
                <div className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs px-4 py-2 rounded-xl border" style={{ color: "oklch(0.70 0.18 50)", borderColor: "oklch(0.70 0.18 50 / 0.4)", background: "oklch(0.70 0.18 50 / 0.1)" }}>
                  Free Test <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>

            {/* Card 3 — Jungian Archetype */}
            <a
              href={JUNGIAN_ARCHETYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-2xl p-5 border border-[oklch(0.65_0.20_200/0.3)] bg-gradient-to-br from-[oklch(0.65_0.20_200/0.10)] to-[oklch(0.60_0.18_240/0.05)] hover:border-[oklch(0.65_0.20_200)] hover:shadow-[0_0_20px_oklch(0.65_0.20_200/0.2)] transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.65_0.20_200/0.12)] border border-[oklch(0.65_0.20_200/0.25)] flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6" style={{ color: "oklch(0.65 0.20 200)" }} />
                </div>
                <p className="font-cinzel font-bold text-sm mb-1" style={{ color: "oklch(0.65 0.20 200)" }}>Jungian Archetype</p>
                <p className="text-[11px] text-muted-foreground mb-3">Modern psychology · Deep insight</p>
                <div className="inline-flex items-center gap-1.5 font-cinzel font-bold text-xs px-4 py-2 rounded-xl border" style={{ color: "oklch(0.65 0.20 200)", borderColor: "oklch(0.65 0.20 200 / 0.4)", background: "oklch(0.65 0.20 200 / 0.1)" }}>
                  Take Test <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[oklch(0.78_0.14_80/0.3)] flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gold" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.78_0.14_80/0.2)] bg-[oklch(0.78_0.14_80/0.05)] mb-4">
              <Star className="h-3 w-3 text-gold" />
              <span className="text-xs font-cinzel text-gold/80 tracking-widest uppercase">Powerful Tools</span>
            </div>
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Your Complete <span className="gradient-text-gold">Cosmic Toolkit</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Six AI-powered tools designed to help entrepreneurs understand themselves, align with cosmic timing, and build with purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.href} href={feature.href}>
                  <div className="group card-cosmic rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-[oklch(0.78_0.14_80/0.35)] hover:glow-gold-sm hover:-translate-y-1 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="font-cinzel font-semibold text-foreground text-base mb-2 group-hover:text-gold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-gold/60 group-hover:text-gold transition-colors">
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

      {/* How It Works */}
      <section className="py-20 px-4 bg-[oklch(0.10_0.03_280/0.5)]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-4">
              How It <span className="gradient-text-gold">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Create Your Profile", desc: "Sign in and enter your birth details to unlock your personalized cosmic dashboard.", icon: Star },
              { step: "02", title: "Explore Your Tools", desc: "Access AI-powered birth chart readings, personality quizzes, and daily mindset resources.", icon: Compass },
              { step: "03", title: "Align & Grow", desc: "Apply cosmic insights to your business strategy, daily habits, and entrepreneurial goals.", icon: Zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[oklch(0.78_0.14_80/0.3)] bg-[oklch(0.78_0.14_80/0.08)] mb-4 glow-gold-sm">
                    <Icon className="h-7 w-7 text-gold" />
                    <span className="absolute -top-2 -right-2 text-[10px] font-cinzel font-bold text-[oklch(0.08_0.02_280)] bg-gold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.step.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-cinzel font-semibold text-foreground text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-4">
              What <span className="gradient-text-gold">Entrepreneurs</span> Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="card-cosmic rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-cinzel font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <span className="text-lg">{t.sign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-[oklch(0.78_0.14_80/0.25)] bg-[oklch(0.12_0.06_285/0.8)] p-10 text-center glow-purple">
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.30_0.12_290/0.3)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <Sparkles className="h-10 w-10 text-gold mx-auto mb-4 animate-pulse-gold" />
              <h2 className="font-cinzel font-bold text-2xl sm:text-3xl text-foreground mb-3">
                Ancient Wisdom for the <span className="gradient-text-gold">Modern Soul Searcher</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Unlock your cosmic blueprint. Our tools bridge the timeless wisdom of the sages with cutting-edge AI — validated by real human psychologists and human behavior specialists — for today's most conscious entrepreneurs.
              </p>
              <a href={getLoginUrl()}>
                <Button
                  size="lg"
                  className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold text-base px-10 py-6 rounded-2xl glow-gold"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Start for Free
                </Button>
              </a>
            </div>
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
