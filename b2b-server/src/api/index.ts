import { CustomerService } from "@medusajs/medusa"
import { Router } from "express"
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate-customer"
import cors from "cors"
import { projectConfig } from "../../medusa-config"

export default () => {
  const router = Router()

  const corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  }

  router.options("/store/customers/is-b2b", cors(corsOptions))
  router.get("/store/customers/is-b2b", cors(corsOptions), authenticate(), async (req, res) => {
    if (!req.user) {
      return res.json({
        is_b2b: false
      })
    }

    const customerService: CustomerService = req.scope.resolve('customerService');

    const customer = await customerService
      .retrieve(req.user.customer_id, {
        relations: ['groups']
      })

    const is_b2b = customer.groups.some((group) => group.metadata.is_b2b === "true");
    
    return res.json({
      is_b2b
    })
  })

  return router;
}