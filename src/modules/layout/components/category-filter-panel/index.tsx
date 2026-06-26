import InteractiveLink from '@modules/common/components/interactive-link'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { notFound } from 'next/navigation'
import React from 'react'

const SwhCategoryFilter = ({categories,params}) => {

    const category = categories[categories.length - 1]
    const parents = categories.slice(0, categories.length - 1)
  
    // if (!category ) notFound()

    // const dataType=category.name
    // console.log("categories",categories)
  return (
    <div className="filter-type pb-8 mt-10 border-b border-line ">
    <div className="list-type">
    {/* {params?.category?  category.category_children && category.category_children.map((item, index) => (
            <LocalizedClientLink
                key={index}
                className={`item flex items-center justify-between cursor-pointer capitalize text-[16px] text-black font-normal hover:text-hoverGray duration-200 ease-in-out`}
                 href={`/christmas-pyjamas/${item.handle}`}
            >
                {item.name}

            </LocalizedClientLink>
        )):categories.map((item, index) => (
            <LocalizedClientLink
                key={index}
                className={`item flex items-center justify-between cursor-pointer capitalize text-[16px] text-black font-normal hover:text-hoverGray duration-200 ease-in-out`}
                 href={`/christmas-pyjamas/${item.handle}`}
            >
               {item.name}
   
            </LocalizedClientLink>
        ))
        } */}

        {
            categories.length>0&&categories.map((item, index) => (
                <LocalizedClientLink
                    key={index}
                    className={`item flex items-center justify-between cursor-pointer capitalize text-[16px] text-black font-normal hover:text-hoverGray duration-200 ease-in-out ${decodeURIComponent(params?.category)===item.handle?
                        "text-red":""
                    }`}
                     href={`/christmas-pyjamas/${item.handle}`}
                >
                   {item.name}
       
                </LocalizedClientLink>
            ))
        }
    </div>
</div>
  )
}

export default SwhCategoryFilter