import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import LoginButton from "./login-button";

const LoginDialog = () => {
    const [open, setOpen] = useState(false)
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-black text-white px-5 rounded-full hover:bg-white hover:text-black border transition-all"
        >
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-93.25 sm:max-w-97"
       onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            You’ll get smarter responses and can upload files, images, and more.
          </DialogDescription>
        </DialogHeader>
        <LoginButton />

     

      </DialogContent>
      
    </Dialog>
  );
};

export default LoginDialog;
