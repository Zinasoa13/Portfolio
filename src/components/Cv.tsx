
import { motion, type Variants } from "framer-motion"
import { Download, Eye, FileText } from "lucide-react"
import Typewriter from "typewriter-effect"

interface CvPageProps {
  showContent: boolean
}

function CvPage({ showContent }: CvPageProps) {
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
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="text-5xl font-bold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer mb-12"
      >
        Mon Curriculum Vitae
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full border border-gray-100"
      >
        {/* Image du CV */}
        <motion.div variants={imageVariants} className="w-full md:w-1/2 relative group">
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src="/placeholder.svg?height=600&width=400"
              alt="CV Zinasoa"
              className="rounded-xl w-full shadow-md transition-all duration-300 group-hover:shadow-2xl"
            />

            {/* Overlay au survol */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-white bg-opacity-90 rounded-full p-4"
              >
                <Eye className="w-8 h-8 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Badge flottant */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -top-3 -right-3 bg-purple-500 text-white rounded-full p-2 shadow-lg"
          >
            <FileText className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Description + boutons */}
        <motion.div variants={textVariants} className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4">
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

          <motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed mb-8">
            Découvrez mon parcours professionnel, mes compétences techniques et mes expériences. Mon CV détaille mes
            projets, formations et expertises en développement mobile et web.
          </motion.p>

          {/* Stats rapides */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">5+</div>
              <div className="text-sm text-gray-600">Projets réalisés</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Technologies</div>
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 group"
            >
              <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Aperçu en ligne
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CvPage
