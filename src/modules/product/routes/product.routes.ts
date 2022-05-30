import { Router } from "express"
import ProductController from "../controllers/Product.controller"

const productRouter = Router()
const productController = new ProductController()

productRouter.get('/', productController.listAll)
productRouter.post('/', productController.create)
productRouter.get('/:id', productController.show)
productRouter.put('/:id', productController.update)
productRouter.delete('/:id', productController.delete)

export default productRouter
