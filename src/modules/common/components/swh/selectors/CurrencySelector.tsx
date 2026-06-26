"use client"
import { useToggleState } from "@medusajs/ui"
import CurrencySelect from "@modules/layout/components/currency-select"
import React from "react"
import { HttpTypes } from "@medusajs/types"

/** Props for CurrencySelector component */
interface CurrencySelectorProps {
  /** Available regions for currency selection */
  regions: HttpTypes.StoreRegion[]
  /** Optional product data for context */
  product?: Record<string, any>
}

/**
 * Currency selector dropdown wrapper
 * Displays available currencies based on regions
 */
const CurrencySelector = ({ regions, product = {} }: CurrencySelectorProps) => {
  const toggleState = useToggleState()

  return (
    <div
      className="flex justify-between"
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
    >
      {regions && (
        <CurrencySelect
          toggleState={toggleState}
          regions={regions}
          product={product}
        />
      )}
    </div>
  )
}

export default CurrencySelector
