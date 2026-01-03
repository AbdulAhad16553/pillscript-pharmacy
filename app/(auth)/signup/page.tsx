import SignupForm from '@/modules/auth/sign-up'
import React, { Suspense } from 'react'

const SignupPage = () => {
  return (
    <Suspense fallback={"loding..."}>
      <SignupForm />
    </Suspense>
  )
}

export default SignupPage