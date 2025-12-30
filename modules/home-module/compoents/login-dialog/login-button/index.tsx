"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import PasswordInputField from "@/components/password-field"
import { motion, AnimatePresence } from "framer-motion"

const LoginDialogContent = () => {
  const [showEmailForm, setShowEmailForm] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto text-black">
         <AnimatePresence mode="wait">
             {!showEmailForm ? (
       
        <>
        <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
             <div className="space-y-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full flex items-center gap-2"
              onClick={() => setShowEmailForm(true)}
            >
              <Image src="/assets/svg/email.svg" alt="Email" width={20} height={20} />
              Login with Email
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full flex items-center gap-2"
            >
              <Image src="/assets/svg/google.svg" alt="Google" width={20} height={20} />
              Login with Google
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full flex items-center gap-2"
            >
              <Image src="/assets/svg/apple.svg" alt="Apple" width={20} height={20} />
              Login with Apple
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don&apos;t have an account?{" "}
            <span className="underline cursor-pointer">Sign up</span>
          </p>
          </motion.div>
         
        </>
      ) : (
       
        <>
        {/* email form show */}
         <motion.div
            key="emailForm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4 mt-3">
            <div className="flex flex-col gap-2">
              <Label className="">Email</Label>
              <Input type="email" placeholder="you@example.com" name="email" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
             <PasswordInputField />
            </div>

            <Button className="w-full rounded-full">
              Continue
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setShowEmailForm(false)}
            >
              ← Back
            </Button>
          </div>
          </motion.div>
          
        </>
      )}
         </AnimatePresence>
     
    </div>
  )
}

export default LoginDialogContent
