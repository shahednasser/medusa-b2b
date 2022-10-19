import { Product } from "@medusajs/medusa"
import { Variant } from "types/medusa"
import clsx from "clsx"
import { useMemo } from "react"
import useProductPrice from "@lib/hooks/use-product-price"

type ProductPriceProps = {
  product: Product
  variant: Variant
}

const ProductPrice: React.FC<ProductPriceProps> = ({ product, variant }) => {

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <div className="mb-4">
      {selectedPrice ? (
        <div className="flex flex-col text-gray-700">
          <span>
            {selectedPrice.calculated_price}
          </span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default ProductPrice