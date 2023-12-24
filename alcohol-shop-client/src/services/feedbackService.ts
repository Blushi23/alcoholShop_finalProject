import { Bounce, Flip, Slide, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../interfaces/Product";
import { flip } from "lodash";

export function successMsg(message: string) {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
}

export function errorMsg(message: string) {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
}
export function alertMsg(message: string) {
    toast.info(message, { position: toast.POSITION.TOP_CENTER, autoClose: 6000 })
}

export function addedToCartMsg(message: string) {
    toast(message, {
        position: toast.POSITION.TOP_RIGHT, autoClose: 5000, transition: Zoom
    })
}