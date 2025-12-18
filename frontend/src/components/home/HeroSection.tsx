import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: "var(--gradient-glow)" }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-primary"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[20%] w-2 h-2 rounded-full bg-primary/80"
      />
      <motion.div
        animate={{ y: [-15, 25, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-[25%] w-4 h-4 rounded-full bg-primary/60"
      />

      {/* Twinkle Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className={`absolute w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_#D4AF37]`}
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`right-${i}`}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          className={`absolute w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_4px_#D4AF37]`}
          style={{
            top: `${15 + i * 14}%`,
            right: `${10 + i * 12}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Creative Branding Studio</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 flex flex-col items-center">
            <TextReveal text="We Help Brands" className="justify-center text-foreground" delay={0.2} />
            <TextReveal text="Bloom & Thrive" className="justify-center text-gradient" delay={0.4} />
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Strategic storytelling meets bold creativity. We craft digital experiences
            that transform brands into unforgettable stories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/work">
                <Play className="mr-2 h-4 w-4" />
                View Our Work
              </Link>
            </Button>
          </motion.div>
        </div>


      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
