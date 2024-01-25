import { useEffect, useState } from 'react';
import { IOrder } from '../../types/Order';
import OrdersBoard from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const waitingOrders = orders.filter((order) => order.status === 'WAITING');

  const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION');

  const doneOrders = orders.filter((order) => order.status === 'DONE');

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  };

  const handleOrderStatusChange = (orderId: string, status: IOrder['status']) => {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  };

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });
    socket.on('order@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    console.log('effect');
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  return (
    <Container>
      <OrdersBoard
        icon="🕛" title="Fila de espera"
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="🧑‍🍳" title="Em preparação"
        orders={inProductionOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅" title="Pronto"
        orders={doneOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
