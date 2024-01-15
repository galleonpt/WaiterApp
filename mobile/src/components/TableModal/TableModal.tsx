import { FC, useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import Button from '../Button';

interface ITableModalProps {
    visible: boolean
    onClose: () => void
    onSave: (table: string) => void
}

const TableModal: FC<ITableModalProps> = ({ visible, onClose, onSave }) => {
    const [table, setTable] = useState('');

    const handleSave = () => {
        onSave(table);
        onClose();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType='fade'
        >
            <Overlay behavior={Platform.OS === 'android' ? 'height': 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight="600">Informe a Mesa</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Close color='#666'/>
                        </TouchableOpacity>
                    </Header>

                    <Form>
                        <Input
                            placeholder="Numero da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />

                        <Button
                            disabled={table.length === 0}
                            onPress={handleSave}
                        >
                            Guardar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
};

export default TableModal;
