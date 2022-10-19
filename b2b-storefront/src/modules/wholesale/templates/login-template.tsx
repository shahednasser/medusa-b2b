import Login from "../components/login"
import { useAccount } from "@lib/context/account-context"
import { useEffect } from "react"
import { useRouter } from "next/router"

const WholesaleLoginTemplate = () => {
  const { customer, retrievingCustomer, is_b2b } = useAccount()

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer ) {
      router.push(is_b2b ? "/wholesale/account" : "/account")
    }
  }, [customer, retrievingCustomer, router, is_b2b])

  return (
    <div className="w-full flex justify-center py-24">
      <Login />
    </div>
  )
}

export default WholesaleLoginTemplate
