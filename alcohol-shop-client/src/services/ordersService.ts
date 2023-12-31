import axios from "axios";
import _ from "lodash";
import Order from "../interfaces/Order";
import Cart from "../interfaces/Cart";
import { DeliveryDetails } from "../interfaces/User";

let api: string = `${process.env.REACT_APP_API}/orders`;

export function createDeliveryAddress(userId: string, detailsToAdd: DeliveryDetails) {
    return axios.post(api, { userId, ...detailsToAdd },
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } }
    )
}

export function getOrders() {
    return axios.get<Order[]>(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function addOrder(orderToAdd: Order) {
    return axios.post(api, orderToAdd, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}