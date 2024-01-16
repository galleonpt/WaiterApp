import { FC } from 'react';
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
} from './styles';

interface ICartProps {
    cartItems: ICartItem[];
    selectedTable: string;
}

const Cart: FC<ICartProps> = ({ cartItems }) => {
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
                                <TouchableOpacity>
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
        </>
    );
};

export default Cart;
