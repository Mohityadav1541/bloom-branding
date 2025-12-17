import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Founder = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-primary font-medium tracking-wider uppercase text-sm">The Visionary</span>
                <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                  Meet the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Founder</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Building digital experiences that matter. With a passion for design and a mind for innovation, we craft solutions that elevate brands.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  Connect on LinkedIn <Linkedin size={18} />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                  Contact Me <Mail size={18} />
                </Button>
              </div>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 group">
                {/* Replace src with actual founder image */}
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-all duration-500" />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm91bmRlciUyMHBvcnRyYWl0fGVufDB8fDB8fHww" 
                  alt="Founder Portrait" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story/Bio Section */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-center space-y-4"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold">My Journey</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground"
            >
              <p>
                It started with a simple idea: that technology should be as beautiful as it is functional. Over the years, I've dedicated myself to mastering the art of digital craftsmanship. From humble beginnings to leading a studio of creative minds, the drive has always been the same—to create something extraordinary.
              </p>
              <p>
                At Bloom Studio, we don't just build websites; we build identities. Every pixel is placed with purpose, every line of code written with precision. I believe in the power of collaboration and the magic that happens when creativity meets technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Founder;
