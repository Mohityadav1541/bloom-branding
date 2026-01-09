import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Approximate position of eyes center relative to the viewport
      // Based on the image layout where eyes are roughly at bottom center
      const eyesCenterX = rect.left + rect.width * 0.63;
      const eyesCenterY = rect.top + rect.height * 0.73;

      const deltaX = e.clientX - eyesCenterX;
      const deltaY = e.clientY - eyesCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      // Limit the movement radius
      const maxRadius = 10;
      const x = Math.cos(angle) * Math.min(maxRadius, Math.hypot(deltaX, deltaY) / 10);
      const y = Math.sin(angle) * Math.min(maxRadius, Math.hypot(deltaX, deltaY) / 10);

      setPupilPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen flex flex-col lg:flex-row pt-20">
        {/* Left Panel - Visual */}
        <div ref={containerRef} className="w-full lg:w-1/2 bg-secondary/30 relative overflow-hidden flex items-center justify-center p-8 lg:p-0 min-h-[40vh] lg:min-h-screen">
          <div className="absolute inset-0 bg-secondary/10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg lg:max-w-xl group"
          >
            <img
              src="/contact-hero.png"
              alt="Creative Abstract 3D Shapes"
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700"
            />

            {/* Interactive Eyes Overlay */}
            <div className="absolute top-[71%] left-[59%] w-[12%] h-[6%] flex gap-[15%] pointer-events-none z-20">
              {/* Left Eye */}
              <div className="relative w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[50%] h-[50%] bg-black rounded-full"
                  animate={{ x: pupilPos.x, y: pupilPos.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                />
              </div>
              {/* Right Eye */}
              <div className="relative w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[50%] h-[50%] bg-black rounded-full"
                  animate={{ x: pupilPos.x, y: pupilPos.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center px-6 lg:px-20 vertical-scroll py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md w-full mx-auto"
          >
            <div className="mb-10">
              <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-3">
                Let's Talk
              </h1>
              <p className="text-muted-foreground">
                Ready to transform your brand? Fill in the details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  required
                  className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Service Interest</Label>
                <Input
                  id="services"
                  placeholder="e.g. Branding, Web Design"
                  className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us a bit about your project..."
                  className="min-h-[120px] bg-secondary/20 border-border focus:border-primary rounded-xl resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all font-medium mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                Connect with us
              </p>
              <div className="flex gap-4">
                <a href="mailto:hello@bloombranding.com" className="p-3 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors text-foreground">
                  <Mail size={20} />
                </a>
                <a href="tel:+919876543210" className="p-3 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors text-foreground">
                  <Phone size={20} />
                </a>
                <a href="https://www.instagram.com/bloom.branding_/" target="_blank" rel="noreferrer" className="p-3 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors text-foreground">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-3 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors text-foreground">
                  <Linkedin size={20} />
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer className="lg:hidden" /> {/* Only show footer on mobile as split screen covers full height on desktop */}
    </PageTransition>
  );
};

export default Contact;
