import axios from "axios";
import Product from "../interfaces/Product";
import { useState } from "react";
import Search from "../components/Search";

let api: string = `${process.env.REACT_APP_API}/products`;

export function getProducts() {
    return axios.get(api);
}
export function getProductById(category: string, subcategory: string, id: string) {
    const token = sessionStorage.getItem("token");
    if (!token) return axios.get(`${api}/${category}/${subcategory}/${id}`)
    return axios.get(`${api}/${category}/${subcategory}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function getProductByCategory(category: string) {
    const token = sessionStorage.getItem("token");
    if (!token) return axios.get(`${api}/${category}`)
    return axios.get(`${api}/${category}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function getProductBySubCategory(category: string, subcategory: string) {
    const token = sessionStorage.getItem("token");
    if (!token) return axios.get(`${api}/${category}/${subcategory}`)
    return axios.get(`${api}/${category}/${subcategory}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// export function getSubcategoriesByCategory(category: string) {
//     const token = sessionStorage.getItem("token");
//     if (!token) return axios.get(`${api}/subcategories/${category}`);
//     return axios.get(`${api}/subcategories/${category}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
// }


export function addProduct(newProduct: Product) {
    return axios.post(api, newProduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function updateProduct(updatedProduct: Product, category: string, subcategory: string, id: string) {
    return axios.put(`${api}/${category}/${subcategory}/${id}`, updatedProduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function deleteProduct(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// export async function searchProduct(key: string) {
//     try {
//         let response = await axios.get(`${api}/Search`, { params: { key, limit: 5 } })
//         return response.data;

//     } catch (error) {
//         console.log(error);
//         return [];
//     }
export async function searchProduct(key: string, products: Product[]) {
    try {
        let searchProducts = products.filter(product => product.name.toLowerCase().includes(key.toLowerCase()))
        await new Promise(resolve => setTimeout(resolve, 1000))
        return { data: searchProducts.slice(0, 5) }
    } catch (error) {
        console.log(error);

    }

    //     return axios.get(`${api}/search`, { params: { key: { key }, limit: 5 } })
}