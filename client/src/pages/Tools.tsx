import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Target, Moon, Sun, Compass, ExternalLink, Sparkles, Star } from "lucide-react";

// ─── FLAGSHIP PRODUCT URLS ───────────────────────────────────────────────────
// TODO: Replace placeholder hrefs with real URLs when ready
const CONSCIOUSNESS_MAP_URL = "#consciousness-map";   // ← Replace with your Claude/Jyotish prompt URL
const ENERGY_ARCHETYPE_URL  = "#energy-archetype";    // ← Replace with your Energy Archetype Test URL
const JUNGIAN_ARCHETYPE_URL = "#jungian-archetype";   // ← Replace with your Jungian Archetype Test URL
// ─────────────────────────────────────────────────────────────────────────────

const flagshipTools = [
  {
    id: "consciousness-map",
    icon: "🗺️",
    title: "Consciousness Map Reading",
    subtitle: "Vedic Astrology · AI-Powered",
    description:
      "Unlock the secrets of your Vedic birth chart through a deep AI-powered reading. Discover your dharma, karmic patterns, and the cosmic blueprint guiding your entrepreneurial path.",
    cta: "Start Your Consciousness Map Reading",
    href: CONSCIOUSNESS_MAP_URL,
    external: true,
    badge: "Flagship",
    gradient: "from-[oklch(0.65_0.18_290/0.15)] to-[oklch(0.78_0.14_80/0.08)]",
    border: "oklch(0.78 0.14 80)",
    glow: true,
  },
  {
    id: "energy-archetype",
    icon: "⚡",
    title: "Energy Archetype Test",
    subtitle: "Free Assessment · Instant Results",
    description:
      "Discover your unique energetic blueprint and how it shapes your leadership style, decision-making, and business relationships. Align your strategy with your natural energy flow.",
    cta: "Take the Free Energy Archetype Test",
    href: ENERGY_ARCHETYPE_URL,
    external: true,
    badge: "Free",
    gradient: "from-[oklch(0.70_0.18_50/0.12)] to-[oklch(0.65_0.22_350/0.06)]",
    border: "oklch(0.70 0.18 50)",
    glow: false,
  },
  {
    id: "jungian-archetype",
    icon: "🧠",
    title: "Jungian Archetype Test",
    subtitle: "Modern Psychology · Deep Insight",
    description:
      "Explore the Jungian archetypes that live within your psyche. Understand your shadow, your strengths, and the unconscious patterns driving your entrepreneurial decisions.",
    cta: "Test Your Jungian Archetype",
    href: JUNGIAN_ARCHETYPE_URL,
    external: true,
    badge: "Psychology",
    gradient: "from-[oklch(0.65_0.20_200/0.12)] to-[oklch(0.60_0.18_240/0.06)]",
    border: "oklch(0.65 0.20 200)",
    glow: false,
  },
];

const innerTools = [
  { icon: Brain, label: "Entrepreneur Quiz", href: "/quiz", desc: "AI personality assessment", color: "oklch(0.78 0.14 80)" },
  { icon: Moon, label: "Birth Chart", href: "/birth-chart", desc: "Vedic chart reading", color: "oklch(0.65 0.18 290)" },
  { icon: Sun, label: "Zodiac Profiles", href: "/zodiac", desc: "12 signs for entrepreneurs", color: "oklch(0.78 0.18 60)" },
  { icon: Compass, label: "Planetary Influences", href: "/planets", desc: "Cosmic timing & energy", color: "oklch(0.60 0.20 200)" },
  { icon: Heart, label: "Daily Affirmations", href: "/affirmations", desc: "AI-generated mantras", color: "oklch(0.65 0.22 350)" },
  { icon: Target, label: "Goal Framework", href: "/goals", desc: "Cosmic goal setting", color: "oklch(0.65 0.18 150)" },
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.78_0.14_80/0.25)] bg-[oklch(0.78_0.14_80/0.06)] mb-5">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-cinzel text-gold/80 tracking-widest uppercase">Powerful Tools for Powerful People</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-5xl text-foreground mb-4 leading-tight">
              Your Complete <span className="gradient-text-gold">Toolkit</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Where Vedic astrology meets modern psychology. Three flagship tools designed to unlock your deepest potential as an entrepreneur.
            </p>
          </div>

          {/* ── FLAGSHIP TOOLS ─────────────────────────────────────────────── */}
          <div className="space-y-5 mb-16">
            {flagshipTools.map((tool, i) => (
              <a
                key={tool.id}
                href={tool.href}
                target={tool.external ? "_blank" : undefined}
                rel={tool.external ? "noopener noreferrer" : undefined}
                className="block group"
              >
                <div
                  className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 bg-gradient-to-br ${tool.gradient} hover:-translate-y-1 hover:shadow-2xl ${tool.glow ? "glow-gold" : ""}`}
                  style={{ borderColor: `${tool.border}35` }}
                >
                  {/* Badge */}
                  <div className="absolute top-5 right-5">
                    <span
                      className="text-xs font-cinzel font-bold px-3 py-1 rounded-full"
                      style={{ color: tool.border, background: `${tool.border}15`, border: `1px solid ${tool.border}30` }}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                      style={{ background: `${tool.border}12`, border: `1px solid ${tool.border}25` }}
                    >
                      {tool.icon}
                    </div>

                    <div className="flex-1 pr-16 sm:pr-24">
                      <p className="text-xs font-cinzel tracking-widest uppercase mb-1" style={{ color: tool.border }}>
                        {tool.subtitle}
                      </p>
                      <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-foreground mb-2">
                        {tool.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {tool.description}
                      </p>
                      <div
                        className="inline-flex items-center gap-2 font-cinzel font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-200 group-hover:scale-105"
                        style={{
                          background: i === 0
                            ? "linear-gradient(135deg, oklch(0.78 0.14 80), oklch(0.70 0.18 60))"
                            : `${tool.border}18`,
                          color: i === 0 ? "oklch(0.08 0.02 280)" : tool.border,
                          border: i === 0 ? "none" : `1px solid ${tool.border}35`,
                          boxShadow: i === 0 ? "0 0 20px oklch(0.78 0.14 80 / 0.3)" : "none",
                        }}
                      >
                        {tool.cta}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative number */}
                  <div
                    className="absolute bottom-4 right-6 font-cinzel font-bold text-6xl opacity-5 select-none"
                    style={{ color: tool.border }}
                  >
                    0{i + 1}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── INNER TOOLS ────────────────────────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.14_80/0.2)] to-transparent" />
              <span className="font-cinzel text-xs text-muted-foreground uppercase tracking-widest px-3">Inner Tools</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.14_80/0.2)] to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {innerTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.href} href={tool.href}>
                    <div className="card-cosmic rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-[oklch(0.78_0.14_80/0.3)] hover:-translate-y-0.5 transition-all duration-200">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: tool.color }} />
                      </div>
                      <div>
                        <p className="font-cinzel font-semibold text-foreground text-xs">{tool.label}</p>
                        <p className="text-[10px] text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2">
              <Star className="h-3 w-3 text-gold/40" />
              <p className="text-xs font-cinzel text-muted-foreground tracking-widest uppercase">Vedic Astrology Meets Modern Psychology</p>
              <Star className="h-3 w-3 text-gold/40" />
            </div>
          </div>

        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
