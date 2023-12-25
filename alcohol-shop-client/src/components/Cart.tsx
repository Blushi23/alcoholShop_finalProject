import { FunctionComponent, useEffect, useState } from "react"; import Loading from "./Loading";
import Product from "../interfaces/Product";
import { getCart, removeProductFromCart } from "../services/cartService";
import Quantifier from "./Quantifier";
import { successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productsService";

interface CartProps {
    loading: any;
    setLoading: Function
}

const Cart: FunctionComponent<CartProps> = ({ loading, setLoading }) => {
    let navigate = useNavigate();
    let [productsInCart, setProductsInCart] = useState<Product[]>([])



    useEffect(() => {
        setLoading(true);

        let userId: string = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
        getCart()
            .then((res) => {
                setProductsInCart(res.data);
                setLoading(false);

            })
            .catch((err) => {
                console.log(err); setLoading(false);
            })
    }, []);


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
            <h3>Cart</h3>
            <div className="row">
                <div className="col-md-8">
                    {loading ? (<Loading />) : (productsInCart.length ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsInCart.map((product: Product) => (
                                    <tr
                                        key={product._id}>
                                        <td><img src={`${product.image}`} alt={`${product.name}`} style={{ height: "8rem" }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.price} &#8362;</td>
                                        <td>
                                            {/* <Quantifier
                                                removeProductCallback={() => handleRemoveProduct(product.id)}
                                                productId={product.id}
                                                handleUpdateQuantity={handleUpdateQuantity} /> */}
                                            {/* <Quantifier
                                                productId={product._id || ""}
                                                quantity={product.quantity || 0}
                                                onQuantityChange={handleQuantity}
                                            /> */}
                                        </td>
                                        {/* <td>{product.quantity}</td> */}
                                        <td><button className="btn" onClick={() => handleRemoveFromCart(product._id)}><i className="fa-solid fa-trash-can"></i> Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<p>There are no products in the cart</p>))}


                </div>
                <div className="col-md-3 mx-4 orderSummary">
                    <h4 className="text-center">Order Summary</h4>
                    <hr />
                    <h6>There are _ products in the cart</h6>
                    {/* <h6>There are {totalProducts} products in the cart</h6> */}
                    {/* <h4><b>Total Price:{totalPrice} NIS</b></h4> */}
                    {/* <h4><b>Total Price: {totalPrice} NIS</b></h4> */}
                    <button className="btn checkout-btn btn-info" onClick={() => navigate("/delivery")}>Proceed to checkout</button>

                </div>
            </div>



        </>
    )
}

export default Cart;