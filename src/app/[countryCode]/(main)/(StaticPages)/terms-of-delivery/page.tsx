'use client'
import React  from "react"
import Link from "next/link"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import parse from "html-react-parser"

const PolicyPage = () => {
  return (
    <>
      <div className="breadcrumb-block style-img">
        <div className="breadcrumb-main  overflow-hidden">
          <div className="container  relative">
            <div className="link flex items-center justify-start gap-2  px-[8px] py-1 flex-wrap">
              <LocalizedClientLink href={"/"}>Home</LocalizedClientLink>
              <Icon.CaretRightIcon size={14} className="text-secondary2" />
              <LocalizedClientLink href={"/"}>
                Terms of delivery
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col items-center justify-center">
            <div className="text-[42px] leading-[55px] font-normal text-center pb-10">
              Terms of delivery
            </div>
            <div className="christmas-product-description text-[16px] text-[#666666] flex flex-col gap-6 max-w-[1170px] w-[97%] mx-auto">
              {parse(
                `<p>The PRODUCTS are shipped to the delivery address(es) indicated by the CLIENT during the ordering process.</p><p>Shipping time</p><p>The deadlines for preparing an order and then issuing the invoice, before shipping the PRODUCTS in stock are mentioned on the SITE. These deadlines do not include weekends or public holidays.</p><p>An e-mail message will automatically be sent to the CUSTOMER upon shipment of the PRODUCTS, provided that the e-mail address in the registration form is correct.</p><p>Delivery time &amp; costs</p><p>During the ordering process, the SELLER indicates to the CUSTOMER the possible delivery times and shipping options for the PRODUCTS purchased.</p><p>Shipping costs are calculated according to the delivery method. The amount of these costs will be due by the CLIENT in addition to the price of the PRODUCTS purchased.</p><p>Details of delivery times and costs are detailed on the SITE.</p><p>Terms of delivery</p><p>The parcel will be given to the CUSTOMER against signature and on presentation of an identity document.</p><p>In case of absence, a notice of passage will be left to the CUSTOMER, in order to allow him to go and collect his parcel in his post office.</p><p>The responsibility to pick up the package at the post office within 10 days is given to the CUSTOMER, the SELLER can not be held responsible for a package destroyed, or not returned by the postal services and this reason does not constitute a way to obtain any refund.</p><p>Delivery problems</p><p>The CUSTOMER is informed of the delivery date when he/she chooses the carrier, at the end of the online ordering process, before confirming the order.</p><p>It is specified that deliveries will be made within thirty (30) days maximum. Failing this, the CUSTOMER must give the SELLER formal notice to deliver within a reasonable period of time and in the event of non-delivery within this period, the contract may be terminated.</p><p>SELLER shall refund, without undue delay after receipt of the termination letter, to CUSTOMER the total amount paid for the PRODUCTS, including taxes and delivery charges, by the same method of payment used by CUSTOMER to purchase the PRODUCTS.</p><p>The SELLER is responsible until the delivery of the PRODUCT to the CLIENT. It is reminded that the CLIENT has a period of three (3) days to notify the carrier of any damage or partial loss noted at the time of delivery.</p>`
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyPage
