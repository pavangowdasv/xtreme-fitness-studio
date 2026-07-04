import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery';
  setCurrentTab: (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => void;
  onOpenEnroll: (planId?: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenEnroll }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery') => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; tab: 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery' }[] = [
    { label: 'HOME', tab: 'home' },
    { label: 'TRAINER', tab: 'trainers' },
    { label: 'CONTACT US', tab: 'contact' },
    { label: 'MEMBERSHIP', tab: 'membership' },
  ];

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-40 w-full" 
        style={{ 
          background: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent', 
          backdropFilter: isScrolled ? 'blur(14px)' : 'blur(0px)',
          WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'blur(0px)',
          borderBottom: isScrolled ? '1px solid rgba(42, 42, 42, 0.4)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.7)' : 'none',
          transition: 'background-color 350ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 350ms cubic-bezier(0.4, 0, 0.2, 1), border-color 350ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div 
            className="flex justify-between items-center" 
            style={{ 
              height: isScrolled ? '64px' : '80px',
              transition: 'height 350ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >

            {/* Logo */}
            <div
              onClick={() => handleTabChange('home')}
              className="flex items-center cursor-pointer shrink-0"
              id="navbar-logo"
            >
              <img
                src="/src/assets/images/xtreme_badge_logo.jpg"
                alt="XTREME FITNESS STUDIO Logo"
                style={{
                  height: isScrolled ? '48px' : '58px',
                  width: isScrolled ? '48px' : '58px',
                  transition: 'height 350ms cubic-bezier(0.4, 0, 0.2, 1), width 350ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="rounded-full object-cover border border-neutral-800 shadow-md transition-transform duration-200 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center" id="desktop-nav">
              {navLinks.map((link, idx) => (
                <React.Fragment key={link.tab}>
                  <button
                    onClick={() => handleTabChange(link.tab)}
                    className="cursor-pointer transition-colors duration-150 hover:text-yellow-400"
                    style={{
                      padding: '0 24px',
                      fontFamily: 'sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: currentTab === link.tab ? '#FFD700' : '#FFFFFF',
                      background: 'none',
                      border: 'none',
                      whiteSpace: 'nowrap',
                    }}
                    id={`nav-link-${link.tab}`}
                  >
                    {link.label}
                  </button>
                  {idx < navLinks.length - 1 && (
                    <div 
                      style={{ 
                        width: '1px', 
                        height: isScrolled ? '14px' : '18px', 
                        background: '#333', 
                        flexShrink: 0,
                        transition: 'height 350ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }} 
                    />
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Join CTA - Desktop */}
            <div className="hidden lg:flex items-center shrink-0">
              <button
                onClick={() => handleTabChange('register')}
                className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  background: '#FFD700',
                  color: '#000',
                  fontFamily: 'sans-serif',
                  fontWeight: 800,
                  fontSize: isScrolled ? '13px' : '14px',
                  letterSpacing: '0.1em',
                  padding: isScrolled ? '10px 22px' : '12px 26px',
                  border: 'none',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap',
                  transition: 'padding 350ms cubic-bezier(0.4, 0, 0.2, 1), font-size 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                id="navbar-join-btn"
              >
                JOIN THE FORGE
                <ArrowRight size={isScrolled ? 15 : 17} strokeWidth={3} style={{ transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: '#fff', background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}
                id="mobile-menu-toggle"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for non-home tabs to prevent layout shift and overlay */}
      {currentTab !== 'home' && (
        <div style={{ height: '80px', width: '100%', flexShrink: 0 }} />
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden w-full fixed z-30"
            style={{ 
              top: isScrolled ? '64px' : '80px', 
              left: 0,
              background: '#0a0a0a', 
              borderBottom: '1px solid #1a1a1a',
              transition: 'top 350ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            id="mobile-nav-container"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => handleTabChange(link.tab)}
                  className="w-full text-left cursor-pointer"
                  style={{
                    padding: '12px 16px',
                    fontFamily: 'sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: currentTab === link.tab ? '#FFD700' : '#fff',
                    background: currentTab === link.tab ? 'rgba(255,215,0,0.08)' : 'none',
                    border: 'none',
                    borderRadius: '4px',
                    display: 'block',
                  }}
                  id={`mobile-nav-link-${link.tab}`}
                >
                  {link.label}
                </button>
              ))}

              <div style={{ paddingTop: '16px', borderTop: '1px solid #1a1a1a', marginTop: '8px' }}>
                <button
                  onClick={() => handleTabChange('register')}
                  className="w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:brightness-110"
                  style={{
                    background: '#FFD700',
                    color: '#000',
                    fontFamily: 'sans-serif',
                    fontWeight: 800,
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    padding: '12px 22px',
                    border: 'none',
                    borderRadius: '2px',
                  }}
                  id="mobile-join-btn"
                >
                  JOIN THE FORGE
                  <ArrowRight size={15} strokeWidth={3} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
