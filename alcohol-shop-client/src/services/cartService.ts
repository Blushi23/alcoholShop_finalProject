import axios from "axios";
import _ from "lodash";
import Product from "../interfaces/Product";
import { ReactNode, createContext, useContext } from "react";

let api: string = `${process.env.REACT_APP_API}/carts`;

export function createCart(userId: string) {
    return axios.post(api, { userId, products: [], active: true })
}

export function getCart() {
    return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function addToCart(productToAdd: Product) {
    let product = _.pick(productToAdd, [
        "_id", "name", "category", "price", "image"
    ]);
    return axios.post(api, product, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function removeProductFromCart(productId: string) {
    return axios.delete(`${api}/${productId}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })

}
