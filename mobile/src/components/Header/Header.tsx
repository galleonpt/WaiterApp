import { Text } from '../Text';
import { Container } from './styles';

const Header = () => {
    return (
        <Container>
            <Text size={14} opacity={.9}>Bem Vindo(a) ao</Text>
            <Text size={24} weight="700">WAITER
                <Text size={24}>
                    APP
                </Text>
            </Text>
        </Container>
    );
};

export default Header;
