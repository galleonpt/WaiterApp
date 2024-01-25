import { useState } from 'react';
import { IOrder } from '../../types/Order';
import OrderModal from '../OrderModal';
import { Board, OrdersContainer } from './styles';
import { api } from '../../utils/api';

interface IOrdersBoardProps {
  icon: string;
  title: string;
  orders: IOrder[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: IOrder['status']) => void;
}

export default function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus
}: IOrdersBoardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleOpenOrderModal = (order: IOrder) => {
    setIsModalOpened(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async () => {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    // toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalOpened(false);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalOpened}
        order={selectedOrder}
        isLoading={isLoading}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
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
