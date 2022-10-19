import { ProductProvider, useProductActions } from "@lib/context/product-context"
import { useCart, useProducts } from "medusa-react"
import { useMemo, useState } from "react"

import Button from "@modules/common/components/button"
import Link from "next/link"
import ProductActions from "../product-actions"
import ProductPrice from "../product-price"
import { StoreGetProductsParams } from "@medusajs/medusa"

type GetProductParams = StoreGetProductsParams & {
  sales_channel_id?: string[]
}

type ProductsType = {
  params: GetProductParams
}

const Products = ({ params }: ProductsType) => {
  const { cart } = useCart()
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const queryParams = useMemo(() => {
    const p: GetProductParams = {}

    if (cart?.id) {
      p.cart_id = cart.id
    }

    p.is_giftcard = false
    p.offset = offset

    return {
      ...p,
      ...params,
    }
  }, [cart?.id, params, offset])

  const { products, isLoading, count, limit } = useProducts(queryParams, {
    enabled: !!cart
  })

  function previousPage () {
    if (!limit || !count) {
      return
    }
    const newOffset = Math.max(0, offset - limit)
    setOffset(newOffset)
    setCurrentPage(currentPage - 1)
  }

  function nextPage () {
    if (!limit || !count) {
      return
    }
    const newOffset = Math.min(count, offset + limit)
    setOffset(newOffset)
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="flex-1 content-container">
      {!isLoading && products && (
        <>
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr className="text-left border-collapse border">
                <th className="p-3">Product Title</th>
                <th>Variant Title</th>
                <th>SKU</th>
                <th>Options</th>
                <th>Available Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                  <>
                    <tr>
                      <td className="p-3" rowSpan={product.variants.length + 1}>
                          <Link href={`/products/${product.handle}`} passHref={true}>
                            <a className="underline">{product.title}</a>
                          </Link>
                        </td>
                    </tr>
                    {product.variants.map((variant) => (
                      <ProductProvider product={product} key={variant.id}>
                         <tr className="border-collapse border">
                          <td>{variant.title}</td>
                          <td>{variant.sku}</td>
                          <td>
                            <ul>
                              {variant.options.map((option) => (
                                <li key={option.id}>
                                  {product.options.find((op) => op.id === option.option_id)?.title}: {option.value}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>{variant.inventory_quantity}</td>
                          <td><ProductPrice product={product} variant={variant} /></td>
                          <td>
                            <ProductActions product={product} selectedVariant={variant} />
                          </td>
                         </tr>
                      </ProductProvider>
                    ))}
                  </>
              ))}
            </tbody>
          </table>
          <div className="my-2 flex justify-center items-center">
            <Button onClick={previousPage} disabled={currentPage <= 1} className="w-max inline-flex">
              Prev
            </Button>
            <span className="mx-4">{currentPage}</span>
            <Button onClick={nextPage} disabled={count !== undefined && limit !== undefined && (count / (offset + limit)) <= 1} className="w-max inline-flex">
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Products