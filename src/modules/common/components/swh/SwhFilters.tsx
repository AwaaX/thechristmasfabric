import React from "react"
import Slider from "rc-slider"
import { notFound } from "next/navigation"
import SwhCategoryFilter from "@modules/layout/components/swh-category-filter"
import { listCategories } from "@lib/data/categories"

const fetchCategories = async () => {
  const  product_categories  = await listCategories()
  let topLevelCategories = []

  if (product_categories && product_categories?.length > 0) {
    topLevelCategories = product_categories.filter(
      (category) => category.parent_category === null
    )
  }

  return { product_categories: topLevelCategories }
}

const SwhFilters = async ({ params }) => {
  // console.log("params?.category",params?.category)

  // const { product_categories } =params?.category?await getCategoryByHandle([decodeURIComponent(params.category)]).then((product_categories) => product_categories):await fetchCategories()
  const { product_categories } = await fetchCategories()

  if (!product_categories) {
    notFound()
  }

  return (
    <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
      <div className="text-[34px] font-[400]">Filters</div>

      <SwhCategoryFilter categories={product_categories} params={params} />

      {/* <div className="filter-type pb-8 border-b border-line">
        <div className="heading6">Christmas Pyjamas</div>
        <div className="list-type mt-4">
            {['t-shirt', 'dress', 'top', 'swimwear', 'shirt', 'underwear', 'sets', 'accessories'].map((item, index) => (
                <div
                    key={index}
                    className={`item flex items-center justify-between cursor-pointer ${dataType === item ? 'active' : ''}`}
                    onClick={() => handleType(item)}
                >
                    <div className='text-secondary has-line-before hover:text-black capitalize'>{item}</div>
                    <div className='text-secondary2'>
                        ({index+6})
                    </div>
                </div>
            ))}
        </div>
    </div> */}
      {/* <div className="filter-price pb-8 border-b border-line mt-8">
        <div className="heading6">Price Range</div>
        <Slider
            range
            defaultValue={[0, 100]}
            min={0}
            max={100}
            onChange={handlePriceChange}
            className='mt-5'
        />
        <div className="price-block flex items-center justify-between flex-wrap mt-4">
            <div className="min flex items-center gap-1">
                <div>Min price:</div>
                <div className='price-min'>$
                    <span>{priceRange.min}</span>
                </div>
            </div>
            <div className="min flex items-center gap-1">
                <div>Max price:</div>
                <div className='price-max'>$
                    <span>{priceRange.max}</span>
                </div>
            </div>
        </div>
    </div>
    <div className="filter-size pb-8 border-b border-line mt-8">
        <div className="heading6">Size</div>
        <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
            {
                ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((item, index) => (
                    <div
                        key={index}
                        className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === item ? 'active' : ''}`}
                        onClick={() => handleSize(item)}
                    >
                        {item}
                    </div>
                ))
            }
            <div
                className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line ${size === 'freesize' ? 'active' : ''}`}
                onClick={() => handleSize('freesize')}
            >
                Freesize
            </div>
        </div>
    </div>
    <div className="filter-color pb-8 border-b border-line mt-8">
        <div className="heading6">colors</div>
        <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'pink' ? 'active' : ''}`}
                onClick={() => handleColor('pink')}
            >
                <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">pink</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'red' ? 'active' : ''}`}
                onClick={() => handleColor('red')}
            >
                <div className="color bg-red w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">red</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'green' ? 'active' : ''}`}
                onClick={() => handleColor('green')}
            >
                <div className="color bg-green w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">green</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'yellow' ? 'active' : ''}`}
                onClick={() => handleColor('yellow')}
            >
                <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">yellow</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'purple' ? 'active' : ''}`}
                onClick={() => handleColor('purple')}
            >
                <div className="color bg-purple w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">purple</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'black' ? 'active' : ''}`}
                onClick={() => handleColor('black')}
            >
                <div className="color bg-black w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">black</div>
            </div>
            <div
                className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'white' ? 'active' : ''}`}
                onClick={() => handleColor('white')}
            >
                <div className="color bg-[#F6EFDD] w-5 h-5 rounded-full"></div>
                <div className="caption1 capitalize">white</div>
            </div>
        </div>
    </div> */}
    </div>
  )
}

export default SwhFilters
