import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from 'react'

const ForgotPassword = ({setMode}:any) => {
  return (
    <form>
     <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold mt-5 sm:mt-0">
                Reset your password
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                Enter your email and we’ll send you a reset link
              </DialogDescription>
            </DialogHeader>
 <DialogDescription className='p-4 md:p-0'>
   <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>

              <Button className="w-full rounded-full">Send reset link</Button>

              {/* <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setMode("login")}
              >
                ← Back to login
              </Button> */}
            </div>
 </DialogDescription>
           
            </form>

  )
}

export default ForgotPassword