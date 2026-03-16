import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sun, Star, ChevronDown, ChevronUp } from "lucide-react";

const zodiacData = [
  {
    sign: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire", ruling: "Mars",
    color: "oklch(0.65 0.22 25)",
    tagline: "The Pioneer Entrepreneur",
    strengths: ["Bold decision-making", "Natural leadership", "Fearless risk-taking", "High energy drive"],
    challenges: ["Impatience", "Burnout from overcommitting", "Difficulty delegating"],
    business: "Aries thrives as a startup founder and first-mover. Your Mars-ruled energy makes you a natural disruptor. Best in fast-paced industries: tech, sports, innovation.",
    mantra: "I lead with courage and ignite the path for others.",
  },
  {
    sign: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth", ruling: "Venus",
    color: "oklch(0.65 0.18 150)",
    tagline: "The Wealth Builder",
    strengths: ["Financial acumen", "Persistence", "Building lasting value", "Luxury brand sense"],
    challenges: ["Resistance to change", "Stubbornness", "Slow to pivot"],
    business: "Taurus excels at building sustainable, profitable businesses. Your Venus influence gives you an eye for beauty and value. Thrive in real estate, luxury goods, finance, food.",
    mantra: "I build wealth with patience and unwavering purpose.",
  },
  {
    sign: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air", ruling: "Mercury",
    color: "oklch(0.78 0.14 80)",
    tagline: "The Master Communicator",
    strengths: ["Versatility", "Brilliant networking", "Idea generation", "Adaptability"],
    challenges: ["Scattered focus", "Inconsistency", "Starting more than finishing"],
    business: "Gemini dominates in media, marketing, and communications. Your Mercury mind generates endless ideas. Best in content creation, PR, consulting, and multi-venture entrepreneurship.",
    mantra: "I channel my brilliant mind into focused, powerful action.",
  },
  {
    sign: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water", ruling: "Moon",
    color: "oklch(0.70 0.15 220)",
    tagline: "The Intuitive Nurturer",
    strengths: ["Deep customer empathy", "Intuitive business sense", "Team loyalty", "Brand storytelling"],
    challenges: ["Emotional decision-making", "Fear of rejection", "Difficulty separating personal from professional"],
    business: "Cancer entrepreneurs build beloved brands through authentic connection. Your Moon intuition reads market needs before they emerge. Excel in wellness, hospitality, family business, coaching.",
    mantra: "I trust my intuition and build businesses that truly serve.",
  },
  {
    sign: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire", ruling: "Sun",
    color: "oklch(0.78 0.18 60)",
    tagline: "The Visionary Leader",
    strengths: ["Magnetic personal brand", "Inspiring leadership", "Creative vision", "Stage presence"],
    challenges: ["Need for validation", "Ego in decision-making", "Difficulty sharing spotlight"],
    business: "Leo is born to lead and be seen. Your Sun energy creates powerful personal brands and movements. Excel in entertainment, luxury, personal development, and CEO roles.",
    mantra: "I shine my light boldly and inspire others to do the same.",
  },
  {
    sign: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth", ruling: "Mercury",
    color: "oklch(0.65 0.18 150)",
    tagline: "The Systems Architect",
    strengths: ["Operational excellence", "Attention to detail", "Problem-solving", "Quality standards"],
    challenges: ["Perfectionism paralysis", "Over-analysis", "Difficulty scaling"],
    business: "Virgo builds the most efficient, high-quality operations. Your Mercury precision creates systems that scale. Excel in consulting, health, technology, and process optimization.",
    mantra: "I create excellence through precision and purposeful action.",
  },
  {
    sign: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air", ruling: "Venus",
    color: "oklch(0.70 0.18 290)",
    tagline: "The Partnership Architect",
    strengths: ["Strategic partnerships", "Negotiation mastery", "Brand aesthetics", "Team harmony"],
    challenges: ["Indecisiveness", "People-pleasing", "Avoiding necessary conflict"],
    business: "Libra excels through collaboration and beautiful branding. Your Venus-Mercury blend creates compelling offers and win-win deals. Excel in law, design, partnerships, and luxury brands.",
    mantra: "I create harmony and build powerful alliances that multiply success.",
  },
  {
    sign: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water", ruling: "Pluto/Mars",
    color: "oklch(0.55 0.20 300)",
    tagline: "The Transformation Agent",
    strengths: ["Deep research ability", "Psychological insight", "Relentless determination", "Crisis navigation"],
    challenges: ["Trust issues", "Secrecy limiting growth", "Intensity alienating partners"],
    business: "Scorpio transforms industries from the inside out. Your Pluto depth sees what others miss. Excel in finance, investigation, psychology, transformational coaching, and turnarounds.",
    mantra: "I transform challenges into power and build empires from the depths.",
  },
  {
    sign: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire", ruling: "Jupiter",
    color: "oklch(0.70 0.18 50)",
    tagline: "The Global Visionary",
    strengths: ["Big-picture thinking", "International expansion", "Optimism", "Teaching and inspiring"],
    challenges: ["Overcommitting", "Lack of follow-through", "Restlessness"],
    business: "Sagittarius thinks globally and acts boldly. Your Jupiter expansion drives international ventures and thought leadership. Excel in education, travel, publishing, coaching, and global brands.",
    mantra: "I expand my vision to the horizon and inspire the world.",
  },
  {
    sign: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth", ruling: "Saturn",
    color: "oklch(0.60 0.12 280)",
    tagline: "The Empire Builder",
    strengths: ["Long-term strategic thinking", "Discipline", "Authority building", "Legacy creation"],
    challenges: ["Workaholism", "Rigidity", "Difficulty enjoying success"],
    business: "Capricorn builds empires that last generations. Your Saturn discipline creates unshakeable foundations. Excel in finance, real estate, corporate leadership, and legacy businesses.",
    mantra: "I build with discipline and create a legacy that outlasts me.",
  },
  {
    sign: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air", ruling: "Uranus",
    color: "oklch(0.65 0.20 200)",
    tagline: "The Innovation Disruptor",
    strengths: ["Revolutionary thinking", "Technology vision", "Community building", "Humanitarian impact"],
    challenges: ["Detachment from practical details", "Rebelliousness", "Difficulty with hierarchy"],
    business: "Aquarius disrupts industries and builds movements. Your Uranus innovation sees 10 years ahead. Excel in technology, social enterprise, community platforms, and future-focused ventures.",
    mantra: "I innovate fearlessly and build the future the world needs.",
  },
  {
    sign: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water", ruling: "Neptune",
    color: "oklch(0.65 0.18 240)",
    tagline: "The Creative Mystic",
    strengths: ["Creative genius", "Empathic marketing", "Spiritual intelligence", "Artistic vision"],
    challenges: ["Boundaries in business", "Practical execution", "Avoiding escapism"],
    business: "Pisces creates art that moves souls and businesses that heal. Your Neptune creativity produces transcendent brands. Excel in arts, healing, spirituality, film, and purpose-driven ventures.",
    mantra: "I create from the infinite and build a business that heals the world.",
  },
];

export default function ZodiacProfiles() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const elements = ["all", "Fire", "Earth", "Air", "Water"];
  const filtered = filter === "all" ? zodiacData : zodiacData.filter(z => z.element === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.70_0.18_50/0.3)] bg-[oklch(0.70_0.18_50/0.08)] mb-4">
              <Sun className="h-3.5 w-3.5" style={{ color: "oklch(0.78 0.14 80)" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase text-gold/80">Zodiac Wisdom</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Zodiac <span className="gradient-text-gold">Entrepreneur</span> Profiles
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Discover the unique entrepreneurial gifts, strengths, and cosmic guidance for each of the 12 zodiac signs.
            </p>
          </div>

          {/* Element Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {elements.map((el) => (
              <Button
                key={el}
                variant="ghost"
                size="sm"
                onClick={() => setFilter(el)}
                className={`font-cinzel text-xs rounded-full px-4 border transition-all ${
                  filter === el
                    ? "border-gold bg-[oklch(0.78_0.14_80/0.12)] text-gold"
                    : "border-[oklch(0.78_0.14_80/0.15)] text-muted-foreground hover:text-gold hover:border-[oklch(0.78_0.14_80/0.3)]"
                }`}
              >
                {el === "all" ? "All Signs" : `${el === "Fire" ? "🔥" : el === "Earth" ? "🌍" : el === "Air" ? "💨" : "💧"} ${el}`}
              </Button>
            ))}
          </div>

          {/* Zodiac Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((z) => {
              const isOpen = expanded === z.sign;
              return (
                <div
                  key={z.sign}
                  className="card-cosmic rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ borderColor: `${z.color}25` }}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : z.sign)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                          style={{ background: `${z.color}15`, border: `1px solid ${z.color}30` }}
                        >
                          {z.symbol}
                        </div>
                        <div>
                          <h3 className="font-cinzel font-bold text-foreground text-base">{z.sign}</h3>
                          <p className="text-xs text-muted-foreground">{z.dates}</p>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="text-xs font-cinzel font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: z.color, background: `${z.color}15`, border: `1px solid ${z.color}25` }}
                      >
                        {z.tagline}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {z.element === "Fire" ? "🔥" : z.element === "Earth" ? "🌍" : z.element === "Air" ? "💨" : "💧"} {z.element}
                      </span>
                      <span className="text-xs text-muted-foreground">⚡ {z.ruling}</span>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 space-y-4 border-t border-[oklch(0.78_0.14_80/0.1)]">
                      <div className="pt-4">
                        <h4 className="text-xs font-cinzel text-gold/70 uppercase tracking-wider mb-2">Business Strengths</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {z.strengths.map((s) => (
                            <span key={s} className="text-xs px-2 py-1 rounded-lg bg-[oklch(0.78_0.14_80/0.08)] text-foreground/80 border border-[oklch(0.78_0.14_80/0.12)]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-cinzel text-gold/70 uppercase tracking-wider mb-2">Growth Areas</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {z.challenges.map((c) => (
                            <span key={c} className="text-xs px-2 py-1 rounded-lg bg-[oklch(0.55_0.22_25/0.08)] text-foreground/70 border border-[oklch(0.55_0.22_25/0.15)]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-cinzel text-gold/70 uppercase tracking-wider mb-2">Business Insight</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">{z.business}</p>
                      </div>

                      <div className="rounded-xl border border-[oklch(0.78_0.14_80/0.2)] bg-[oklch(0.78_0.14_80/0.05)] p-3">
                        <p className="text-xs font-cinzel text-gold/60 uppercase tracking-wider mb-1">Sacred Mantra</p>
                        <p className="text-sm text-gold italic">"{z.mantra}"</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
