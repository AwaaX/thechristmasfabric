import React from "react"
import { IoStarSharp } from "react-icons/io5"

interface RateProps {
  currentRate: number | undefined
  size: number
}

const Rate: React.FC<RateProps> = ({ currentRate, size }) => {
  const arrOfStar = []
  for (let i = 0; i < 5; i++) {
    if (currentRate) {
      // Use the index as the key
      if (i >= currentRate) {
        arrOfStar.push(
          <IoStarSharp
            key={i}
            className="text-[#9FA09C] text-[18px] mr-1"
            size={size} // You can use size if you want to control star size, but ensure the component accepts it
          />
        )
      } else {
        arrOfStar.push(
          <IoStarSharp
            key={i}
            className="text-[#000] text-[18px] mr-1"
            size={size} // Same here
          />
        )
      }
    }
  }
  return <div className="rate flex">{arrOfStar}</div>
}

export default Rate
