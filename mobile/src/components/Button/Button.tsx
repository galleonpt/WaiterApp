import { FC, PropsWithChildren } from 'react';
import { Text } from '../Text';
import { Container } from './styles';
import { ActivityIndicator } from 'react-native';

interface IButtonProps extends PropsWithChildren {
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const Button: FC<IButtonProps> = ({ children, onPress, disabled, loading }) => {
    return (
        <Container onPress={onPress} disabled={disabled || loading}>
            {!loading && (
                <Text weight="600" color="#fff">
                    {children}
                </Text>
            )}

            {loading && (
                <ActivityIndicator color="#fff" />
            )}
        </Container>
    );
};

export default Button;
