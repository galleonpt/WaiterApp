import { FlatList } from 'react-native';
import { Text } from '../Text';

import { Product, Image, ProductDetails, Separator, AddToCartButton } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { FC, useState } from 'react';
import { IProduct } from '../../types/Product';
import { BASE_URL } from '../../utils/api';

interface IMenuProps {
    products: IProduct[];
    onAddToCart: (product: IProduct)=> void
}

const Menu: FC<IMenuProps> = ({ onAddToCart, products }) => {
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const handleOpenModal = (product: IProduct) => {
        setIsProductModalVisible(true);
        setSelectedProduct(product);
    };

    return (
        <>
            <FlatList
                data={products}
                keyExtractor={product => product._id}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                ItemSeparatorComponent={Separator}
                renderItem={({item: product}) => (
                    <Product onPress={() => handleOpenModal(product)}>
                        <Image
                            source={{
                                uri: `${BASE_URL}/uploads/${product.imagePath}`
                            }}
                        />

                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text size={14} color="#666" style={{marginVertical: 8 }}>{product.description}</Text>
                            <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
                        </ProductDetails>

                        <AddToCartButton onPress={() => onAddToCart(product)}>
                            <PlusCircle />
                        </AddToCartButton>
                    </Product>
                )}
            />

            <ProductModal
                visible={isProductModalVisible}
                product={selectedProduct}
                onClose={() => setIsProductModalVisible(false)}
                onAddToCart={onAddToCart}
            />
        </>

    );
};

export default Menu;
