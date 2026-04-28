import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663245540972/YY5XDNPyQ9dVwNGQnjcsSf/ATSlogo_5f5cde4f.PNG";

export default function Footer() {
  return (
    <footer className="mt-16"
      style={{
        background: "#3D1C02",
        borderTop: "2px solid transparent",
        borderImage: "linear-gradient(90deg, transparent, #C9A227, #B85C00, #C9A227, transparent) 1"
      }}
    >
      {/* Top gold ornamental line */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 20%, #B85C00 50%, #C9A227 80%, transparent 100%)" }} />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full p-0.5" style={{ background: "linear-gradient(135deg, #C9A227, #B85C00)" }}>
                <img src={LOGO_URL} alt="Ask The Sages" className="h-12 w-12 rounded-full object-cover" style={{ background: "#F9F3E8" }} />
              </div>
              <div>
                <p className="font-cinzel font-bold text-lg" style={{ color: "#E8C97A" }}>Ask The Sages</p>
                <p className="text-xs font-cinzel" style={{ color: "#A07840" }}>Vedic Astrology Meets Modern Psychology</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#C4A882" }}>
              Powerful tools for conscious seekers. Unlock your cosmic blueprint and align your purpose with the timeless wisdom of the Vedic sages.
            </p>
            {/* Om symbol */}
            <div className="mt-4 text-3xl" style={{ color: "rgba(201,162,39,0.4)", fontFamily: "serif" }}>ॐ</div>
          </div>

          {/* Astrology Tools */}
          <div>
            <h4 className="font-cinzel font-semibold text-sm mb-4 pb-2" style={{ color: "#C9A227", borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
              Astrology Tools
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/birth-chart", label: "Birth Chart" },
                { href: "/zodiac", label: "Zodiac Profiles" },
                { href: "/planets", label: "Planetary Influences" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors flex items-center gap-2"
                    style={{ color: "#A07840" }}
                  >
                    <span style={{ color: "rgba(201,162,39,0.5)", fontSize: "0.6rem" }}>◆</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mindset Tools */}
          <div>
            <h4 className="font-cinzel font-semibold text-sm mb-4 pb-2" style={{ color: "#C9A227", borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
              Mindset Tools
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/quiz", label: "Personality Quiz" },
                { href: "/affirmations", label: "Daily Affirmations" },
                { href: "/meditation", label: "Meditation Guides" },
                { href: "/goals", label: "Goal Setting" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors flex items-center gap-2"
                    style={{ color: "#A07840" }}
                  >
                    <span style={{ color: "rgba(201,162,39,0.5)", fontSize: "0.6rem" }}>◆</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,162,39,0.15)" }}
        >
          <p className="text-xs font-cinzel" style={{ color: "#6B4C2A" }}>
            © {new Date().getFullYear()} Ask The Sages. All rights reserved.
          </p>
          <p className="text-xs font-cinzel" style={{ color: "#6B4C2A" }}>
            <span style={{ color: "rgba(201,162,39,0.5)" }}>✦</span>
            {" "}Ancient Wisdom · Modern Soul{" "}
            <span style={{ color: "rgba(201,162,39,0.5)" }}>✦</span>
          </p>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 20%, #B85C00 50%, #C9A227 80%, transparent 100%)" }} />
    </footer>
  );
}
