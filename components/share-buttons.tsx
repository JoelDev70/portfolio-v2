"use client";

import { Share2 } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      hoverColor: "hover:bg-foreground hover:text-background",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      hoverColor: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      hoverColor: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      hoverColor: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    },
  ];

  // Configuration de l'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Décalage entre chaque icône
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-4 lg:left-25 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
    >
      
      {/* Label vertical */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center gap-2 mb-2 relative"
      >
        {/* Lueur qui pulse derrière le label */}
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
        
        <Share2 className="h-4 w-4 text-accent relative z-10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground rotate-180 relative z-10" style={{ writingMode: 'vertical-rl' }}>
          Partager
        </span>
      </motion.div>

      {/* Les liens sociaux */}
      <div className="flex flex-col gap-3">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.15, 
              x: 5, // Décalage vers la droite
              transition: { type: "spring", stiffness: 400 } 
            }}
            whileTap={{ scale: 0.95 }}
            className={`group flex items-center justify-center w-11 h-11 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-lg transition-colors duration-300 ${link.hoverColor}`}
            title={`Partager sur ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}