'use client'

import { cn } from '@/lib/utils'
import { ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export const ButtonToTop = () => {
  const [isShow, setIsShow] = useState(false)

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={toTop}
      className={cn(
        'fixed bottom-4 right-4 z-50 bg-white dark:bg-darkBlue shadow-md p-2 rounded-full opacity-0 transition-all duration-300 scale-0 transform hover:scale-110 hover:opacity-100',
        isShow && 'opacity-100 scale-100',
      )}
    >
      <ChevronUp className="size-6" />
    </button>
  )
}
