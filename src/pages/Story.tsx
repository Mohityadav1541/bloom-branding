import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Heart, Lightbulb, Target, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We pour our hearts into every project, treating each brand as if it were our own.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push creative boundaries and embrace new ideas to deliver unique solutions.",
  },
  {
    icon: Target,
    title: "Purpose",
    description: "Every design decision is intentional, aligned with your brand's goals and values.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We believe in collaborative relationships, working alongside you every step of the way.",
  },
];

const Story = () => {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
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
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
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
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-3xl border border-border bg-card"
              >
                <span className="text-primary text-sm uppercase tracking-widest font-medium">
                  Our Vision
                </span>
                <h2 className="font-display text-3xl font-semibold mt-4 mb-4">
                  Creating Impact Through Design
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where every brand has the opportunity to tell its 
                  story authentically. Through innovative design and strategic thinking, 
                  we aim to be the catalyst that transforms ordinary businesses into 
                  extraordinary brands.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 md:p-12 rounded-3xl border border-border bg-card"
              >
                <span className="text-primary text-sm uppercase tracking-widest font-medium">
                  Our Mission
                </span>
                <h2 className="font-display text-3xl font-semibold mt-4 mb-4">
                  Empowering Brands to Bloom
                </h2>
                <p className="text-muted-foreground leading-relaxed">
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
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
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
                  Meet the Founder
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
                  The Creative Force<br />
                  <span className="text-gradient">Behind Bloom</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over a decade of experience in branding and creative direction, 
                    our founder started Bloom Branding with a vision to create a studio 
                    where creativity meets strategy.
                  </p>
                  <p>
                    Having worked with brands across industries—from tech startups to 
                    luxury fashion—the journey has been one of constant learning, 
                    experimentation, and growth.
                  </p>
                  <p>
                    "I believe that great branding isn't just about aesthetics—it's about 
                    understanding the soul of a business and translating it into visual 
                    experiences that resonate with people."
                  </p>
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
