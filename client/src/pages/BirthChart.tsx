import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Moon, Star, Sparkles, RotateCcw } from "lucide-react";
import { Streamdown } from "streamdown";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function BirthChart() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    sunSign: "",
    moonSign: "",
    risingSign: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const interpret = trpc.birthChart.interpret.useMutation({
    onSuccess: (data) => setResult(data.aiInterpretation),
    onError: () => toast.error("Failed to generate reading. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.birthDate || !form.birthLocation) {
      toast.error("Please fill in your name, birth date, and birth location.");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Please sign in to get your birth chart reading.");
      return;
    }
    interpret.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.65_0.18_290/0.3)] bg-[oklch(0.65_0.18_290/0.08)] mb-4">
              <Moon className="h-3.5 w-3.5" style={{ color: "oklch(0.65 0.18 290)" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "oklch(0.65 0.18 290)" }}>Vedic Astrology</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Birth Chart <span className="gradient-text-gold">Reading</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Enter your birth details and receive an AI-powered Vedic astrology interpretation tailored to your entrepreneurial journey.
            </p>
          </div>

          {result ? (
            /* Results */
            <div className="space-y-6">
              <div className="card-cosmic rounded-3xl p-6 sm:p-8 border border-[oklch(0.78_0.14_80/0.25)] glow-gold">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <Moon className="h-5 w-5 text-[oklch(0.08_0.02_280)]" />
                  </div>
                  <div>
                    <h2 className="font-cinzel font-bold text-foreground text-lg">{form.name}'s Cosmic Reading</h2>
                    <p className="text-xs text-muted-foreground">{form.birthDate} · {form.birthLocation}</p>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-foreground/85 leading-relaxed">
                  <Streamdown>{result}</Streamdown>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-6 rounded-2xl glow-gold-sm"
                  onClick={() => { setResult(null); setForm({ name: "", birthDate: "", birthTime: "", birthLocation: "", sunSign: "", moonSign: "", risingSign: "" }); }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Reading
                </Button>
                <a href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full border-[oklch(0.78_0.14_80/0.3)] text-gold hover:bg-[oklch(0.78_0.14_80/0.08)] font-cinzel py-6 rounded-2xl bg-transparent">
                    View Dashboard
                  </Button>
                </a>
              </div>
            </div>
          ) : interpret.isPending ? (
            <div className="card-cosmic rounded-3xl p-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-[oklch(0.65_0.18_290)] border-t-transparent animate-spin" />
                <Moon className="absolute inset-0 m-auto h-8 w-8 text-gold animate-pulse" />
              </div>
              <h3 className="font-cinzel font-semibold text-foreground text-lg mb-2">Reading the Stars...</h3>
              <p className="text-muted-foreground text-sm">The sages are consulting the cosmic records. This may take a moment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-cosmic rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Your Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Birth Date *</Label>
                  <Input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => setForm(p => ({ ...p, birthDate: e.target.value }))}
                    className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground focus:border-gold h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Birth Time <span className="text-muted-foreground/50">(optional)</span></Label>
                  <Input
                    type="time"
                    value={form.birthTime}
                    onChange={(e) => setForm(p => ({ ...p, birthTime: e.target.value }))}
                    className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground focus:border-gold h-12 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Birth Location * <span className="text-muted-foreground/50">(City, Country)</span></Label>
                  <Input
                    value={form.birthLocation}
                    onChange={(e) => setForm(p => ({ ...p, birthLocation: e.target.value }))}
                    placeholder="e.g., Mumbai, India"
                    className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Sun Sign <span className="text-muted-foreground/50">(if known)</span></Label>
                  <Select value={form.sunSign} onValueChange={(v) => setForm(p => ({ ...p, sunSign: v }))}>
                    <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-12 rounded-xl">
                      <SelectValue placeholder="Select sun sign" />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign} className="text-foreground hover:text-gold focus:text-gold">{sign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Moon Sign <span className="text-muted-foreground/50">(if known)</span></Label>
                  <Select value={form.moonSign} onValueChange={(v) => setForm(p => ({ ...p, moonSign: v }))}>
                    <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-12 rounded-xl">
                      <SelectValue placeholder="Select moon sign" />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign} className="text-foreground hover:text-gold focus:text-gold">{sign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Rising Sign <span className="text-muted-foreground/50">(if known)</span></Label>
                  <Select value={form.risingSign} onValueChange={(v) => setForm(p => ({ ...p, risingSign: v }))}>
                    <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-12 rounded-xl">
                      <SelectValue placeholder="Select rising sign" />
                    </SelectTrigger>
                    <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">
                      {zodiacSigns.map((sign) => (
                        <SelectItem key={sign} value={sign} className="text-foreground hover:text-gold focus:text-gold">{sign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="rounded-2xl border border-[oklch(0.78_0.14_80/0.2)] bg-[oklch(0.78_0.14_80/0.05)] p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    <a href={getLoginUrl()} className="text-gold hover:underline font-semibold">Sign in</a> to save your reading and access your full cosmic dashboard.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!isAuthenticated || interpret.isPending}
                className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold text-base py-6 rounded-2xl glow-gold disabled:opacity-50"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {isAuthenticated ? "Read My Birth Chart" : "Sign In to Get Reading"}
              </Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
      <MobileBottomNav />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
