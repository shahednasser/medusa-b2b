import Head from "@modules/common/components/head"
import InfiniteProducts from "@modules/products/components/infinite-products"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"
import Products from "@modules/wholesale/components/products"
import RefinementList from "@modules/store/components/refinement-list"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { useAccount } from "@lib/context/account-context"
import { useState } from "react"

const Store: NextPageWithLayout = () => {
  const [params, setParams] = useState<StoreGetProductsParams>({})
  const { is_b2b } = useAccount()

  return (
    <>
      {!is_b2b && (
        <>
          <Head title="Store" description="Explore all of our products." />
          <div className="flex flex-col small:flex-row small:items-start py-6">
            <RefinementList refinementList={params} setRefinementList={setParams} />
            <InfiniteProducts params={params} />
          </div>
        </>
      )}
      {is_b2b && (
        <>
          <Head title="Wholesale Products" description="Explore all of our products." />
          <div className="flex flex-col small:flex-row small:items-start py-6">
            <Products params={{
              ...params,
              sales_channel_id: [process.env.NEXT_PUBLIC_SALES_CHANNEL_ID || ""]
            }} />
          </div>
        </>
      )}
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
