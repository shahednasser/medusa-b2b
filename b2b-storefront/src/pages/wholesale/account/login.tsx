import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import LoginTemplate from "@modules/wholesale/templates/login-template"
import { NextPageWithLayout } from "types/global"

const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Sign in" description="Sign in to your Wholesale account." />
      <LoginTemplate />
    </>
  )
}

Login.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Login
