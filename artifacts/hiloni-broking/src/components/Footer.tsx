import React from 'react';
import hiloniLogo from '@assets/hiloni_logo.jpg';

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <div className="bg-background inline-block rounded p-2 mb-6">
              <img src={hiloniLogo} alt="Hiloni Broking" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-lg font-bold mb-4 font-heading">Ecosystem Summary</p>
            <p className="text-sm text-background/70 leading-relaxed max-w-md">
              Hiloni Stock-Broking Private Limited is a premier financial institution offering comprehensive wealth architectures for retail and institutional capital. We build transparent, robust allocation ecosystems.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-label font-bold uppercase tracking-widest text-primary mb-6">Ecosystem Almanac</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-sm text-background/80 hover:text-white transition-colors">Services</a></li>
              <li><a href="#simulator" className="text-sm text-background/80 hover:text-white transition-colors">SIP Calculator</a></li>
              <li><a href="#terminal" className="text-sm text-background/80 hover:text-white transition-colors">Client Terminal</a></li>
              <li><a href="#contact" className="text-sm text-background/80 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-label font-bold uppercase tracking-widest text-primary mb-6">Security Directory</h4>
            <ul className="space-y-4">
              <li className="text-sm text-background/80 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> SEBI Registered</li>
              <li className="text-sm text-background/80 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> NSE/BSE Member</li>
              <li className="text-sm text-background/80 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> NSDL/CDSL DP</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} Hiloni Stock-Broking Private Limited. All rights reserved. <br className="md:hidden" /> SEBI Reg No: INZ000205632
          </div>
          <div className="text-xs text-background/40 max-w-lg md:text-right">
            Investment in securities market are subject to market risk, read all the related documents carefully before investing.
          </div>
        </div>

      </div>
    </footer>
  );
}
