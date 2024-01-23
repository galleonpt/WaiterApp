import { FC, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import { ICartItem } from '../../types/CartItem';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
    Item,
    Actions,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Summary,
    TotalContainer,
} from './styles';
import Button from '../Button';
import { IProduct } from '../../types/Product';
import OrderConfirmedModal from '../OrderConfirmedModal';
import { api } from '../../utils/api';

interface ICartProps {
    cartItems: ICartItem[];
    selectedTable: string;
    onAdd: (product: IProduct) => void;
    onDecrement: (product: IProduct) => void;
    onConfirmOrder: () => void;
}

const Cart: FC<ICartProps> = ({ selectedTable, cartItems, onAdd, onDecrement, onConfirmOrder }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const total = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.product.price * cartItem.quantity;
    }, 0);

    const handleConfirmOrder = async () => {
        setIsLoading(true);
        const payload = {
            table: selectedTable,
            products: cartItems.map(cartItem => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity
            }))
        };
        await api.post('/orders', payload);
        setIsLoading(false);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onConfirmOrder();
        setIsModalVisible(false);
    };

    return (
        <>
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItem }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://192.168.1.5:3001/uploads/${cartItem.product.imagePath}`
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">{cartItem.quantity}x</Text>
                                </QuantityContainer>

                                <ProductDetails>
                                    <Text size={14} weight="600" >{cartItem.product.name}</Text>
                                    <Text size={14} color="#666">{formatCurrency(cartItem.product.price)}</Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                                    <PlusCircle/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}

            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ?
                        (
                            <>
                                <Text color="#666">Total</Text>
                                <Text size={20} weight="600" >{formatCurrency(total)}</Text>
                            </>
                        ) :
                        (
                            (
                                <Text color="#999">Seu carrinho está vazio</Text>
                            )
                        )}
                </TotalContainer>
                <Button
                    onPress={handleConfirmOrder}
                    disabled={cartItems.length === 0}
                    loading={isLoading}
                >
                    Confirmar pedido
                </Button>
            </Summary>

            <OrderConfirmedModal
                visible={isModalVisible}
                onOk={handleOk}
            />
        </>
    );
};

export default Cart;
