import DistributorsList from '@/modules/auth/distributors'
import React, { Suspense } from 'react'

const Distributors = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <DistributorsList />
    </Suspense>
  )
}

export default Distributors