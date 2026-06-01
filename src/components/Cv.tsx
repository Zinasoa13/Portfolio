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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
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
      x: -50,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.4,
      },
    },
  }

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.6,
      },
    },
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
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
    <div className="w-full h-full flex flex-col items-center justify-start px-6 pt-4 lg:pt-8 pb-10 overflow-y-auto">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="text-4xl lg:text-5xl font-bold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer mb-4 lg:mb-6"
      >
        Mon Curriculum Vitae
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 lg:gap-12 max-w-6xl w-full border border-gray-100 dark:border-white/5 backdrop-blur-sm"
      >
        {/* Image du CV avec overlay verso */}
        <motion.div variants={imageVariants} className="w-full md:w-1/2 relative group">
          <motion.div
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
          >
            {/* Image recto (base) */}
            <div className="relative">
              <img
                src="/cv1.png?height=600&width=450"
                alt="CV Zinasoa - Recto"
                className="rounded-xl w-full h-auto max-h-[70vh] object-contain shadow-md transition-all duration-300"
              />

              {/* Overlay verso avec transition du bas vers le haut */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: isHovered ? "0%" : "100%" }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl overflow-hidden z-10"
              >
                <img
                  src="/cv2.png?height=600&width=450"
                  alt="CV Zinasoa - Verso"
                  className="w-full h-full max-h-[70vh] object-contain rounded-xl"
                />


              </motion.div>

              {/* Indicateur de verso en bas à droite */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 z-20"
              >
                Voir verso
              </motion.div>
            </div>
          </motion.div>

          {/* Badge flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -top-3 -right-3 bg-purple-500 text-white rounded-full p-2 shadow-lg z-30"
          >
            <FileText className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Description + boutons */}
        <motion.div variants={textVariants} className="w-full md:flex-1 text-center md:text-left space-y-4 lg:space-y-6">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">
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
                delay: 75,
              }}
            />
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mb-6 lg:mb-8">
            Découvrez mon parcours professionnel, mes compétences techniques et mes expériences. Mon CV détaille mes
            projets, formations et expertises en développement mobile et web.
            <br />
            <span className="text-purple-600 font-medium">
              {isHovered ? "🎉 Vous voyez le verso !" : "👆 Survolez l'image pour voir le verso !"}
            </span>
          </motion.p>

          {/* Stats rapides */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-6 lg:mb-8">
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5+</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Projets réalisés</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Technologies</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Pages CV</div>
            </div>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Télécharger le CV
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CvPage
