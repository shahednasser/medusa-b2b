import AccountLayout from "@modules/account/templates/account-layout"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"
import OverviewTemplate from "@modules/account/templates/overview-template"
import { ReactElement } from "react"
import { useAccount } from "@lib/context/account-context"
import { useRouter } from "next/router"

const Account: NextPageWithLayout = () => {
  const { customer, is_b2b } = useAccount()
  const router = useRouter()

  if (customer && !is_b2b) {
    router.push("/account")
  }

  return (
    <>
      <Head title="Wholesale Account" description="Overview of your account activity." />
      <OverviewTemplate />
    </>
  )
}

Account.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Account
