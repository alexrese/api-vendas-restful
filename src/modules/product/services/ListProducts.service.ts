import StatusCodes from '@shared/enums/eStatusCode'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/Products'
import { ProductRepository } from '../typeorm/repositories/ProductRepository'

class ListProductService {
  public async execute(): Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository)
    try {
      const products = await productsRepository.find()

      if (products.length <= 0 || products === undefined)
        console.log('batman')

        // throw new AppError('There is no products to list', StatusCodes.NoContent)

      return products
    } catch (e) {
        throw new Error("ops");

    }
  }
}

export default ListProductService
