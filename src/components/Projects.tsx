import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants, type PanInfo } from "framer-motion"

const projects = [
    {
        title: "SOACHAT",
        description: "Messaging app with AI integration that automates sending messages",
        link: "https://github.com/Zinasoa13/SOACHAT",
        tech: ["Angular", "NestJS", "MongoDB", "Socket.io", "Gemini Flash"],
    },
    {
        title: "TongaCheck",
        description: "Mobile application for rapid attendance and check-in validation",
        link: "https://github.com/Zinasoa13/SOACHAT",
        tech: ["Flutter", "Firebase"],
    },
    {
        title: "Z_music",
        description: "Music app featuring rich interactive 3D elements",
        link: "https://github.com/Zinasoa13/music",
        tech: ["Flutter", "Dart", "Deezer API"],
    },
    {
        title: "ToroHoAhy",
        description: "Vocal Malagasy mobile app designed for illiterate users",
        link: "https://github.com/Zinasoa13/torohoahy2",
        tech: ["React Native", "Node.js", "Hugging Face Model"],
    },
    {
        title: "Sikilaona",
        description: "Minimalist Malagasy weather forecast application",
        link: "https://github.com/Zinasoa13/sikilaona",
        tech: ["Flutter", "Dart", "OpenWeather API"],
    },
    {
        title: "Data processing",
        description: "Interactive data visualization graphs and analytics dashboard",
        link: "https://github.com/Zinasoa13/data_processing/tree/miaou2",
        tech: ["Flutter", "Python", "Dart", "Pandas", "Matplotlib", "PostgreSQL"],
    },
    {
        title: "Miniblog",
        description: "Clean mobile blog platform practice project",
        link: "https://github.com/Zinasoa13/MINIBLOG",
        tech: ["React Native", "REST API"],
    },
    {
        title: "Cinema-Stream",
        description: "Online movie catalog and streaming showcase",
        link: "https://github.com/Zinasoa13/cinema-stream/tree/master",
        tech: ["React.js", ".NET", "SQLite"],
    },
    {
        title: "Icon Generator",
        description: "Containerized icon generator utility",
        link: "https://github.com/Zinasoa13/icon_generator/tree/master",
        tech: ["Docker Compose", "Python", "Flask"],
    },
]

interface ProjectsPageProps {
  showContent: boolean
}

function ProjectsPage({ showContent }: ProjectsPageProps) {
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Ajustement dynamique du nombre de cartes par page selon l'ecran
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }
    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const currentProjects = projects.slice(start, end)

  // Re-initialiser a la premiere page si totalPages change
  useEffect(() => {
    if (page >= totalPages) {
      setPage(0)
    }
  }, [itemsPerPage, totalPages, page])

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const threshold = 40

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
    <div className="w-full h-full flex flex-col items-center justify-between px-4 sm:px-6 py-4 lg:py-8 overflow-hidden max-w-7xl mx-auto">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-200 transition-all duration-500 ease-in-out mb-4 sm:mb-6 lg:mb-8 text-center tracking-tight"
      >
        Mes Projets
      </motion.h1>

      <div className="w-full max-w-6xl min-h-[300px] sm:min-h-[350px] lg:min-h-[380px] relative flex items-center justify-center overflow-hidden my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${itemsPerPage}-${page}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`grid grid-cols-1 ${itemsPerPage === 2 ? 'sm:grid-cols-2' : ''} ${itemsPerPage === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} gap-4 sm:gap-6 lg:gap-8 w-full cursor-grab active:cursor-grabbing select-none`}
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${page}-${index}`}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 border border-gray-200/80 dark:border-white/10 hover:border-purple-500/40 dark:hover:border-purple-400/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-purple-500/40 group-hover:bg-purple-500 group-hover:scale-125 transition-all" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-slate-300 mb-5 text-xs sm:text-sm leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-[11px] rounded-full font-semibold backdrop-blur-sm shadow-sm"
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
                  className="inline-flex items-center text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 font-bold transition-colors duration-300 group mt-auto pt-2"
                >
                  Voir le projet
                  <motion.span
                    className="ml-1.5 text-base"
                    animate={{ x: [0, 4, 0] }}
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
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex gap-2 mt-4 sm:mt-6"
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              page === i
                ? "bg-purple-600 dark:bg-purple-400 w-6 sm:w-7 shadow-sm shadow-purple-500/50"
                : "bg-gray-300 dark:bg-slate-700 w-2.5 sm:w-3 hover:bg-purple-400"
            }`}
            aria-label={`Go to project page ${i + 1}`}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectsPage