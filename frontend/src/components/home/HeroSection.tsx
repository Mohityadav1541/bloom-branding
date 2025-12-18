import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: "100%", rotateX: -20, opacity: 0 },
  show: {
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 1.2,

    },
  },
};

export const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<'start' | 'driving' | 'smoke' | 'reveal' | 'idle'>('start');

  useEffect(() => {
    // Sequence Timeline
    const sequence = async () => {
      // Phase 1: Car starts driving
      setAnimationPhase('driving');

      // Phase 2: Smoke accumulating (starts shortly after car moves)
      setTimeout(() => setAnimationPhase('smoke'), 800);

      // Phase 3: Reveal text from smoke
      setTimeout(() => setAnimationPhase('reveal'), 2500);

      // Phase 4: Settle to idle state
      setTimeout(() => setAnimationPhase('idle'), 4000);
    };

    // Slight delay on mount
    const timer = setTimeout(sequence, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
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

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-1 items-center gap-10">
        <div className="max-w-5xl mx-auto text-center relative z-20">
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
          <motion.h1
            variants={container}
            initial="hidden"
            animate={animationPhase === 'reveal' || animationPhase === 'idle' ? "show" : "hidden"}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 flex flex-col items-center perspective-text"
          >
            <div className="overflow-hidden">
              <motion.div variants={item} className="flex gap-4 justify-center text-foreground">
                <span>We</span>
                <span>Help</span>
                <span>Brands</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={item} className="flex gap-4 justify-center items-center">
                <span className="text-gradient">Bloom</span>
                <span className="text-3xl md:text-5xl align-middle text-muted-foreground/60">&</span>
                <span className="text-gradient">Thrive</span>
              </motion.div>
            </div>
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase === 'reveal' || animationPhase === 'idle' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Strategic storytelling meets bold creativity. We craft digital experiences
              that transform brands into unforgettable stories.
            </p>
          </motion.div>

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

      {/* Cinematic Car & Smoke Animation */}
      <AnimatePresence>
        {animationPhase !== 'idle' && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-end">

            {/* Cinematic Fog/Smoke Logic */}
            {(animationPhase === 'smoke' || animationPhase === 'reveal') && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`smoke-${i}`}
                    initial={{ opacity: 0, scale: 0.2, x: 0, y: 50 }}
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [0.5, 3 + Math.random() * 2, 4],
                      x: (Math.random() - 0.5) * 500,
                      y: -100 - Math.random() * 200,
                    }}
                    transition={{
                      duration: 3 + Math.random(),
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute w-64 h-64 rounded-full bg-white/10 blur-[80px]"
                  />
                ))}
              </div>
            )}

            {/* The Driving Car */}
            <motion.div
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{
                x: ["-100vw", "120vw"],
                opacity: [1, 1]
              }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
                times: [0, 1]
              }}
              className="absolute bottom-10 w-[600px] md:w-[900px] z-40"
            >
              <img
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                alt="Cinematic Sports Car"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ filter: "brightness(0.8) contrast(1.2)" }}
              />
              {/* Exhaust Smoke Emitter (Simulated) */}
              <div className="absolute bottom-5 right-10">
                <motion.div
                  animate={{ opacity: [0, 0.5, 0], scale: [0.5, 2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-20 h-20 bg-white/20 blur-xl rounded-full"
                />
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

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
