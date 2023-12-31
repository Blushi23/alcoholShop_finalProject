import { FunctionComponent, useContext, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { siteTheme } from "../App";
import { currencyFormat } from "../services/CurrencyFormat";
import { addedToCartMsg, errorMsg } from "../services/feedbackService";
import { addToCart } from "../services/cartService";
import AlertModal from "./AlertModal";

interface SearchResultsProps {
    products: Product[];
    setProducts: Function;
    userInfo: any;
    openAlertModal: boolean;
    setOpenAlertModal: Function;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({ products, setProducts, userInfo, openAlertModal, setOpenAlertModal }) => {
    let location = useLocation();
    let navigate = useNavigate();
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let searchQuery = decodeURIComponent(location.pathname.split("/")[2]);
    let [searchResults, setSearchResults] = useState<Product[]>([]);
    let { category, subcategory } = useParams();

    useEffect(() => {
        let filteredResults = products.filter((product: Product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [products, searchQuery]);

    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";

    let handleAddToCart = (product: Product) => {
        if (!userInfo.email) setOpenAlertModal(true)
        if (userInfo.isAdmin) errorMsg("Admin user cannot add items to cart")
        else {

            addToCart(product)
                .then((res) => addedToCartMsg(` ${product.name} added to cart`))
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <h2 className="searchRes-title">Search Results for: {searchQuery}</h2>
            <div className="search-results ">
                <div className="row mx-5">
                    {searchResults.map((product: Product) => (
                        <div
                            key={product._id}
                            className="card col-md-3 mt-3 align-items-center m-2"
                            style={{ width: " 16.5rem", height: "28rem" }}>
                            <img src={product.image ? (`${product.image}`) : noImg} alt={product.name}
                                style={{ height: "13rem" }} className="mt-2 product-img"

                                onClick={() => navigate(`/products/${category}/${subcategory}/${product._id}`)} />
                            <div className="products-card-body">
                                <h5 className="card-title mt-3">{product.name}</h5>
                                <p>Volume: {product.volume} ml</p>
                                <hr className="mt-0" />
                                <p className="card-text price">Price: {currencyFormat(product.price)}</p>

                                {!userInfo.email && (
                                    <div className="products-addToCart-container">
                                        <button className="btn addToCart-btn" onClick={() => setOpenAlertModal(true)}>Add to cart</button>
                                    </div>)}

                                {userInfo.email && userInfo.isAdmin === false && (
                                    <div className="products-addToCart-container">
                                        <button className="btn addToCart-btn" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                    </div>
                                )}
                                {userInfo.isAdmin && (
                                    <div className="products-addToCart-container">
                                        <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AlertModal showAlert={openAlertModal} hideAlert={() => setOpenAlertModal(false)} />
        </>
    )
}

export default SearchResults;