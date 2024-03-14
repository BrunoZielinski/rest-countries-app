import Link from 'next/link'
import Image from 'next/image'

import { Country } from '@/types'

interface CountryItemProps {
  data: Country
}

export const CountryItem = ({ data }: CountryItemProps) => {
  return (
    <Link
      href={`/country/${data.cca3}`}
      className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out dark:bg-darkBlue"
    >
      <Image
        priority
        width={300}
        height={200}
        draggable={false}
        src={data.flags.svg}
        alt={data.flags.alt}
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
