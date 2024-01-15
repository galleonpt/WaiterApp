import { FC } from 'react';
import { FlatList, Modal } from 'react-native';
import { Text } from '../Text';
import { IProduct } from '../../types/Product';
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, PriceContainer } from './styles';
import { Close } from '../Icons/Close';
import Button from '../Button';
import { formatCurrency } from '../../utils/formatCurrency';

interface IProductModal {
    visible: boolean;
    product: IProduct | null;
    onClose: () => void;
    onAddToCart: (product: IProduct) => void;
}

const ProductModal: FC<IProductModal> = ({ visible, product, onClose, onAddToCart }) => {
    if(!product) {
        return null;
    }

    function handleAddToCard() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onAddToCart(product!);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType='slide'
        >
            <Image
                source={{
                    uri: `http://192.168.1.5:3001/uploads/${product.imagePath}`
                }}
            >
                <CloseButton onPress={onClose}>
                    <Close/>
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight="600" >{product.name}</Text>
                    <Text color='#666' >
                        {product.description}
                    </Text>
                </Header>

                {product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text weight='600' color='#666'>Ingredientes</Text>
                        <FlatList
                            data={product.ingredients}
                            keyExtractor={ingredient => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 16 }}
                            renderItem={({ item: ingredient }) => (
                                <Ingredient>
                                    <Text>{ingredient.icon}</Text>
                                    <Text size={14} color="#666">{ingredient.name}</Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>

            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color='#666'>Preço</Text>
                        <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
                    </PriceContainer>
                    <Button onPress={handleAddToCard}>
                        Adicionar ao pedido
                    </Button>
                </FooterContainer>
            </Footer>

        </Modal>
    );
};

export default ProductModal;
