import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Heart, Star, Sparkles, BookmarkPlus, RefreshCw } from "lucide-react";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const categories = [
  { value: "dharma", label: "🪷 Dharma — Right Action & Purpose" },
  { value: "karma yoga", label: "⚡ Karma Yoga — Desireless Action" },
  { value: "atman", label: "🔱 Atman — Self-Realization" },
  { value: "brahman", label: "🌌 Brahman — Universal Consciousness" },
  { value: "viveka", label: "🧘 Viveka — Discernment & Clarity" },
  { value: "tapas", label: "🔥 Tapas — Discipline & Austerity" },
  { value: "sattva", label: "✨ Sattva — Purity & Equanimity" },
  { value: "surrender", label: "🙏 Ishvara Pranidhana — Surrender" },
];

const defaultAffirmations = [
  "I perform my duty with full effort and release attachment to outcomes, for right action itself is the highest offering — Bhagavad Gita 2.47",
  "I am the unchanging Atman, the eternal witness behind all thoughts, unshaken by success or failure — Mandukya Upanishad",
  "I walk my dharma with courage, knowing the universe supports those who live in alignment with their highest truth — Rigveda",
  "I act without ego, offering all my work as a sacred gift to the Divine — Bhagavad Gita 9.27",
  "I am not this body, not this mind — I am pure consciousness, Sat-Chit-Ananda, eternal and free — Chandogya Upanishad",
  "I cultivate sattva in all I do: clarity of mind, purity of intention, and equanimity in all outcomes — Bhagavad Gita 14.6",
  "Through tapas — disciplined, devoted effort — I forge the inner strength that no outer circumstance can diminish — Atharvaveda",
  "I surrender the fruits of my labor to the Divine, and in that surrender, I find infinite peace and power — Bhagavad Gita 12.12",
];

export default function Affirmations() {
  const { isAuthenticated } = useAuth();
  const [zodiacSign, setZodiacSign] = useState("");
  const [category, setCategory] = useState("");
  const [affirmations, setAffirmations] = useState<string[]>(defaultAffirmations);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const generate = trpc.affirmations.generate.useMutation({
    onSuccess: (data) => {
      setAffirmations(data.affirmations);
      toast.success("New affirmations generated!");
    },
    onError: () => toast.error("Failed to generate affirmations."),
  });

  const saveAffirmation = trpc.affirmations.save.useMutation({
    onSuccess: (_, variables) => {
      setSaved(prev => { const next = new Set(Array.from(prev)); next.add(variables.text); return next; });
      toast.success("Affirmation saved to your dashboard!");
    },
    onError: () => toast.error("Please sign in to save affirmations."),
  });

  const handleGenerate = () => {
    generate.mutate({ zodiacSign: zodiacSign || undefined, category: category || undefined, count: 8 });
  };

  const handleSave = (text: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save affirmations.");
      return;
    }
    saveAffirmation.mutate({ text, category: category || undefined });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.65_0.22_350/0.3)] bg-[oklch(0.65_0.22_350/0.08)] mb-4">
              <Heart className="h-3.5 w-3.5" style={{ color: "oklch(0.65 0.22 350)" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "oklch(0.65 0.22 350)" }}>Sacred Wisdom</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Daily <span className="gradient-text-gold">Affirmations</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Daily affirmations drawn exclusively from the Vedas, Upanishads, and Bhagavad Gita — ancient wisdom for the modern conscious entrepreneur.
            </p>
          </div>

          {/* Generator Controls */}
          <div className="card-cosmic rounded-2xl p-5 mb-8">
            <h3 className="font-cinzel font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" />
              Personalize Your Vedic Affirmations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Your Zodiac Sign</label>
                <Select value={zodiacSign} onValueChange={setZodiacSign}>
                  <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl">
                    <SelectValue placeholder="Select your sign" />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                    {zodiacSigns.map((sign) => (
                      <SelectItem key={sign} value={sign} className="text-foreground focus:text-gold">{sign}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Vedic Theme</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl">
                    <SelectValue placeholder="Choose focus area" />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="text-foreground focus:text-gold">{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generate.isPending}
              className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-5 rounded-xl glow-gold-sm"
            >
              {generate.isPending ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> Generate My Affirmations</>
              )}
            </Button>
          </div>

          {/* Affirmations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {affirmations.map((affirmation, i) => (
              <div
                key={i}
                className="group card-cosmic rounded-2xl p-5 relative hover:border-[oklch(0.78_0.14_80/0.3)] transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Star className="h-3.5 w-3.5 text-[oklch(0.08_0.02_280)]" />
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic flex-1">
                    "{affirmation}"
                  </p>
                </div>
                <button
                  onClick={() => handleSave(affirmation)}
                  disabled={saved.has(affirmation) || saveAffirmation.isPending}
                  className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all ${
                    saved.has(affirmation)
                      ? "text-gold bg-[oklch(0.78_0.14_80/0.15)]"
                      : "text-muted-foreground hover:text-gold hover:bg-[oklch(0.78_0.14_80/0.08)] opacity-0 group-hover:opacity-100"
                  }`}
                  title="Save affirmation"
                >
                  <BookmarkPlus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Daily Practice Tips */}
          <div className="mt-10 card-cosmic rounded-2xl p-6">
            <h3 className="font-cinzel font-semibold text-gold mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Daily Affirmation Practice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { time: "Morning", icon: "🌅", tip: "Read 3 affirmations aloud before checking your phone. Set the energetic tone for your day." },
                { time: "Midday", icon: "☀️", tip: "Pause for 2 minutes and repeat your power affirmation 3 times. Reset your entrepreneurial energy." },
                { time: "Evening", icon: "🌙", tip: "Journal one affirmation that resonated today. Write how it manifested in your actions." },
              ].map((item) => (
                <div key={item.time} className="bg-[oklch(0.15_0.04_280/0.5)] rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-cinzel font-semibold text-foreground text-sm mb-1">{item.time}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.tip}</p>
                </div>
              ))}
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
