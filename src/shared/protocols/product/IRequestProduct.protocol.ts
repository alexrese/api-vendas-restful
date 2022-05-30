export interface IRequestCreateProduct {
  name: string
  price: number
  quantity: number
}

export interface IRequestUpdateProduct extends IRequestCreateProduct{
  id: number
}

export interface IRequestShowProductById {
  id: string
}

export interface IRequestDeleteProduct extends IRequestShowProductById{}
