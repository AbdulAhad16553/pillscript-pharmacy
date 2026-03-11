import { Button } from '@/components/ui/button'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInputField from '@/components/password-field'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
const LoginForm = ({setMode}:any) => {
    
  return (
    <form>
        <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold mt-5 sm:mt-0 ">
                Log in to your account
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                You'll get a digital partner for a pharma representative
              </DialogDescription>
            </DialogHeader>
            <DialogDescription className='p-4 md:p-0'>
              <div className="space-y-4 mt-4">
                  <div className="flex flex-col gap-4">
                    <Label>Email</Label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <Label>Password</Label>
                    <PasswordInputField />
                  </div>

                  <div className="text-right">
                    <Button
                    type="button"
                    variant={'ghost'}
                      onClick={() => setMode("forgot")}
                      className="text-sm underline text-muted-foreground hover:text-black"
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <Button className="w-full rounded-full" type="submit">
                    Log in
                  </Button>
                </div>
            </DialogDescription>
                
              </form>
  )
}

export default LoginForm