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
  {
    id: 1,
    title: "Jewellery Brands",
    category: "Jewellery",
    description: "Dhruv Gems, AMBC Gems, Vardhaman Diam",
    image: portfolioJewellery,
  },
  {
    id: 2,
    title: "Fashion & Couture",
    category: "Fashion",
    description: "The Right Cut, Binal Patel, SubhRekha, Mansi Nagdev",
    image: portfolioFashion,
  },
  {
    id: 3,
    title: "Lifestyle Collection",
    category: "Lifestyle",
    description: "Life's A Beach, ShoP, B'there Innerwear",
    image: portfolioAccessories,
  },
  {
    id: 4,
    title: "Hospitality & Dining",
    category: "Hospitality",
    description: "Thyme & Whisk, Kaffyn, Amar – Fastfood Center",
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
        <section className="py-2 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
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
            <div className="flex flex-col gap-24 md:gap-32">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative group w-full"
                  >
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                      }`}>

                      {/* Image Section */}
                      <div className="w-full md:w-3/5 lg:w-2/3 aspect-[16/10] relative rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700">
                        <motion.div
                          className="absolute inset-0 bg-muted"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 1 }}
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </motion.div>

                        {/* Mobile Text (Visible only on small screens) */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden bg-gradient-to-t from-black/90 to-transparent">
                          <span className="text-primary text-xs uppercase tracking-widest font-bold mb-2 block">
                            {project.category}
                          </span>
                          <h3 className="text-2xl font-display font-bold text-white">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Card (Desktop) */}
                      <div className={`hidden md:flex w-full md:w-2/5 lg:w-1/3 flex-col relative z-10 ${index % 2 === 1 ? 'pr-8 md:-mr-12 lg:-mr-20' : 'pl-8 md:-ml-12 lg:-ml-20'
                        }`}>
                        <motion.div
                          className="bg-card/90 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-3xl shadow-xl dark:shadow-black/50 overflow-hidden relative group-hover:border-primary/50 transition-colors duration-500"
                          initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          whileHover={{ y: -5 }}
                        >
                          {/* Decorative background glow */}
                          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />

                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                              <span className="w-12 h-[1px] bg-primary"></span>
                              <span className="text-primary text-xs uppercase tracking-[0.2em] font-bold">
                                {project.category}
                              </span>
                            </div>

                            <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                              {project.title}
                            </h3>

                            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 border-l-2 border-primary/20 pl-4">
                              {project.description}
                            </p>

                            <div className="flex items-center gap-3 text-sm font-medium text-foreground group/link cursor-pointer hover:text-primary transition-colors">
                              <span>View Project</span>
                              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground group-hover/link:border-primary transition-all duration-300">
                                <ArrowUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Work;
