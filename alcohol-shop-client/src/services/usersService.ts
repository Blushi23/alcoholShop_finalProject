import axios from "axios";
import User from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode";

let api: string = `${process.env.REACT_APP_API}/users`;

export function addUser(newUser: User) {
    return axios.post(`${api}`, newUser)
}

export function checkUser(userToCheck: User) {
    return axios.post(`${api}/login`, userToCheck);
}

export function updateUser(updatedUser: User, id: string) {
    return axios.put(`${api}/${id}`, updatedUser, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function updateUserRole(roleUpdated: boolean, id: string) {
    return axios.patch(`${api}/${id}`, roleUpdated, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function getTokenDetails() {
    let token = JSON.parse(sessionStorage.getItem("token") as string).token;
    return jwtDecode(token);
}

export function getUsers() {
    return axios.get(api, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function getUserById(id: string) {
    return axios.get(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function deleteUser(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}