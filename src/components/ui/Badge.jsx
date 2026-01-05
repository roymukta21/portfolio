import React from "react"
import { motion } from "framer-motion"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-gray-950 dark:text-gray-50 border-gray-200 dark:border-gray-800",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-orange-500 text-white hover:bg-orange-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, children, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Badge, badgeVariants }