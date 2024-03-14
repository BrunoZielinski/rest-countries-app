import { getCountries } from '@/actions'
import { Search } from './_components/search'
import { Region } from './_components/region'
import { CountryItem } from './_components/country-item'
import { ButtonToTop } from './_components/button-to-top'

interface PageProps {
  searchParams: {
    search?: string
    region?: string
  }
}

export default async function Page({
  searchParams: { search, region },
}: PageProps) {
  const countries = await getCountries()

  if (!countries) {
    return <main>Failed to load</main>
  }

  const regions = new Set(countries.map(country => country.region))
  const regionsArray = Array.from(regions).sort()

  let filteredCountries = countries

  if (region || search) {
    filteredCountries = countries.filter(country => {
      if (region && country.region !== region) return false
      if (
        search &&
        !country.name.common.toLowerCase().includes(search.toLowerCase())
      )
        return false
      return true
    })
  }

  return (
    <main className="p-6 space-y-6 flex-1">
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <Search />
        <Region data={regionsArray} />
      </div>

      <div className="flex justify-center">
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-2xl">
          {filteredCountries.map(country => (
            <CountryItem data={country} key={country.cca3} />
          ))}

          {filteredCountries.length === 0 && (
            <p className="col-span-full text-center">No countries found</p>
          )}
        </section>
      </div>

      <ButtonToTop />
    </main>
  )
}
