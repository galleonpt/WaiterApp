import { useState } from 'react';
import { IOrder } from '../../types/Order';
import OrderModal from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface IOrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
}

export default function OrdersBoard({
  icon,
  title,
  orders,
}: IOrdersBoardProps) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  function handleOpenOrderModal(order: IOrder) {
    setIsModalOpened(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalOpened(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalOpened}
        order={selectedOrder}
        onClose={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{orders.length}</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              key={order._id}
              type="button"
              onClick={() => handleOpenOrderModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
