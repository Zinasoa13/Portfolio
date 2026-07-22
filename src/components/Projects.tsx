import { useState } from "react"
import { motion, AnimatePresence, type Variants, type PanInfo } from "framer-motion"

const projects = [
    {
        title: "SOACHAT",
        description: "Messaging app with AI integration that automates the sending messages",
        link: "https://github.com/Zinasoa13/SOACHAT",
        tech: ["Angular", "NestJs", "Mongodb", "Socket.io", "gemini flash model"],
    },
    {
        title: "TongaCheck",
        description: "Messaging app with AI integration that automates the sending messages",
        link: "https://github.com/Zinasoa13/SOACHAT",
        tech: ["Flutter", "Firebase"],
    },
    {
        title: "Z_music",
        description: "Music app with 3D interaction",
        link: "https://github.com/Zinasoa13/music",
        tech: ["Flutter", "Dart", "Deezer Api"],
    },
    {
        title: "ToroHoAhy",
        description: "Vocal mobile app malagasy for illiterate people",
        link: "https://github.com/Zinasoa13/torohoahy2",
        tech: ["React Native", "Nodejs", "Hugging face model"],
    },
    {
        title: "Sikilaona",
        description: "Meteo Malagasy - minimaliste",
        link: "https://github.com/Zinasoa13/sikilaona",
        tech: ["Flutter", "Dart", "OpenWeather API"],
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
        tech: ["React Native", "API en ligne"],
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

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const currentProjects = projects.slice(start, end)

  // Gestion du drag propre sans interférence
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const threshold = 50

    if (offset < -threshold && page < totalPages - 1) {
      setPage((prev) => prev + 1)
    } else if (offset > threshold && page > 0) {
      setPage((prev) => prev - 1)
    }
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
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="text-5xl font-bold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer mb-12"
      >
        Mes Projets
      </motion.h1>

      <div className="w-full max-w-6xl min-h-[380px] relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full cursor-grab active:cursor-grabbing select-none absolute"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${page}-${index}`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-slate-900/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/5 backdrop-blur-sm group flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-purple-500 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium transition-colors duration-300 group mt-auto"
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
      </div>

      {/* Indicateurs de page (points) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex gap-2 mt-8"
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
              page === i ? "bg-purple-500 scale-125" : "bg-gray-300 dark:bg-slate-700 hover:bg-purple-300"
            }`}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectsPage