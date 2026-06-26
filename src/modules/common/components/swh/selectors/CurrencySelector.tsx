"use client"
import { useToggleState } from "@medusajs/ui"
import CurrencySelect from "@modules/layout/components/currency-select"
import React from "react"

const CurrencySelector = ({ regions, product = {} }) => {
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
