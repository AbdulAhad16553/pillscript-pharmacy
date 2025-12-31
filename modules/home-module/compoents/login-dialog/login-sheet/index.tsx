"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
 
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import LoginButton from "../login-button"
import { motion } from "framer-motion"

const LoginSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-black text-white px-5 rounded-full hover:bg-white hover:text-black border transition-all">
          Login
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-0 h-[90vh] sm:h-[70vh] max-h-full"
       
      >

       <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          dragSnapToOrigin={true}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col h-full bg-white shadow-lg overflow-hidden"
        >
         

          
            <LoginButton />
          
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

export default LoginSheet
