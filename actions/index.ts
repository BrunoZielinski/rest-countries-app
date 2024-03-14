'use server'

import { getPlaiceholder } from 'plaiceholder'

import { Country } from '@/types'

export const getCountries = async (): Promise<Country[] | null> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()

    const orderedData = data.sort((a: Country, b: Country) => {
      if (a.name.common < b.name.common) {
        return -1
      }
      if (a.name.common > b.name.common) {
        return 1
      }
      return 0
    })

    return orderedData
  } catch (error) {
    return null
  }
}

export const getCountry = async (id: string): Promise<Country | null> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
    const data = await response.json()

    return data[0]
  } catch (error) {
    return null
  }
}

export const getCountryImageBase64 = async (
  flags: string,
): Promise<string | null> => {
  try {
    const buffer = await fetch(flags).then(async res => {
      return Buffer.from(await res.arrayBuffer())
    })

    const { base64 } = await getPlaiceholder(buffer)

    return base64
  } catch (error) {
    return null
  }
}
