'use client'
import React, { useState } from "react"
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
              <Icon.CaretRight size={14} className="text-secondary2" />
              <LocalizedClientLink href={"/"}>
              Return and refund
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col items-center justify-center">
            <div className="text-[42px] leading-[55px] font-normal text-center pb-10">
            Return and refund
            </div>
            <div className="christmas-product-description text-[16px] text-[#666666] flex flex-col gap-6 max-w-[1170px] w-[97%] mx-auto">
              {parse(
                `<p>Our policy lasts 14 days from the day of delivery. If 14 days have passed from the day of your delivery, we unfortunately cannot offer you a refund or exchange.</p><p>To qualify for a free return, your item must be returned for exchange, unused and in the same condition as you received it. It must also be in the original packaging.</p><p>In order to avoid abuses, return fees of 10 USD$ are applied only in the case where the customer asks for a refund and that the order is in conformity with the expectations of the customer as for the articles motivating its purchase by this customer on the site www.thechristmasfabric.com</p><p>The customer must verify when returning the product that the accessories (if any) are complete and that the packaging is the original one. If the customer fails to do so, a charge may be applied to the refund to cover the loss incurred:<br>&#45; Damaged or missing original packaging: 10 USD$.<br>&#45; Missing accessories: 20% of the total amount of the refund, or price of the accessory if displayed on the site</p><p>If the item is not returned in its original condition, is damaged, stained, non-functional or degraded and prevents it from being sold again, then no refund can be given.</p><p>Many types of products cannot be returned. Perishable goods such as food, flowers or magazines cannot be returned. We also do not accept intimate or sanitary products, dangerous products or flammable gases or liquids.</p><p>Other items that cannot be returned:</p><p>Gift cards<br>Downloadable software<br>Certain health and personal care products<br>To make a return, you must present us with a receipt or proof of purchase.</p><p>Please do not return your purchase to the manufacturer.</p><p>There are certain situations where only a partial refund is granted: (if applicable)</p><p>Books with obvious signs of use.<br>CD, DVD, VHS tape, software, video game, cassette, or vinyl record that has been opened.<br>Any item that is not in its original condition, that is damaged or that has some parts missing for reasons that are not due to an error on our part.<br>Any item that is returned more than 30 days after delivery.</p><p>Refunds (if any)<br>Once we have received and inspected the returned item, we will send you an email to confirm that we have received it. We will also inform you of our decision on whether to approve or reject your refund request.<br>If your request is approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original payment method, within a maximum of 2 to 3 days (excluding weekends and holidays).</p><p>Late or missing refunds (if any)<br>If you have not yet received your refund, please check the following steps before contacting the site by e-mail:<br>&#45; Verify that the refund is not in progress on your bank account or scheduled to arrive on a date sometimes posted.<br>&#45; Contact your bank in order to know the delays applied to transfers between bank accounts not belonging to the same bank.<br><br>If after completing all of these steps you still have not received or have knowledge of the time frame of your bank or the date of receipt of your refund, please contact us at customer@thechristmasfabric.com</p><p>Items on sale (if applicable)<br>Only regular priced items can be refunded. Unfortunately, sale items are not refundable.</p><p>Return for malfunction</p><p>An item that is returned for the reason of a malfunction enters into our free return offer, the customer does not pay any fees. If our team does not detect any malfunction after several tests and verifications at the after sales service, the return delivery to the customer will be at the customer&apos;s expense. This allows us to avoid abusive returns and allows our customer to take more responsibility and verify that his product has a real malfunction and that a return to SAV is necessary to proceed with any exchange.</p><p>Exchanges</p><p>We will only replace an item if it is defective or damaged upon receipt by the customer. The customer has 3 days to declare a problem from the day of delivery; after this time we consider that the item has been used and that it is no longer exchangeable. For any exchange send us an e-mail to customer@thechristmasfabric.com</p><p>The item must be new, unused, unwashed, in its original packaging and with all tags attached.</p><p>Your article should be sent to the address of the company operating the site www.thechristmasfabric.com :<br>SAS OVOORO<br>19 Allée de Brienne<br>Toulouse<br>31000<br>France</p><p>Gifts<br>If the returned item was identified as a gift at the time of purchase and was sent directly to you, you will receive a gift credit equal to the value of your return. Once we receive the returned item, a gift certificate will be mailed to you. Return shipping costs for gifts are not covered.</p><p>Shipping<br>To return a product, you must send it to the company&apos;s headquarters SAS OVOORO operating the site www.thechristmasfabric.com : SAS OVOORO, 19 Allée de Brienne, Toulouse, 31000, France.</p><p>Processing times<br>Depending on where you live, the time it takes to receive your exchanged product may vary.</p><p>Upon receipt of your product at the headquarters we take 3 to 5 working days to verify and agree on a decision that will be communicated to you by e-mail to the address you provided when you ordered</p><p>If the costs of return for redelivery to the customer are borne by the company SAS OVOORO operating the site www.thechristmasfabric.com then the delivery time may vary between 3 and 5 days</p><p>If the cost of return shipping to the customer is at the customer&apos;s expense, the delivery time will vary depending on the preferred method chosen by the customer.</p><p>If you are shipping an item valued at more than 100 USD$ and you are responsible for the return shipping costs, you should consider using a shipping service that allows you to track the shipment or purchase shipping insurance. We do not guarantee that we will receive the item you are returning in the event of a problem.</p>`
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyPage
