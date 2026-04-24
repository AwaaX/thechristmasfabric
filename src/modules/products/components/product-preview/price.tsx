import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default  function PreviewPrice({ price, highestPrice }: { price: VariantPrice, highestPrice: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-[16px]", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price} {highestPrice && `- ${highestPrice.calculated_price}`}
      </Text>
    </>
  )
}
