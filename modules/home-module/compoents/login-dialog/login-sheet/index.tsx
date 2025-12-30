import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import LoginButton from '../login-button'


const LoginSheet = () => {
  return (
   <Sheet>
  <SheetTrigger asChild>
   <Button
             size="sm"
             className="bg-black text-white px-5 rounded-full hover:bg-white hover:text-black border transition-all"
           >
             Login
           </Button>
  </SheetTrigger>

  <SheetContent side="bottom" className="rounded-t-2xl">
    <SheetHeader>
      <SheetTitle className="text-center text-xl font-semibold "> Sign in to your account</SheetTitle>
      <SheetDescription className="text-center text-sm"> You’ll get smarter responses and can upload files, images, and more.</SheetDescription>
    </SheetHeader>

 <LoginButton />
  </SheetContent>
</Sheet>

  )
}

export default LoginSheet