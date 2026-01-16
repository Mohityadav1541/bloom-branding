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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    color: "from-primary to-bloom-rose",
  },
];

// Helper component to render icons
const IconComponent = ({ name: Icon, className }: { name: any, className?: string }) => {
  if (!Icon) return null;
  return <Icon className={className} />;
};

const Services = () => {
  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background text-foreground">
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
        </section>

        {/* Services Grid */}
        <section className="py-12 pb-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-[500px] w-full overflow-hidden rounded-3xl"
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
                        <IconComponent name={service.icon} className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    <h2 className="font-display text-3xl font-bold mb-3 transform group-hover:-translate-y-2 transition-transform duration-300">
                      {service.title}
                    </h2>

                    <p className="text-white/80 text-base leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 absolute bottom-32 left-8 right-8 lg:relative lg:bottom-0 lg:left-0 lg:right-0">
                      {service.description}
                    </p>

                    {/* Features List showing on hover/mobile */}
                    <ul className="space-y-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 lg:hidden group-hover:block">
                      {service.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Visible line for decoration */}
                    <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color} transition-all duration-700 mt-6`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-muted/30">
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
              <div className="flex justify-center">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/contact">
                    Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Services;
