import Image from 'next/image'
import React from 'react'

const MainLogo = () => {
  return (
    <Image 
    src={"/assets/images/logo.png"}
    alt=""
    width={50}
    height={50}
    className='object-contain w-full h-auto'
    />
  )
}

export default MainLogo