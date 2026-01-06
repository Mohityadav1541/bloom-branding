import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = {
  navigation: [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/story" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    "Brand Strategy",
    "Content Creation",
    "Production",
    "Social Media",
    "Digital Experiences",
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo-bb.jpg"
                alt="Bloom Studio"
                className="h-12 w-12 rounded-full object-contain"
              />
              <span className="font-display text-xl font-semibold text-foreground">
                Bloom<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A creative branding studio helping brands grow through strategic storytelling
              and high-impact digital experiences.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/bloom.branding_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:hello@bloombranding.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Email us at</p>
                  <a href="mailto:hello@bloombranding.com" className="text-foreground hover:text-primary transition-colors">
                    hello@bloombranding.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Based in</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Jaipur,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Jaipur, India
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Bloom Branding. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Blooming brands, one story at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};
