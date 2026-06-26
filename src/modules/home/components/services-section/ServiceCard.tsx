import Image from "next/image"
import React from "react"

const ServiceCard = ({icon,title,brief,pop}:{icon:any,title:any,brief:any,pop:any}) => {
  return (
    <div className={`p-6 ${pop?'pb-16':''} flex-1 bg-white rounded-md flex flex-col items-center justify-center gap-3 shadow-[0px_30px_50px_0px_rgba(0,0,0,0.04)]`}>
      {/* Icon */}
      <div>
        <Image src={icon} alt="service-icon" />
      </div>

      {/* Content */}
        <div className="text-center">
                    {/* Title */}
                <div className="text-[20px] text-black font-medium">{title}</div>
                {/* Brief */}
                <div className="text-[16px] text-[#666] font-normal mt-3">
                   {brief}
                </div>
        </div>
    </div>
  )
}

export default ServiceCard
