import { FC, PropsWithChildren } from 'react';
import { Text } from '../Text';
import { Container } from './styles';

interface IButtonProps extends PropsWithChildren {
    onPress: () => void;
    disabled?: boolean;
}

const Button: FC<IButtonProps> = ({children, onPress, disabled}) => {
    return (
        <Container onPress={onPress} disabled={disabled}>
            <Text weight="600" color="#fff">
                {children}
            </Text>
        </Container>
    );
};

export default Button;
