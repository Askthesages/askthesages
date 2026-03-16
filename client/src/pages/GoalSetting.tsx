import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Target, Sparkles, Plus, CheckCircle2, Clock, PauseCircle } from "lucide-react";
import { Streamdown } from "streamdown";

const goalCategories = [
  { value: "revenue", label: "💰 Revenue & Profit" },
  { value: "growth", label: "📈 Business Growth" },
  { value: "leadership", label: "👑 Leadership & Team" },
  { value: "brand", label: "✨ Brand & Visibility" },
  { value: "relationships", label: "🤝 Partnerships & Network" },
  { value: "wellbeing", label: "🌿 Health & Wellbeing" },
  { value: "learning", label: "📚 Skills & Learning" },
  { value: "impact", label: "🌍 Purpose & Impact" },
];

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function GoalSetting() {
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newGoalGuidance, setNewGoalGuidance] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    targetDate: "",
    zodiacSign: "",
  });

  const createGoal = trpc.goals.create.useMutation({
    onSuccess: (data) => {
      setNewGoalGuidance(data.aiGuidance);
      goalsList.refetch();
      setForm({ title: "", description: "", category: "", targetDate: "", zodiacSign: "" });
      setShowForm(false);
      toast.success("Goal created with cosmic guidance!");
    },
    onError: () => toast.error("Failed to create goal. Please try again."),
  });

  const goalsList = trpc.goals.list.useQuery(undefined, { enabled: isAuthenticated });

  const updateStatus = trpc.goals.updateStatus.useMutation({
    onSuccess: () => {
      goalsList.refetch();
      toast.success("Goal updated!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { toast.error("Please enter a goal title."); return; }
    createGoal.mutate(form);
  };

  const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    if (status === "paused") return <PauseCircle className="h-4 w-4 text-yellow-400" />;
    return <Clock className="h-4 w-4 text-gold" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.65_0.18_150/0.3)] bg-[oklch(0.65_0.18_150/0.08)] mb-4">
              <Target className="h-3.5 w-3.5" style={{ color: "oklch(0.65 0.18 150)" }} />
              <span className="text-xs font-cinzel tracking-widest uppercase" style={{ color: "oklch(0.65 0.18 150)" }}>Cosmic Goal Setting</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Goal <span className="gradient-text-gold">Framework</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Set powerful entrepreneurial goals aligned with cosmic timing. Receive AI-powered Vedic guidance for each intention.
            </p>
          </div>

          {/* New Goal Guidance */}
          {newGoalGuidance && (
            <div className="card-cosmic rounded-3xl p-6 mb-6 border border-[oklch(0.65_0.18_150/0.3)] glow-gold-sm">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-gold animate-pulse-gold" />
                <h3 className="font-cinzel font-semibold text-gold">Your Cosmic Goal Guidance</h3>
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-foreground/85 leading-relaxed">
                <Streamdown>{newGoalGuidance}</Streamdown>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 text-muted-foreground hover:text-foreground font-cinzel text-xs" onClick={() => setNewGoalGuidance(null)}>
                Dismiss
              </Button>
            </div>
          )}

          {/* Add Goal Button / Form */}
          {!showForm ? (
            <Button
              onClick={() => {
                if (!isAuthenticated) { toast.error("Please sign in to set goals."); return; }
                setShowForm(true);
              }}
              className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-5 rounded-2xl glow-gold-sm mb-8"
            >
              <Plus className="h-5 w-5 mr-2" />
              {isAuthenticated ? "Set a New Goal" : "Sign In to Set Goals"}
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="card-cosmic rounded-2xl p-6 mb-8 space-y-4">
              <h3 className="font-cinzel font-semibold text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-gold" />
                New Cosmic Goal
              </h3>
              <div>
                <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Goal Title *</label>
                <Input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Scale revenue to $100K by Q4" className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl" required />
              </div>
              <div>
                <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Description <span className="text-muted-foreground/50">(optional)</span></label>
                <Textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe your goal in more detail..." className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground placeholder:text-muted-foreground focus:border-gold rounded-xl resize-none" rows={3} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Category</label>
                  <Select value={form.category} onValueChange={(v) => setForm(p => ({ ...p, category: v }))}>
                    <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">{goalCategories.map((cat) => (<SelectItem key={cat.value} value={cat.value} className="text-foreground focus:text-gold">{cat.label}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Target Date</label>
                  <Input type="date" value={form.targetDate} onChange={(e) => setForm(p => ({ ...p, targetDate: e.target.value }))} className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground focus:border-gold h-11 rounded-xl" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-2 block">Your Zodiac Sign <span className="text-muted-foreground/50">(for cosmic timing)</span></label>
                  <Select value={form.zodiacSign} onValueChange={(v) => setForm(p => ({ ...p, zodiacSign: v }))}>
                    <SelectTrigger className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground h-11 rounded-xl"><SelectValue placeholder="Select your sign" /></SelectTrigger>
                    <SelectContent className="bg-[oklch(0.14_0.04_280)] border-[oklch(0.78_0.14_80/0.2)]">{zodiacSigns.map((sign) => (<SelectItem key={sign} value={sign} className="text-foreground focus:text-gold">{sign}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={createGoal.isPending} className="flex-1 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-5 rounded-xl glow-gold-sm">
                  {createGoal.isPending ? <><Sparkles className="h-4 w-4 mr-2 animate-spin" /> Getting Cosmic Guidance...</> : <><Sparkles className="h-4 w-4 mr-2" /> Set Goal + Get Guidance</>}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground font-cinzel">Cancel</Button>
              </div>
            </form>
          )}

          {/* Goals List */}
          {isAuthenticated && (
            <div className="space-y-4">
              <h3 className="font-cinzel font-semibold text-foreground flex items-center gap-2">
                <Target className="h-4 w-4 text-gold" />
                My Goals
              </h3>
              {goalsList.isLoading ? (
                <div className="text-center py-8 text-muted-foreground font-cinzel text-sm">Loading your goals...</div>
              ) : goalsList.data?.length === 0 ? (
                <div className="card-cosmic rounded-2xl p-8 text-center">
                  <Target className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                  <p className="font-cinzel text-muted-foreground">No goals set yet. Create your first cosmic goal above!</p>
                </div>
              ) : (
                goalsList.data?.map((goal) => (
                  <div key={goal.id} className="card-cosmic rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {statusIcon(goal.status)}
                        <div className="flex-1">
                          <h4 className="font-cinzel font-semibold text-foreground text-sm">{goal.title}</h4>
                          {goal.description && <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>}
                          <div className="flex items-center gap-3 mt-2">
                            {goal.category && <span className="text-xs text-gold/60 font-cinzel">{goalCategories.find(c => c.value === goal.category)?.label || goal.category}</span>}
                            {goal.targetDate && <span className="text-xs text-muted-foreground">📅 {goal.targetDate}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        <span className={`text-xs font-cinzel px-2 py-0.5 rounded-full border text-center ${goal.status === "completed" ? "text-green-400 border-green-400/30 bg-green-400/10" : goal.status === "paused" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" : "text-gold border-gold/30 bg-gold/10"}`}>{goal.status}</span>
                        {goal.status === "active" && (
                          <button onClick={() => updateStatus.mutate({ goalId: goal.id, status: "completed" })} className="text-xs text-green-400 hover:text-green-300 font-cinzel text-center">Complete ✓</button>
                        )}
                      </div>
                    </div>
                    {goal.aiGuidance && (
                      <div className="mt-3 pt-3 border-t border-[oklch(0.78_0.14_80/0.1)]">
                        <p className="text-xs font-cinzel text-gold/60 uppercase tracking-wider mb-2">Cosmic Guidance</p>
                        <div className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                          <Streamdown>{goal.aiGuidance}</Streamdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {!isAuthenticated && (
            <div className="card-cosmic rounded-2xl p-8 text-center">
              <Target className="h-12 w-12 text-gold/30 mx-auto mb-3" />
              <p className="font-cinzel text-muted-foreground mb-4">Sign in to set and track your cosmic goals.</p>
              <a href={getLoginUrl()}><Button className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">Sign In to Begin</Button></a>
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
