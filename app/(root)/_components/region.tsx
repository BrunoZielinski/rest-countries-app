'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

interface RegionProps {
  data: string[]
}

export const Region = ({ data }: RegionProps) => {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const onChange = (term: string) => {
    if (term === 'All') term = ''

    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('region', term.trim())
    } else {
      params.delete('region')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select
      onValueChange={onChange}
      value={searchParams.get('region') || 'All'}
    >
      <SelectTrigger
        title="Filter by region"
        className="sm:w-[180px] dark:bg-darkBlue shadow-md transition-colors"
      >
        <SelectValue placeholder="Filter by region" />
      </SelectTrigger>

      <SelectContent className="dark:bg-darkBlue">
        <SelectItem title="All regions" value="All">
          All
        </SelectItem>
        {data.map((region, index) => {
          return (
            <SelectItem
              key={index}
              value={region}
              title={`Filter by ${region}`}
            >
              {region}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
