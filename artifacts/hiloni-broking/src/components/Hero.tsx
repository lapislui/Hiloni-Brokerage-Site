import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

function Counter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span className="font-label">{count}{suffix}</span>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32 lg:pt-32 lg:pb-40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-label font-bold tracking-wider uppercase mb-8">
              Institutional-Grade Execution
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              Unified Financial <br/>
              Services <span className="text-primary">Ecosystem</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Hiloni broking organizes private wealth and active capital markets under one integrated architecture. Access Equities, Mutual Funds, Algos, high-yield FDs, and PMS strategies with seamless, modern digital tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/open-account" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-label font-semibold text-primary-foreground bg-foreground hover:bg-foreground/90 transition-colors shadow-lg hover:shadow-xl">
                Open Demat Account
              </Link>
              <a href="#services" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-label font-semibold text-foreground border-2 border-foreground/10 hover:border-foreground/30 bg-transparent transition-colors">
                Explore Ecosystem
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  <Counter end={25} suffix="K+" />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Active Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  ₹<Counter end={51200} suffix=" Cr+" />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Assets Managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  <Counter end={1} suffix=".2M+" />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Daily Algo Orders</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-3xl transform rotate-6"></div>
            
            <div className="relative bg-card border border-border/50 p-8 sm:p-10 rounded-3xl shadow-2xl">
              <div className="text-xs font-label font-bold tracking-widest text-muted-foreground uppercase mb-3">Discover Universe</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Direct SEBI-Regulated Access</h3>
              
              <ul className="space-y-6 mb-10">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-4">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Best-in-class Brokerage</h4>
                    <p className="text-sm text-muted-foreground mt-1">Zero fees on first trade</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-4">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Premium Advantages</h4>
                    <p className="text-sm text-muted-foreground mt-1">Direct access to NSDL/CDSL</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center mt-0.5 mr-4">
                    <div className="w-2 h-2 rounded-full bg-foreground"></div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Prime Desk Services</h4>
                    <p className="text-sm text-muted-foreground mt-1">Dedicated RM on call 24/7</p>
                  </div>
                </li>
              </ul>
              
              <a href="#contact" className="group inline-flex items-center text-sm font-label font-bold text-primary hover:text-primary/80 transition-colors">
                Prime Desk Assist 
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
