import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
    padding: 0 24px;
    background: rgba(0, 0, 0, .6);

    flex: 1;
    align-items: stretch;
    justify-content: center;
`;


export const ModalBody = styled.View`
    padding: 24px;

    background: #fafafa;
    border-radius: 8px;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Form = styled.View`
    margin-top: 32px;
    gap: 24px;
`;

export const Input = styled.TextInput`
    background: #fff;
    border: 1px solid rgba(204, 204, 204, .5);
    border-radius: 8px;
    padding: 16px;
`;
