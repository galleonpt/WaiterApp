import { IOrder } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';

const orders: IOrder[] = [
  {
    _id: '6410ff65b620a0f223084273',
    table: '2',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Coca Cola',
          imagePath: '1678759089334-coca-cola.png',
          price: 10,
        },
        quantity: 2,
        _id: '6410ff65b620a0f223084274',
      },
    ],
  },
];

export default function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕛" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="🧑‍🍳" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto" orders={[]} />
    </Container>
  );
}
