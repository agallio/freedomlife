import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.61, 1, 0.88, 1],
    },
  },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div initial="initial" animate="enter" variants={variants}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
