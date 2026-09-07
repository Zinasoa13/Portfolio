import { motion, type Variants } from "framer-motion"
import { Download, FileText } from "lucide-react"
import { useState } from "react"
import Typewriter from "typewriter-effect"

interface CvPageProps {
  showContent: boolean
}

function CvPage({ showContent }: CvPageProps) {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.3,
      },
    },
  }

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.4,
      },
    },
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.1,
      },
    },
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-4 sm:px-6 pt-2 sm:pt-4 lg:pt-6 pb-16 overflow-y-auto max-w-7xl mx-auto">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-200 transition-all duration-500 ease-in-out mb-4 sm:mb-6 text-center tracking-tight"
      >
        Mon Curriculum Vitae
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12 max-w-6xl w-full border border-gray-200/80 dark:border-white/10"
      >
        {/* Image du CV avec overlay verso */}
        <motion.div variants={imageVariants} className="w-full md:w-1/2 max-w-md md:max-w-none relative group">
          <motion.div
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-b from-purple-500/20 via-indigo-500/10 to-transparent dark:from-white/15 dark:to-white/5 border border-purple-500/20 dark:border-white/10 shadow-xl cursor-pointer"
          >
            {/* Image recto (base) */}
            <div className="relative">
              <img
                src="/cv1.png"
                alt="CV Zinasoa - Recto"
                className="rounded-xl w-full h-auto max-h-[45vh] sm:max-h-[60vh] lg:max-h-[65vh] object-contain shadow-md transition-all duration-300 mx-auto"
              />

              {/* Overlay verso avec transition du bas vers le haut */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: isHovered ? "0%" : "100%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute inset-0 bg-white dark:bg-slate-950 rounded-xl overflow-hidden z-10"
              >
                <img
                  src="/cv2.png?height=600&width=450"
                  alt="CV Zinasoa - Verso"
                  className="w-full h-full max-h-[45vh] sm:max-h-[60vh] lg:max-h-[65vh] object-contain rounded-xl mx-auto"
                />
              </motion.div>

              {/* Indicateur de verso en bas à droite */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-3 right-3 bg-purple-600/90 text-white font-medium text-[10px] sm:text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-purple-400/30 z-20"
              >
                {isHovered ? "Verso actif ✨" : "Toucher / Survoler pour verso"}
              </motion.div>
            </div>
          </motion.div>

          {/* Badge flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-2.5 shadow-lg shadow-purple-600/40 z-30"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>

        {/* Description + boutons */}
        <motion.div variants={textVariants} className="w-full md:flex-1 text-center md:text-left space-y-4 sm:space-y-6">
          <motion.h2 variants={itemVariants} className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 min-h-[36px] sm:min-h-[48px]">
            <Typewriter
              options={{
                strings: [
                  "Voici mon CV...",
                  "Découvrez mon parcours",
                  "Téléchargez mon CV",
                  "Explorez mes compétences",
                ],
                autoStart: true,
                loop: true,
                delay: 60,
              }}
            />
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed font-medium">
            Découvrez mon parcours professionnel, mes compétences techniques et mes expériences. Mon CV détaille mes
            projets, formations et expertises en développement mobile et web full-stack.
            <br className="hidden sm:block" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold inline-block mt-2">
              {isHovered ? "🎉 Vous consultez actuellement le verso !" : "👆 Touchez ou survolez l'image pour switcher de page."}
            </span>
          </motion.p>

          {/* Stats rapides */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-4 my-4 sm:my-6">
            <div className="text-center p-3 sm:p-4 bg-purple-500/10 dark:bg-purple-950/40 rounded-2xl border border-purple-500/20 dark:border-purple-800/30 backdrop-blur-md shadow-sm">
              <div className="text-xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-purple-100">9+</div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-slate-400 font-semibold mt-1">Projets réalisés</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-500/10 dark:bg-purple-950/40 rounded-2xl border border-purple-500/20 dark:border-purple-800/30 backdrop-blur-md shadow-sm">
              <div className="text-xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-purple-100">7+</div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-slate-400 font-semibold mt-1">Technologies</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-purple-500/10 dark:bg-purple-950/40 rounded-2xl border border-purple-500/20 dark:border-purple-800/30 backdrop-blur-md shadow-sm">
              <div className="text-xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-purple-100">2</div>
              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-slate-400 font-semibold mt-1">Pages CV</div>
            </div>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(147, 51, 234, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 sm:py-4 rounded-xl shadow-xl shadow-purple-600/30 transition-all duration-300 group text-sm sm:text-base cursor-pointer"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-bounce" />
              Télécharger le CV PDF
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CvPage

