import productRouter from "@modules/product/routes/product.routes";
import { Request, Response, Router } from "express";

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Everthing is Ok, running as intended'
  })
})


routes.use('/product', productRouter)

export default routes
