import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Submit from "./pages/Submit";
import TransparencyLedger from "./pages/TransparencyLedger";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Global header/navigation */}
        <header className="bg-jansoch-blue text-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-white font-bold">JanSoch</div>
            </div>

            <nav className="flex items-center gap-6">
              <Link to="/" className="text-white hover:underline">Home</Link>
              <Link to="/about" className="text-white hover:underline">About</Link>
              <Link to="/submit" className="text-white hover:underline">Submit</Link>
              <Link to="/transparency-ledger" className="text-white hover:underline">View Submissions</Link>
              <Link to="/contact" className="text-white hover:underline">Contact</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/transparency-ledger" element={<TransparencyLedger />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
