import axios from "axios";
import _ from "lodash";
import Order from "../interfaces/Order";
import Cart from "../interfaces/Cart";
import { DeliveryDetails } from "../interfaces/User";

let api: string = `${process.env.REACT_APP_API}/orders`;

export function createDeliveryAddress(detailsToAdd: DeliveryDetails) {
    // let deliveryDetails = _.pick(detailsToAdd, ["_id", "firstName", "lastName", "email", "phone", "contry", "city", "street", "houseNumber", "floor", "apartment", "zip", "deliveryInstructions"]);
    return axios.post(`/${api}`, detailsToAdd,
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } }
    )
    // export function createOrder(userId: string, newOrder: Order) {
    //     return axios.post(`/${api}/${userId}`, newOrder,
    //         { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } }
    //     )
}
// export function createOrder(userId: string) {
//     return axios.post(api, { userId, products: [] })
// }

export function getOrders() {
    return axios.get<Order[]>(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function addOrder(orderToAdd: Order) {
    return axios.post(api, orderToAdd, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}