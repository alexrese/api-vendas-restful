import { getCustomRepository } from 'typeorm'

import { IRequestDeleteProduct } from '@shared/protocols/Product'

import AppError from '@shared/errors/AppError'
import StatusCodes from '@shared/enums/eStatusCode'
import { ProductRepository } from '../typeorm/repositories/ProductRepository'
import { Product } from '../typeorm/entities/Products'


class DeleteProductService {
  public async execute({ id } : IRequestDeleteProduct): Promise<void>{
    const productsRepository = getCustomRepository(ProductRepository)
    const product: Product | undefined = await productsRepository.findOne(id)

    if (!product)
      throw new AppError(`Sorry, could not find the product with the id: ${id}`, StatusCodes.NotFound)

    await productsRepository.remove(product)
  }

}

export default DeleteProductService
