import React from "react"

import { IconProps } from "types/icon"

const Spinner: React.FC<IconProps> = ({
  size = "16",
  color = "currentColor",
  className = "",
  ...attributes
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        {...attributes}
      >
        {/* Thin background ring */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.15"
        />

        {/* Animated arc */}
        <path
          d="
            M25 5
            a20 20 0 0 1 0 40
            a20 20 0 0 1 0 -40
          "
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
          strokeDasharray="90 150"
        />
      </svg>

      {/* Center favicon/logo */}
      <img
        src="/favicon.ico"
        alt="logo"
        className="absolute h-4 w-4 object-contain"
      />
    </div>
  )
}

export default Spinner
