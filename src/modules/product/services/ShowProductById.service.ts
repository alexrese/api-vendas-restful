import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/Products'
import { ProductRepository } from '../typeorm/repositories/ProductRepository'

import AppError from '@shared/errors/AppError'
import StatusCodes from '@shared/enums/eStatusCode'
import { IRequestShowProductById } from '@shared/protocols/Product'

class ShowProductByIdService {
  public async execute(id: IRequestShowProductById): Promise<Product>{
    const productsRepository = getCustomRepository(ProductRepository)
    const product: Product | undefined = await productsRepository.findOne(id)

    if (!product)
      throw new AppError(`Sorry, could not find the product with the id: ${id}`, StatusCodes.NotFound)
    return product
  }

}

export default ShowProductByIdService
