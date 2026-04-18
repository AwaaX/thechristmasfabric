"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { useMemo, useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct 
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Size guide",
      component: <SizeGuideTab sizeguides={product.sizeguides} />,
    },
    // {
    //   label: "Product Information",
    //   component: <ProductInfoTab product={product} />,
    // },
    // {
    //   label: "Shipping & Returns",
    //   component: <ShippingInfoTab />,
    // },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SizeGuideTab = ({ sizeguides }) => {
  const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false)
  const [visibleIndex, setVisibleIndex] = useState(null)

  const structuredSizeGuides = useMemo(() => {
    return sizeguides.map((guide) => {
      const table=guide.data
      // Extract the title from the table_id
      const title = table.table_id.split("-").slice(-2, -1)[0]

      return {
        title: title,
        table: table.table_data,
      }
    })
  }, [sizeguides]) // Recalculate when inputData changes

  const toggleTable = (index) => {
    // Toggle visibility: set the index to the clicked one or null if already open
    setVisibleIndex(visibleIndex === index ? null : index)
  }
  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true)
  }

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false)
  }
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <p className="text-[16px] font-normal text-christmasText">
          Our pyjamas have an elastic waistband and will fit you well whatever
          your waist size. Any doubts? Contact us.
        </p>
        <ul className="text-[16px] font-normal text-black flex flex-col gap-4">
       
          {structuredSizeGuides.map((guide, index) => (
            <li key={index}>
              {guide.title.charAt(0).toUpperCase() + guide.title.slice(1)}
              &apos;s sizes :{" "}
              <span
                onClick={() => toggleTable(index)}
                className="underline hover:text-hoverGray duration-200 ease-in-out cursor-pointer"
              >
                {visibleIndex === index ? "Hide" : "Show"}
              </span>
              {visibleIndex === index && (
                <div className="">
                  <SizeGuideTable tableData={guide.table} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* <ModalSizeguide data={productMain} isOpen={openSizeGuide} onClose={handleCloseSizeGuide} /> */}
    </div>
  )
}

const SizeGuideTable = ({ tableData }) => {
  return (
    <div id="size-guides-container" className="mt-4 w-full">
      <table className="size-guide-table border border-black  text-sm w-full table-auto">
        {/* {tableData.options?.table_head && ( */}
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              {tableData[0].map((header, index) => {
                // Check if the current header is "#colspan#"
                if (header === "#colspan#") {
                  return null // Skip rendering the colspan indicator
                }

                // Determine colSpan: if the next cell is "#colspan#"
                const colSpan =
                  index < tableData[0].length - 1 &&
                  tableData[0][index + 1] === "#colspan#"
                    ? 2
                    : 1

                return (
                  <th
                    key={index}
                    colSpan={colSpan}
                    scope="col"
                    className=" py-1 border !border-white"
                  >
                    {header}
                  </th>
                )
              })}
            </tr>
          </thead>
        {/* )} */}
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className=" py-1">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTabs
