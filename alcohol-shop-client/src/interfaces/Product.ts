export default interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
    volume?: number;
    alcoholPercentage?: string;
    origin?: string;
    category: string;
    subcategory: string;
    image?: string;
    quantity?: number;
}