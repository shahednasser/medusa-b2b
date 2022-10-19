import { MEDUSA_BACKEND_URL, medusaClient } from "@lib/config"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

import { Customer } from "@medusajs/medusa"
import axios from "axios"
import { useMeCustomer } from "medusa-react"
import { useMutation } from "react-query"
import { useRouter } from "next/router"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

interface AccountContext {
  customer?: Omit<Customer, "password_hash">
  retrievingCustomer: boolean
  loginView: [LOGIN_VIEW, React.Dispatch<React.SetStateAction<LOGIN_VIEW>>]
  checkSession: () => void
  refetchCustomer: () => void
  handleLogout: () => void
  is_b2b: boolean
}

const AccountContext = createContext<AccountContext | null>(null)

interface AccountProviderProps {
  children?: React.ReactNode
}

const handleDeleteSession = () => {
  return medusaClient.auth.deleteSession()
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [is_b2b, setIsB2b] = useState(false)
  const {
    customer,
    isLoading: retrievingCustomer,
    refetch,
    remove,
  } = useMeCustomer({ onError: () => {} })
  const loginView = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  const router = useRouter()

  const checkSession = useCallback(() => {
    if (!customer && !retrievingCustomer) {
      router.push(router.pathname.includes("wholesale") ? "/wholesale/account/login" : "/account/login")
    }
  }, [customer, retrievingCustomer, router])

  const checkB2b = useCallback(async () => {
    if (customer) {
      //check if the customer is a b2b customer
      const { data } = await axios.get(`${MEDUSA_BACKEND_URL}/store/customers/is-b2b`, {
        withCredentials: true
      })
      setIsB2b(data.is_b2b)
    } else {
      setIsB2b(false)
    }
  }, [customer])

  const useDeleteSession = useMutation("delete-session", handleDeleteSession)

  useEffect(() => {
    checkB2b()
  }, [checkB2b])

  const handleLogout = () => {
    useDeleteSession.mutate(undefined, {
      onSuccess: () => {
        remove()
        loginView[1](LOGIN_VIEW.SIGN_IN)
        router.push("/")
        setIsB2b(false)
      },
    })
  }

  return (
    <AccountContext.Provider
      value={{
        customer,
        retrievingCustomer,
        loginView,
        checkSession,
        refetchCustomer: refetch,
        handleLogout,
        is_b2b
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider")
  }
  return context
}
