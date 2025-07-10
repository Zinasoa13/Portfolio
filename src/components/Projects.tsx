
import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

const projects = [
  {
    title: "Sikilaona",
    description: "Meteo Malagasy - minimaliste",
    link: "https://github.com/Zinasoa13/sikilaona",
    tech: ["Flutter", "Dart", "OpenWeather API"],
  },
  {
    title: "Music",
    description: "Play music online - How to use music API",
    link: "https://github.com/Zinasoa13/music",
    tech: ["Flutter", "Dart", "deezer API"],
  },
  {
    title: "Data processing",
    description: "Show graphs with data processing - minimaliste",
    link: "https://github.com/Zinasoa13/data_processing/tree/miaou2",
    tech: ["Flutter", "python", "Dart", "pandas", "matplotlib", "PostgreSQL"],
  },
  {
    title: "Miniblog",
    description: "Practice with React native",
    link: "https://github.com/Zinasoa13/MINIBLOG",
    tech: ["React Natice", "API en ligne"],
  },
  {
    title: "Cinema-Stream",
    description: "Online cinema",
    link: "https://github.com/Zinasoa13/cinema-stream/tree/master",
    tech: ["Reactjs", ".NET", "SQLite"],
  },
  {
    title: "Icon Genartor",
    description: "Practice on Docker",
    link: "https://github.com/Zinasoa13/icon_generator/tree/master",
    tech: ["Docker compose", "python", "Flask"],
  },
]

const itemsPerPage = 3

interface ProjectsPageProps {
  showContent: boolean
}

function ProjectsPage({ showContent }: ProjectsPageProps) {
  const [page, setPage] = useState(0)

  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const currentProjects = projects.slice(start, end)

  const canGoNext = end < projects.length
  const canGoPrev = page > 0

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants : Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants : Variants = {
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
        Mes Projets
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          exit={{ opacity: 0, scale: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-6xl"
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={`${page}-${index}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-purple-500 transition-colors duration-300">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

              {/* Technologies utilisées */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium transition-colors duration-300 group"
              >
                Voir le projet
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination des projets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex items-center gap-6"
      >
        <motion.button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!canGoPrev}
          whileHover={canGoPrev ? { scale: 1.05 } : {}}
          whileTap={canGoPrev ? { scale: 0.95 } : {}}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            canGoPrev
              ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Précédent
        </motion.button>

        {/* Indicateurs de page pour les projets */}
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => setPage(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                page === i ? "bg-purple-500 scale-125" : "bg-gray-300 hover:bg-purple-300"
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!canGoNext}
          whileHover={canGoNext ? { scale: 1.05 } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            canGoNext
              ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Suivant
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ProjectsPage
