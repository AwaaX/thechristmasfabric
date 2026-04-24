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
              <Icon.CaretRightIcon size={14} className="text-secondary2" />
              <LocalizedClientLink href={"/"}>
                Privacy Policy
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col items-center justify-center">
            <div className="text-[42px] leading-[55px] font-normal text-center pb-10">
              Privacy Policy
            </div>
            <div className="christmas-product-description !text-[16px] text-[#666666] flex flex-col gap-6 max-w-[1170px] w-[97%] mx-auto">
              {parse(
                `<p>SECTION 1 &#45; PERSONAL INFORMATION COLLECTED</p><p>When you make a purchase from our store, as part of our buying and selling process, we collect the personal information you provide, such as your name, address and e-mail address.</p><p>When you browse our store, we also automatically receive the Internet Protocol (IP) address of your computer, which allows us to obtain more details about the browser and operating system you use.</p><p>E-mail Marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p><p>SECTION 2 &#45; CONSENT</p><p>How do you obtain my consent?</p><p>When you provide us with your personal information to complete a transaction, verify your credit card, place an order, schedule a delivery or return a purchase, we assume that you consent to our collection and use of your information for that purpose only.</p><p>If we ask you to provide your personal information for any other reason, such as marketing purposes, we will ask you directly for your express consent, or we will give you the opportunity to decline.</p><p>How do I withdraw my consent? You can edit your consent at any time just <a href="javascript:void" >click here and edit your consent</a>.</p><p>If, after you have given us your consent, you change your mind and no longer consent to our contacting you, collecting your information or disclosing it, you may notify us by contacting us at customer@thechristmasfabric.com or by mail at SAS OVOORO, the company that operates thechristmasfabric.com:<br>SAS OVOORO<br>19 Allée de Brienne<br>Toulouse<br>31000<br>France</p><p></p><p></p><p>SECTION 3 &#45; DISCLOSURE</p><p>We may disclose your personal information if we are required to do so by law or if you violate our Terms and Conditions.</p><p>ARTICLE 4 &#45; HOST</p><p>Our store is hosted by Kinsta Inc. They provide us with the online platform that allows us to sell you our services and products.</p><p>Your data is stored in the data storage system and databases of Kinsta Inc. Your data is kept on a secure server protected by a firewall.</p><p>Payment:</p><p>When making an online purchase at noel-shop.com, no credit card information is stored. Your credit card information is used securely by third party services to process your payment. For security purposes, the data is encrypted in accordance with the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction information is retained as long as necessary to complete your order by third party services such as PayPal, Stripe or Mollie.</p><p>All direct payment gateways comply with the PCI-DSS standard, managed by the PCI Security Standards Council, which is a joint effort of companies such as Visa, MasterCard, American Express and Discover.</p><p>The requirements of the PCI-DSS standard ensure the secure processing of credit card data by our store and its service providers.</p><p>SECTION 5 &#45; SERVICES PROVIDED BY THIRD PARTIES</p><p>Generally, the third party providers we use will only collect, use and disclose your information to the extent necessary to be able to perform the services they provide to us.</p><p>However, some third party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies regarding the information we are required to provide to them for your purchase transactions.</p><p>With respect to these providers, we recommend that you read their privacy policies carefully so that you can understand how they will handle your personal information.</p><p>Keep in mind that some suppliers may be located or have facilities located in a different jurisdiction than you or us. So if you decide to proceed with a transaction that requires the services of a third party supplier, your information may be governed by the laws of the jurisdiction in which that supplier is located or the jurisdiction in which its facilities are located.</p><p>For example, if you are located in Canada and your transaction is processed through a payment gateway located in the United States, your information that was used to complete the transaction may be disclosed under United States law, including the Patriot Act.</p><p>Once you leave our store site or are redirected to a third party website or application, you are no longer governed by this Privacy Policy or the Terms and Conditions of Sale and Use of our website.</p><p>Links</p><p>You may leave our website by clicking on certain links on our website. We assume no responsibility for the privacy practices of these other sites and recommend that you read their privacy policies carefully.</p><p>ARTICLE 6 &#45; SECURITY</p><p>To protect your personal information, we take reasonable precautions and follow industry best practices to ensure that it is not lost, misappropriated, accessed, disclosed, altered or destroyed in an inappropriate manner.</p><p></p><p></p><p>SECTION 7 &#45; AGE OF CONSENT</p><p>By using this site, you represent that you are at least the age of majority in your state or province of residence, and that you have given us your consent to allow any minor in your care to use this website.</p><p>SECTION 8 &#45; CHANGES TO THIS PRIVACY POLICY</p><p>We reserve the right to change this Privacy Policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon posting on the website. If we make changes to the content of this policy, we will notify you here that it has been updated, so that you will know what information we collect, how we use it, and under what circumstances, if any, we disclose it.</p><p>If our store is acquired by or merged with another company, your information may be transferred to the new owners so that we can continue to sell products to you.</p><p>QUESTIONS AND CONTACT INFORMATION</p><p>If you would like to: access, correct, amend or delete any personal information we have about you, file a complaint, or if you would simply like more information, contact our Privacy Officer at customer@thechristmasfabric.com or by mail at the headquarters of SAS OVOORO which operates thechristmasfabric.com :<br>SAS OVOORO<br>19 Allée de Brienne<br>Toulouse<br>31000<br>France</p><p></p>`
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyPage
