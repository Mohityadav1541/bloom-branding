import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowUpRight } from "lucide-react";
import portfolioJewellery from "@/assets/portfolio-jewellery.png";
import portfolioFashion from "@/assets/portfolio-fashion.png";
import portfolioAccessories from "@/assets/portfolio-accessories.png";
import portfolioCafe from "@/assets/portfolio-cafe.png";

const categories = ["All", "Jewellery", "Fashion", "Lifestyle", "Hospitality"];

const projects = [
  // Jewellery
  {
    id: 1,
    title: "Dhruv Gems",
    category: "Jewellery",
    description: "Premium gemstone branding and visual identity",
    image: portfolioJewellery,
  },
  {
    id: 2,
    title: "AMBC Gems",
    category: "Jewellery",
    description: "Luxury diamond manufacturing identity",
    image: portfolioJewellery,
  },
  {
    id: 3,
    title: "Vardhaman Diam",
    category: "Jewellery",
    description: "Global diamond export brand strategy",
    image: portfolioJewellery,
  },

  // Fashion
  {
    id: 4,
    title: "The Right Cut",
    category: "Fashion",
    description: "Contemporary fashion label positioning",
    image: portfolioFashion,
  },
  {
    id: 5,
    title: "Binal Patel",
    category: "Fashion",
    description: "Designer couture brand identity",
    image: portfolioFashion,
  },
  {
    id: 6,
    title: "SubhRekha",
    category: "Fashion",
    description: "Traditional textile brand modernization",
    image: portfolioFashion,
  },
  {
    id: 7,
    title: "Mansi Nagdev",
    category: "Fashion",
    description: "Boutique fashion studio branding",
    image: portfolioFashion,
  },

  // Lifestyle
  {
    id: 8,
    title: "Life's A Beach",
    category: "Lifestyle",
    description: "Vibrant accessories and beachwear brand launch",
    image: portfolioAccessories,
  },
  {
    id: 9,
    title: "ShoP",
    category: "Lifestyle",
    description: "Luxury sourcing and personal shopping brand",
    image: portfolioAccessories,
  },
  {
    id: 10,
    title: "B'there",
    category: "Lifestyle",
    description: "Modern innerwear brand identity",
    image: portfolioAccessories,
  },

  // Hospitality (Cafes)
  {
    id: 11,
    title: "Thyme & Whisk",
    category: "Hospitality",
    description: "Culinary brand experience and cafe identity",
    image: portfolioCafe,
  },
  {
    id: 12,
    title: "Kaffyn",
    category: "Hospitality",
    description: "Coffee shop and bistro branding",
    image: portfolioCafe,
  },
  {
    id: 13,
    title: "Amar – Fastfood Center",
    category: "Hospitality",
    description: "QSR chain visual identity refresh",
    image: portfolioCafe,
  },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 bg-background min-h-screen">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary text-sm uppercase tracking-widest font-medium"
              >
                Our Work
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-7xl font-semibold mt-4 mb-6"
              >
                Projects That<br />
                <span className="text-gradient">Made Brands Bloom</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Explore our portfolio of brand transformations, creative campaigns,
                and digital experiences that have helped businesses flourish.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-6">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-muted shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7 }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Glassmorphism Content Card */}
                      <div className="absolute inset-x-4 bottom-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-primary-foreground/80 text-xs uppercase tracking-wider font-medium mb-2 block">
                              {project.category}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
                              {project.title}
                            </h3>
                            <p className="text-white/70 text-sm line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Work;
