import Link from 'next/link'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { Skeleton } from '@/components/ui/skeleton'

import { Country } from '@/types'

interface CountryItemProps {
  data: Country
}

export const CountryItem = async ({ data }: CountryItemProps) => {
  const buffer = await fetch(data.flags.png).then(async res => {
    return Buffer.from(await res.arrayBuffer())
  })

  const { base64 } = await getPlaiceholder(buffer)

  return (
    <Link
      title="View country details"
      href={`/country/${data.cca3}`}
      className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer transition-all transform hover:scale-105 dark:bg-darkBlue"
    >
      <Image
        width={300}
        height={200}
        draggable={false}
        placeholder="blur"
        blurDataURL={base64}
        src={data.flags.svg || data.flags.png}
        alt={data.flags.alt || data.name.common}
        aria-label={data.flags.alt || data.name.common}
        className="select-none pointer-events-none aspect-[4/2] object-cover w-full"
      />

      <div className="p-4">
        <h2 className="text-base font-extrabold">{data.name.common}</h2>

        <ul className="mt-4 text-sm space-y-1 leading-tight">
          <li>
            <strong className="font-extrabold">Population:</strong>{' '}
            {data.population.toLocaleString()}
          </li>
          <li>
            <strong className="font-extrabold">Region:</strong> {data.region}
          </li>
          <li>
            <strong className="font-extrabold">Capital:</strong> {data.capital}
          </li>
        </ul>
      </div>
    </Link>
  )
}

export const CountryItemSkeleton = () => {
  return (
    <Skeleton className="bg-gray-300 aspect-[4/2] w-full rounded-lg shadow-md transition-all transform hover:scale-105 dark:bg-darkBlue" />
  )
}
