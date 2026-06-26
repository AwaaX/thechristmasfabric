"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { StateType } from "@lib/hooks/use-toggle-state"
import { usePageLoader } from "@modules/common/components/swh/providers"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { getLocalizedProductHandle } from "@lib/data/products"
import { getLocalizedCategoryHandle } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import { IoIosArrowDown } from "react-icons/io"
import { localeByCountryCode } from "@lib/util/locale"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const { startPageLoader } = usePageLoader()

  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const localizedCategoryPrefixes = [
    "christmas-pyjamas",
    "pijamas-de-navidad",
    "weihnachtspyjamas",
    "pigiama-di-natale",
    "kerst-pyjama's",
    "julpyjamas",
  ]

  const handleChange = async (option: CountryOption) => {
    startPageLoader()

    const pathSegments = currentPath.split("/").filter(Boolean)
    let nextPath = currentPath
    const locale = localeByCountryCode[option.country]

    if (pathSegments[0] === "products" && pathSegments[1]) {
      const localizedHandle = await getLocalizedProductHandle({
        currentHandle: pathSegments[1],
        sourceCountryCode: countryCode as string,
        targetCountryCode: option.country,
        locale,
      })
      nextPath = localizedHandle
        ? `/products/${localizedHandle}`
        : `/christmas-pyjamas`
    } else if (
      localizedCategoryPrefixes.includes(pathSegments[0] ?? "") &&
      pathSegments[1]
    ) {
      const localizedHandle = locale
        ? await getLocalizedCategoryHandle({
            currentHandle: pathSegments[1],
            locale,
            targetCountryCode: option.country,
          })
        : null

      nextPath =
        localizedHandle != null
          ? `/christmas-pyjamas/${localizedHandle}`
          : `/christmas-pyjamas`
    } else if (localizedCategoryPrefixes.includes(pathSegments[0] ?? "")) {
      nextPath = "/christmas-pyjamas"
    }

    await updateRegion(option.country, nextPath)
    close()
  }

  return (
    <div className="relative">
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o?.country === countryCode)
            : undefined
        }
      >
        <ListboxButton className="py-1 ">
          {current && (
            <span className="txt-compact-small flex items-center gap-x-2">
              {/* @ts-ignore */}
              <ReactCountryFlag
                svg
                style={{
                  width: "16px",
                  height: "16px",
                }}
                countryCode={current.country ?? ""}
                alt={current.country}
              />
              {current.label}
              <IoIosArrowDown className="group-hover:text-hoverGray " />
            </span>
          )}
        </ListboxButton>
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
            <ListboxOptions
              className="absolute -top-[calc(100%-8px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.label}
                  </ListboxOption>
                )
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
