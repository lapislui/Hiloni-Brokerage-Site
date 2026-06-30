import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const portfolioData = [
  {
    id: "01",
    title: "Capital Markets",
    colSpan: "lg:col-span-2",
    items: [
      { name: "Equity & Derivatives", desc: "Direct market trading, algo execution" },
      { name: "Commodity", desc: "MCX certified algo, gold & energy" },
      { name: "FNO", desc: "F&O positional and intraday algo" },
      { name: "Margin Trading (MTF)", desc: "Leveraged institutional positions" },
      { name: "ETF", desc: "Exchange traded fund baskets" }
    ]
  },
  {
    id: "02",
    title: "Wealth Management",
    colSpan: "lg:col-span-1",
    items: [
      { name: "Privilege Services", desc: "Holistic wealth planning & advisory" },
      { name: "PMS/Portfolio Management", desc: "Expert fund managers managing secured assets" },
      { name: "AIF/Alternative Funds", desc: "Specialized growth instruments" },
      { name: "Mutual Funds", desc: "Invest in 5000+ mutual funds with SIP options" }
    ]
  },
  {
    id: "03",
    title: "Fixed Income",
    colSpan: "lg:col-span-1",
    items: [
      { name: "Bonds", desc: "Sovereign bonds, corporate bonds, and more" },
      { name: "FD/Fixed Deposits", desc: "Guaranteed returns, bank and corporate FDs" }
    ]
  },
  {
    id: "04",
    title: "Global Investment",
    colSpan: "lg:col-span-1",
    items: [
      { name: "SRI Investment", desc: "Structured international with institutional-grade access" },
      { name: "Foreign Investment", desc: "Invest in top US companies globally" }
    ]
  },
  {
    id: "05",
    title: "Other Services",
    colSpan: "lg:col-span-1",
    items: [
      { name: "Unlisted Shares", desc: "Pre-IPO and high-value unlisted equity access" },
      { name: "General Safety", desc: "Diversified safety, high-value general safety" }
    ]
  }
];

export function Portfolio() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Our Portfolio of Financial Architecture
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Hiloni broking organizes its product suite into five rigorous structural chambers. Select any branch to target custom allocation or submit an Institutional Inquiry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card border border-border hover:border-primary/30 transition-colors rounded-2xl p-8 flex flex-col h-full ${card.colSpan}`}
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold text-foreground">{card.title}</h3>
                <span className="text-xs font-label font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase tracking-widest">
                  Chamber {card.id}
                </span>
              </div>
              
              <ul className="space-y-6 flex-grow mb-10">
                {card.items.map((item, i) => (
                  <li key={i}>
                    <h4 className="text-base font-semibold text-foreground mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className="group inline-flex items-center text-sm font-label font-bold text-foreground hover:text-primary transition-colors mt-auto">
                View Product 
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
