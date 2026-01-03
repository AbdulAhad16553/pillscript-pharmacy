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
          className="bg-black text-white  rounded-full hover:bg-black/80 hover:text-white border transition-all"
        >
          <div className="flex items-center justify-center">
           Log in
          </div>
          
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-93.25 sm:max-w-97"
       onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        
        <LoginButton />

     

      </DialogContent>
      
    </Dialog>
  );
};

export default LoginDialog;
