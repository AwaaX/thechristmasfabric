"use client"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Pagination } from "@modules/store/components/pagination"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import RefinementList from "@modules/store/components/refinement-list"
import { IoIosArrowUp } from "react-icons/io"
import clsx from "clsx"
import SwhProductPreview from "./SwhProductPreview"
import AnimatedContainer from "./AnimatedContainer"
import animation from "@lib/util/animation"
// import { useSearchParams } from "next/navigation"

const sortOptions = ["created_at", "price_asc", "price_desc"]

const gridColsMap: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
}

const SwhProductsPage = ({
  sortBy,
  products,
  page,
  totalPages,
  totalProducts,
  productsPerPage,
}) => {
  const t = useTranslations("Store")
  const tSort = useTranslations("Store.Sort")
  const [layoutCol, setLayoutCol] = useState<number | null>(4)
  const [layoutType, setLayoutType] = useState<string>("grid")
  const [isSortFilterOpen, setIsSortFilterOpen] = useState(false)
  //   const {sortBy} = useSearchParams()

  const handleLayoutCol = (col: number) => {
    setLayoutCol(col)
  }

  const FromProductNo = 12 * (page - 1)
  const ToProductNo = products.length + 12 * (page - 1)

  const selectedValue = sortOptions.includes(sortBy) ? tSort(sortBy) : null

  return (
    <>
      <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
        <div className="left flex has-line items-center flex-wrap gap-5">
          <div className="total-product text-secondary body1">
            {t("showingResults", {
              from: FromProductNo,
              to: ToProductNo,
              total: totalProducts,
            })}
          </div>
        </div>
        <div className="right flex items-center gap-3">
          <div className="relative ">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setIsSortFilterOpen(!isSortFilterOpen)
                }}
                className={`group flex items-center justify-center gap-2 text-black px-4 py-2 text-title`}
              >
                {selectedValue}
                <IoIosArrowUp
                  className={clsx(
                    "text-sm",
                    { "rotate-0": isSortFilterOpen },
                    { "rotate-180": !isSortFilterOpen },
                    "duration-200",
                    "ease-in"
                  )}
                />
              </button>
            </div>

            <AnimatedContainer
              trigger={isSortFilterOpen}
              animation={animation.slideUpDownMenu}
              className="absolute top-[56px] left-0 z-10"
              onMouseLeave={() => setIsSortFilterOpen(false)}
            >
              <RefinementList sortBy={sortBy || "created_at"} />
            </AnimatedContainer>
          </div>

          <div className="choose-layout flex items-center gap-2">
            <div
              className={`item two-col p-2 border border-line rounded flex items-center justify-center cursor-pointer ${
                layoutType === "grid" && layoutCol === 2 ? "active" : ""
              }`}
              onClick={() => {
                handleLayoutCol(2)
                setLayoutType("grid")
              }}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
              </div>
            </div>
            <div
              className={`item three-col p-2 border border-line rounded flex items-center justify-center cursor-pointer ${
                layoutType === "grid" && layoutCol === 3 ? "active" : ""
              }`}
              onClick={() => {
                handleLayoutCol(3)
                setLayoutType("grid")
              }}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
              </div>
            </div>
            <div
              className={`item four-col p-2 border border-line rounded flex items-center justify-center cursor-pointer ${
                layoutType === "grid" && layoutCol === 4 ? "active" : ""
              }`}
              onClick={() => {
                handleLayoutCol(4)
                setLayoutType("grid")
              }}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
              </div>
            </div>
            <div
              className={`item five-col p-2 border border-line rounded flex items-center justify-center cursor-pointer ${
                layoutType === "grid" && layoutCol === 5 ? "active" : ""
              }`}
              onClick={() => {
                handleLayoutCol(5)
                setLayoutType("grid")
              }}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
                <span className="w-[3px] h-4 bg-secondary2 rounded-sm"></span>
              </div>
            </div>
            <div
              className={`item row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer ${
                layoutType === "list" ? "active" : ""
              }`}
              onClick={() => setLayoutType("list")}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
                <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
                <span className="w-4 h-[3px] bg-secondary2 rounded-sm"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="list-filtered flex items-center gap-3 mt-4">
                                    <div className="total-product">
                                        {totalProducts}
                                        <span className='text-secondary pl-1'>Products Found</span>
                                    </div>
                                    {
                                        (selectedType || selectedSize || selectedColor || selectedBrand) && (
                                            <>
                                                <div className="list flex items-center gap-3">
                                                    <div className='w-px h-4 bg-line'></div>
                                                    {selectedType && (
                                                        <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setType(null) }}>
                                                            <Icon.X className='cursor-pointer' />
                                                            <span>{selectedType}</span>
                                                        </div>
                                                    )}
                                                    {selectedSize && (
                                                        <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setSize(null) }}>
                                                            <Icon.X className='cursor-pointer' />
                                                            <span>{selectedSize}</span>
                                                        </div>
                                                    )}
                                                    {selectedColor && (
                                                        <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setColor(null) }}>
                                                            <Icon.X className='cursor-pointer' />
                                                            <span>{selectedColor}</span>
                                                        </div>
                                                    )}
                                                    {selectedBrand && (
                                                        <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setBrand(null) }}>
                                                            <Icon.X className='cursor-pointer' />
                                                            <span>{selectedBrand}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                                                    onClick={handleClearAll}
                                                >
                                                    <Icon.X color='rgb(219, 68, 68)' className='cursor-pointer' />
                                                    <span className='text-button-uppercase text-red'>Clear All</span>
                                                </div>
                                            </>
                                        )
                                    }
                                </div> */}
      <ul
        className={`grid mt-7 ${
          layoutType === "list"
            ? "flex flex-col gap-8"
            : `${
                gridColsMap[layoutCol!]
              } sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px]`
        } w-full gap-x-6 gap-y-8`}
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <SwhProductPreview data={p} type={layoutType} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}

export default SwhProductsPage
