"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import ForgotPassword from "@/components/auth/forgot-password"

const variants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const LoginDialogContent = () => {
  const [mode, setMode] = useState<"login" | "forgot">("login")

  return (
    <div className="w-full max-w-md mx-auto text-black">
      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div
            key="login"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LoginForm setMode={setMode} />
          </motion.div>
        ) : (
          <motion.div
            key="forgot"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ForgotPassword setMode={setMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoginDialogContent
