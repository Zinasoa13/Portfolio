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
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const contactItems = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "0388246668",
      href: "tel:0388246668",
      color: "text-green-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      copyText: "0388246668",
    },
    {
      icon: Mail,
      label: "Email",
      value: "fideranaandria13@gmail.com",
      href: "mailto:fideranaandria13@gmail.com",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      copyText: "fideranaandria13@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Mon profil LinkedIn",
      href: "https://www.linkedin.com/in/andria-fiderana-13b40a321/",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      external: true,
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Mon profil Facebook",
      href: "https://www.facebook.com/zinasoa.fiderana",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      external: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message WhatsApp",
      href: "https://wa.me/0388246668",
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      external: true,
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Ambanidia, Madagascar",
      href: "https://www.google.com/maps/place/Ambanidia",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
  ]

  return (
    <div className="w-full h-full flex">
      {/* Section principale des contacts - 70% de l'écran */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 pr-4">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          className="text-4xl font-bold text-purple-400 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer mb-8"
        >
          Contactez-moi
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          className="bg-white shadow-lg rounded-xl p-6 max-w-3xl w-full border border-gray-100"
        >
          {/* Message d'introduction */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <p className="text-gray-600 text-base">N'hésitez pas à me contacter pour vos projets ou collaborations !</p>
          </motion.div>

          {/* Grille des contacts - 2 rangées de 3 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {contactItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`${item.bgColor} ${item.hoverColor} rounded-lg p-4 transition-all duration-300 group cursor-pointer border border-gray-100 text-center relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    {/* Icône */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`${item.color} p-2 bg-white rounded-full shadow-md mx-auto mb-2 w-10 h-10 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.div>

                    {/* Label */}
                    <h3 className="text-gray-800 font-semibold text-sm mb-1">{item.label}</h3>

                    {/* Lien */}
                    <motion.a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.02 }}
                      className={`${item.color} hover:underline text-xs font-medium flex items-center justify-center gap-1 mb-2`}
                    >
                      <span className="truncate">{item.value}</span>
                      {item.external && <Send className="w-3 h-3 flex-shrink-0" />}
                    </motion.a>

                    {/* Bouton de copie pour téléphone et email */}
                    {item.copyText && (
                      <motion.button
                        onClick={() => copyToClipboard(item.copyText!, item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-1 px-2 bg-white/60 hover:bg-white/90 rounded text-gray-600 hover:text-purple-600 transition-all duration-200 flex items-center justify-center gap-1 text-xs font-medium"
                      >
                        <Copy className="w-3 h-3" />
                        Copier
                      </motion.button>
                    )}

                    {/* Message de copie */}
                    {copiedText === item.label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        ✓
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
              className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
            >
              <p className="text-gray-700 text-sm">
                <strong>Prêt à collaborer ?</strong> Je réponds généralement dans les 24h !
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section 3D - 30% de l'écran */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-80 h-full flex-shrink-0 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-l-3xl backdrop-blur-sm">
          <Contact3DModel showContent={showContent} />
        </div>

        {/* Overlay décoratif */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white/80 backdrop-blur-md rounded-xl p-3 text-center border border-white/20"
          >
            <p className="text-xs text-gray-600 font-medium">✨ Gardons contact...</p>
            <p className="text-xs text-gray-500">Je suis dispo quand vous voulez et où vous voulez !</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactPage
