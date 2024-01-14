import styled from 'styled-components/native';

export const Product = styled.TouchableOpacity`
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const Image = styled.Image`
    width: 120px;
    height: 96px;

    border-radius: 8px;
`;

export const ProductDetails = styled.View`
    flex: 1;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background: rgba(204, 204, 204, .3);
    margin: 24px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    bottom: 0;
`;
