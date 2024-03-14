'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Tabs defaultValue={theme}>
      <TabsList
        title="Theme switcher"
        aria-label="Theme switcher"
        className="border h-auto w-auto p-0.5"
      >
        <TabsTrigger
          value="light"
          title="Light theme"
          aria-label="Light theme"
          onClick={() => setTheme('light')}
        >
          <SunIcon className="size-3 sm:size-[1.2rem]" />
          <span className="sr-only">Light theme</span>
        </TabsTrigger>

        <TabsTrigger
          value="dark"
          title="Dark theme"
          aria-label="Dark theme"
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className="size-3 sm:size-[1.2rem] rotate-90 transition-all dark:rotate-0" />
          <span className="sr-only">Dark theme</span>
        </TabsTrigger>

        <TabsTrigger
          value="system"
          title="System theme"
          aria-label="System theme"
          onClick={() => setTheme('system')}
        >
          <DesktopIcon className="size-3 sm:size-[1.2rem]" />
          <span className="sr-only">System theme</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
