import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Star, User, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663245540972/YY5XDNPyQ9dVwNGQnjcsSf/ATSlogo_3b4d0acb.PNG";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/birth-chart", label: "Birth Chart" },
  { href: "/zodiac", label: "Zodiac" },
  { href: "/quiz", label: "Quiz" },
  { href: "/affirmations", label: "Affirmations" },
  { href: "/meditation", label: "Meditation" },
  { href: "/goals", label: "Goals" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.href = "/";
    },
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[oklch(0.78_0.14_80/0.15)] bg-[oklch(0.08_0.02_280/0.92)] backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Ask The Sages"
            className="h-10 w-10 rounded-full object-cover border border-[oklch(0.78_0.14_80/0.3)]"
          />
          <span className="hidden sm:block font-cinzel font-bold text-sm text-gold leading-tight">
            Ask The Sages
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 font-cinzel ${
                location === link.href
                  ? "text-gold bg-[oklch(0.78_0.14_80/0.1)]"
                  : "text-foreground/70 hover:text-gold hover:bg-[oklch(0.78_0.14_80/0.07)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 text-gold hover:text-gold hover:bg-[oklch(0.78_0.14_80/0.1)]"
                >
                  <User className="h-4 w-4" />
                  <span className="font-cinzel text-xs">{user?.name?.split(" ")[0] || "Dashboard"}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-muted-foreground hover:text-destructive"
                onClick={() => logout.mutate()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button
                size="sm"
                className="gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold text-xs glow-gold-sm hover:opacity-90 transition-opacity"
              >
                <Star className="h-3.5 w-3.5 mr-1" />
                Sign In
              </Button>
            </a>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-[oklch(0.10_0.03_280)] border-l border-[oklch(0.78_0.14_80/0.15)] p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-[oklch(0.78_0.14_80/0.15)]">
                  <div className="flex items-center gap-2">
                    <img src={LOGO_URL} alt="ATS" className="h-8 w-8 rounded-full" />
                    <span className="font-cinzel font-bold text-gold text-sm">Ask The Sages</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-cinzel font-medium transition-all ${
                        location === link.href
                          ? "text-gold bg-[oklch(0.78_0.14_80/0.12)] border border-[oklch(0.78_0.14_80/0.2)]"
                          : "text-foreground/70 hover:text-gold hover:bg-[oklch(0.78_0.14_80/0.07)]"
                      }`}
                    >
                      <Star className="h-3.5 w-3.5 text-gold/50" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t border-[oklch(0.78_0.14_80/0.15)]">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold">
                          <User className="h-4 w-4 mr-2" />
                          My Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full text-muted-foreground"
                        onClick={() => { logout.mutate(); setOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <a href={getLoginUrl()} onClick={() => setOpen(false)}>
                      <Button className="w-full gradient-gold text-[oklch(0.08_0.02_280)] font-cinzel font-semibold glow-gold-sm">
                        <Star className="h-4 w-4 mr-2" />
                        Sign In to Begin
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
