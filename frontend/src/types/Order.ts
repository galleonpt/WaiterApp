interface IOrderProduct {
  name: string;
  imagePath: string;
  price: number;
}

interface IOrderProducts {
  _id: string;
  quantity: number;
  product: IOrderProduct;
}

export interface IOrder {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: IOrderProducts[];
}
