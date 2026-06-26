'use client'
import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Banner } from '@modules/common/components/swh/utilities';
import { useTranslations } from "next-intl"

type FaqItem = {
    question: string
    answer: string
}

type FaqSection = {
    eyebrow: string
    heading: string
    items: FaqItem[]
}

const ContactUs = () => {
    const [activeQuestion, setActiveQuestion] = useState<string | undefined>('')
    const t = useTranslations("StaticPages.CustomerService")
    const sections = t.raw("faqSections") as FaqSection[]
    const reasonOptions = t.raw("form.reasonOptions") as string[]

    const handleActiveQuestion = (questionId: string) => {
        setActiveQuestion(prevQuestion => prevQuestion === questionId ? undefined : questionId)
    }

    return (
        <>
            <Banner heading={t("banner.heading")} subHeading={t("banner.subHeading")} />

            <div className='contact-us md:py-20 py-10'>
                <div className="small-container">
                    <div className="flex justify-between max-lg:flex-col gap-y-10">
                        <div className="left faqs-block lg:w-1/2 lg:p-[30px] max-w-[600px] border-l">
                            {sections.map((section, sectionIndex) => (
                                <div key={section.heading}>
                                    <div className="text-[16px] font-normal text-[#7c7c7c]  mt-3 ">{section.eyebrow}</div>
                                    <div className="text-[34px] font-normal mb-2">{section.heading}</div>
                                    <div className={`tab-question flex flex-col  active`}>
                                        {section.items.map((item, itemIndex) => {
                                            const questionId = `${sectionIndex}-${itemIndex}`

                                            return (
                                                <div
                                                    className={`question-item  px-7 py-[15px]  overflow-hidden border border-line cursor-pointer ${activeQuestion === questionId ? 'open' : ''}`}
                                                    onClick={() => handleActiveQuestion(questionId)}
                                                    key={questionId}
                                                >
                                                    <div className="heading flex items-center justify-between gap-6">
                                                        <div className="body1 text-[#7c7c7c]">{item.question}</div>
                                                        <MdOutlineKeyboardArrowDown />
                                                    </div>
                                                    <div className="content christmas-font text-secondary">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="right lg:w-1/2 lg:p-[30px] max-w-[600px]">
                            <div className="text-[16px] font-normal text-[#7c7c7c]  mt-3 max-w-[350px]">{t("form.description")}</div>
                            <div className="text-[34px] font-normal">{t("form.heading")}</div>
                            <form className="md:mt-6 mt-4">
                                <div className='grid  grid-cols-1 gap-4 gap-y-5'>
                                    <div className="name">
                                        <label htmlFor="username">{t("form.firstNameLabel")}</label>
                                        <input className="border-line px-4 py-3 w-full rounded-lg" id="username" type="text" placeholder={t("form.firstNamePlaceholder")} required />
                                    </div>
                                    <div className="order-number">
                                    <label htmlFor="ordernumber">{t("form.orderNumberLabel")}  <span className='text-red'>*</span></label>
                                        <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="ordernumber" type="text" placeholder={t("form.orderNumberPlaceholder")} required />
                                    </div>
                                    <div className="select-reason">
                                    <label htmlFor="reason">{t("form.reasonLabel")}</label>
                                        <select id="reason" name="reason" className='border-line px-4 pt-3 pb-3 w-full rounded-lg border text-[#aaa]'>
                                            {reasonOptions.map((option) => (
                                                <option value={option} key={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4">
                                    <button className="swh-btn w-full bg-[#69727D] text-white">{t("form.submit")}</button>
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
