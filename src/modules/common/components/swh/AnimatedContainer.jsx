import React from 'react'
import { AnimatePresence, motion } from "framer-motion";


const AnimatedContainer = ({
    children,
    trigger,
    animation={},
    className='',
    ...props
}) => {
  return (
    <AnimatePresence>
    {trigger &&
      <motion.div
        {...animation}
        className={`${className}`}
       {...props}
      >
          {children}
      </motion.div>
      }

      </AnimatePresence>
  )
}

export default AnimatedContainer