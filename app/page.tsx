"use client";

import { useState, useEffect } from "react";
import { Clock, Zap, Gamepad2, Headset, Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useMetaTracking } from "./hooks/useMetaTracking";

// Custom WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Home() {
  const { trackLead } = useMetaTracking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppClick = (source: 'main_button' | 'secondary_button') => {
    trackLead(source);
  };

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Background image covering full screen */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: 'url(/joker-background-3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Very subtle dark overlay for better text readability */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)'
        }}
      />

      {/* Animated gradient overlays for dynamic effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-[5]">
        {/* Pulsing pink glow from center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.2) 30%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Purple accent - top right */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(126, 34, 206, 0.2) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Magenta accent - bottom left */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.35) 0%, rgba(190, 24, 93, 0.2) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Violet accent - middle right */}
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-600/15 rounded-full blur-[90px] animate-float-slow"></div>

        {/* Falling poker cards and money effect - only on sides, disappear at 50% */}
        {mounted && [
          { icon: '🂡', delay: 0, x: '5%', duration: 12 },
          { icon: '💵', delay: 2, x: '12%', duration: 14 },
          { icon: '🃁', delay: 4, x: '20%', duration: 13 },
          { icon: '💴', delay: 1, x: '8%', duration: 15 },
          { icon: '🂮', delay: 5, x: '15%', duration: 12 },
          { icon: '💶', delay: 3, x: '18%', duration: 14 },
          // Right side
          { icon: '🃎', delay: 6, x: '82%', duration: 13 },
          { icon: '💷', delay: 7, x: '88%', duration: 15 },
          { icon: '🂾', delay: 8, x: '85%', duration: 13 },
          { icon: '💵', delay: 3.5, x: '92%', duration: 14 },
          { icon: '🃑', delay: 5.5, x: '80%', duration: 12 },
          { icon: '💵', delay: 1.5, x: '95%', duration: 16 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: item.x,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '55vh'],
              rotate: [0, 180],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.15, 0.75, 1],
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Container - MOBILE FIRST: Single Column */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-screen">

        {/* MOBILE: Logo top, horizontal layout, buttons bottom */}
        <div className="flex flex-col items-center justify-start pt-0 pb-6 px-4 lg:hidden relative gap-6">

          {/* Top section: Logo + Feature Boxes */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Logo CASINO ZEUS */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center relative w-full px-4 -mt-12"
            >
              <img
                src="/logo-oropuro.png"
                alt="Oropuro Casino"
                className="w-full h-auto max-w-lg mx-auto relative z-10"
                style={{maxHeight: '250px', objectFit: 'contain'}}
              />
            </motion.div>

            {/* 3 Feature Boxes - Triangle Layout (2 top, 1 bottom) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col gap-2 items-center -mt-16 lg:mt-0"
            >
              {/* Top row - 2 cards */}
              <div className="flex gap-3">
                {/* Card 1 - Retiros */}
                <div className="relative">
                  <div className="relative rounded-xl p-1">
                    <img src="/retiros-blueglow.png" alt="Retiros 24hs" style={{width: '130px', height: 'auto'}} className="object-contain" />
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                    <motion.rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="12"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      strokeDasharray="400"
                      animate={{
                        strokeDashoffset: [0, -400]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.9)" />
                        <stop offset="50%" stopColor="rgba(251, 113, 133, 0.9)" />
                        <stop offset="100%" stopColor="rgba(56, 189, 248, 0.9)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Card 2 - Pagos */}
                <div className="relative">
                  <div className="relative rounded-xl p-1">
                    <img src="/pagos-blueglow.png" alt="Pagos Instantáneos" style={{width: '130px', height: 'auto'}} className="object-contain" />
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                    <motion.rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="12"
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                      strokeDasharray="400"
                      animate={{
                        strokeDashoffset: [0, 400]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(251, 113, 133, 0.9)" />
                        <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
                        <stop offset="100%" stopColor="rgba(251, 113, 133, 0.9)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Bottom row - 1 card centered */}
              {/* Card 3 - Soporte */}
              <div className="relative">
                <div className="relative rounded-xl p-1">
                  <img src="/soporte-blueglow.png" alt="Soporte 24/7" style={{width: '130px', height: 'auto'}} className="object-contain" />
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="12"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(56, 189, 248, 0.9)" />
                      <stop offset="50%" stopColor="rgba(251, 113, 133, 0.9)" />
                      <stop offset="100%" stopColor="rgba(56, 189, 248, 0.9)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Spacer to maintain layout and center the background Joker */}
          <div className="w-full max-w-[550px] flex-shrink-0 my-36"></div>

          {/* Bottom Section: Buttons - SMALLER */}
          <div className="w-full max-w-sm px-4">
            <div className="flex flex-col gap-3">
              <motion.a
                href="https://api.whatsapp.com/send?phone=541128872681&text=Hola%20quiero%20mi%20usuario%20de%20Bet30"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('main_button')}
                className="relative overflow-hidden text-white font-black text-base px-6 py-3 rounded-xl flex items-center justify-center gap-2 border-3"
                style={{
                  background: 'linear-gradient(90deg, #fb7185 0%, #f43f5e 50%, #fb7185 100%)',
                  borderColor: 'rgba(0, 0, 0, 0.4)',
                  borderWidth: '3px',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                animate={{
                  y: [0, -8, 0],
                  boxShadow: [
                    "0 0 30px rgba(251, 113, 133, 0.8)",
                    "0 0 50px rgba(251, 113, 133, 1)",
                    "0 0 30px rgba(251, 113, 133, 0.8)"
                  ],
                  background: [
                    'linear-gradient(90deg, #fb7185 0%, #f43f5e 50%, #fb7185 100%)',
                    'linear-gradient(90deg, #f43f5e 0%, #fb7185 50%, #f43f5e 100%)',
                    'linear-gradient(90deg, #fb7185 0%, #f43f5e 50%, #fb7185 100%)',
                  ]
                }}
                transition={{
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  background: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Left Spade Icon - Rotating counterclockwise */}
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-2xl"
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  ♠
                </motion.div>

                {/* Right Spade Icon - Rotating clockwise */}
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-2xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }}
                >
                  ♠
                </motion.div>

                <span className="uppercase tracking-wider drop-shadow-lg z-10 relative">Pedinos tu usuario!</span>

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>

              <motion.a
                href="https://api.whatsapp.com/send?phone=541128872681&text=Hola%20quiero%20información%20sobre%20Bet30"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('secondary_button')}
                className="bg-green-700 active:bg-green-800 border-2 border-green-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 w-4/5 mx-auto"
                whileTap={{ scale: 0.95 }}
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Escribinos, en línea 24Hs</span>
              </motion.a>

              {/* Trust indicators */}
              <div className="flex flex-col gap-2 mt-3 bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-white">+10.000 usuarios activos</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">+18</span>
                  <span className="text-sm font-semibold text-white">Juego Responsable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: Two columns layout - Logo on top, cards left, Zeus + buttons right */}
        <div className="hidden lg:flex flex-1 flex-col relative min-h-screen">

          {/* Logo CASINO ZEUS - Full width on top */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center relative w-full pt-2 pb-2 px-8"
          >
            <img
              src="/logo-oropuro.png"
              alt="Oropuro Casino"
              className="w-full h-auto mx-auto relative z-10"
              style={{maxHeight: '364px', objectFit: 'contain'}}
            />
          </motion.div>

          {/* Three column layout - Cards Left, Zeus Center, Buttons Right */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-24 flex-1 items-center px-16 pb-8 w-full mx-auto">

            {/* Left Column: 4 Feature Cards - Vertical Stack */}
            <motion.aside
              initial="hidden"
              animate="visible"
              variants={slideFromLeft}
              className="flex flex-col items-end justify-center gap-6"
            >
              <motion.div
                variants={fadeIn}
                className="flex flex-col gap-6"
              >
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src="/retiros-blueglow.png" alt="Retiros 24hs" style={{width: '280px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <img src="/pagos-blueglow.png" alt="Pagos Instantáneos" style={{width: '280px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <img src="/juegos-blueglow.png" alt="+5000 Juegos" style={{width: '280px', height: 'auto'}} className="object-contain" />
                </motion.div>
                <motion.div
                  className="relative"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                      'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 14px rgba(56, 189, 248, 0.4))',
                      'drop-shadow(0 0 8px rgba(251, 113, 133, 0.7)) drop-shadow(0 0 14px rgba(251, 113, 133, 0.4))',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <img src="/soporte-blueglow.png" alt="Soporte 24/7" style={{width: '280px', height: 'auto'}} className="object-contain" />
                </motion.div>
              </motion.div>
            </motion.aside>

            {/* Center Column: Spacer to center background Joker */}
            <div className="flex items-center justify-center">
              <div className="w-[600px] h-[800px]"></div>
            </div>

            {/* Right Column: CTA Buttons + Trust Badges */}
            <motion.aside
              initial="hidden"
              animate="visible"
              variants={slideFromRight}
              className="flex flex-col items-start justify-center gap-6"
            >
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 w-full">
                <motion.a
                  href="https://api.whatsapp.com/send?phone=541128872681&text=Hola%20quiero%20mi%20usuario%20de%20Bet30"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick('main_button')}
                  className="relative overflow-hidden bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-300 hover:to-rose-400 text-white font-black text-xl px-10 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    borderColor: 'rgba(0, 0, 0, 0.4)',
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3), 0 12px 32px rgba(0, 0, 0, 0.4)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  {/* Left Spade Icon - Rotating counterclockwise */}
                  <motion.div
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-3xl"
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    ♠
                  </motion.div>

                  <span className="uppercase tracking-wider drop-shadow-lg z-10 relative px-12">Pedinos tu usuario!</span>

                  {/* Right Spade Icon - Rotating clockwise */}
                  <motion.div
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-3xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    }}
                  >
                    ♠
                  </motion.div>

                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.a>

                <motion.a
                  href="https://api.whatsapp.com/send?phone=541128872681&text=Hola%20quiero%20información%20sobre%20Bet30"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick('secondary_button')}
                  className="bg-green-700 hover:bg-green-800 border-2 border-green-600 text-white font-semibold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-3 w-5/6 mx-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                  <span>Escribinos, en línea 24Hs</span>
                </motion.a>

                {/* Trust indicators */}
                <div className="flex flex-col gap-3 mt-3 bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-start gap-2">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base font-semibold text-white">+10.000 usuarios activos</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-xl font-semibold text-white">+18</span>
                    <span className="text-base font-semibold text-white">Juego Responsable</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900/30 py-6 bg-black/40">
        <div className="flex flex-col items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-300 text-sm">
            © 2025 Bet30.blog - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
