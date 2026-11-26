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
      color: "hover:bg-foreground hover:text-background",
      bgColor: "bg-foreground text-background",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white",
      bgColor: "bg-[#0A66C2] text-white",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white",
      bgColor: "bg-[#1877F2] text-white",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:text-white",
      bgColor: "bg-[#25D366] text-white",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
    >
      {/* Label vertical (caché sur mobile car trop petit) */}
      <div className="hidden md:flex flex-col items-center gap-2 mb-2 relative">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground rotate-180 relative z-10" style={{ writingMode: 'vertical-rl' }}>
        </span>
      </div>

      {/* Les boutons (plus petits sur mobile) */}
      <div className="flex flex-col gap-2 md:gap-3">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.15, x: -5, transition: { type: "spring", stiffness: 400 } }}
            whileTap={{ scale: 0.95 }}
            className={`group flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-lg transition-colors duration-300 ${link.color}`}
            title={`Partager sur ${link.name}`}
          >
            <link.icon className="h-4 w-4 md:h-5 md:w-5" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}