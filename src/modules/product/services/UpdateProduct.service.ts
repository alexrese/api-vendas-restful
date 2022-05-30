import StatusCodes from "@shared/enums/eStatusCode";
import AppError from "@shared/errors/AppError";
import { IRequestUpdateProduct } from "@shared/protocols/Product";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";


class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequestUpdateProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    let product = await productRepository.findOne(id)

    if (!product)
      throw new AppError(`Product with the ID: ${id} not found`, StatusCodes.NotFound)

    const productExists = await productRepository.findByName(name)

    if (productExists && product.name !== name)
      throw new AppError(`Product ${name}, already registered.`, StatusCodes.BadRequest)

    product.name = name
    product.price = price
    product.quantity = quantity

    await productRepository.save(product)
    return product
  }
}

export default UpdateProductService
