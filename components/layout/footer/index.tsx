import Container from '@/components/container'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
        <Container>
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PillScript Pharmacy. All rights
            reserved.
          </p>
        </Container>
      </footer>
  )
}

export default Footer