import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Compass, Star } from "lucide-react";

const planets = [
  {
    name: "Sun ☀️", symbol: "☀️", influence: "Identity & Purpose",
    color: "oklch(0.78 0.18 60)",
    description: "The Sun illuminates your core identity and life purpose. In business, it governs your personal brand, leadership style, and the mission that drives you forward.",
    entrepreneurTip: "Align your brand voice with your Sun sign's natural energy. When you lead authentically from your solar purpose, customers and partners are magnetically drawn to you.",
    currentEnergy: "Strong creative energy — ideal for launching, branding, and stepping into leadership roles.",
    transits: ["Sun in Pisces amplifies intuitive business decisions", "Excellent time for creative projects and spiritual marketing"],
  },
  {
    name: "Moon 🌙", symbol: "🌙", influence: "Emotions & Intuition",
    color: "oklch(0.70 0.15 220)",
    description: "The Moon governs your emotional intelligence, intuition, and the subconscious patterns that drive your decisions. It cycles through all 12 signs monthly.",
    entrepreneurTip: "Track the lunar cycle for business timing. New Moon = launch and begin. Full Moon = complete and celebrate. Waning Moon = release and reflect.",
    currentEnergy: "Waxing Moon — building momentum. Plant seeds for new ventures and relationships.",
    transits: ["Moon in Taurus favors financial decisions", "New Moon approaching — powerful time for setting intentions"],
  },
  {
    name: "Mercury ☿", symbol: "☿", influence: "Communication & Strategy",
    color: "oklch(0.65 0.18 150)",
    description: "Mercury rules communication, contracts, technology, and strategic thinking. When Mercury is strong, negotiations flow and ideas crystallize clearly.",
    entrepreneurTip: "Sign contracts and launch marketing campaigns when Mercury is direct and well-aspected. During Mercury Retrograde, review and refine rather than launch.",
    currentEnergy: "Mercury direct — clear communication and strategic clarity. Excellent for negotiations and content creation.",
    transits: ["Mercury in Pisces — intuitive communication resonates deeply", "Favorable for creative writing, storytelling, and empathic marketing"],
  },
  {
    name: "Venus ♀", symbol: "♀", influence: "Wealth & Relationships",
    color: "oklch(0.70 0.18 350)",
    description: "Venus governs money, beauty, luxury, and business relationships. She rules the energy of attraction — drawing clients, partners, and opportunities to you.",
    entrepreneurTip: "Venus periods are ideal for pricing reviews, brand aesthetics, and relationship-building. Invest in your personal presentation and business environment.",
    currentEnergy: "Venus in Aries — bold, direct energy for attracting new clients and partnerships.",
    transits: ["Strong attraction energy for sales and partnerships", "Ideal for launching luxury or beauty-related offerings"],
  },
  {
    name: "Mars ♂", symbol: "♂", influence: "Drive & Action",
    color: "oklch(0.65 0.22 25)",
    description: "Mars is your entrepreneurial fuel — drive, ambition, courage, and the will to act. It governs your competitive edge and ability to execute under pressure.",
    entrepreneurTip: "Channel Mars energy into bold action and competitive strategy. Use Mars periods for launches, sales pushes, and tackling challenges head-on.",
    currentEnergy: "Mars in Cancer — emotional drive. Motivation comes from protecting what you love. Channel into client service excellence.",
    transits: ["High energy for action and execution", "Channel into focused sprints rather than scattered activity"],
  },
  {
    name: "Jupiter ♃", symbol: "♃", influence: "Expansion & Abundance",
    color: "oklch(0.70 0.18 80)",
    description: "Jupiter is the great benefic — the planet of growth, abundance, wisdom, and opportunity. Where Jupiter transits in your chart, expansion follows.",
    entrepreneurTip: "Jupiter transits mark your most powerful expansion windows. Invest, scale, and take calculated risks during Jupiter favorable periods.",
    currentEnergy: "Jupiter in Gemini — expansion through communication, networking, and multiple ventures.",
    transits: ["Excellent for scaling, investing, and international expansion", "Opportunities multiply through networking and learning"],
  },
  {
    name: "Saturn ♄", symbol: "♄", influence: "Structure & Mastery",
    color: "oklch(0.60 0.12 280)",
    description: "Saturn is the master teacher — demanding discipline, structure, and long-term commitment. Saturn rewards those who do the work with lasting success and authority.",
    entrepreneurTip: "Saturn periods call for building solid foundations. Focus on systems, processes, and long-term strategy rather than quick wins.",
    currentEnergy: "Saturn in Pisces — building spiritual business foundations. Integrate intuition with structure.",
    transits: ["Time for serious business planning and system-building", "Rewards disciplined, consistent effort"],
  },
  {
    name: "Rahu 🐉", symbol: "🐉", influence: "Ambition & Destiny",
    color: "oklch(0.65 0.20 200)",
    description: "In Vedic astrology, Rahu represents your karmic destiny, ambition, and the areas of life you're meant to master in this lifetime. It amplifies worldly success.",
    entrepreneurTip: "Rahu shows where your greatest worldly ambitions lie. Embrace the unconventional and innovative in the house Rahu occupies in your chart.",
    currentEnergy: "Rahu in Pisces — destined path involves spiritual entrepreneurship, healing, and transcendent creativity.",
    transits: ["Powerful for unconventional business models", "Amplifies digital, spiritual, and creative ventures"],
  },
  {
    name: "Ketu ☋", symbol: "☋", influence: "Wisdom & Release",
    color: "oklch(0.65 0.15 60)",
    description: "Ketu represents past-life wisdom, spiritual liberation, and the areas where you've mastered skills in previous incarnations. It brings detachment and insight.",
    entrepreneurTip: "Ketu areas in your chart represent natural talents that come effortlessly. Trust these gifts and use them as your foundation.",
    currentEnergy: "Ketu in Virgo — releasing perfectionism and trusting intuitive wisdom over analytical overthinking.",
    transits: ["Time to release what no longer serves your business", "Trust your innate wisdom and natural talents"],
  },
];

export default function PlanetaryInfluences() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.60_0.20_200/0.3)] bg-[oklch(0.60_0.20_200/0.08)] mb-4">
              <Compass className="h-3.5 w-3.5" style={{ color: "oklch(0.60 0.20 200)" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "oklch(0.60 0.20 200)" }}>Cosmic Timing</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Planetary <span className="gradient-text-gold">Influences</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Understand how each planet shapes your entrepreneurial energy, timing, and cosmic opportunities.
            </p>
          </div>

          {/* Current Energy Banner */}
          <div className="card-cosmic rounded-2xl p-5 mb-8 border border-[oklch(0.78_0.14_80/0.25)] glow-gold-sm">
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-5 w-5 text-gold animate-pulse-gold" />
              <h3 className="font-cinzel font-semibold text-gold">Current Cosmic Weather</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              The cosmos are in a powerful period of transformation and expansion. With multiple planets in mutable signs, entrepreneurs are called to adapt, communicate, and build bridges between the spiritual and material worlds. This is an excellent time for launching purpose-driven ventures and deepening client relationships.
            </p>
          </div>

          {/* Planets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {planets.map((planet) => (
              <div
                key={planet.name}
                className="card-cosmic rounded-2xl p-5 transition-all duration-300 hover:border-[oklch(0.78_0.14_80/0.3)] hover:-translate-y-0.5"
                style={{ borderColor: `${planet.color}20` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${planet.color}15`, border: `1px solid ${planet.color}30` }}
                  >
                    {planet.symbol}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-foreground text-base">{planet.name}</h3>
                    <span
                      className="text-xs font-cinzel px-2 py-0.5 rounded-full"
                      style={{ color: planet.color, background: `${planet.color}15`, border: `1px solid ${planet.color}25` }}
                    >
                      {planet.influence}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed mb-4">{planet.description}</p>

                <div className="rounded-xl bg-[oklch(0.78_0.14_80/0.05)] border border-[oklch(0.78_0.14_80/0.1)] p-3 mb-3">
                  <p className="text-xs font-cinzel text-gold/70 uppercase tracking-wider mb-1">Entrepreneur Tip</p>
                  <p className="text-sm text-foreground/80">{planet.entrepreneurTip}</p>
                </div>

                <div className="rounded-xl bg-[oklch(0.65_0.18_150/0.05)] border border-[oklch(0.65_0.18_150/0.15)] p-3">
                  <p className="text-xs font-cinzel uppercase tracking-wider mb-1" style={{ color: `${planet.color}` }}>Current Energy</p>
                  <p className="text-sm text-foreground/80">{planet.currentEnergy}</p>
                  <ul className="mt-2 space-y-1">
                    {planet.transits.map((t) => (
                      <li key={t} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-gold/50 mt-0.5">✦</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
