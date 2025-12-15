import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowUpRight } from "lucide-react";
import portfolioCoffee from "@/assets/portfolio-coffee.jpg";
import portfolioFashion from "@/assets/portfolio-fashion.jpg";
import portfolioGreen from "@/assets/portfolio-green.jpg";
import portfolioTech from "@/assets/portfolio-tech.jpg";
import portfolioWellness from "@/assets/portfolio-wellness.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioFitness from "@/assets/portfolio-fitness.jpg";
import portfolioBrewery from "@/assets/portfolio-brewery.jpg";

const categories = ["All", "Brand Identity", "Digital Campaign", "Social Media", "Production"];

const projects = [
  {
    id: 1,
    title: "Artisan Coffee Co.",
    category: "Brand Identity",
    description: "Complete brand overhaul for a specialty coffee roaster",
    image: portfolioCoffee,
  },
  {
    id: 2,
    title: "Luxe Fashion House",
    category: "Digital Campaign",
    description: "Launch campaign for premium fashion collection",
    image: portfolioFashion,
  },
  {
    id: 3,
    title: "Green Earth Initiative",
    category: "Social Media",
    description: "Awareness campaign for environmental sustainability",
    image: portfolioGreen,
  },
  {
    id: 4,
    title: "Tech Startup Launch",
    category: "Brand Identity",
    description: "Full branding for innovative tech company",
    image: portfolioTech,
  },
  {
    id: 5,
    title: "Wellness Retreat",
    category: "Production",
    description: "Brand film and photography for luxury wellness brand",
    image: portfolioWellness,
  },
  {
    id: 6,
    title: "Urban Eats",
    category: "Social Media",
    description: "Social media strategy and content for restaurant chain",
    image: portfolioRestaurant,
  },
  {
    id: 7,
    title: "Fitness Revolution",
    category: "Digital Campaign",
    description: "Digital launch campaign for fitness app",
    image: portfolioFitness,
  },
  {
    id: 8,
    title: "Craft Brewery",
    category: "Brand Identity",
    description: "Brand identity for artisanal craft brewery",
    image: portfolioBrewery,
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
        <section className="py-8">
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
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
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-primary text-sm uppercase tracking-wider mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                      </motion.div>
                    </div>

                    {/* Info Below Image */}
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="font-display text-lg font-medium text-foreground mt-1">
                        {project.title}
                      </h3>
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
