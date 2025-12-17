import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Palette, Camera, Film, Share2, Sparkles } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Strategy",
    description: "Crafting distinctive brand identities that resonate with your audience and stand out in the market.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description: "Compelling visual content that tells your story and engages your community across all platforms.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Film,
    title: "Production",
    description: "High-quality video and photo production that brings your brand vision to life with cinematic flair.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Strategic social presence that builds authentic connections and drives meaningful engagement.",
    color: "from-bloom-gold/20 to-bloom-gold/5",
  },
  {
    icon: Sparkles,
    title: "Digital Experiences",
    description: "Frontend-oriented digital solutions with bold animations and memorable interactions.",
    color: "from-bloom-sage/20 to-bloom-sage/5",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm uppercase tracking-widest font-medium"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-semibold mt-4"
            >
              Services That Make<br />
              <span className="text-gradient">Brands Bloom</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              View All Services
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
