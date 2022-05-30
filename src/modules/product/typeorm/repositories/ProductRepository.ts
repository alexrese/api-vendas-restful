import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Products";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

  /**
   * Find the product by the name or return a undefined item
   * @param name Name of the product
   * @returns The product with the name passed by parameter or undefined
   */
  public async findByName(name: string): Promise<Product | undefined>{
    const product = this.findOne({
      where: {
        name
      }
    })
    return product
  }
}
