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
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(249,243,232,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,162,39,0.25)",
        boxShadow: "0 2px 20px rgba(61,28,2,0.08)"
      }}
    >
      {/* Top decorative gold line */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #C9A227 20%, #B85C00 50%, #C9A227 80%, transparent 100%)" }} />

      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="rounded-full p-0.5" style={{ background: "linear-gradient(135deg, #C9A227, #B85C00)" }}>
            <img
              src={LOGO_URL}
              alt="Ask The Sages"
              className="h-12 w-12 rounded-full object-cover"
              style={{ background: "#F9F3E8" }}
            />
          </div>
          <span className="hidden sm:block font-cinzel font-bold text-sm leading-tight" style={{ color: "#3D1C02" }}>
            Ask The Sages
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 font-cinzel`}
              style={
                location === link.href
                  ? { color: "#B85C00", background: "rgba(184,92,0,0.08)", borderBottom: "2px solid #B85C00" }
                  : { color: "#6B4C2A" }
              }
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
                  className="hidden sm:flex items-center gap-1.5"
                  style={{ color: "#B85C00" }}
                >
                  <User className="h-4 w-4" />
                  <span className="font-cinzel text-xs">{user?.name?.split(" ")[0] || "Dashboard"}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                style={{ color: "#8A7E72" }}
                onClick={() => logout.mutate()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button
                size="sm"
                className="font-cinzel font-semibold text-xs"
                style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0", border: "none", boxShadow: "0 2px 10px rgba(184,92,0,0.3)" }}
              >
                <Star className="h-3.5 w-3.5 mr-1" />
                Sign In
              </Button>
            </a>
          )}

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" style={{ color: "#3D1C02" }}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 p-0"
              style={{ background: "#F9F3E8", borderLeft: "1px solid rgba(201,162,39,0.25)" }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
                  <div className="flex items-center gap-2">
                    <img src={LOGO_URL} alt="ATS" className="h-8 w-8 rounded-full" />
                    <span className="font-cinzel font-bold text-sm" style={{ color: "#3D1C02" }}>Ask The Sages</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)} style={{ color: "#6B4C2A" }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-cinzel font-medium transition-all"
                      style={
                        location === link.href
                          ? { color: "#B85C00", background: "rgba(184,92,0,0.08)", border: "1px solid rgba(184,92,0,0.2)" }
                          : { color: "#6B4C2A" }
                      }
                    >
                      <span style={{ color: "rgba(201,162,39,0.6)", fontSize: "0.7rem" }}>ॐ</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4" style={{ borderTop: "1px solid rgba(201,162,39,0.2)" }}>
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button className="w-full font-cinzel font-semibold"
                          style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0", border: "none" }}
                        >
                          <User className="h-4 w-4 mr-2" />
                          My Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full"
                        style={{ color: "#8A7E72" }}
                        onClick={() => { logout.mutate(); setOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <a href={getLoginUrl()} onClick={() => setOpen(false)}>
                      <Button className="w-full font-cinzel font-semibold"
                        style={{ background: "linear-gradient(135deg, #B85C00, #C9A227)", color: "#FFF8F0", border: "none", boxShadow: "0 2px 10px rgba(184,92,0,0.3)" }}
                      >
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
