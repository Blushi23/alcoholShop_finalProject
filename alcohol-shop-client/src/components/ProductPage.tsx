import { FunctionComponent, useContext, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { siteTheme } from "../App";
import { getProductById } from "../services/productsService";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { addedToCartMsg } from "../services/feedbackService";
import AlertModal from "./AlertModal";

interface ProductPageProps {
    products: any;
    setProducts: Function;
    userInfo: any;
    openAlertModal: boolean;
    setOpenAlertModal: Function;
}

const ProductPage: FunctionComponent<ProductPageProps> = ({ products, setProducts, userInfo, openAlertModal, setOpenAlertModal }) => {
    let navigate = useNavigate();
    let { category, subcategory, id } = useParams();
    let [product, setProduct] = useState<Product>()
    let theme = useContext(siteTheme);

    useEffect(() => {
        if (category && subcategory && id) {
            getProductById(category, subcategory, id)
                .then((res) => {
                    setProduct(res.data)

                })

                .catch((err) => { console.log(err); }
                );
        }
    }, [setProducts, category, subcategory, id])

    let handleAddToCart = (product: Product) => {
        if (!userInfo.email) setOpenAlertModal(true)
        addToCart(product)
            .then((res) => addedToCartMsg(` ${product.name} added to cart`))
            .catch((err) => console.log(err))
    }


    return (
        <div className={`product-page ${theme}`}>
            {product && (
                <div className="container productContent">
                    <div className="row ">
                        <div className="col-sm-4 d-flex justify-content-center align-items-center">
                            <img className="showProductImage" src={`${product.image}`} alt={`${product.name}`} />
                        </div>
                        <div className="col-sm-8 productInfo ">
                            <h2 className="product-title">{`${product.name}`}</h2>
                            <p>Bottle volume: {`${product.volume}`} ml</p>
                            <h5 className="mt-3">Price: {`${product.price}`} &#8362;</h5>
                            {!userInfo.email && <button className="btn addToCart-btn" onClick={() => setOpenAlertModal(true)}>Add To Cart</button>}

                            {userInfo.email && userInfo.isAdmin === false && <button className="btn addToCart-btn" onClick={() => handleAddToCart(product!)}>Add To Cart</button>}
                            {userInfo.isAdmin && <button className="btn addToCart-btn-admin" disabled>Add To Cart</button>}
                        </div>
                        <div className="productDescription">
                            <h6 className="productDescTitle">Description:</h6>
                            <p >{`${product.description}`} </p>
                            <p><b>Origin country:</b> {`${product.origin}`} </p>
                            <p><b>Alcohol percentage:</b> {`${product.alcoholPercentage}`} %</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-end ">
                <button className="btn backBtn w-25" onClick={() => navigate(-1)}>Back</button>
            </div>
            <AlertModal showAlert={openAlertModal} hideAlert={() => setOpenAlertModal(false)} />
        </div>
    )
}

export default ProductPage;