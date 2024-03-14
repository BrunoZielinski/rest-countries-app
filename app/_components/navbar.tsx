import Link from 'next/link'

import { ThemeSwitcher } from './theme-switcher'

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-white shadow-md flex justify-between items-center p-4 md:p-6 dark:bg-darkBlue">
      <Link
        href="/"
        className="text-lg md:text-2xl font-extrabold cursor-pointer hover:opacity-75"
      >
        Where in the world?
      </Link>

      <ThemeSwitcher />
    </header>
  )
}
