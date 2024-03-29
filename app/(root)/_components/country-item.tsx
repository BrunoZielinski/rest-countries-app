import Link from 'next/link'
import Image from 'next/image'

import { Country } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

interface CountryItemProps {
  data: Country
}

export const CountryItem = ({ data }: CountryItemProps) => {
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
        src={data.flags.svg || data.flags.png}
        alt={data.flags.alt || data.name.common}
        aria-label={data.flags.alt || data.name.common}
        className="select-none pointer-events-none aspect-[4/2] object-cover w-full"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABaElEQVRIie2VvUoDQRDGv"
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
