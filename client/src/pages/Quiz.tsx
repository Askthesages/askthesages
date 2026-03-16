import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import { Brain, Star, ChevronRight, ChevronLeft, Sparkles, RotateCcw } from "lucide-react";
import { Streamdown } from "streamdown";

const quizQuestions = [
  {
    id: 1,
    question: "When facing a major business decision, what is your primary approach?",
    options: [
      { label: "Trust my gut instinct and act quickly", value: "intuitive", score: 1 },
      { label: "Analyze all data before deciding", value: "analytical", score: 2 },
      { label: "Consult my team and build consensus", value: "collaborative", score: 3 },
      { label: "Reflect deeply and align with my values", value: "reflective", score: 4 },
    ],
  },
  {
    id: 2,
    question: "What drives you most as an entrepreneur?",
    options: [
      { label: "Creating wealth and financial freedom", value: "financial", score: 1 },
      { label: "Making a meaningful impact on the world", value: "impact", score: 2 },
      { label: "Building something that lasts beyond me", value: "legacy", score: 3 },
      { label: "Personal growth and self-mastery", value: "growth", score: 4 },
    ],
  },
  {
    id: 3,
    question: "How do you handle failure or setbacks in business?",
    options: [
      { label: "Pivot immediately and try a new approach", value: "agile", score: 1 },
      { label: "Analyze what went wrong systematically", value: "systematic", score: 2 },
      { label: "Seek support from mentors or community", value: "communal", score: 3 },
      { label: "Retreat, reflect, and come back stronger", value: "resilient", score: 4 },
    ],
  },
  {
    id: 4,
    question: "What is your relationship with risk?",
    options: [
      { label: "I thrive on calculated risks — they energize me", value: "bold", score: 1 },
      { label: "I minimize risk through thorough planning", value: "cautious", score: 2 },
      { label: "I share risk by building strong partnerships", value: "collaborative", score: 3 },
      { label: "I trust the universe to guide my path", value: "spiritual", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How do you recharge your entrepreneurial energy?",
    options: [
      { label: "Physical activity — gym, sports, movement", value: "physical", score: 1 },
      { label: "Learning — books, courses, new knowledge", value: "intellectual", score: 2 },
      { label: "Social connection — networking, community", value: "social", score: 3 },
      { label: "Solitude — meditation, nature, reflection", value: "spiritual", score: 4 },
    ],
  },
  {
    id: 6,
    question: "What is your greatest entrepreneurial strength?",
    options: [
      { label: "Vision — I see possibilities others miss", value: "visionary", score: 1 },
      { label: "Execution — I turn ideas into reality", value: "executor", score: 2 },
      { label: "Relationships — I build powerful networks", value: "connector", score: 3 },
      { label: "Wisdom — I make decisions with deep insight", value: "sage", score: 4 },
    ],
  },
  {
    id: 7,
    question: "How do you approach your morning routine?",
    options: [
      { label: "Jump straight into work — I'm most productive early", value: "productive", score: 1 },
      { label: "Plan and prioritize my day systematically", value: "structured", score: 2 },
      { label: "Connect with loved ones or team first", value: "relational", score: 3 },
      { label: "Meditate, journal, or set intentions", value: "mindful", score: 4 },
    ],
  },
  {
    id: 8,
    question: "What does success ultimately mean to you?",
    options: [
      { label: "Freedom — complete control over my time and life", value: "freedom", score: 1 },
      { label: "Achievement — reaching ambitious milestones", value: "achievement", score: 2 },
      { label: "Contribution — uplifting others around me", value: "contribution", score: 3 },
      { label: "Alignment — living fully in my purpose", value: "purpose", score: 4 },
    ],
  },
];

type Answer = { question: string; answer: string; score: number };

export default function Quiz() {
  const { isAuthenticated } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<{ aiAnalysis: string; personalityType: string } | null>(null);

  const analyzeQuiz = trpc.quiz.analyze.useMutation({
    onSuccess: (data) => setResult(data),
    onError: () => toast.error("Failed to analyze quiz. Please try again."),
  });

  const handleNext = () => {
    if (!selectedOption) return;
    const q = quizQuestions[currentQ];
    const option = q.options.find((o) => o.value === selectedOption)!;
    const newAnswers = [...answers, { question: q.question, answer: option.label, score: option.score }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Submit
      if (!isAuthenticated) {
        toast.error("Please sign in to get your AI analysis");
        return;
      }
      analyzeQuiz.mutate({ quizType: "entrepreneur-personality", answers: newAnswers });
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setResult(null);
  };

  const progress = ((currentQ) / quizQuestions.length) * 100;
  const isLastQuestion = currentQ === quizQuestions.length - 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-24 lg:pb-8 px-4">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.78_0.14_80/0.2)] bg-[oklch(0.78_0.14_80/0.05)] mb-4">
              <Brain className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-cinzel text-gold/80 tracking-widest uppercase">AI-Powered Assessment</span>
            </div>
            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Entrepreneur <span className="gradient-text-gold">Archetype</span> Quiz
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Discover your unique entrepreneurial personality through the lens of Vedic wisdom and modern psychology.
            </p>
          </div>

          {/* Results */}
          {result ? (
            <div className="space-y-6">
              <div className="card-cosmic rounded-3xl p-6 sm:p-8 text-center border border-[oklch(0.78_0.14_80/0.3)] glow-gold">
                <Sparkles className="h-12 w-12 text-gold mx-auto mb-4 animate-pulse-gold" />
                <p className="text-xs font-cinzel text-gold/60 tracking-widest uppercase mb-2">Your Archetype</p>
                <h2 className="font-cinzel font-bold text-2xl sm:text-3xl gradient-text-gold mb-2">
                  {result.personalityType}
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
              </div>

              <div className="card-cosmic rounded-3xl p-6 sm:p-8">
                <h3 className="font-cinzel font-semibold text-gold mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Your Cosmic Analysis
                </h3>
                <div className="prose prose-invert prose-sm max-w-none text-foreground/80 leading-relaxed">
                  <Streamdown>{result.aiAnalysis}</Streamdown>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold py-6 rounded-2xl glow-gold-sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Again
                </Button>
                <a href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full border-[oklch(0.78_0.14_80/0.3)] text-gold hover:bg-[oklch(0.78_0.14_80/0.08)] font-cinzel py-6 rounded-2xl bg-transparent">
                    View Dashboard
                  </Button>
                </a>
              </div>
            </div>
          ) : analyzeQuiz.isPending ? (
            /* Loading state */
            <div className="card-cosmic rounded-3xl p-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                <Star className="absolute inset-0 m-auto h-8 w-8 text-gold animate-pulse" />
              </div>
              <h3 className="font-cinzel font-semibold text-foreground text-lg mb-2">Consulting the Sages...</h3>
              <p className="text-muted-foreground text-sm">The AI is analyzing your cosmic blueprint. This may take a moment.</p>
            </div>
          ) : (
            /* Quiz Questions */
            <div className="card-cosmic rounded-3xl p-6 sm:p-8">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-cinzel text-muted-foreground">
                    Question {currentQ + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs font-cinzel text-gold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5 bg-[oklch(0.20_0.05_280)]" />
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-cinzel font-bold text-[oklch(0.08_0.02_280)]">{currentQ + 1}</span>
                  </div>
                  <h2 className="font-cinzel font-semibold text-foreground text-base sm:text-lg leading-relaxed">
                    {quizQuestions[currentQ].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {quizQuestions[currentQ].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedOption(option.value)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 font-medium text-sm ${
                        selectedOption === option.value
                          ? "border-gold bg-[oklch(0.78_0.14_80/0.12)] text-gold glow-gold-sm"
                          : "border-[oklch(0.78_0.14_80/0.15)] bg-[oklch(0.15_0.04_280/0.5)] text-foreground/80 hover:border-[oklch(0.78_0.14_80/0.35)] hover:bg-[oklch(0.78_0.14_80/0.07)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          selectedOption === option.value
                            ? "border-gold bg-gold"
                            : "border-[oklch(0.78_0.14_80/0.3)]"
                        }`}>
                          {selectedOption === option.value && (
                            <div className="w-2 h-2 rounded-full bg-[oklch(0.08_0.02_280)]" />
                          )}
                        </div>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentQ === 0}
                  className="text-muted-foreground hover:text-foreground font-cinzel"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-bold px-8 py-5 rounded-2xl glow-gold-sm disabled:opacity-40"
                >
                  {isLastQuestion ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isAuthenticated ? "Get My Analysis" : "Sign In for Analysis"}
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {!isAuthenticated && isLastQuestion && (
                <p className="text-center text-xs text-muted-foreground mt-4">
                  <a href={getLoginUrl()} className="text-gold hover:underline">Sign in</a> to save your results and get full AI analysis
                </p>
              )}
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
