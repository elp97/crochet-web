
export interface ProductI {
    productID: number,
    name: string,
    price: number;
    description_Small: string;
    description_Long?: string;
    images?: ImageI[];
}

  
export interface ImageI {
    imageID: number,
    productID: number,
    imageURL: string
}