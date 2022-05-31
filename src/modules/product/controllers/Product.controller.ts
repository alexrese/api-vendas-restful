import StatusCodes from "@shared/enums/eStatusCode";
import { Request, Response } from "express";
import CreateProductService from "../services/CreateProduct.service";
import DeleteProductService from "../services/DeleteProduct.service";
import ListProductService from "../services/ListProducts.service";
import ShowProductByIdService from "../services/ShowProductById.service";
import UpdateProductService from "../services/UpdateProduct.service";


export default class ProductController{
  public async listAll(request: Request, response: Response): Promise<Response>{
    const listProducts = new ListProductService()
    const products = await listProducts.execute()
    return response.status(StatusCodes.OK).json({
      products
    })
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const { id } = request.params
    const showProduct = new ShowProductByIdService()
    const product = await showProduct.execute({ id })
    return response.status(StatusCodes.OK).json({
      product
    })
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const { name, price, quantity} = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({
      name,
      price,
      quantity
    })
    return response.status(StatusCodes.Created).json({
      message: 'Product created successfully',
      product
    })
  }

  public async update(request: Request, response: Response): Promise<Response>{

    const { name, price, quantity } = request.body
    const id  = request.params.id
    const updateProduct = new UpdateProductService()

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return response.status(StatusCodes.OK).json({
      message: 'Product updated successfully',
      product
    })
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const id = request.params.id
    const deleteProduct = new DeleteProductService()
    await deleteProduct.execute({ id });
    return response.status(StatusCodes.OK).json({
      message: 'Product deleted successfully'
    })
  }
}
