import { getCustomRepository } from 'typeorm'
import { IRequestCreateProduct } from '@shared/protocols/Product/'

import AppError from '@shared/errors/AppError'
import StatusCodes from '@shared/enums/eStatusCode'
import { Product } from '../typeorm/entities/Products'
import { ProductRepository } from '../typeorm/repositories/ProductRepository'

class CreateProductService {
  public async execute({name, price, quantity}: IRequestCreateProduct): Promise<Product>{
    const productRepository = getCustomRepository(ProductRepository)
    const productExists = await productRepository.findByName(name)

    if (productExists)
      throw new AppError(`Product ${name} already exists`, StatusCodes.BadRequest)

    const product  = productRepository.create({
      name,
      price,
      quantity
    })

    await productRepository.save(product)
    return product
  }
}

export default CreateProductService
