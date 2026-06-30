import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import hiloniLogo from '@assets/hiloni_logo.jpg';
import { Link, useLocation } from 'wouter';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { name: 'Services', href: '#services', anchor: true },
    { name: 'SIP Calculator', href: '#simulator', anchor: true },
    { name: 'Client Terminal', href: '/client-terminal', anchor: false },
    { name: 'Contact Support', href: '#contact', anchor: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center gap-3">
              <img src={hiloniLogo} alt="Hiloni Broking" className="h-10 w-auto object-contain" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              link.anchor ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-label font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-label font-medium transition-colors ${location === link.href ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              href="/open-account"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-label font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
            >
              Direct Access
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              link.anchor ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              href="/open-account"
              className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium text-primary-foreground bg-primary"
              onClick={() => setIsOpen(false)}
            >
              Direct Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
