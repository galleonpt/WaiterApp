import { useState } from 'react';
import Button from '../components/Button';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Menu from '../components/Menu';
import TableModal from '../components/TableModal';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';
import Cart from '../components/Cart';
import { ICartItem } from '../types/CartItem';
import { IProduct } from '../types/Product';

const Main = () => {
    const [isTableModalVisible, setTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    const handleSaveTable = (table: string) => {
        setSelectedTable(table);
    };

    const handleCancelOrder = () => {
        setSelectedTable('');
        setCartItems([]);
    };

    const handleAddToCart = (product: IProduct) => {
        if (!selectedTable) {
            setTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                cartItems => cartItems.product._id === product._id
            );

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                });
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];

            newCartItems[itemIndex] = {
                ...item,
                quantity: newCartItems[itemIndex].quantity + 1,
            };

            return newCartItems;
        });
    };

    const handleDecrementCartItem = (product: IProduct) => {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                cartItems => cartItems.product._id === product._id
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if (item.quantity === 1) {

                const newCartItems = [...prevState];
                newCartItems.splice(itemIndex, 1);

                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: newCartItems[itemIndex].quantity - 1,
            };

            return newCartItems;
        });
    };

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleCancelOrder}
                />

                <CategoriesContainer>
                    <Categories/>
                </CategoriesContainer>

                <MenuContainer>
                    <Menu
                        onAddToCart={handleAddToCart}
                        // products={products}
                    />
                </MenuContainer>
            </Container>

            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setTableModalVisible(true)}
                        >
                        Novo pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            selectedTable={selectedTable}
                            onAdd={handleAddToCart}
                            onDecrement={handleDecrementCartItem}
                        />
                    )}
                </FooterContainer>
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setTableModalVisible(false)}
                onSave={handleSaveTable}
            />
        </>
    );
};

export default Main;
