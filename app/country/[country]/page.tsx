import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowLeft, MapIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getCountries, getCountry, getCountryImageBase64 } from '@/actions'

const Map = dynamic(() => import('./_components/map'), { ssr: false })

interface PageProps {
  params: {
    country: string
  }
}

export default async function Page({ params }: PageProps) {
  const [country, countries] = await Promise.all([
    getCountry(params.country),
    getCountries(),
  ])

  if (!country || !countries) {
    return <div>Country not found</div>
  }

  const countriesNames = countries.map(country => {
    return {
      code: country.cca3,
      name: country.name.common,
    }
  })

  const nativeName =
    Object.values(country.name.nativeName)[0]?.common || country.name.common

  const currencies = Object.values(country.currencies)[0]
  const borders = country?.borders?.map(border => {
    const country = countriesNames?.find(country => country.code === border)
    return {
      code: border,
      name: country?.name,
    }
  })

  const base64 = await getCountryImageBase64(country.flags.svg)

  return (
    <main className="flex-1 p-6 flex justify-center transition-colors">
      <div className="max-w-screen-2xl space-y-12">
        <Button
          asChild
          title="Back to home page"
          aria-label="Back to home page"
          className="shadow-lg dark:bg-darkBlue dark:text-white gap-2 px-8 hover:opacity-75 transition-all group bg-white text-black hover:bg-white"
        >
          <Link href="/">
            <ArrowLeft className="size-6 group-hover:animate-pulse" />
            Back
          </Link>
        </Button>

        <div className="flex gap-12 flex-col items-center xl:flex-row">
          <Image
            width={500}
            height={300}
            placeholder="blur"
            src={country.flags.svg}
            alt={country.flags.alt}
            className="drop-shadow-md select-none pointer-events-none aspect-[4/3] object-cover w-full max-w-[570px] rounded-md flex-1"
            blurDataURL={
              base64 ||
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABaElEQVRIie2VvUoDQRDGv'
            }
          />

          <div className="space-y-12 self-start xl:self-auto max-w-[32rem]">
            <h1 className="text-3xl font-extrabold">{country.name.common}</h1>

            <div className="leading-tight flex flex-col md:flex-row gap-8">
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Native Name:</span>{' '}
                  {nativeName}
                </li>

                <li>
                  <span className="font-semibold">Population:</span>{' '}
                  {country.population.toLocaleString()}
                </li>

                <li>
                  <span className="font-semibold">Region:</span>{' '}
                  {country.region}
                </li>

                <li>
                  <span className="font-semibold">Sub Region:</span>{' '}
                  {country.subregion}
                </li>

                <li>
                  <span className="font-semibold">Capital:</span>{' '}
                  {country.capital}
                </li>
              </ul>

              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Top Level Domain:</span>{' '}
                  {country.tld}
                </li>

                <li>
                  <span className="font-semibold">Currencies:</span>{' '}
                  {currencies.name} ({currencies.symbol})
                </li>

                <li>
                  <span className="font-semibold">Languages:</span>{' '}
                  {Object.values(country.languages).join(', ')}
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="leading-tight font-semibold">
                View on Google Maps to see the location of {country.name.common}{' '}
                in the world.
              </p>

              <a
                target="_blank"
                className="inline-block"
                href={country.maps.googleMaps}
                rel="noopener noreferrer nofollow external"
              >
                <Badge className="dark:bg-darkBlue dark:text-white rounded-sm shadow-md hover:opacity-75 transition-all bg-lightGray text-black hover:bg-lightGray gap-2 py-1.5">
                  <MapIcon className="size-5" />
                  Open Map
                </Badge>
              </a>
            </div>

            <div className="flex gap-2 flex-col md:flex-row">
              <p className="font-semibold dark:text-white text-nowrap">
                Border Countries:
              </p>

              <div className="flex flex-wrap gap-2">
                {borders?.map(border => (
                  <Link href={`/country/${border.code}`} key={border.code}>
                    <Badge className="dark:bg-darkBlue dark:text-white rounded-sm shadow-md hover:opacity-75 transition-all bg-lightGray text-black hover:bg-lightGray">
                      {border.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Map lat={country.latlng[0]} lng={country.latlng[1]} />
      </div>
    </main>
  )
}
