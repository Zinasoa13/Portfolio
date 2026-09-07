import { motion, type Variants } from "framer-motion"
import { Phone, Mail, MessageCircle, Facebook, Linkedin, MapPin, Send, Copy } from "lucide-react"
import { useState } from "react"
import Contact3DModel from "./contact_3D"

interface ContactPageProps {
  showContent: boolean
}

function ContactPage({ showContent }: ContactPageProps) {
  const [copiedText, setCopiedText] = useState("")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const contactItems = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "038 82 466 68",
      href: "tel:0388246668",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 dark:bg-emerald-950/40",
      hoverColor: "hover:bg-emerald-500/20 dark:hover:bg-emerald-900/50",
      copyText: "0388246668",
    },
    {
      icon: Mail,
      label: "Email",
      value: "fideranaandria13@gmail.com",
      href: "mailto:fideranaandria13@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-950/40",
      hoverColor: "hover:bg-blue-500/20 dark:hover:bg-blue-900/50",
      copyText: "fideranaandria13@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Andria Fiderana",
      href: "https://www.linkedin.com/in/andria-fiderana-13b40a321/",
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-500/10 dark:bg-sky-950/40",
      hoverColor: "hover:bg-sky-500/20 dark:hover:bg-sky-900/50",
      external: true,
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Zinasoa Fiderana",
      href: "https://www.facebook.com/zinasoa.fiderana",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10 dark:bg-indigo-950/40",
      hoverColor: "hover:bg-indigo-500/20 dark:hover:bg-indigo-900/50",
      external: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Discuter sur WhatsApp",
      href: "https://wa.me/0388246668",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-950/40",
      hoverColor: "hover:bg-green-500/20 dark:hover:bg-green-900/50",
      external: true,
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Ambanidia, Madagascar",
      href: "https://www.google.com/maps/place/Ambanidia",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10 dark:bg-purple-950/40",
      hoverColor: "hover:bg-purple-500/20 dark:hover:bg-purple-900/50",
      external: true,
    },
  ]

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-2 sm:py-4 gap-6 overflow-y-auto max-w-7xl mx-auto">
      {/* Section principale des contacts */}
      <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-200 transition-all duration-500 ease-in-out mb-4 sm:mb-6 text-center tracking-tight"
        >
          Contactez-moi
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl rounded-3xl p-5 sm:p-8 w-full border border-gray-200/80 dark:border-white/10"
        >
          {/* Message d'introduction */}
          <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
            <p className="text-gray-600 dark:text-slate-300 text-xs sm:text-base font-medium">
              N'hésitez pas à me contacter pour vos projets, opportunités ou collaborations !
            </p>
          </motion.div>

          {/* Grille des contacts responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {contactItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className={`${item.bgColor} ${item.hoverColor} rounded-2xl p-4 sm:p-5 transition-all duration-300 group cursor-pointer border border-purple-500/20 dark:border-white/10 text-center relative overflow-hidden flex flex-col justify-between backdrop-blur-md shadow-md hover:shadow-xl`}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icône */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`${item.color} p-2.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mx-auto mb-2.5 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center group-hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-white/10`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>

                    {/* Label */}
                    <h3 className="text-slate-900 dark:text-slate-100 font-extrabold text-xs sm:text-sm mb-1">{item.label}</h3>

                    {/* Lien */}
                    <motion.a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.02 }}
                      className={`${item.color} hover:underline text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 mb-3 max-w-full px-1`}
                    >
                      <span className="truncate max-w-[170px]">{item.value}</span>
                      {item.external && <Send className="w-3 h-3 flex-shrink-0" />}
                    </motion.a>

                    {/* Bouton de copie pour téléphone et email */}
                    {item.copyText && (
                      <motion.button
                        onClick={() => copyToClipboard(item.copyText!, item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-1.5 px-3 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-gray-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 border border-gray-200/60 dark:border-white/10 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-semibold mt-1 shadow-sm cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copier
                      </motion.button>
                    )}

                    {/* Message de copie */}
                    {copiedText === item.label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] px-2.5 py-0.5 rounded-full shadow-lg font-extrabold"
                      >
                        Copié ! ✨
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to action */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-purple-500/10 dark:bg-purple-950/40 rounded-2xl border border-purple-500/20 dark:border-purple-800/30 backdrop-blur-md shadow-sm"
            >
              <p className="text-slate-900 dark:text-slate-200 text-xs sm:text-sm font-semibold">
                <strong className="text-purple-600 dark:text-purple-300">Prêt à collaborer ?</strong> Je suis immédiatement disponible pour échanger sur vos projets & opportunités !
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section 3D responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full lg:w-1/3 h-56 sm:h-64 lg:h-[460px] flex-shrink-0 relative rounded-3xl overflow-hidden border border-purple-500/30 dark:border-white/10 shadow-2xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent backdrop-blur-xl pointer-events-none lg:pointer-events-auto"
      >
        <div className="absolute inset-0">
          <Contact3DModel showContent={showContent} />
        </div>

        {/* Overlay décoratif */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-3 text-center border border-white/40 dark:border-white/10 shadow-xl"
          >
            <p className="text-xs text-purple-600 dark:text-purple-300 font-extrabold">✨ Gardons contact !</p>
            <p className="text-[11px] text-gray-600 dark:text-slate-300 font-medium mt-0.5">Disponible et réactif pour échanger sur vos projets.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactPage

