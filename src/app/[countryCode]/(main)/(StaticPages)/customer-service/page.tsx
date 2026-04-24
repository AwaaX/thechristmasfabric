'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Banner from '@modules/common/components/swh/Banner';

const ContactUs = () => {

    const [activeQuestion, setActiveQuestion] = useState<string | undefined>('')



    const handleActiveQuestion = (question: string) => {
        setActiveQuestion(prevQuestion => prevQuestion === question ? undefined : question)
    }


    return (
        <>


            <Banner heading='Customer Service' subHeading='What can we do for you today?' />

            <div className='contact-us md:py-20 py-10'>
                <div className="small-container">
                    <div className="flex justify-between max-lg:flex-col gap-y-10">
                        <div className="left faqs-block lg:w-1/2 lg:p-[30px] max-w-[600px] border-l">
                            <div className="text-[16px] font-normal text-[#7c7c7c]  mt-3 ">Learn more about the tracking and delivery of your order</div>
                            <div className="text-[34px] font-normal mb-2">Delivery and tracking</div>
                            <div className={`tab-question flex flex-col  active`}>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '1' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('1')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '2' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('2')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '3' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('3')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '4' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('4')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '5' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('5')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '6' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('6')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                            </div>
                            <div className="text-[16px] font-normal text-[#7c7c7c]  mt-3 ">Return an item, make an exchange or a refund</div>
                            <div className="text-[34px] font-normal mb-2">Return and exchange</div>
                            <div className={`tab-question flex flex-col  active`}>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '1' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('1')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '2' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('2')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '3' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('3')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '4' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('4')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '5' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('5')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">How does COVID-19 affect my online orders and store purchases?</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com</div>
                                    </div>
                                    <div
                                        className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === '6' ? 'open' : ''}`}
                                        onClick={() => handleActiveQuestion('6')}
                                    >
                                        <div className="heading flex items-center justify-between gap-6">
                                            <div className="body1 text-[#7c7c7c]">NEW! Plus sizes for Woman</div>
                                            <MdOutlineKeyboardArrowDown />
                                        </div>
                                        <div className="content christmas-font text-secondary">The courier companies have adapted their procedures to guarantee the safety of our employees and our community. We thank you for your patience, as there may be some delays to deliveries.
                                            We remind you that you can still find us at Mango.com and on all our online channels. Our customer services are still there for you, to answer any questions you may have, although due to the current situation, we are operating with longer waiting times.</div>
                                    </div>
                            </div>
                        </div>
                        <div className="right lg:w-1/2 lg:p-[30px] max-w-[600px]">
                            <div className="text-[16px] font-normal text-[#7c7c7c]  mt-3 max-w-[350px]">Use this form to contact customer service by e-mail at customer@thechristmasfabric.com</div>
                            <div className="text-[34px] font-normal">Contact customer service</div>
                            <form className="md:mt-6 mt-4">
                                <div className='grid  grid-cols-1 gap-4 gap-y-5'>
                                    <div className="name">
                                        <label htmlFor="">Your first name</label>
                                        <input className="border-line px-4 py-3 w-full rounded-lg" id="username" type="text" placeholder="First Name" required />
                                    </div>
                                    <div className="order-number">
                                    <label htmlFor="">Your order number  <span className='text-red'>*</span></label>
                                        <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="ordernumber" type="text" placeholder="35445" required />
                                    </div>
                                    <div className="select-reason">
                                    <label htmlFor="">The reason for your emergency</label>
                                        <select id="reason" name="reason" className='border-line px-4 pt-3 pb-3 w-full rounded-lg border text-[#aaa]'>
                                            <option value="I want to exchange a Product">I want to exchange a Product</option>
                                            <option value="I have Problem with tracking">I have Problem with tracking</option>
                                            <option value="I want to return my parcel/obtain a refund">I want to return my parcel/obtain a refund</option>
                                            <option value="I want to modify my order">I want to modify my order</option>
                                            <option value="I am contacting you for other reason">I am contacting you for other reason</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4">
                                    <button className="swh-btn w-full bg-[#69727D] text-white">Continue</button>
                                </div>
                            </form>
                        </div>
                    
                    </div>
                </div>
            </div>
 
        </>
    )
}

export default ContactUs