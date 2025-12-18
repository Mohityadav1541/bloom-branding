import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    content: "Bloom Branding completely transformed our brand identity. Their strategic approach and creative execution exceeded all expectations. The team truly understands how to make brands stand out.",
    author: "Sarah Mitchell",
    role: "CEO, Artisan Coffee Co.",
    image: testimonial1,
  },
  {
    id: 2,
    content: "Working with Bloom was a game-changer for our digital presence. Their attention to detail and innovative designs helped us connect with our audience in ways we never imagined possible.",
    author: "Michael Chen",
    role: "Founder, Tech Innovations",
    image: testimonial2,
  },
  {
    id: 3,
    content: "The team at Bloom brings passion and expertise to every project. They don't just create brands; they craft experiences that resonate deeply with customers. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Marketing Director, Green Earth",
    image: testimonial3,
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm uppercase tracking-widest font-medium"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-semibold mt-4"
          >
            What Our Clients<br />
            <span className="text-gradient">Say About Us</span>
          </motion.h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 md:p-12 border border-border relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground leading-relaxed mt-4 mb-8 font-body">
                "{testimonials[current].content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonials[current].author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === current
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
