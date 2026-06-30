import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import OpenAccount from "@/pages/OpenAccount";
import ClientTerminal from "@/pages/ClientTerminal";

import { Navbar } from "./components/Navbar";
import { Ticker } from "./components/Ticker";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { WealthSimulator } from "./components/WealthSimulator";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <Ticker />
      <main className="flex-grow">
        <Hero />
        <Portfolio />
        <WealthSimulator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/open-account" component={OpenAccount} />
      <Route path="/client-terminal" component={ClientTerminal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
