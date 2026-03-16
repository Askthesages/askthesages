import { Link, useLocation } from "wouter";
import { Star, Sparkles, Brain, Heart, Target } from "lucide-react";

const tabs = [
  { href: "/", icon: Star, label: "Home" },
  { href: "/tools", icon: Sparkles, label: "Tools", highlight: true },
  { href: "/quiz", icon: Brain, label: "Quiz" },
  { href: "/affirmations", icon: Heart, label: "Affirm" },
  { href: "/goals", icon: Target, label: "Goals" },
];

export default function MobileBottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-[oklch(0.78_0.14_80/0.15)] bg-[oklch(0.08_0.02_280/0.95)] backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ href, icon: Icon, label, highlight }) => {
          const isActive = location === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-all duration-200 min-h-[44px] relative ${
                isActive ? "text-gold" : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {highlight && !isActive ? (
                <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center -mt-5 shadow-[0_0_16px_oklch(0.78_0.14_80/0.5)]">
                  <Icon className="h-4.5 w-4.5 text-[oklch(0.08_0.02_280)]" />
                </div>
              ) : (
                <Icon className={`h-5 w-5 transition-all ${isActive ? "drop-shadow-[0_0_6px_oklch(0.78_0.14_80/0.8)]" : ""}`} />
              )}
              <span className={`text-[10px] font-cinzel font-medium ${isActive ? "text-gold" : highlight ? "text-gold/70" : ""}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
