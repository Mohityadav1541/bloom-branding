import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Palette, Camera, Film, Share2, Sparkles, Target } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Brand Strategy",
    description: "Crafting distinctive brand identities that resonate with your audience and stand out in the market.",
    color: "from-primary to-accent",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Palette,
    title: "Visual Identity",
    description: "From logo design to complete visual systems, we create cohesive brand identities that communicate your values and captivate your audience.",
    color: "from-accent to-secondary",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description: "Compelling visual content that tells your story and engages your community across all platforms.",
    color: "from-secondary to-bloom-gold",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Film,
    title: "Production",
    description: "High-quality video and photo production that brings your brand vision to life with cinematic flair.",
    color: "from-bloom-gold to-bloom-sage",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Strategic social presence that builds authentic connections and drives meaningful engagement.",
    color: "from-bloom-sage to-primary",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=80",
  },
  {
    icon: Sparkles,
    title: "Digital Experiences",
    description: "Frontend-oriented digital solutions with bold animations and memorable interactions.",
    color: "from-primary to-bloom-rose",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[450px] w-full overflow-hidden rounded-3xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />
                {/* Gradient Overlay for bottom text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white z-10">
                <div className="mb-auto pt-4">
                  <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-6 group-hover:bg-white/20 transition-colors`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold mb-3 transform group-hover:-translate-y-2 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="text-white/80 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 absolute bottom-32 left-8 right-8 lg:relative lg:bottom-0 lg:left-0 lg:right-0">
                  {service.description}
                </p>

                {/* Visible line for decoration */}
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color} transition-all duration-700 mt-6`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
