import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Sync text reveal with video shutter timing
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Trigger "pop" at 2.0s to match cinematic buildup
    return () => clearTimeout(timer);
  }, []);

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

          {/* Main Heading - Pops out from "Lens" */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={showText ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} // Spring-like "pop" effect
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 flex flex-col items-center perspective-text mix-blend-overlay"
          >
            <div className="overflow-hidden">
              <div className="flex gap-4 justify-center text-foreground">
                <span>We</span>
                <span>Help</span>
                <span>Brands</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flex gap-4 justify-center items-center">
                <span className="text-gradient">Bloom</span>
                <span className="text-3xl md:text-5xl align-middle text-muted-foreground/60">&</span>
                <span className="text-gradient">Thrive</span>
              </div>
            </div>
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }} // Slight delay after heading
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
            animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

      {/* Cinematic Video Background - Camera Lens */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Placeholder Message for User */}
        <div className="absolute top-4 left-4 z-50 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
          Use your Camera Shutter 3D Render Here
        </div>

        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ filter: showText ? "blur(4px)" : "blur(0px)" }} // Reduced blur
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <video
            autoPlay
            muted
            playsInline
            loop={false}
            className="w-full h-full object-cover opacity-100"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            {/* High Contrast Camera Lens Video - Fallback to highly reliable source if needed */}
            <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Very light overlay just for text readability - Minimal interference */}
        <div className="absolute inset-0 bg-black/20" />
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
