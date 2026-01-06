import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import portfolioJewellery from "@/assets/portfolio-jewellery.png";
import portfolioFashion from "@/assets/portfolio-fashion.png";
import portfolioAccessories from "@/assets/portfolio-accessories.png";
import portfolioCafe from "@/assets/portfolio-cafe.png";

const projects = [
  {
    id: 1,
    title: "Dhruv Gems",
    category: "Jewellery Brand",
    image: portfolioJewellery,
    size: "large" // Spans 2 columns on desktop
  },
  {
    id: 2,
    title: "The Right Cut",
    category: "Fashion Brand",
    image: portfolioFashion,
    size: "small"
  },
  {
    id: 3,
    title: "Life's A Beach",
    category: "Accessories Brand",
    image: portfolioAccessories,
    size: "small"
  },
  {
    id: 4,
    title: "Thyme & Whisk",
    category: "Cafe & Restaurant",
    image: portfolioCafe,
    size: "large"
  },
];

export const PortfolioPreview = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-bold">
                Selected Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold leading-tight"
            >
              Brands We've Helped<br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Bloom
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link
              to="/work"
              className="group flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              <span>View All Projects</span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Portfolio Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[400px] lg:auto-rows-[500px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${project.size === "large" ? "md:col-span-2" : "md:col-span-1"
                }`}
            >
              <Link to="/work" className="block w-full h-full">
                {/* Image Container with Parallax-like scale effect on hover */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                </div>

                {/* Floating Tags & Button */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                  <span className="bg-background/90 backdrop-blur-md text-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg transform rotate-[-45deg] group-hover:rotate-0 transition-all duration-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
