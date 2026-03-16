import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import BirthChart from "./pages/BirthChart";
import ZodiacProfiles from "./pages/ZodiacProfiles";
import PlanetaryInfluences from "./pages/PlanetaryInfluences";
import Affirmations from "./pages/Affirmations";
import Meditation from "./pages/Meditation";
import GoalSetting from "./pages/GoalSetting";
import Tools from "./pages/Tools";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={Tools} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/birth-chart" component={BirthChart} />
      <Route path="/zodiac" component={ZodiacProfiles} />
      <Route path="/planets" component={PlanetaryInfluences} />
      <Route path="/affirmations" component={Affirmations} />
      <Route path="/meditation" component={Meditation} />
      <Route path="/goals" component={GoalSetting} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
