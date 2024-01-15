import { useState } from 'react';
import Button from '../components/Button';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Menu from '../components/Menu';
import TableModal from '../components/TableModal';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

const Main = () => {
    const [isTableModalVisible, setTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');

    const handleSaveTable = (table: string) => {
        setSelectedTable(table);
    };


    return (
        <>
            <Container>
                <Header/>

                <CategoriesContainer>
                    <Categories/>
                </CategoriesContainer>

                <MenuContainer>
                    <Menu/>
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
