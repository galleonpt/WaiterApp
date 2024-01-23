import { FC, useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from '../Text';
import { Category, Icon } from './styles';
import { ICategory } from '../../types/Categoru';

interface ICategoriesProps {
    categories: ICategory[];
    onSelectedCategory: (categoryId: string) => Promise<void>;
  }

const Categories: FC<ICategoriesProps> = ({ categories, onSelectedCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelectCategory = (categoryId: string) => {
        const category = selectedCategory === categoryId ? '' : categoryId;
        onSelectedCategory(category);
        setSelectedCategory(category);
    };

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={category => category._id}
            contentContainerStyle= {{ paddingRight: 24 }}
            renderItem={({item: category})=>{
                const isSelected = selectedCategory === category._id;

                return (
                    <Category key={category._id} onPress={() => handleSelectCategory(category._id)}>
                        <Icon>
                            <Text opacity={isSelected? 1 : .5} >{category.icon}</Text>
                        </Icon>

                        <Text size={14} weight="600" opacity={isSelected? 1: .5} >{category.name}</Text>
                    </Category>
                );
            }}
        />
    );
};

export default Categories;
