'use client'
import React, { useEffect, useState } from "react"

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // simulate loading for 1s

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex justify-start items-center h-screen overflow-y-hidden'>
      <div className='xs:hidden w-[75%] flex-0'>
        <img src="/img1.jpg" alt="Background" className="h-full w-full object-cover" />
      </div>
      <div className='w-fit m-10 flex-1 flex flex-col justify-center items-center'>
        {isLoading ? (
          <div className="flex items-center justify-center p-10">
            <div className="w-10 h-10 border-4 border-neutral-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default ClerkLayout
