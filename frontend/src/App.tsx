import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Story from "./pages/Story";
import Work from "./pages/Work";
import Founder from "./pages/Founder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
        <CustomCursor />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/story" element={<Story />} />
              <Route path="/work" element={<Work />} />
              <Route path="/founder" element={<Founder />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
