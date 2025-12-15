import { motion } from "framer-motion";

const clients = [
  { name: "Artisan", logo: "Artisan" },
  { name: "Luxe", logo: "Luxe" },
  { name: "GreenEarth", logo: "GreenEarth" },
  { name: "TechFlow", logo: "TechFlow" },
  { name: "Urban", logo: "Urban" },
  { name: "Stellar", logo: "Stellar" },
  { name: "Nova", logo: "Nova" },
  { name: "Apex", logo: "Apex" },
];

export const ClientLogos = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-widest"
        >
          Trusted by leading brands
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee */}
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-12 flex items-center"
            >
              <span className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                {client.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
