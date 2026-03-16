import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663245540972/YY5XDNPyQ9dVwNGQnjcsSf/ATSlogo_5f5cde4f.PNG";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(0.78_0.14_80/0.12)] bg-[oklch(0.08_0.02_280/0.95)] mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Ask The Sages" className="h-12 w-12 rounded-full border border-[oklch(0.78_0.14_80/0.3)]" />
              <div>
                <p className="font-cinzel font-bold text-gold text-lg">Ask The Sages</p>
                <p className="text-xs text-muted-foreground font-cinzel">Vedic Astrology Meets Modern Psychology</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Powerful tools for powerful people. Unlock your cosmic blueprint and elevate your entrepreneurial journey.
            </p>
          </div>

          {/* Astrology Tools */}
          <div>
            <h4 className="font-cinzel font-semibold text-gold text-sm mb-3">Astrology Tools</h4>
            <ul className="space-y-2">
              {[
                { href: "/birth-chart", label: "Birth Chart" },
                { href: "/zodiac", label: "Zodiac Profiles" },
                { href: "/planets", label: "Planetary Influences" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mindset Tools */}
          <div>
            <h4 className="font-cinzel font-semibold text-gold text-sm mb-3">Mindset Tools</h4>
            <ul className="space-y-2">
              {[
                { href: "/quiz", label: "Personality Quiz" },
                { href: "/affirmations", label: "Daily Affirmations" },
                { href: "/meditation", label: "Meditation Guides" },
                { href: "/goals", label: "Goal Setting" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[oklch(0.78_0.14_80/0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-cinzel">
            © {new Date().getFullYear()} Ask The Sages. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="text-gold/60">✦</span> Powerful Tools for Powerful People <span className="text-gold/60">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
