// import { HttpTypes } from "@medusajs/types"
// import { clx } from "@medusajs/ui"
// import React from "react"

// type OptionSelectProps = {
//   option: HttpTypes.StoreProductOption
//   current: string | undefined
//   updateOption: (title: string, value: string) => void
//   title: string
//   disabled: boolean
//   "data-testid"?: string
// }

// const OptionSelect: React.FC<OptionSelectProps> = ({
//   option,
//   current,
//   updateOption,
//   title,
//   "data-testid": dataTestId,
//   disabled,
// }) => {
//   const filteredOptions = (option.values ?? []).map((v) => v.value)

//   return (
//     <div className="flex flex-col gap-y-3">
//       <span className="text-sm">Select {title}</span>
//       <div
//         className="flex flex-wrap justify-between gap-2"
//         data-testid={dataTestId}
//       >
//         {filteredOptions.map((v) => {
//           return (
//             <button
//               onClick={() => updateOption(option.id, v)}
//               key={v}
//               className={clx(
//                 "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
//                 {
//                   "border-ui-border-interactive": v === current,
//                   "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
//                     v !== current,
//                 }
//               )}
//               style={{ flex: "auto"}}
//               disabled={disabled}
//               data-testid="option-button"
//             >
//               {v}
//             </button>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default OptionSelect

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  toShowValues: string[]
  displayValues?: string[]
  formatValue?: (value: string) => string
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  toShowValues,
  current,
  updateOption,
  title,
  displayValues,
  formatValue,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions =
    displayValues ||
    (option.values ?? []).map((v: any) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        {" "}
        <span className="text-[16px] font-medium">{title}:</span>
        <span className="text-[16px] font-normal ml-3">{current}</span>
      </div>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          if (option.title.toLowerCase() === "size") {
            if (toShowValues.length > 0) {
              if (toShowValues.includes(v)) {
                return (
                  <button
                    onClick={() => updateOption({ [option.id]: v })}
                    key={v}
                    className={clx(
                      "border-ui-border-base border text-[18px] font-normal rounded-rounded p-2",
                      {
                        "border-black": v === current,
                        "hover:border-black transition-shadow ease-in-out duration-150":
                          v !== current,
                      }
                    )}
                    disabled={disabled}
                    data-testid="option-button"
                  >
                    {formatValue ? formatValue(v) : v}
                  </button>
                )
              } else {
                return
              }
            } else
              return (
                <button
                  onClick={() => updateOption({ [option.id]: v })}
                  key={v}
                  className={clx(
                    "border-ui-border-base border text-[18px] font-normal rounded-rounded p-2",
                    {
                      "border-black": v === current,
                      "hover:border-black transition-shadow ease-in-out duration-150":
                        v !== current,
                    }
                  )}
                  disabled={disabled}
                  data-testid="option-button"
                >
                  {formatValue ? formatValue(v) : v}
                </button>
              )
          } else {
            return (
              <button
                onClick={() => updateOption({ [option.id]: v })}
                key={v}
                className={clx(
                  "border-ui-border-base border text-[18px] font-normal rounded-rounded p-2",
                  {
                    "border-black": v === current,
                    "hover:border-black transition-shadow ease-in-out duration-150":
                      v !== current,
                  }
                )}
                disabled={disabled}
                data-testid="option-button"
              >
                {formatValue ? formatValue(v) : v}
              </button>
            )
          }
        })}
      </div>
    </div>
  )
}

export default OptionSelect
