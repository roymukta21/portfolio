import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Logo from "./components/Logo";
import ContactForm from "./components/ContactForm";
import { Button } from "./components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import Loading from "./components/ui/Loading";
import MovingCursor from "./components/ui/MovingCursor";
import "./App.css";
//import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navRef = useRef(null);
  const { scrollY } = useScroll();

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scrolling with optimized settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: true,
      touchMultiplier: 2.5,
      infinite: false,
      autoResize: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 35,
      normalizeWheel: true,
    });

    // Store Lenis instance globally for navigation
    window.lenis = lenis;

    // Optimize animation frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update GSAP ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh ScrollTrigger when Lenis updates
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove();
    };
  }, []);

  // Handle scroll effects
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // GSAP animations for sections
  useEffect(() => {
    // Wait for Lenis to initialize
    const timer = setTimeout(() => {
      // About section animation
      gsap.fromTo(
        ".about-content",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: document.body, // Specify scroller for Lenis
          },
        },
      );

      // Skills section animation
      gsap.fromTo(
        ".skill-item",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: document.body,
          },
        },
      );

      // Skill bars animation
      gsap.fromTo(
        ".skill-bar",
        {
          width: "0%",
        },
        {
          width: (index, target) => target.getAttribute("data-width"),
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: document.body,
          },
        },
      );

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use Lenis smooth scroll instead of native scrollIntoView
      const lenis = window.lenis;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -80, // Account for fixed navbar
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Show loading screen
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 overflow-x-hidden ${isDarkMode ? "dark" : ""}`}
    >
      <ScrollIndicator />
      <MovingCursor />
      {/* Navigation */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Logo
                size="md"
                showText={true}
                className="text-text-main dark:text-white"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center gap-8"
            >
              {[
                "home",
                "about",
                "services",
                "skills",
                "portfolio",
                "contact",
              ].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`relative px-4 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                    activeSection === item
                      ? "text-yellow-500"
                      : "text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a href="/Mukta Roy Resume.pdf" download>
                <Button size="default" className="flex items-center gap-2">
                  <span>Resume</span>
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="material-symbols-outlined text-lg"
                  >
                    download
                  </motion.span>
                </Button>
              </a>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <motion.span
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-symbols-outlined"
                >
                  {isMenuOpen ? "close" : "menu"}
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-white/10"
            >
              <div className="container-max px-4 md:px-6 mx-auto py-6">
                <div className="flex flex-col gap-4">
                  {[
                    "home",
                    "about",
                    "services",
                    "skills",
                    "portfolio",
                    "contact",
                  ].map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => scrollToSection(item)}
                      className={`text-left px-4 py-3 rounded-lg capitalize font-medium transition-all duration-300 ${
                        activeSection === item
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="section-padding" id="home">
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  Available for work
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-text-main dark:text-white mt-4">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Mukta Roy
                </span>
                .<br />A Passionate MERN Stack Developer.
              </h1>
              <p className="text-text-muted dark:text-gray-400 text-lg mt-6">
                Based in Bangladesh. I build modern, scalable full-stack web applications
                using MongoDB, Express.js, React, and Node.js with best practices.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="flex items-center"
                  onClick={() => scrollToSection("contact")}
                >
                  Hire Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                  onClick={() => scrollToSection("portfolio")}
                >
                  View Work
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div>
                  <p className="text-3xl font-black text-text-main dark:text-white">
                    50+
                  </p>
                  <p className="text-text-muted dark:text-gray-400 text-sm">
                    Projects
                  </p>
                </div>
                <div className="w-px h-10 bg-[#f3ede7] dark:bg-white/10"></div>
                <div>
                  <p className="text-3xl font-black text-text-main dark:text-white">
                    100+
                  </p>
                  <p className="text-text-muted dark:text-gray-400 text-sm">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform translate-x-10 translate-y-10 -z-10"></div>

              {/* Image Container with Hover Effect */}
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Real Image */}
                <motion.img
                  src="/mukta-real.jpg"
                  alt="Mukta Roy - Web Developer"
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Cartoon Image (appears on hover) */}
                <motion.img
                  src="/mukta-roy.jpg"
                  alt="Mukta Roy - Cartoon Avatar"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating Animation Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl"
                ></motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-orange-400/30 rounded-full blur-lg"
                ></motion.div>

                {/* Hover Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section
        className="about-section section-padding bg-white dark:bg-white/5"
        id="about"
      >
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1"
              >
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="/mukta-roy.jpg"
                    alt="Mukta Roy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full blur-xl"
              ></motion.div>
            </motion.div>

            <div className="about-content">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-yellow-500 font-bold uppercase tracking-wider text-sm"
              >
                About Me
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mt-2 mb-4 text-text-main dark:text-white"
              >
                Code is poetry written in
                <span className="text-yellow-500"> logic and creativity.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-text-muted dark:text-gray-400 leading-relaxed mb-4"
              >
                I'm Mukta Roy, a passionate MERN stack developer with
                expertise in building full-stack web applications. I specialize in
                MongoDB, Express.js, React, and Node.js, creating scalable and efficient solutions.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-text-muted dark:text-gray-400 leading-relaxed mb-6"
              >
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or enjoying a good cup of
                coffee while debugging the latest challenge.
              </motion.p>

              <div className="space-y-4">
                {[
                  { icon: "mail", text: "muktaroy520@gmail.com" },
                  { icon: "location_on", text: "Bangladesh" },
                  { icon: "code", text: "MERN Stack Developer" },
                  { icon: "work", text: "Available for projects" },
                ].map((item, index) => (
                  <motion.div
                    key={item.icon}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <motion.span
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="material-symbols-outlined text-yellow-500"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="section-padding relative overflow-hidden"
        id="services"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-l from-orange-500/10 to-red-500/10 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-300/10 to-orange-400/10 rounded-full blur-lg"
        />

        <div className="container-max px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 mb-4 text-text-main dark:text-white">
              What I Build & Design
            </h2>
            <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
              I offer comprehensive digital solutions from concept to
              deployment, combining technical expertise with creative design
              thinking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 - MERN Stack Development */}
            <motion.div
              initial={{ opacity: 0, y: 100, x: -50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: 5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 1, -1, 0],
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))",
                      "linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.1))",
                      "linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-14 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      web
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    MERN Stack Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    Building full-stack web applications using MongoDB, Express.js, React, and Node.js with modern development practices.
                  </CardDescription>
                </CardContent>

                {/* Floating Particles */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-orange-400 rounded-full"
                />
              </Card>
            </motion.div>

            {/* Service 2 - UI/UX Design */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
                rotateZ: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: -5,
                rotateX: 5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -8, 0],
                rotateZ: [0, -1, 1, 0],
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))",
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      rotateY: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotateY: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-14 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      palette
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    UI/UX Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    Creating intuitive and beautiful user experiences through
                    research, wireframing, prototyping, and visual design.
                  </CardDescription>
                </CardContent>

                {/* Moving Elements */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                  className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                />
                <motion.div
                  animate={{
                    x: [0, -8, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full"
                />
              </Card>
            </motion.div>

            {/* Service 3 - Backend Development */}
            <motion.div
              initial={{ opacity: 0, y: 100, x: 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                },
                rotateZ: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                },
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -12, 0],
                rotateZ: [0, 1.5, -1.5, 0],
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
                      "linear-gradient(225deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.1))",
                      "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotateX: [0, 360],
                      rotateZ: [0, 180, 360],
                    }}
                    transition={{
                      scale: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotateX: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      rotateZ: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    className="size-14 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      dns
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    Backend Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    Creating robust server-side applications with Node.js,
                    Express, databases, and RESTful APIs for seamless data
                    management.
                  </CardDescription>
                </CardContent>

                {/* Orbiting Elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div className="absolute -top-2 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full -translate-x-1/2" />
                </motion.div>
              </Card>
            </motion.div>

            {/* Service 4 - Mobile Development */}
            <motion.div
              initial={{ opacity: 0, y: 100, x: -50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                },
                rotateZ: {
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                },
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: -5,
                rotateX: 5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -9, 0],
                rotateZ: [0, -1.2, 1.2, 0],
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-green-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))",
                      "linear-gradient(315deg, rgba(22, 163, 74, 0.1), rgba(21, 128, 61, 0.1))",
                      "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))",
                    ],
                  }}
                  transition={{ duration: 4.2, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      rotateZ: [0, 360],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      rotateZ: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-14 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      phone_android
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    Mobile Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    Building cross-platform mobile applications using React
                    Native and Flutter for iOS and Android platforms.
                  </CardDescription>
                </CardContent>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -18, 0],
                    x: [0, 5, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.7 }}
                  className="absolute top-5 right-5 w-2.5 h-2.5 bg-green-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    x: [0, -3, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 1.2 }}
                  className="absolute bottom-5 left-5 w-2 h-2 bg-emerald-400 rounded-full"
                />
              </Card>
            </motion.div>

            {/* Service 5 - Full-Stack Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -11, 0],
                rotateZ: [0, 1.8, -1.8, 0],
              }}
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                },
                rotateZ: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                },
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))",
                      "linear-gradient(45deg, rgba(234, 88, 12, 0.1), rgba(194, 65, 12, 0.1))",
                      "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))",
                    ],
                  }}
                  transition={{ duration: 3.8, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      scale: {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotateY: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    className="size-14 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      cloud
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    Full-Stack Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    End-to-end web application development with deployment,
                    optimization, and maintenance for complete digital
                    solutions.
                  </CardDescription>
                </CardContent>

                {/* Complex Animation */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-8 right-8 w-6 h-6"
                >
                  <motion.div className="absolute -top-1 left-1/2 w-1 h-1 bg-orange-500 rounded-full -translate-x-1/2" />
                </motion.div>
              </Card>
            </motion.div>

            {/* Service 6 - Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 100, x: 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                rotateY: -5,
                rotateX: 5,
                scale: 1.05,
              }}
              animate={{
                y: [0, -13, 0],
                rotateZ: [0, -2, 2, 0],
              }}
              transition={{
                y: {
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5,
                },
                rotateZ: {
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5,
                },
              }}
              style={{ willChange: "transform" }}
            >
              <Card className="group hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden service-card">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1))",
                      "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(67, 56, 202, 0.1))",
                      "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1))",
                    ],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <CardHeader>
                  <motion.div
                    animate={{
                      rotateX: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotateX: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="size-14 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all relative z-10"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      psychology
                    </span>
                  </motion.div>
                  <CardTitle className="text-text-main dark:text-white relative z-10">
                    Consulting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-muted dark:text-gray-400 leading-relaxed relative z-10">
                    Strategic technology consulting, code reviews, architecture
                    planning, and technical guidance for your projects.
                  </CardDescription>
                </CardContent>

                {/* Unique Animation Pattern */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.9 }}
                  className="absolute top-6 right-6 w-2 h-2 bg-indigo-400 rounded-full"
                />
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute bottom-6 left-6 w-4 h-4"
                >
                  <motion.div className="absolute top-0 left-1/2 w-1 h-1 bg-indigo-500 rounded-full -translate-x-1/2" />
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        className="skills-section section-padding bg-[#1b1b40] dark:bg-black text-white"
        id="skills"
      >
        <div className="container-max px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-yellow-400 font-bold uppercase tracking-wider text-sm"
              >
                Technical Skills
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black mt-2"
              >
                My Tech Stack
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-md text-sm md:text-right"
            >
              I constantly update my skills to stay current with the latest
              industry trends and technologies.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* MERN Stack */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="skill-item"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-yellow-400 pb-2"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="material-symbols-outlined text-yellow-400"
                >
                  code
                </motion.span>
                MERN Stack
              </motion.h3>
              <div className="space-y-6">
                {[
                  { name: "MongoDB", percentage: 85 },
                  { name: "Express.js", percentage: 88 },
                  { name: "React.js", percentage: 92 },
                  { name: "Node.js", percentage: 87 },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-yellow-400"
                      >
                        {skill.percentage}%
                      </motion.span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="skill-bar h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        data-width={`${skill.percentage}%`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.5 + index * 0.1,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* UI/UX Design */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="skill-item"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-yellow-400 pb-2"
              >
                <motion.span
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="material-symbols-outlined text-yellow-400"
                >
                  palette
                </motion.span>
                UI/UX Design
              </motion.h3>
              <div className="space-y-6">
                {[
                  { name: "User Interface Design", percentage: 88 },
                  { name: "User Experience Design", percentage: 85 },
                  { name: "Prototyping & Wireframing", percentage: 82 },
                  { name: "Design Systems", percentage: 80 },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-yellow-400"
                      >
                        {skill.percentage}%
                      </motion.span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="skill-bar h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        data-width={`${skill.percentage}%`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.6 + index * 0.1,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="skill-item"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-yellow-400 pb-2"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="material-symbols-outlined text-yellow-400"
                >
                  database
                </motion.span>
                Backend
              </motion.h3>
              <div className="space-y-6">
                {[
                  { name: "Node.js", percentage: 80 },
                  { name: "Python / Django", percentage: 70 },
                  { name: "SQL / MongoDB", percentage: 75 },
                  { name: "RESTful APIs", percentage: 85 },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-yellow-400"
                      >
                        {skill.percentage}%
                      </motion.span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="skill-bar h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        data-width={`${skill.percentage}%`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.7 + index * 0.1,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 skill-item"
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-yellow-400 pb-2"
            >
              <motion.span
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="material-symbols-outlined text-yellow-400"
              >
                build
              </motion.span>
              Tools
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Figma",
                "Adobe XD",
                "Sketch",
                "VS Code",
                "Git/GitHub",
                "Docker",
                "AWS",
                "MongoDB",
                "PostgreSQL",
                "Postman",
                "Webpack",
                "Jest",
              ].map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className={`px-4 py-2 text-sm cursor-default transition-all duration-300 ${
                      ["Figma", "Adobe XD", "Sketch"].includes(tool)
                        ? "hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white"
                        : "hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white"
                    }`}
                  >
                    {tool}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section-padding" id="portfolio">
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 text-text-main dark:text-white">
                Featured Projects
              </h2>
            </div>
            {/* <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              View All Projects
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 - Study Mate */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center relative">
                {/* Emoji - visible by default */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white text-6xl font-bold opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10"
                >
                  📚
                </motion.div>
                {/* Screenshot - visible on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "url('/Study-Mate.png')" }}
                />
              </div>
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <span className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-2">
                  Full-Stack MERN
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Study Mate
                </h3>
                <p className="text-gray-300 text-sm mb-6 max-w-xs">
                  A comprehensive study platform with assignment management,
                  collaboration tools, and progress tracking.
                </p>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://study-mate-597e5.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/roymukta21/roy-10th-assingment-client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-white text-white text-sm font-bold rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    Client Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/roymukta21/roy-10th-assingment-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-gray-400 text-gray-300 text-sm font-bold rounded-full hover:bg-gray-400 hover:text-black transition-colors"
                  >
                    Server Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
            {/* Project 2 - FireShield */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-red-500 via-orange-600 to-yellow-500 flex items-center justify-center relative">
                {/* Emoji - visible by default */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white text-6xl font-bold opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10"
                >
                  🔥
                </motion.div>
                {/* Screenshot - visible on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "url('/skillSwap.png')" }}
                />
              </div>
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <span className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-2">
                  React Firebase
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  SkillSwap
                </h3>
                <p className="text-gray-300 text-sm mb-6 max-w-xs">
                  A security-focused web application with Firebase
                  authentication and real-time data management.
                </p>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://skill-swap-889ae.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/programming-hero-web-course2/b12-a9-firesheild-roymukta21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-white text-white text-sm font-bold rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
            {/* Project 3 - Local Chef Bazaar */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 flex items-center justify-center relative">
                {/* Emoji - visible by default */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white text-6xl font-bold opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10"
                >
                  👨‍🍳
                </motion.div>
                {/* Screenshot - visible on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "url('/local-chef.png')" }}
                />
              </div>
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <span className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-2">
                  Full-Stack MERN
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Local Chef Bazaar
                </h3>
                <p className="text-gray-300 text-sm mb-6 max-w-xs">
                  A local chef marketplace connecting food lovers with talented
                  home chefs in their area.
                </p>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://local-chef-bazaar-a84fe.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/roymukta21/roy-11th-assignment-client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-white text-white text-sm font-bold rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    Client Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/roymukta21/roy-11th-assignment-server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-gray-400 text-gray-300 text-sm font-bold rounded-full hover:bg-gray-400 hover:text-black transition-colors"
                  >
                    Server Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
            {/* Project 4 - Starlight Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 flex items-center justify-center relative">
                {/* Emoji - visible by default */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  }}
                  className="text-white text-6xl font-bold opacity-20 group-hover:opacity-0 transition-opacity duration-500 z-10"
                >
                  ⭐
                </motion.div>
                {/* Screenshot - visible on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "url('/heroApp.png')" }}
                />
              </div>
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <span className="text-yellow-400 font-bold uppercase tracking-wide text-sm mb-2">
                  React Portfolio
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">HeroApps</h3>
                <p className="text-gray-300 text-sm mb-6 max-w-xs">
                  At HERO.IO, we craft innovative apps designed to make everyday
                  life simpler, smarter, and more exciting. Our goal is to turn
                  your ideas into digital experiences that truly make an impact.
                </p>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://startling-starlight-212fd7.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/roymukta21/roy-8th-assingment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-white text-white text-sm font-bold rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="section-padding bg-white dark:bg-white/5"
        id="contact"
      >
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 text-text-main dark:text-white">
              Let's Work Together
            </h2>
            <p className="text-text-muted dark:text-gray-400 mt-4">
              Have a project in mind? Let's discuss how I can help you achieve
              your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="size-12 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4"
                    >
                      <span className="material-symbols-outlined text-2xl">call</span>
                    </motion.div>
                    <CardTitle className="font-bold text-text-main dark:text-white mb-2">
                      Phone
                    </CardTitle>
                    <CardDescription className="text-text-muted dark:text-gray-400">
                      +880 1794-239883
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="size-12 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4"
                    >
                      <span className="material-symbols-outlined text-2xl">mail</span>
                    </motion.div>
                    <CardTitle className="font-bold text-text-main dark:text-white mb-2">
                      Email
                    </CardTitle>
                    <CardDescription className="text-text-muted dark:text-gray-400">
                      <a 
                        href="mailto:muktaroy520@gmail.com"
                        className="hover:text-yellow-500 transition-colors"
                      >
                        muktaroy520@gmail.com
                      </a>
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="size-12 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4"
                    >
                      <span className="material-symbols-outlined text-2xl">
                        location_on
                      </span>
                    </motion.div>
                    <CardTitle className="font-bold text-text-main dark:text-white mb-2">
                      Location
                    </CardTitle>
                    <CardDescription className="text-text-muted dark:text-gray-400">
                      Dhaka, Bangladesh
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b1b40] dark:bg-black text-white py-12 border-t border-white/10">
        <div className="container-max px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:items-start items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="size-10 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg overflow-hidden"
                >
                  <img
                    src="/logo.svg"
                    alt="Mukta Roy Logo"
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      // Fallback to MR text if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span
                    className="text-white font-black text-sm tracking-tighter hidden"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    MR
                  </span>
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight">Mukta Roy</h2>
              </div>
              <p className="text-gray-400 text-sm">
                © 2026 Mukta Roy. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                href="mailto:muktaroy520@gmail.com"
                title="Email"
              >
                <span className="material-symbols-outlined">mail</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                href="https://www.linkedin.com/in/roy-mukta"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <span className="material-symbols-outlined">work</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                href="https://github.com/roymukta21"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <span className="material-symbols-outlined">code</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                href="https://www.facebook.com/mukta.roy.5682944/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <span className="material-symbols-outlined">public</span>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "block" : "block"}`}
      >
        <motion.span
          animate={{ rotate: isDarkMode ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className={`material-symbols-outlined ${isDarkMode ? "hidden" : "block"}`}
        >
          dark_mode
        </motion.span>
        <motion.span
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`material-symbols-outlined ${isDarkMode ? "block" : "hidden"}`}
        >
          light_mode
        </motion.span>
      </motion.button>
    </div>
  );
};

export default App;
