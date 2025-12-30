import React from 'react'

const Container = ({children , className}:any) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
    </div>
  )
}

export default Container