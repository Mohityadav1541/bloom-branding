import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

const ProjectCard = ({ project, containerRef, onClick }: { project: Project, containerRef: React.RefObject<any>, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.8, 1.25, 0.8]);
  const rotateY = useTransform(scrollXProgress, [0.2, 0.5, 0.8], [30, 0, -30]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const zIndex = useTransform(scrollXProgress, [0, 0.5, 1], [0, 20, 0]);
  const x = useTransform(scrollXProgress, [0, 0.5, 1], [-40, 0, 40]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        rotateY,
        opacity,
        zIndex,
        x
      }}
      className="snap-center shrink-0 min-w-[75vw] md:min-w-[500px] h-full flex items-center justify-center py-8"
    >
      <div
        className="w-full bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-2xl hover:border-primary/50 transition-colors duration-500 cursor-pointer h-[50vh] md:h-[450px] relative group transform-style-3d bg-black"
        onClick={onClick}
      >
        {/* Image Container */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
        </div>

        {/* Floating Category Badge */}
        <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 border border-white/10 px-4 py-2 rounded-full z-20">
          <span className="text-white text-xs uppercase tracking-widest font-medium">
            {project.category}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-2 group-hover:md:translate-y-0 transition-transform duration-500">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-xl">
            {project.title}
          </h3>
          <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-100">
            {project.description}
          </p>

          <div className="flex items-center gap-2 text-white/90 text-sm font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-200">
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const initialProjects: Project[] = [
    {
      _id: "1",
      title: "Jewellery Brands",
      category: "Jewellery",
      description: "Premium gemstone branding and visual identity for leading manufacturers.",
      image: "/images/portfolio-jewellery.png",
      subProjects: ["Dhruv Gems", "AMBC Gems", "Vardhaman Diam", "Sapphiri"]
    },
    {
      _id: "2",
      title: "Fashion & Couture",
      category: "Fashion",
      description: "Contemporary and traditional fashion label positioning.",
      image: "/images/portfolio-fashion.png",
      subProjects: ["The Right Cut", "Binal Patel", "SubhRekha", "Mansi Nagdev"]
    },
    {
      _id: "3",
      title: "Lifestyle Collection",
      category: "Lifestyle",
      description: "Vibrant branding for accessories and lifestyle products.",
      image: "/images/portfolio-accessories.png",
      subProjects: ["Life's A Beach", "ShoP", "B'there Innerwear"]
    },
    {
      _id: "4",
      title: "Hospitality & Dining",
      category: "Hospitality",
      description: "Culinary brand experiences and cafe identities.",
      image: "/images/portfolio-cafe.png",
      subProjects: ["Thyme & Whisk", "Kaffyn", "Amar – Fastfood Center"]
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [filteredProjects]);

  useEffect(() => {
    // Fetch projects from API if available, otherwise use initialProjects
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/projects`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.warn("Failed to fetch projects from API, using fallback data:", error);
        // Fallback is already set in initial state
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

        {/* Projects Carousel 3D */}
        <section className="py-12 pb-24 overflow-hidden" ref={carouselRef}>
          <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold">Featured Work</h2>
              <p className="text-muted-foreground mt-2">Swipe to explore our latest projects</p>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          {/* 3D Scroll Container - "The Track" */}
          <div className="flex overflow-x-auto snap-x snap-mandatory py-12 px-[5vw] md:px-[25vw] scrollbar-hide [perspective:800px] [transform-style:preserve-3d] items-center h-[70vh] md:h-[600px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  containerRef={carouselRef}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>

            {/* Spacer for end of list scrolling */}
            <div className="w-[10vw] md:w-[10vw] shrink-0 snap-center" />
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
