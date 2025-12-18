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
    }, 1500); // Trigger earlier for smoother flow
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

      {/* Floating Elements - 3D Particles */}
      <motion.div
        animate={{ y: [-30, 30, -30], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] w-4 h-4 rounded-sm bg-primary blur-[2px] opacity-60"
      />
      <motion.div
        animate={{ y: [40, -40, 40], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-primary/80 blur-[1px] opacity-70"
      />
      <motion.div
        animate={{ y: [-25, 35, -25], scale: [1, 1.5, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-[25%] w-6 h-6 rounded-full bg-primary/40 blur-[4px]"
      />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-1 items-center gap-10">
        <div className="max-w-5xl mx-auto text-center relative z-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse box-shadow-[0_0_10px_0_rgba(34,211,238,0.5)]" />
            <span className="text-sm text-white/80 tracking-wide font-light">Future of Branding</span>
          </motion.div>

          {/* Main Heading - 3D VFX Reveal */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, rotateX: 90, y: 50, filter: "blur(20px)" }}
            animate={showText ? { opacity: 1, scale: 1, rotateX: 0, y: 0, filter: "blur(0px)" } : { opacity: 0, scale: 0.8, rotateX: 90, y: 50, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Cubic bezier for "tech" feel
            className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6 flex flex-col items-center perspective-text"
            style={{ perspective: "1000px" }}
          >
            <div className="overflow-hidden p-2">
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center text-foreground tracking-tight drop-shadow-2xl">
                <span>We</span>
                <span>Help</span>
                <span>Brands</span>
              </div>
            </div>
            <div className="overflow-hidden p-2">
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">Bloom</span>
                <span className="text-2xl sm:text-3xl md:text-5xl align-middle text-muted-foreground/60">&</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x">Thrive</span>
              </div>
            </div>
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              Where strategic storytelling meets <span className="text-cyan-400">immersive technology</span>. We craft digital experiences
              that exist at the edge of imagination.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-sm transition-all duration-300">
              <Link to="/contact">
                Start Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-white/10 text-white hover:bg-white/5 hover:text-cyan-400">
              <Link to="/work">
                <Play className="mr-2 h-4 w-4" />
                Showreel
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Video Background - Camera Lens */}
      <div
        className="absolute inset-0 z-0 overflow-hidden bg-gray-900 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop")' }}
      >
        {/* Placeholder Message for User */}
        <div className="absolute top-4 left-4 z-50 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
          Use your Camera Shutter 3D Render Here
        </div>

        <motion.div
          className="absolute inset-0 w-full h-full"
          // Removed brightness dimming to keep camera visible as per "background remain same"
          animate={{ filter: showText ? "blur(4px)" : "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <video
            autoPlay
            muted
            playsInline
            loop={false}
            className="w-full h-full object-cover opacity-100"
            poster="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            {/* Reverted to Reliable HD Camera Lens Video */}
            <source src="https://videos.pexels.com/video-files/3205903/3205903-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Keep the VFX Noise but lightweight */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
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
          <span className="text-xs text-white/50 uppercase tracking-widest font-light">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
