import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const posts = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80",
  "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&q=80",
  "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&q=80",
  "https://images.unsplash.com/photo-1633421878578-b49c6aaba50a?w=400&q=80",
  "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=400&q=80",
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
