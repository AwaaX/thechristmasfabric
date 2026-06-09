"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { useMemo, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useLocale, useTranslations } from "next-intl"
import { getLocale } from "@lib/data/locale-actions"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type SizeGuideTableData = string[][]

type SizeGuide = {
  data: {
    table_id: string
    table_data: SizeGuideTableData
    translations?: { [key: string]: SizeGuideTableData }
  }
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const t = useTranslations("Product.Tabs")
  const tabs = [
    {
      label: t("sizeGuide"),
      component: <SizeGuideTab sizeguides={(product as any).sizeguides ?? []} />,
    },
    {
      label: t("deliveryInformation"),
      component: <ShippingInfoTab />,
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
  const t = useTranslations("Product.Tabs")

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("material")}</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("countryOfOrigin")}</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("type")}</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("weight")}</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("dimensions")}</span>
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
  const t = useTranslations("Product.Tabs")

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <ul className="text-[16px] font-normal text-christmasText list-disc pl-8">
          <li>{t("shippingBullet1")}</li>
          <li>{t("shippingBullet2")}</li>
          <li>{t("shippingBullet3")}</li>
          <li>{t("shippingBullet4")}</li>
        </ul>
      </div>
    </div>
  )
}

const SizeGuideTab = ({ sizeguides }: { sizeguides: SizeGuide[] }) => {
  const t = useTranslations("Product.Tabs")
  const [, setOpenSizeGuide] = useState<boolean>(false)
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null)
  const locale =useLocale()
  const normailzedLocale=locale.split("-")[0]
  const structuredSizeGuides = useMemo(() => {
    return sizeguides.map((guide: SizeGuide) => {
      const table = guide.data
      // Extract the title from the table_id
      const title = table.table_id.split("-").slice(-2, -1)[0]

      return {
        title: title,
        table: table.translations?.[normailzedLocale] ?? table.table_data,
      }
    })
  }, [sizeguides, normailzedLocale]) // Recalculate when inputData or locale changes

  const toggleTable = (index: number) => {
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
          {t("sizeGuideDescription")}
        </p>
        <ul className="text-[16px] font-normal text-black flex flex-col gap-4">
          {structuredSizeGuides.map((guide, index) => (
            <li key={index}>
              {guide.title.charAt(0).toUpperCase() + guide.title.slice(1)}
              {t("sizesSuffix")}{" "}
              <span
                onClick={() => toggleTable(index)}
                className="underline hover:text-hoverGray duration-200 ease-in-out cursor-pointer"
              >
                {visibleIndex === index ? t("hide") : t("show")}
              </span>
              {visibleIndex === index && (
                <div className="">
                  <SizeGuideTable tableData={guide.table} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <LocalizedClientLink
          href={"/measurement-guide"}
          className="text-[16px] font-normal text-christmasText border border-dashed border-black p-2"
        >
          {t("measurementGuideTitle")}{" "}
          <span className="hover:text-hoverGray duration-200 ease-in-out cursor-pointer">
            {t("measurementGuideDescription")}
          </span>
        </LocalizedClientLink>
      </div>
      {/* <ModalSizeguide data={productMain} isOpen={openSizeGuide} onClose={handleCloseSizeGuide} /> */}
    </div>
  )
}

const SizeGuideTable = ({ tableData }: { tableData: SizeGuideTableData }) => {
  return (
    <div id="size-guides-container" className="mt-4 w-full">
      <table className="size-guide-table border border-black  text-sm w-full table-auto">
        {/* {tableData.options?.table_head && ( */}
        <thead className="text-xs text-white uppercase bg-black">
          <tr>
            {tableData[0].map((header: string, index: number) => {
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
          {tableData.slice(1).map((row: string[], rowIndex: number) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-50">
              {row.map((cell: string, cellIndex: number) => (
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
