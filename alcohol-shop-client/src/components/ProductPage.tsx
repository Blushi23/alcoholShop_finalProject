import { FunctionComponent, useContext, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { siteTheme } from "../App";
import { getProductById, getProducts } from "../services/productsService";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { addedToCartMsg } from "../services/feedbackService";

interface ProductPageProps {
    products: any;
    setProducts: Function;
    // loading: any;
    // setLoading: Function;


}

const ProductPage: FunctionComponent<ProductPageProps> = ({ products, setProducts }) => {
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
        addToCart(product)
            .then((res) => addedToCartMsg(` ${product.name} added to cart`))
            .catch((err) => console.log(err))
    }


    return (
        <>
            {product && (
                <div className="container productContent">
                    <div className="row ">
                        <div className="col d-flex justify-content-center align-items-center">
                            <img className="productImg" src={`${product.image}`} alt={`${product.name}`} />
                        </div>
                        <div className="col productInfo ">
                            <h2>{`${product.name}`}</h2>
                            <h5 className="mt-5">Price: {`${product.price}`} &#8362;</h5>
                            <p>Bottle volume: {`${product.volume}`} ml</p>
                            <button className="btn" onClick={() => handleAddToCart(product!)}>Add To Cart</button>
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
            <div className="d-flex justify-content-end backBtn">
                <button className="btn btn-outline-info" onClick={() => navigate(-1)}>Back</button>
            </div>
        </>
    )
}

export default ProductPage;