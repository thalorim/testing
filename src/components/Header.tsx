'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isScrolled?: boolean;
}

// Theme Toggle Button Component
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.button
        className="relative p-2.5 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
        aria-label="Loading theme toggle"
      >
        <div className="w-[1em] h-[1em]" />
      </motion.button>
    );
  }
  
  return (
    <motion.button
      className="relative p-2.5 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        {theme === 'dark' ? (
          <BsMoonStarsFill className="text-indigo-300 text-lg" />
        ) : (
          <BsSunFill className="text-amber-500 text-lg" />
        )}
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

const Header = ({ isScrolled = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Calculate which section is currently visible
      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current !== '') {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section when navigation occurs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const handleNavLinkClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      setActiveSection(section);
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3' 
          : 'py-5'
      }`}
    >
      {/* Glassmorphism background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 dark:bg-black/30 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/10'
          : 'bg-transparent'
      }`} />

      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group relative">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
            <motion.h1 
              className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              devRaikou
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="mr-4 p-1.5 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/5 shadow-lg">
              <div className="flex items-center space-x-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    custom={index}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    className="relative"
                  >
                    <button 
                      onClick={() => handleNavLinkClick(link.id)}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === link.id 
                          ? 'text-white' 
                          : 'hover:text-indigo-400 hover:bg-white/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10"
                        initial={false}
                        animate={{
                          opacity: activeSection === link.id ? 1 : 0,
                          scale: activeSection === link.id ? 1 : 0.9,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <ThemeToggleButton />
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden relative p-2.5 rounded-xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu className="text-xl" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed inset-0 z-50 md:hidden"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg"
                  onClick={() => setMobileMenuOpen(false)}
                />

                <div className="relative flex flex-col h-full">
                  <div className="flex justify-between items-center p-4">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                      devRaikou
                    </motion.h1>
                    <motion.button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiX className="text-xl" />
                    </motion.button>
                  </div>

                  <nav className="flex flex-col items-center justify-center flex-1 p-8">
                    <motion.div 
                      className="w-full max-w-md bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/5 shadow-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                          className="mb-3 last:mb-0"
                        >
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              handleNavLinkClick(link.id);
                            }}
                            className="relative w-full py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300"
                          >
                            <span className="relative z-10">{link.label}</span>
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                              initial={false}
                              animate={{
                                opacity: activeSection === link.id ? 1 : 0,
                                scale: activeSection === link.id ? 1 : 0.9,
                              }}
                              transition={{
                                duration: 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ThemeToggleButton />
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;