export default interface User {
    firstName?: string;
    lastName?: string;
    email: string;
    birthDate?: string;
    phone?: string;
    password: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    floor?: number;
    apartment?: number;
    zip?: string;
    _id?: string;
    isAdmin?: boolean;
}

export interface DeliveryDetails extends Omit<User, 'password'> { }