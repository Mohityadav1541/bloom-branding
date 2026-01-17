import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const defaultClients = [
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
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/homepage`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.clientLogos && data.clientLogos.length > 0) {
            setLogos(data.clientLogos);
          }
        }
      } catch (error) {
        console.error("Failed to load client logos", error);
      }
    };
    fetchLogos();
  }, []);

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
          {logos.length > 0 ? (
            // Dynamic Image Logos
            [...logos, ...logos].map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
              >
                <img src={logo} alt="Client Logo" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
              </div>
            ))
          ) : (
            // Default Text Logos
            [...defaultClients, ...defaultClients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 mx-12 flex items-center"
              >
                <span className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                  {client.logo}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
