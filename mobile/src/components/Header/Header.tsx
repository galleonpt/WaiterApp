import { FC } from 'react';
import { Text } from '../Text';
import { Container, OrderHeader, Content, TableBox } from './styles';
import { TouchableOpacity } from 'react-native';

interface IHeaderProps {
    selectedTable: string;
    onCancelOrder: () => void
}

const Header: FC<IHeaderProps> = ({ selectedTable, onCancelOrder }) => {
    return (
        <Container>
            {!selectedTable && (
                <>
                    <Text size={14} opacity={.9}>Bem Vindo(a) ao</Text>
                    <Text size={24} weight="700">WAITER
                        <Text size={24}>
                        APP
                        </Text>
                    </Text>
                </>
            )}

            {selectedTable && (
                <OrderHeader>
                    <Content>
                        <Text size={24} weight="600">Pedido</Text>

                        <TouchableOpacity onPress={onCancelOrder}>
                            <Text size={14} weight="600" color="#d73035">cancelar pedido</Text>
                        </TouchableOpacity>
                    </Content>

                    <TableBox>
                        <Text color="#666">Mesa {selectedTable}</Text>
                    </TableBox>
                </OrderHeader>
            )}
        </Container>
    );
};

export default Header;
