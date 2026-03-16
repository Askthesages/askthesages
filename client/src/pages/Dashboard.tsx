import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  Star, Moon, Brain, Heart, Target, User, Edit3,
  ChevronRight, Sparkles, Sun, Compass, BookOpen
} from "lucide-react";
import { Streamdown } from "streamdown";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    sunSign: "",
    moonSign: "",
    risingSign: "",
  });

  const quizHistory = trpc.quiz.history.useQuery(undefined, { enabled: isAuthenticated });
  const chartHistory = trpc.birthChart.history.useQuery(undefined, { enabled: isAuthenticated });
  const savedAffirmations = trpc.affirmations.saved.useQuery(undefined, { enabled: isAuthenticated });
  const goalsList = trpc.goals.list.useQuery(undefined, { enabled: isAuthenticated });

  const updateProfile = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setEditingProfile(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const updateGoalStatus = trpc.goals.updateStatus.useMutation({
    onSuccess: () => {
      goalsList.refetch();
      toast.success("Goal status updated!");
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-gold border-t-transparent animate-spin mx-auto mb-4" />
          <p className="font-cinzel text-gold/70">Consulting the cosmos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <Navbar />
        <div className="text-center max-w-md">
          <Star className="h-16 w-16 text-gold mx-auto mb-6 animate-pulse-gold" />
          <h1 className="font-cinzel font-bold text-3xl text-foreground mb-4">Your Cosmic Dashboard</h1>
          <p className="text-muted-foreground mb-8">Sign in to access your personalized astrology insights, quiz results, and mindset tools.</p>
          <a href={getLoginUrl()}>
            <Button className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold px-8 py-6 rounded-2xl glow-gold">
              <Star className="h-5 w-5 mr-2" />
              Sign In to Begin
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const quickActions = [
    { icon: Moon, label: "Birth Chart", href: "/birth-chart", color: "oklch(0.65 0.18 290)" },
    { icon: Brain, label: "Take Quiz", href: "/quiz", color: "oklch(0.78 0.14 80)" },
    { icon: Heart, label: "Affirmations", href: "/affirmations", color: "oklch(0.65 0.22 350)" },
    { icon: Target, label: "Set Goals", href: "/goals", color: "oklch(0.65 0.18 150)" },
    { icon: Sun, label: "Zodiac", href: "/zodiac", color: "oklch(0.70 0.18 50)" },
    { icon: Compass, label: "Planets", href: "/planets", color: "oklch(0.60 0.20 200)" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-cinzel text-gold/60 tracking-widest uppercase mb-1">Welcome back</p>
              <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-foreground">
                {user?.name?.split(" ")[0] || "Sage"} <span className="gradient-text-gold">✦</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Your cosmic journey continues</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[oklch(0.78_0.14_80/0.15)] blur-xl" />
              <div className="relative w-14 h-14 rounded-full border-2 border-[oklch(0.78_0.14_80/0.4)] bg-[oklch(0.78_0.14_80/0.1)] flex items-center justify-center">
                <User className="h-7 w-7 text-gold" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <div className="card-cosmic rounded-2xl p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-[oklch(0.78_0.14_80/0.35)] hover:-translate-y-0.5 transition-all duration-200 min-h-[80px] justify-center">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${action.color}20`, border: `1px solid ${action.color}40` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: action.color }} />
                    </div>
                    <span className="text-[10px] font-cinzel text-muted-foreground text-center leading-tight">{action.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-[oklch(0.12_0.03_280)] border border-[oklch(0.78_0.14_80/0.15)] p-1 rounded-2xl w-full overflow-x-auto flex">
              {["overview", "charts", "quizzes", "goals", "affirmations"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="font-cinzel text-xs capitalize flex-1 rounded-xl data-[state=active]:bg-[oklch(0.78_0.14_80/0.15)] data-[state=active]:text-gold"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Profile Card */}
              <Card className="card-cosmic border-0 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="font-cinzel text-base text-gold flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Cosmic Profile
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-gold"
                    onClick={() => setEditingProfile(!editingProfile)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {editingProfile ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { key: "birthDate", label: "Birth Date", type: "date" },
                        { key: "birthTime", label: "Birth Time", type: "time" },
                        { key: "birthLocation", label: "Birth Location", type: "text" },
                        { key: "sunSign", label: "Sun Sign", type: "text" },
                        { key: "moonSign", label: "Moon Sign", type: "text" },
                        { key: "risingSign", label: "Rising Sign", type: "text" },
                      ].map((field) => (
                        <div key={field.key}>
                          <Label className="text-xs font-cinzel text-muted-foreground">{field.label}</Label>
                          <Input
                            type={field.type}
                            value={profileData[field.key as keyof typeof profileData]}
                            onChange={(e) => setProfileData(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="bg-[oklch(0.15_0.04_280)] border-[oklch(0.78_0.14_80/0.2)] text-foreground mt-1"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        </div>
                      ))}
                      <div className="sm:col-span-2 flex gap-3">
                        <Button
                          className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold"
                          onClick={() => updateProfile.mutate(profileData)}
                          disabled={updateProfile.isPending}
                        >
                          {updateProfile.isPending ? "Saving..." : "Save Profile"}
                        </Button>
                        <Button variant="ghost" onClick={() => setEditingProfile(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: "☀️ Sun Sign", value: (user as any)?.sunSign || "—" },
                        { label: "🌙 Moon Sign", value: (user as any)?.moonSign || "—" },
                        { label: "⬆️ Rising Sign", value: (user as any)?.risingSign || "—" },
                        { label: "📅 Birth Date", value: (user as any)?.birthDate || "—" },
                        { label: "⏰ Birth Time", value: (user as any)?.birthTime || "—" },
                        { label: "📍 Location", value: (user as any)?.birthLocation || "—" },
                      ].map((item) => (
                        <div key={item.label} className="bg-[oklch(0.15_0.04_280/0.5)] rounded-xl p-3">
                          <p className="text-xs text-muted-foreground font-cinzel mb-1">{item.label}</p>
                          <p className="text-sm font-semibold text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Charts Read", value: chartHistory.data?.length || 0, icon: Moon },
                  { label: "Quizzes Taken", value: quizHistory.data?.length || 0, icon: Brain },
                  { label: "Goals Set", value: goalsList.data?.length || 0, icon: Target },
                  { label: "Affirmations", value: savedAffirmations.data?.length || 0, icon: Heart },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="card-cosmic rounded-2xl p-4 text-center">
                      <Icon className="h-5 w-5 text-gold mx-auto mb-2" />
                      <p className="font-cinzel font-bold text-2xl text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground font-cinzel">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Charts Tab */}
            <TabsContent value="charts" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-semibold text-foreground">Birth Chart Readings</h3>
                <Link href="/birth-chart">
                  <Button size="sm" className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel text-xs">
                    New Reading
                  </Button>
                </Link>
              </div>
              {chartHistory.data?.length === 0 ? (
                <div className="card-cosmic rounded-2xl p-8 text-center">
                  <Moon className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                  <p className="font-cinzel text-muted-foreground">No charts yet. Get your first reading!</p>
                  <Link href="/birth-chart">
                    <Button className="mt-4 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">Read My Chart</Button>
                  </Link>
                </div>
              ) : (
                chartHistory.data?.map((chart) => (
                  <div key={chart.id} className="card-cosmic rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-cinzel font-semibold text-foreground">{chart.name}</h4>
                        <p className="text-xs text-muted-foreground">{chart.birthDate} · {chart.birthLocation}</p>
                      </div>
                      <div className="flex gap-2 text-xs text-gold/70 font-cinzel">
                        {chart.sunSign && <span>☀️ {chart.sunSign}</span>}
                        {chart.moonSign && <span>🌙 {chart.moonSign}</span>}
                      </div>
                    </div>
                    {chart.aiInterpretation && (
                      <div className="text-sm text-muted-foreground line-clamp-3 prose prose-invert prose-sm max-w-none">
                        <Streamdown>{chart.aiInterpretation.substring(0, 300) + "..."}</Streamdown>
                      </div>
                    )}
                  </div>
                ))
              )}
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-semibold text-foreground">Quiz Results</h3>
                <Link href="/quiz">
                  <Button size="sm" className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel text-xs">
                    Take Quiz
                  </Button>
                </Link>
              </div>
              {quizHistory.data?.length === 0 ? (
                <div className="card-cosmic rounded-2xl p-8 text-center">
                  <Brain className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                  <p className="font-cinzel text-muted-foreground">No quiz results yet.</p>
                  <Link href="/quiz">
                    <Button className="mt-4 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">Take the Quiz</Button>
                  </Link>
                </div>
              ) : (
                quizHistory.data?.map((result) => (
                  <div key={result.id} className="card-cosmic rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinzel font-semibold text-gold text-sm">{result.personalityType}</span>
                      <span className="text-xs text-muted-foreground">{new Date(result.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{result.quizType} Assessment</p>
                    {result.aiAnalysis && (
                      <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        <Streamdown>{result.aiAnalysis.substring(0, 250) + "..."}</Streamdown>
                      </div>
                    )}
                  </div>
                ))
              )}
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-semibold text-foreground">My Goals</h3>
                <Link href="/goals">
                  <Button size="sm" className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel text-xs">
                    New Goal
                  </Button>
                </Link>
              </div>
              {goalsList.data?.length === 0 ? (
                <div className="card-cosmic rounded-2xl p-8 text-center">
                  <Target className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                  <p className="font-cinzel text-muted-foreground">No goals set yet.</p>
                  <Link href="/goals">
                    <Button className="mt-4 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">Set a Goal</Button>
                  </Link>
                </div>
              ) : (
                goalsList.data?.map((goal) => (
                  <div key={goal.id} className="card-cosmic rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-cinzel font-semibold text-foreground text-sm">{goal.title}</h4>
                        {goal.description && <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>}
                        {goal.targetDate && <p className="text-xs text-gold/60 mt-1">Target: {goal.targetDate}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-cinzel px-2 py-0.5 rounded-full border ${
                          goal.status === "completed"
                            ? "text-green-400 border-green-400/30 bg-green-400/10"
                            : goal.status === "paused"
                            ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                            : "text-gold border-gold/30 bg-gold/10"
                        }`}>
                          {goal.status}
                        </span>
                        {goal.status === "active" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-green-400 hover:text-green-300 h-6 px-2"
                            onClick={() => updateGoalStatus.mutate({ goalId: goal.id, status: "completed" })}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Affirmations Tab */}
            <TabsContent value="affirmations" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-semibold text-foreground">Saved Affirmations</h3>
                <Link href="/affirmations">
                  <Button size="sm" className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel text-xs">
                    Generate More
                  </Button>
                </Link>
              </div>
              {savedAffirmations.data?.length === 0 ? (
                <div className="card-cosmic rounded-2xl p-8 text-center">
                  <Heart className="h-12 w-12 text-gold/30 mx-auto mb-3" />
                  <p className="font-cinzel text-muted-foreground">No saved affirmations yet.</p>
                  <Link href="/affirmations">
                    <Button className="mt-4 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">Get Affirmations</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAffirmations.data?.map((aff) => (
                    <div key={aff.id} className="card-cosmic rounded-2xl p-4">
                      <p className="text-sm text-foreground/90 italic leading-relaxed">"{aff.text}"</p>
                      {aff.category && (
                        <span className="text-xs text-gold/60 font-cinzel mt-2 block">{aff.category}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
