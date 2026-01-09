import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, Sparkles, Briefcase, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Our Story", path: "/story", icon: BookOpen },
  { name: "Services", path: "/services", icon: Sparkles },
  { name: "Work", path: "/work", icon: Briefcase },
  { name: "Our Founder", path: "/founder", icon: User },
  { name: "Contact", path: "/contact", icon: Mail },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show if scrolling up or at the very top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide if scrolling down and past the header
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo-bb.jpg"
              alt="Bloom Studio"
              className="h-12 w-12 rounded-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group flex items-center justify-center p-2 rounded-full transition-all duration-300"
                >
                  {/* Lighting/Glow Effect Background */}
                  <span className="absolute inset-0 bg-foreground text-background rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.3)]" />

                  <div className={`flex items-center gap-2 relative z-10 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-background"}`}>
                    <link.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
                    <span
                      className={`font-body text-sm tracking-wide overflow-hidden whitespace-nowrap transition-all duration-300 max-w-[100px] group-hover:max-w-0 group-hover:opacity-0`}
                    >
                      {link.name}
                    </span>
                  </div>

                  {/* Active Indicator Dot (optional, if text underline is removed) */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Button asChild variant="default" size="sm">
              <Link to="/contact">Brand Enquiry</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect border-t border-border/50"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 py-2 font-body text-lg ${location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                      }`}
                  >
                    <link.icon size={20} />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4"
              >
                <Button asChild variant="default" className="w-full">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Brand Enquiry
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
