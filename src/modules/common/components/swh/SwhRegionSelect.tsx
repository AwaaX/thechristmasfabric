"use client"
import { useToggleState } from "@medusajs/ui"
import CountrySelect from "@modules/layout/components/country-select"
import React from "react"

const SwhRegionSelect = ({ regions }) => {
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

export default SwhRegionSelect
