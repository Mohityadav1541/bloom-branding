import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Users, Target, Heart, Lightbulb } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import founderPhoto from "@/assets/founder-photo.jpg";
// Unique images for Vision & Mission
import visionImage from "@/assets/portfolio-tech.jpg";
import missionImage from "@/assets/portfolio-wellness.jpg";
import signature from "@/assets/signature.png";

const values = [
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our success. We listen, adapt, and deliver."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We don't settle for good. We aim for extraordinary in every pixel."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Creative work requires heart. We pour ours into every project."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Staying ahead of curves to give your brand a competitive edge."
  }
];

const Story = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [content, setContent] = useState({
    storyTeamImage: teamPhoto,
    storyFounderImage: founderPhoto,
    storyVisionImage: visionImage,
    storyMissionImage: missionImage
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/homepage`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setContent({
              storyTeamImage: data.storyTeamImage || teamPhoto,
              storyFounderImage: data.storyFounderImage || founderPhoto,
              storyVisionImage: data.storyVisionImage || visionImage,
              storyMissionImage: data.storyMissionImage || missionImage
            });
          }
        }
      } catch (error) {
        console.error("Failed to load story content", error);
      }
    };
    fetchContent();
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24" ref={containerRef}>
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-sm uppercase tracking-widest font-medium"
              >
                Our Story
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-7xl font-semibold mt-4 mb-6"
              >
                Blooming Brands,<br />
                <span className="text-gradient">One Story at a Time</span>
              </motion.h1>
            </div>
          </div>

          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[15%] w-3 h-3 rounded-full bg-primary/60"
          />
        </section>

        {/* Story Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Bloom Branding</span> was
                  born from a simple belief: every brand has a unique story waiting to unfold.
                  Founded with a passion for creative excellence, we set out to help businesses
                  transform their identity into something truly remarkable.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Like a seed that grows into a beautiful flower, we nurture brands through
                  strategic thinking and creative execution. Our approach combines data-driven
                  insights with artistic vision, ensuring every project we undertake blossoms
                  into its full potential.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Over the years, we've had the privilege of working with startups finding
                  their voice, established businesses seeking reinvention, and visionaries
                  ready to make their mark. Each collaboration has taught us that the best
                  brands are built on authentic stories and meaningful connections.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-1">
                  <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center overflow-hidden">
                    <img
                      src={content.storyTeamImage}
                      alt="Bloom Branding Team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -z-10 inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent blur-3xl opacity-20"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-card/30 overflow-hidden">
          <div className="container mx-auto px-6 space-y-32">

            {/* Vision Section */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <motion.div
                style={{ y }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group">
                  {/* Unique Image for Vision */}
                  <img
                    src={content.storyVisionImage}
                    alt="Our Vision"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/10 transition-colors duration-500" />

                  {/* Cool Effect: Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-primary/20"
                  >
                    <span className="text-primary font-bold tracking-wider text-xs uppercase">Future Focused</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <motion.span
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
                  transition={{ duration: 1 }}
                  className="text-primary text-sm uppercase font-bold mb-4 block"
                >
                  Our Vision
                </motion.span>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Creating Impact<br />
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"
                  >
                    Through Design
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a world where every brand has the opportunity to tell its
                  story authentically. Through innovative design and strategic thinking,
                  we aim to be the catalyst that transforms ordinary businesses into
                  extraordinary brands.
                </p>
              </motion.div>
            </div>

            {/* Mission Section */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
              <motion.div
                style={{ y }}
                className="w-full md:w-1/2"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group">
                  {/* Unique Image for Mission */}
                  <img
                    src={content.storyMissionImage}
                    alt="Our Mission"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-accent/20 mix-blend-overlay group-hover:bg-accent/10 transition-colors duration-500" />

                  {/* Cool Effect: Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-8 right-8 bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-accent/20"
                  >
                    <span className="text-accent font-bold tracking-wider text-xs uppercase">Growth Oriented</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 md:text-right"
              >
                <motion.span
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
                  transition={{ duration: 1 }}
                  className="text-primary text-sm uppercase font-bold mb-4 block ml-auto"
                >
                  Our Mission
                </motion.span>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Empowering Brands<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-accent to-secondary animate-gradient-x">
                    To Bloom
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed ml-auto">
                  Our mission is to empower brands with the creative tools and strategies
                  they need to flourish. We're committed to delivering work that not only
                  looks beautiful but drives real business results and lasting connections.
                </p>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary text-sm uppercase tracking-widest font-medium"
              >
                Our Values
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-semibold mt-4"
              >
                What Drives Us<br />
                <span className="text-gradient">Every Day</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 p-1 max-w-md mx-auto">
                  <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center overflow-hidden">
                    <img
                      src={content.storyFounderImage}
                      alt="Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <span className="text-primary text-sm uppercase tracking-widest font-medium">
                  The Founder
                </span>
                <h2 className="font-display text-4xl font-semibold mt-4 mb-6">
                  Pranjal Jain
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    With over a decade of experience in digital design and branding,
                    Pranjal founded Bloom Branding with a vision to bridge the gap between
                    strategic thinking and creative expression.
                  </p>
                  <p>
                    "Design isn't just about making things look good. It's about solving
                    problems and creating meaningful connections between brands and their
                    audience. That's what drives us every day."
                  </p>
                </div>
                <div className="mt-8">
                  <img
                    src={signature}
                    alt="Pranjal Jain Signature"
                    className="h-16 opacity-80 mix-blend-multiply dark:mix-blend-screen invert dark:invert-0"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Story;
