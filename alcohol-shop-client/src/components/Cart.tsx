import { FunctionComponent, useContext, useEffect, useState } from "react"; import Loading from "./Loading";
import Product from "../interfaces/Product";
import { addToCart, getCart, reduceFromCart, removeProductFromCart } from "../services/cartService";
import { successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../services/CurrencyFormat";
import { siteTheme } from "../App";

interface CartProps {
    loading: any;
    setLoading: Function
    quantity: Quantity;
    setQuantity: Function;
    openPaymentModal: boolean;
    setOpenPaymentModal: Function;
    userInfo: any;
    cartData: any;
    setCartData: Function
    render: Function;
    productsChanged: boolean;
    setProductsChanged: Function;

}
type Quantity = { [key: string]: number };

const Cart: FunctionComponent<CartProps> = ({ loading, setLoading, quantity, setQuantity, openPaymentModal, setOpenPaymentModal, userInfo, cartData, setCartData, render, productsChanged, setProductsChanged }) => {
    let navigate = useNavigate();
    let theme = useContext(siteTheme);
    let [productsInCart, setProductsInCart] = useState<Product[]>([])
    let totalQuantity = Object.values(quantity).reduce((total, currentQuantity) => total + currentQuantity, 0);
    let totalPrice = currencyFormat(productsInCart.reduce((total, product) => total + (product.price * (quantity[product._id as string] || 0)), 0))

    useEffect(() => {
        setLoading(true);

        let userId: string = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
        getCart()

            .then((res) => {
                console.log("1");
                setCartData(res.data);
                setProductsInCart(res.data);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err); setLoading(false);
            })
    }, [setProductsChanged, setCartData, setLoading]);

    useEffect(() => {
        let quantites: Quantity = {};
        productsInCart.forEach((product: Product) => {
            if (product._id) {
                quantites[product._id] = product.quantity || 0;
            }
        });
        setQuantity(quantites);

    }, [productsInCart, setQuantity])

    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => {
                handleIncrement(product._id)
            })
            .catch((err) => console.log(err))
    }
    let handleIncrement = (productId?: string) => {
        if (productId) {
            setQuantity({ ...quantity, [productId]: (quantity[productId] || 0) + 1, })

        }
    };
    let handleDecrement = (productId?: string) => {
        if (productId && quantity[productId] && quantity[productId] > 0) {
            let updatedQuantity = quantity[productId] - 1;
            if (updatedQuantity === 0) handleRemoveFromCart(productId)
            setQuantity({ ...quantity, [productId]: updatedQuantity });

        }
    };

    let handleReduceFromCart = (product: Product) => {
        reduceFromCart(product)
            .then((res) => {
                handleDecrement(product._id)
            })
            .catch((err) => console.log(err))
    }

    let handleRemoveFromCart = (productId?: string) => {
        if (productId) {
            removeProductFromCart(productId)
                .then(() => {
                    successMsg("Item removed successfully from the cart");
                    getCart()
                        .then((res) => {
                            setProductsInCart(res.data);
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        } else {
            console.log("Product ID is undefined");
        }
    }

    return (
        <>
            <h1 className="cart-title">Cart</h1>
            <div className="row">
                <div className="col-md-8">
                    {loading ? (<Loading />) : (productsInCart.length ? (

                        <table className="table">
                            <thead>
                                <tr className="table-titles">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="table-content">
                                {productsInCart.map((product: Product) => (
                                    <tr
                                        key={product._id}>
                                        <td><img src={`${product.image}`} alt={`${product.name}`} className="table-image" style={{ height: "8rem" }} /></td>
                                        <td className="table-name">{product.name}</td>
                                        <td>{product.price} &#8362;</td>
                                        <td>
                                            <button className="btn quantiy-icon" onClick={() => handleAddToCart(product)}><i className="fa-solid fa-plus quantiy-icon"></i></button>
                                            <span>{quantity[product._id as string]}</span>
                                            <button className="btn quantiy-icon" onClick={() => handleReduceFromCart(product)}><i className="fa-solid fa-minus quantiy-icon"></i></button>

                                        </td>
                                        <td>{product.price * (quantity[product._id as string] || 0)} &#8362;</td>
                                        {/* <td>{product.quantity}</td> */}
                                        <td><button className="btn remove-table-btn" onClick={() => handleRemoveFromCart(product._id)}><i className="fa-solid fa-trash-can"></i> Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<p className="table-p">There are no products in the cart</p>))}


                </div>
                <div className="col-md-3 mx-4 orderSummary">
                    <h4 className="text-center">Order Summary</h4>
                    <hr />
                    <h6>{`There are ${totalQuantity} products in the cart`}</h6>
                    <h4><b>Total Price:{totalPrice}</b></h4>
                    <div className="proceedToCheckout">
                        <button className="btn checkout-btn " onClick={() => navigate("/delivery")}>Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;