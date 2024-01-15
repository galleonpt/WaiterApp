interface IIngredients {
    name: string;
    icon: string;
    _id: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    ingredients: IIngredients[]
}


