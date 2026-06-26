"use client"
import { useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"
import React from "react"
import { HttpTypes } from "@medusajs/types"

/** Props for RegionSelector component */
interface RegionSelectorProps {
  /** Available regions for selection */
  regions: HttpTypes.StoreRegion[]
}

/**
 * Region/country selector dropdown wrapper
 * Displays available regions for user selection
 */
const RegionSelector = ({ regions }: RegionSelectorProps) => {
  const toggleState = useToggleState()

  return (
    <div
      className="flex justify-between"
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
    >
      {regions && (
        <CountrySelect
          toggleState={toggleState}
          regions={regions}
        />
      )}
    </div>
  )
}

export default RegionSelector
