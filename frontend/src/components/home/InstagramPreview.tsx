import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import instagram1 from "@/assets/instagram-1.jpg";
import instagram2 from "@/assets/instagram-2.jpg";
import instagram3 from "@/assets/instagram-3.jpg";
import instagram4 from "@/assets/instagram-4.jpg";
import instagram5 from "@/assets/instagram-5.jpg";
import instagram6 from "@/assets/instagram-6.jpg";

const posts = [
  instagram1,
  instagram2,
  instagram3,
  instagram4,
  instagram5,
  instagram6,
];

export const InstagramPreview = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-sm uppercase tracking-widest font-medium"
            >
              Follow Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-semibold mt-4"
            >
              Join Our Creative<br />
              <span className="text-gradient">Journey</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://www.instagram.com/bloom.branding_/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-medium"
          >
            <Instagram className="h-5 w-5" />
            @bloom.branding_
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/bloom.branding_/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="h-8 w-8 text-primary-foreground" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
