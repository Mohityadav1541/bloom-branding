import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowRight, Palette, Camera, Film, Share2, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Brand Strategy",
    description: "We dive deep into your brand's DNA to craft a distinctive positioning that resonates with your target audience and sets you apart from competition.",
    features: [
      "Brand Audit & Analysis",
      "Market Research",
      "Competitive Positioning",
      "Brand Architecture",
      "Messaging Framework",
    ],
    color: "from-primary to-accent",
  },
  {
    icon: Palette,
    title: "Visual Identity",
    description: "From logo design to complete visual systems, we create cohesive brand identities that communicate your values and captivate your audience.",
    features: [
      "Logo Design",
      "Color Systems",
      "Typography Selection",
      "Brand Guidelines",
      "Collateral Design",
    ],
    color: "from-accent to-secondary",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description: "Compelling visual content that tells your story across all platforms. We create scroll-stopping imagery that drives engagement and builds community.",
    features: [
      "Photography Direction",
      "Social Media Content",
      "Editorial Shoots",
      "Product Photography",
      "Campaign Assets",
    ],
    color: "from-secondary to-bloom-gold",
  },
  {
    icon: Film,
    title: "Production",
    description: "High-quality video and motion content that brings your brand to life. From concept to final cut, we deliver cinematic storytelling.",
    features: [
      "Brand Films",
      "Commercial Production",
      "Motion Graphics",
      "Documentary Style",
      "Event Coverage",
    ],
    color: "from-bloom-gold to-bloom-sage",
  },
  {
    icon: Share2,
    title: "Social Media Branding",
    description: "Strategic social presence that builds authentic connections. We help you create a consistent voice that resonates across all platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Influencer Partnerships",
      "Analytics & Insights",
      "Growth Campaigns",
    ],
    color: "from-bloom-sage to-primary",
  },
  {
    icon: Sparkles,
    title: "Digital Experiences",
    description: "Frontend-focused digital solutions with bold animations and memorable interactions. We create websites that leave lasting impressions.",
    features: [
      "Website Design",
      "Interactive Animations",
      "UX/UI Design",
      "Landing Pages",
      "Digital Campaigns",
    ],
    color: "from-primary to-bloom-rose",
  },
];

const Services = () => {
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
                Our Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-7xl font-semibold mt-4 mb-6"
              >
                Everything Your Brand<br />
                <span className="text-gradient">Needs to Bloom</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                From strategy to execution, we offer comprehensive branding solutions 
                that transform businesses into memorable brands.
              </motion.p>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[10%] w-4 h-4 rounded-full bg-primary/40"
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-[20%] w-2 h-2 rounded-full bg-accent/60"
          />
        </section>

        {/* Services List */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`aspect-square rounded-3xl bg-gradient-to-br ${service.color} p-1`}
                    >
                      <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                        <service.icon className="h-24 w-24 text-muted-foreground/20" />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={`absolute -z-10 inset-0 rounded-3xl bg-gradient-to-br ${service.color} blur-3xl opacity-20`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl font-semibold mb-6"
              >
                Let's Create Something<br />
                <span className="text-gradient">Extraordinary</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mb-10"
              >
                Ready to transform your brand? Let's talk about your project.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button asChild size="lg" className="group">
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Services;
