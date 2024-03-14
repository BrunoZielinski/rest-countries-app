import './globals.css'

import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { cn } from '@/lib/utils'
import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'
import { ThemeProvider } from '@/components/providers/theme-provider'

const nunitoSans = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'REST Countries App',
  description: 'REST Countries App',
  keywords: ['REST', 'Countries', 'App'],
  authors: [
    {
      name: 'Bruno Zielinski de Medeiros',
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    {
      url: '/favicon.png',
      sizes: '32x32',
      type: 'image/png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'overflow-x-hidden bg-veryLightGray dark:bg-veryDarkBlue min-h-screen flex flex-col size-full',
          nunitoSans.className,
        )}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <NextTopLoader />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
