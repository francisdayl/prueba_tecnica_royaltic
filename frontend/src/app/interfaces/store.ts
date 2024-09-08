export interface Store {
}

export interface Category {
    id:   number;
    name: string;
}

export interface Product {
    id:          number;
    name:        string;
    image:       string;
    description: string;
    price:       string;
    category:    number[];
}

export interface ProductFull {
    id:          number;
    name:        string;
    image:       string;
    description: string;
    price:       string;
    category:    Category[];
}
