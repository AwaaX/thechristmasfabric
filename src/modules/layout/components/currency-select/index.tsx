"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Region } from "@medusajs/medusa"
import { Fragment, useEffect, useMemo, useState } from "react"
import getSymbolFromCurrency from "currency-symbol-map"

import { StateType } from "@lib/hooks/use-toggle-state"
import { getProductByHandle2, getProductById2 } from "app/actions"
import { useParams } from "next/navigation"
import { IoIosArrowDown } from "react-icons/io"
import { usePathname, useRouter } from "i18n/routing"
import { updateRegion } from "@lib/data"

type CurrencyType = {
  code: string
  name: string
  symbol: string
  symbol_native: string
}

type LocaleMetadata = { [key: string]: string }

type CurrencyOption = {
  countries: string[]
  region: string
  currency: string
  locale: LocaleMetadata
}

type CurrencySelectProps = {
  toggleState: StateType
  regions: Region[]
  product: any
}

const CurrencySelect = ({
  toggleState,
  regions,
  product,
}: CurrencySelectProps) => {
  const router = useRouter()
  const [current, setCurrent] = useState<CurrencyOption | undefined>(undefined)
  const [productData, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const {
    locale,
    handle: productHandle,
    category,
    pid,
  } = useParams() as {
    locale: string
    category: string
    handle: string
    pid: string
  }
  const [language, countryCode] = locale.split("-")
  const currentPath = usePathname()

  const { state, close } = toggleState

  // Map to link locales to the metadata keys in product
  const localeMap: { [key: string]: string } = {
    "es-ES": "es",
    "de-DE": "de",
    "it-IT": "it",
    "nl-NL": "nl",
    "sv-SE": "sv",
    "en-US": "en-US",
    "en-CA": "en-CA",
    "en-AU": "en-AU",
    "en-IE": "en-IE",
    "en-GB": "en-GB",
  }

  const options: CurrencyOption[] | undefined = useMemo(() => {
    return regions?.map((r) => {
      const countries: string[] = r.countries.map((c) => c.iso_2)
      return {
        countries: countries,
        region: r.id,
        currency: r.currency_code,
        locale: r.metadata as LocaleMetadata,
      }
    })
    //   .flat()
  }, [regions])

  // console.log("options",options)
  useEffect(() => {
    if (countryCode) {
      let currentCountryCode: string = Array.isArray(countryCode)
        ? countryCode[0]
        : (countryCode as string)
      const option = options?.find((o) =>
        o.countries.includes(currentCountryCode)
      )
      // console.log("Current option Retrieved",option)
      setCurrent(option)
    }
  }, [options, countryCode])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch the product by handle
  //       const productInfo = await getProductById2(pid)
  //       setProduct(productInfo)
  //     } catch (error) {
  //       console.error("Error fetching product data:", error)
  //     } finally {
  //       setLoading(false) // Optional: set loading to false when the fetch is complete
  //     }
  //   }
  //   fetchData() // Call the async function when the component mounts or productHandle/locale change
  // }, [pid, locale])

  const handleChange = async (option: CurrencyOption) => {
    await updateRegion(option.countries[0],'/test')

    router.push(
      {
        pathname: currentPath as any,
        params: {
          category: category,
          handle:
            productData?.metadata?.[
              `${
                localeMap[
                  `${option.locale[`locale_${option.countries[0]}`]}-${
                    option.countries[0]
                  }`
                ]
              }_handle`
            ] || productData?.handle,
          pid: pid,
        },
      },
      {
        locale: `${option.locale[`locale_${option.countries[0]}`]}-${
          option.countries[0]
        }`,
      }
    )

    close()
  }

  return (
    <div className="relative">
      {current && (
        <Listbox
          as="span"
          onChange={handleChange}
          defaultValue={
            countryCode
              ? options?.find((o) => {
                  let currentCountryCode = Array.isArray(countryCode)
                    ? countryCode[0]
                    : (countryCode as string)
                  return o.countries.includes(currentCountryCode)
                })
              : undefined
          }
        >
          <Listbox.Button className="py-1">
            {current && (
              <span className=" flex items-center gap-x-2 hover:text-hoverGray group duration-300 ease-in-out uppercase">
                {/* {current.currency.symbol} */}
                {current?.currency}
                {/* <span>({current?.currency?.symbol})</span> */}
                <IoIosArrowDown className="group-hover:text-hoverGray " />
              </span>
            )}
          </Listbox.Button>
          <div className="flex absolute right-0 w-full min-w-[180px]">
            <Transition
              show={state}
              as={Fragment}
              enter="transition ease-in duration-150"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <Listbox.Options
                className="absolute -top-[calc(100%-8px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
                static
              >
                {options?.map((o, index) => {
                  return (
                    <Listbox.Option
                      key={index}
                      value={o}
                      className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2 uppercase"
                    >
                      {o?.currency}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  )
}

export default CurrencySelect
