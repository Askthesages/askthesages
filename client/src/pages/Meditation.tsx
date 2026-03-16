import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Sparkles, RefreshCw, Play } from "lucide-react";
import { Streamdown } from "streamdown";

const meditationTypes = [
  { value: "morning-activation", label: "🌅 Morning Activation", description: "Start your day with clarity and purpose" },
  { value: "abundance-visualization", label: "💰 Abundance Visualization", description: "Attract wealth and opportunities" },
  { value: "decision-clarity", label: "🔮 Decision Clarity", description: "Access your inner wisdom for big decisions" },
  { value: "stress-release", label: "🌊 Stress Release", description: "Release tension and restore balance" },
  { value: "creative-flow", label: "✨ Creative Flow", description: "Unlock innovation and creative solutions" },
  { value: "leadership-power", label: "👑 Leadership Power", description: "Step into your highest leadership potential" },
  { value: "gratitude-practice", label: "🙏 Gratitude Practice", description: "Cultivate appreciation and magnetic energy" },
  { value: "evening-integration", label: "🌙 Evening Integration", description: "Process your day and set tomorrow's intentions" },
];

const durations = [
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 20, label: "20 minutes" },
];

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function Meditation() {
  const [meditationType, setMeditationType] = useState("morning-activation");
  const [duration, setDuration] = useState(10);
  const [zodiacSign, setZodiacSign] = useState("");
  const [guide, setGuide] = useState<string | null>(null);

  const getGuide = trpc.meditation.getGuide.useMutation({
    onSuccess: (data) => setGuide(data.guide),
    onError: () => toast.error("Failed to generate meditation guide."),
  });

  const selectedType = meditationTypes.find(m => m.value === meditationType);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.65_0.18_240/0.3)] bg-[oklch(0.65_0.18_240/0.08)] mb-4">
              <span className="text-xs">🧘</span>
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "oklch(0.65 0.18 240)" }}>Guided Practice</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Meditation <span className="gradient-text-gold">Guides</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              AI-generated Vedic meditation scripts personalized for entrepreneurs. Find stillness, clarity, and cosmic alignment.
            </p>
          </div>

          {/* Meditation Type Selector */}
          {!guide && !getGuide.isPending && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {meditationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setMeditationType(type.value)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                      meditationType === type.value
                        ? "border-gold bg-[oklch(0.78_0.14_80/0.1)] glow-gold-sm"
                        : "border-[oklch(0.78_0.14_80/0.15)] bg-[oklch(0.12_0.03_280/0.5)] hover:border-[oklch(0.78_0.14_80/0.3)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                        meditationType === type.value ? "bg-[oklch(0.78_0.14_80/0.15)]" : "bg-[oklch(0.15_0.04_280)]"
                      }`}>
                        {type.label.split(" ")[0]}
                      </div>
                      <div>
                        <p className={`font-cinzel font-semibold text-sm ${meditationType === type.value ? "text-gold" : "text-foreground"}`}>
                          {type.label.substring(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="card-cosmic rounded-2xl p-5 space-y-4">
                <h3 className="font-cinzel font-semibold text-foreground text-sm">Customize Your Practice</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Duration</label>
                    <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                      <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                        {durations.map((d) => (
                          <SelectItem key={d.value} value={String(d.value)} className="text-foreground focus:text-gold">{d.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Your Zodiac Sign <span className="text-muted-foreground/50">(optional)</span></label>
                    <Select value={zodiacSign} onValueChange={setZodiacSign}>
                      <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl">
                        <SelectValue placeholder="Select sign" />
                      </SelectTrigger>
                      <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign} value={sign} className="text-foreground focus:text-gold">{sign}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={() => getGuide.mutate({ type: meditationType, duration, zodiacSign: zodiacSign || undefined })}
                  className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-5 rounded-xl glow-gold-sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Generate My Meditation Guide
                </Button>
              </div>
            </div>
          )}

          {/* Loading */}
          {getGuide.isPending && (
            <div className="card-cosmic rounded-3xl p-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-[oklch(0.65_0.18_240)] border-t-transparent animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🧘</span>
              </div>
              <h3 className="font-cinzel font-semibold text-foreground text-lg mb-2">Preparing Your Sacred Space...</h3>
              <p className="text-muted-foreground text-sm">The sages are crafting your personalized meditation journey.</p>
            </div>
          )}

          {/* Guide Result */}
          {guide && !getGuide.isPending && (
            <div className="space-y-6">
              <div className="card-cosmic rounded-3xl p-6 sm:p-8 border border-[oklch(0.65_0.18_240/0.25)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[oklch(0.65_0.18_240/0.15)] border border-[oklch(0.65_0.18_240/0.3)] flex items-center justify-center text-xl">
                    🧘
                  </div>
                  <div>
                    <h2 className="font-cinzel font-bold text-foreground">{selectedType?.label.substring(2)} Meditation</h2>
                    <p className="text-xs text-muted-foreground">{duration} minutes · {zodiacSign || "Universal"} energy</p>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-foreground/85 leading-relaxed">
                  <Streamdown>{guide}</Streamdown>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-5 rounded-2xl glow-gold-sm"
                  onClick={() => { setGuide(null); }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Meditation
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[oklch(0.78_0.14_80/0.3)] text-gold hover:bg-[oklch(0.78_0.14_80/0.08)] font-cinzel py-5 rounded-2xl bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(guide);
                    toast.success("Meditation guide copied to clipboard!");
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Copy Guide
                </Button>
              </div>
            </div>
          )}

          {/* Tips Section */}
          {!guide && !getGuide.isPending && (
            <div className="mt-8 card-cosmic rounded-2xl p-6">
              <h3 className="font-cinzel font-semibold text-gold mb-4">🌿 Meditation Tips for Entrepreneurs</h3>
              <div className="space-y-3">
                {[
                  "Even 5 minutes of daily meditation measurably improves decision-making and emotional regulation.",
                  "Meditate before important meetings or decisions to access your clearest, most intuitive state.",
                  "The Vedic tradition recommends meditating at sunrise (Brahma Muhurta) for maximum spiritual potency.",
                  "Consistency matters more than duration — a daily 5-minute practice outperforms occasional hour-long sessions.",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold/50 font-cinzel text-sm mt-0.5">✦</span>
                    <p className="text-sm text-foreground/80">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
