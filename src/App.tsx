"use client"

import { useState, useEffect } from "react"
import Typewriter from "typewriter-effect"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectsPage from "./components/Projects"
import CvPage from "./components/Cv"
import ContactPage from "./components/Contact"
import Scene3D from "./components/scene"

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const totalPages = 4

  useEffect(() => {
    setShowContent(false)
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
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
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-between px-8 lg:px-16">
            {/* Contenu texte à gauche */}
            <div className="w-full lg:w-1/2 h-auto lg:h-2/5 text-left justify-center flex flex-col items-start">
              <h1
                className={`text-3xl lg:text-5xl mb-6 lg:mb-8 font-bold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: showContent ? "200ms" : "0ms" }}
              >
                Hi! I'm Zinasoa Fiderana Andriamanoro
              </h1>
              <p
                className={`text-2xl lg:text-4xl mb-4 lg:mb-6 font-semibold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: showContent ? "400ms" : "0ms" }}
              >
                I'm a great mobile & web developer
              </p>
              <div
                className={`w-full h-auto lg:h-12 transform ${
                  showContent ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: showContent ? "600ms" : "0ms", transition: "all 0.6s ease-in-out" }}
              >
                <div className="text-sm lg:text-lg leading-relaxed text-gray-700">
                  <Typewriter
                    options={{
                      strings: [
                        "Développeur mobile et web full-stack avec une expertise dans la conception et le développement d'applications performantes (Android/iOS) et de sites web dynamiques.",
                        "Passionné par les technologies modernes, je maîtrise Flutter, React Native, Kotlin, Swift, JavaScript/TypeScript, React, Node.js et Firebase.",
                        "Mon approche allie code optimisé, UX intuitive et solutions scalables, avec une forte adaptabilité aux nouvelles tendances tech.",
                        "À la recherche de projets innovants pour concrétiser des idées impactantes.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Section 3D à droite */}
            <div
              className={`hidden lg:block w-1/2 h-full transform ${
                showContent ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: showContent ? "800ms" : "0ms", transition: "all 0.8s ease-in-out" }}
            >
              <Scene3D showContent={showContent} />
            </div>
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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animation de balayage */}
      <div
        className={`absolute inset-0 bg-white transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        } z-10`}
      ></div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center w-full">
        {renderPageContent()}
      </div>

      {/* Boutons de navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-purple-400 text-white hover:bg-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Indicateurs de page */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 ${
                currentPage === page ? "bg-purple-500 scale-125" : "bg-gray-300 hover:bg-purple-300"
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-purple-400 text-white hover:bg-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Numéro de page */}
      <div className="absolute top-8 right-8 text-purple-400 font-semibold text-lg">
        {currentPage} / {totalPages}
      </div>
    </div>
  )
}
