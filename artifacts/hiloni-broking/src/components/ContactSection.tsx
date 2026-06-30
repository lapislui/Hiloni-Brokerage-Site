import React from 'react';
import { motion } from 'framer-motion';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Initiate Contact With Our Privilege Desk
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Whether you want to open a Privilege PMS investment account, subscribe to high-yield funds, or allocate capital into AI-backed algorithmic platforms, our team is standing by.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="text-sm font-label font-bold text-muted-foreground uppercase tracking-widest mb-2">Email Directory</div>
                <a href="mailto:hiloni@hilonibroking.com" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                  hiloni@hilonibroking.com
                </a>
              </div>
              
              <div>
                <div className="text-sm font-label font-bold text-muted-foreground uppercase tracking-widest mb-2">Voice Comms</div>
                <a href="tel:+919925566886" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                  +91-99255-66886
                </a>
              </div>
              
              <div>
                <div className="text-sm font-label font-bold text-muted-foreground uppercase tracking-widest mb-2">Headquarters</div>
                <address className="text-xl font-semibold text-foreground not-italic">
                  Pinnacle Tower 12th Floor, <br/>
                  Mancha Manchi, Surat
                </address>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 sm:p-12 rounded-3xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Ecosystem Callback Request</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-label font-semibold text-foreground mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-label font-semibold text-foreground mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-label font-semibold text-foreground mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 "
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-label font-semibold text-foreground mb-2">Division Service Required</label>
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none">
                  <option value="">Select Division...</option>
                  <option value="capital">Capital Markets</option>
                  <option value="wealth">Wealth Management</option>
                  <option value="fixed">Fixed Income</option>
                  <option value="global">Global Investment</option>
                  <option value="other">Other Services</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-label font-semibold text-foreground mb-2">Best Requirement Action</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Describe your capital allocation goals..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-label font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Transmit Your Capture Request
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
