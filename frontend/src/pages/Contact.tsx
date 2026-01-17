import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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
  const [pupilPos, setPupilPos] = useState({
    orange: { x: 0, y: 0 },
    purple: { x: 0, y: 0 },
    yellow: { x: 0, y: 0 },
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // Calculate look vector for a specific eye position
      const calculateLook = (eyeRelX: number, eyeRelY: number, maxRadius: number = 8) => {
        const eyeCenterX = rect.left + rect.width * eyeRelX;
        const eyeCenterY = rect.top + rect.height * eyeRelY;
        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const dist = Math.min(maxRadius, Math.hypot(deltaX, deltaY) / 15);
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist
        };
      };

      setPupilPos({
        orange: calculateLook(0.35, 0.55, 10), // Orange Semi-Circle (Left)
        purple: calculateLook(0.72, 0.35, 6),  // Purple Rect (Right)
        yellow: calculateLook(0.63, 0.73, 8),  // Yellow Cylinder (Middle)
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    brandName: '',
    deadline: '',
    budget: '',
    serviceInterest: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/enquiries`, formData);

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24-48 hours.",
      });

      setFormData({
        name: '',
        email: '',
        mobile: '',
        brandName: '',
        deadline: '',
        budget: '',
        serviceInterest: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Interactive Eyes Overlays */}

            {/* Orange Character Eyes (Left) */}
            <div className="absolute top-[52.5%] left-[28.5%] w-[13%] h-[6.5%] flex gap-[12%] pointer-events-none z-20">
              <div className="relative w-full h-full bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[45%] h-[45%] bg-black rounded-full"
                  animate={{ x: pupilPos.orange.x, y: pupilPos.orange.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
              </div>
              <div className="relative w-full h-full bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[45%] h-[45%] bg-black rounded-full"
                  animate={{ x: pupilPos.orange.x, y: pupilPos.orange.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
              </div>
            </div>

            {/* Purple Character Eyes (Right - Vertical) */}
            <div className="absolute top-[32%] left-[69.5%] w-[5.5%] h-[7.5%] flex flex-col gap-[8%] pointer-events-none z-20">
              <div className="relative w-full h-full bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[40%] h-[40%] bg-black rounded-full"
                  animate={{ x: pupilPos.purple.x, y: pupilPos.purple.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
              </div>
              <div className="relative w-full h-full bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-[40%] h-[40%] bg-black rounded-full"
                  animate={{ x: pupilPos.purple.x, y: pupilPos.purple.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
              </div>
            </div>

            {/* Yellow Character Eyes (Middle - Two Eyes) */}
            <div className="absolute top-[71.5%] left-[55.5%] w-[14%] h-[5.5%] flex gap-[8%] justify-center pointer-events-none z-20">
              <div className="relative w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden border border-black/5">
                <motion.div
                  className="w-[50%] h-[50%] bg-black rounded-full"
                  animate={{ x: pupilPos.yellow.x, y: pupilPos.yellow.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                />
              </div>
              <div className="relative w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden border border-black/5">
                <motion.div
                  className="w-[50%] h-[50%] bg-black rounded-full"
                  animate={{ x: pupilPos.yellow.x, y: pupilPos.yellow.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    type="text"
                    placeholder="Your Brand"
                    value={formData.brandName}
                    onChange={handleChange}
                    className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Service Interest</Label>
                <Input
                  id="serviceInterest"
                  placeholder="e.g. Branding, Web Design"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="text"
                    placeholder="e.g. 1 Month, ASAP"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="text"
                    placeholder="e.g. ₹50k - ₹1L"
                    value={formData.budget}
                    onChange={handleChange}
                    className="h-12 bg-secondary/20 border-border focus:border-primary rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us a bit about your project..."
                  className="min-h-[120px] bg-secondary/20 border-border focus:border-primary rounded-xl resize-none"
                  required
                  value={formData.message}
                  onChange={handleChange}
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
