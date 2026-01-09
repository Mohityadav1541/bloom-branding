import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowUpRight } from "lucide-react";


const categories = ["All", "Jewellery", "Fashion", "Lifestyle", "Hospitality"];

// Types
interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  subProjects: string[];
}

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Handle scroll direction for smart navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show if scrolling up or at the very top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      }
      // Hide if scrolling down and past the header
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        <section
          className={`py-2 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'
            }`}
        >
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
                    key={project._id}
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
                      <div
                        className="w-full md:w-3/5 lg:w-2/3 aspect-[16/10] relative rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
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

                        {/* Mobile Text */}
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
                          className="bg-card/90 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-3xl shadow-xl dark:shadow-black/50 overflow-hidden relative group-hover:border-primary/50 transition-colors duration-500 cursor-pointer"
                          initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          whileHover={{ y: -5 }}
                          onClick={() => setSelectedProject(project)}
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

                            <div className="flex items-center gap-3 text-sm font-medium text-foreground group/link hover:text-primary transition-colors">
                              <span>View Related Projects</span>
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

        {/* Selected Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card w-full max-w-2xl rounded-3xl overflow-hidden border border-border/50 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div>
                      <span className="text-primary font-bold text-sm uppercase tracking-wider mb-1 block">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-3xl font-display font-bold text-white">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ArrowUpRight className="h-5 w-5 rotate-45" />
                  </button>
                </div>

                <div className="p-8">
                  <h4 className="font-display text-xl font-semibold mb-6 text-foreground">Featured Clients & Projects</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.subProjects?.map((sub, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl bg-muted/50 border border-border/50 flex items-center gap-3 hover:bg-muted transition-colors cursor-default"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium text-foreground">{sub}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Work;
