import axios from "axios";
import _ from "lodash";
import Order from "../interfaces/Order";
import Cart from "../interfaces/Cart";

let api: string = `${process.env.REACT_APP_API}/orders`;

export function createOrder(userId: string) {
    return axios.post(api, { userId, products: [] })
}

export function getOrders() {
    return axios.get<Order[]>(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function addOrder(orderToAdd: Order) {
    return axios.post(api, orderToAdd, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}