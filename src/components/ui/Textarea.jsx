import React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <motion.textarea
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all duration-300 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus-visible:ring-yellow-400 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }