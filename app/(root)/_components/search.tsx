'use client'

import { SearchIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'

export const Search = () => {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term.trim())
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="md:max-w-sm relative flex-1">
      <Input
        autoFocus
        type="search"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        placeholder="Search for a country..."
        onChange={e => handleSearch(e.target.value)}
        className="dark:bg-darkBlue shadow-md pl-12"
        defaultValue={searchParams.get('search')?.toString()}
      />

      <SearchIcon className="absolute top-1/2 left-4 transform -translate-y-1/2 size-4 text-gray-500 dark:text-white select-none pointer-events-none" />
    </div>
  )
}
