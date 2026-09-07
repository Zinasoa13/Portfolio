import { useState, useEffect } from "react"
import Typewriter from "typewriter-effect"
import { ChevronLeft, ChevronRight, Moon, Sun, Hand, Menu, X, Home, User, Briefcase, Mail } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import ProjectsPage from "./components/Projects"
import CvPage from "./components/Cv"
import ContactPage from "./components/Contact"
import Scene3D from "./components/scene"

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showSwipeTip, setShowSwipeTip] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  const totalPages = 4

  const navItems = [
    { id: 1, label: "Accueil", icon: Home },
    { id: 2, label: "CV", icon: User },
    { id: 3, label: "Projets", icon: Briefcase },
    { id: 4, label: "Contact", icon: Mail },
  ]

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  useEffect(() => {
    setShowContent(false)
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentPage])

  useEffect(() => {
    if (currentPage === 3) {
      setShowSwipeTip(true)
      const tipTimer = setTimeout(() => {
        setShowSwipeTip(false)
      }, 4500)
      return () => clearTimeout(tipTimer)
    } else {
      setShowSwipeTip(false)
    }
  }, [currentPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 pt-16 lg:pt-0 gap-6 lg:gap-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-visible">
            {/* Texterie responsive haut de gamme */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left z-10 py-2 sm:py-4 lg:py-0">

              {/* Badge d'état / disponibilité */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-semibold mb-4 sm:mb-6 backdrop-blur-md shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span>Disponible pour projets & opportunités</span>
              </motion.div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl mb-3 sm:mb-5 font-extrabold tracking-tight transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${showContent ? "200ms" : "0ms"}` }}
              >
                <span className="text-gray-900 dark:text-slate-100">Bonjour, je suis </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-200">
                  Zinasoa
                </span>
              </h1>

              <p
                className={`text-lg sm:text-2xl lg:text-3xl mb-4 sm:mb-6 font-bold text-purple-600 dark:text-purple-400 transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${showContent ? "400ms" : "0ms"}` }}
              >
                Full-Stack & Mobile Developer
              </p>

              {/* Box de description Typewriter sous forme de carte glassmorphic */}
              <div
                className={`w-full min-h-[90px] sm:min-h-[110px] p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-gray-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${showContent ? "600ms" : "0ms"}` }}
              >
                <div className="text-xs sm:text-base leading-relaxed text-gray-700 dark:text-slate-300 font-medium">
                  <Typewriter
                    options={{
                      strings: [
                        "Développeur mobile et web full-stack spécialisé dans la création d'applications haute performance (Android/iOS) et web.",
                        "Stack maîtrisée : Flutter, React Native, Spring Boot, TypeScript, React, Node.js et Firebase.",
                        "Architecture propre, code optimisé et expérience utilisateur intuitive au cœur de chaque projet.",
                        "À la recherche de défis stimulants et d'opportunités à fort impact.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </div>
              </div>

              {/* Boutons d'action rapides */}
              <div
                className={`mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 transform ${
                  showContent ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${showContent ? "700ms" : "0ms"}` }}
              >
                <button
                  onClick={() => goToPage(3)}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  Voir mes projets
                  <Briefcase size={16} />
                </button>
                <button
                  onClick={() => goToPage(4)}
                  className="px-6 py-3 rounded-xl bg-gray-200/80 dark:bg-slate-900/60 hover:bg-purple-100 dark:hover:bg-slate-800 text-purple-700 dark:text-purple-300 font-semibold text-xs sm:text-sm border border-purple-300/40 dark:border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  Me contacter
                  <Mail size={16} />
                </button>
              </div>
            </div>

            {/* Emplacement réservé pour le modèle 3D */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full flex items-center justify-center relative flex-shrink-0" />
          </div>
        )
      case 2:
        return <CvPage showContent={showContent} />
      case 3:
        return <ProjectsPage showContent={showContent} />
      case 4:
        return <ContactPage showContent={showContent} />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-dvh min-h-screen flex flex-col items-center justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-x-hidden transition-colors duration-500 select-none bg-mesh-glow">

      {/* Decorative ambient background glows */}
      <div className="fixed top-1/4 left-1/6 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/6 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header / Navbar Pilule Flottante Prestige */}
      <header className="fixed top-3 sm:top-5 left-1/2 transform -translate-x-1/2 z-40 max-w-5xl w-[94%] sm:w-auto px-4 sm:px-6 py-2.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 rounded-full shadow-xl dark:shadow-purple-950/30 flex items-center justify-between gap-4 sm:gap-8 transition-all duration-300">
        <div
          onClick={() => goToPage(1)}
          className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white cursor-pointer flex items-center gap-2 group"
        >
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-0.5 rounded-lg text-xs font-black shadow-md group-hover:scale-110 transition-transform">
            Z
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-indigo-200">
            Zinasoa.dev
          </span>
        </div>

        {/* Navigation Desktop Pilule */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-slate-900/60 p-1 rounded-full border border-gray-200/60 dark:border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => goToPage(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 scale-105"
                    : "text-gray-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-200/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Actions droite (Dark mode + Burger Menu Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-slate-900/80 border border-gray-200 dark:border-white/10 text-purple-600 dark:text-purple-300 hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-purple-600 text-white shadow-md focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu Overlay Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-[70px] z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-purple-500/20 rounded-3xl px-5 py-5 flex flex-col gap-2.5 shadow-2xl md:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => goToPage(item.id)}
                  className={`w-full px-4 py-3 rounded-2xl font-medium text-left flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30"
                      : "text-gray-700 dark:text-slate-200 bg-gray-100/60 dark:bg-slate-900/60 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs opacity-60">Page 0{item.id}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation de transition entre pages */}
      <div
        className={`fixed inset-0 bg-white dark:bg-slate-950 transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } z-20 pointer-events-none`}
      ></div>

      {/* Persistent 3D Container pour la page 1 (Home) */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-500 z-0 pointer-events-none ${
          currentPage === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute bottom-16 top-auto lg:top-16 lg:bottom-20 left-0 lg:left-auto lg:right-0 w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-9rem)] flex items-center justify-center pointer-events-none">
          <Scene3D showContent={showContent && currentPage === 1} isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center w-full pt-20 pb-20 z-10">
        {renderPageContent()}
      </main>

      {/* Notification / Toast Swipe pour la page Projets */}
      <AnimatePresence>
        {showSwipeTip && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-24 z-30 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-purple-600/90 dark:bg-purple-900/90 text-white shadow-2xl backdrop-blur-md border border-purple-400/30 pointer-events-none text-xs sm:text-sm"
          >
            <motion.div
              animate={{ x: [-6, 6, -6] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
            >
              <Hand size={18} className="text-pink-300" />
            </motion.div>
            <span className="font-medium tracking-wide">
              Astuce : Glissez (swipez) les cartes pour défiler !
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de navigation inférieure Pilule Flottante (Flèches et Puces) */}
      <footer className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-full border border-gray-200/80 dark:border-white/10 shadow-xl dark:shadow-purple-950/30">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 disabled:bg-gray-300 dark:disabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Indicateurs de page */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 transform hover:scale-110 cursor-pointer ${
                currentPage === page
                  ? "bg-purple-600 dark:bg-purple-400 w-6 sm:w-7 shadow-sm shadow-purple-500/50"
                  : "bg-gray-300 dark:bg-slate-700 w-2.5 sm:w-3 hover:bg-purple-400"
              }`}
              aria-label={`Go to page ${page}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 disabled:bg-gray-300 dark:disabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
          aria-label="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </footer>
    </div>
  )
}