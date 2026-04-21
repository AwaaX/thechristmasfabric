import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from 'next/image';
interface Pros {
    heading: string
    subHeading: string
}

const Banner: React.FC<Pros> = ({ heading, subHeading }) => {
    return (
        <>
            <div className="breadcrumb-block style-shared">
                <div className="breadcrumb-main bg-[url('/images/customer-service/bg.webp')] overflow-hidden bg-cover bg-center h-[326px] relative">
                <div className='christmas-banner-overlay'></div>
                    <div className="small-container h-full flex flex-col items-start justify-center">
                      
                                <div className="christmas-font-banner-head text-white z-10">{heading}</div>                
                                <div className='christmas-font-banner-head text-white z-10'>{subHeading}</div>
  
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner