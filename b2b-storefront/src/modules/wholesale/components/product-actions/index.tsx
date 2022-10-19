import { Product, Variant } from "types/medusa"
import React, { useEffect, useMemo, useState } from "react"

import Button from "@modules/common/components/button"
import { isEqual } from "lodash"
import { useProductActions } from "@lib/context/product-context"

type ProductActionsProps = {
  product: Product
  selectedVariant: Variant
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, selectedVariant }) => {
  const { updateOptions, addToCart, inStock, options, quantity, setQuantity } =
    useProductActions()

  useEffect(() => {
    const tempOptions: Record<string, string> = {}
    for (const option of selectedVariant.options) {
      tempOptions[option.option_id] = option.value
    }

    if (!isEqual(tempOptions, options)) {
      updateOptions(tempOptions)
    }
  }, [selectedVariant.options, options])

  return (
    <div className="flex flex-col gap-y-2">
      <input type="number" min="1" max={selectedVariant.inventory_quantity} value={quantity} disabled={!inStock}
        onChange={(e) => setQuantity(parseInt(e.target.value))} className="border p-2 w-max mt-2" />
      <Button onClick={addToCart} className="w-max my-2">
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  )
}

export default ProductActions
