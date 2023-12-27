import Cart from "./Cart";

export default interface Order {
    _id?: string;
    userId: string;
    deliveryAddress: {
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        floor: string;
        apartment: string;
        zip: string;
    }
    contactDetails: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }
    deliveryInstructions: string;
    products: Cart[];
    totalPrice: number;
}