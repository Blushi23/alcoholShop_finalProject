import { FunctionComponent, useContext, useEffect, useState } from "react";
import { siteTheme } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import AgeConfirmation from "./AgeConfirmation";
import { getProductByCategory } from "../services/productsService";
import Product from "../interfaces/Product";
import Loading from "./Loading";
import { addToCart } from "../services/cartService";
import { addedToCartMsg } from "../services/feedbackService";
import AlertModal from "./AlertModal";

interface HomeProps {
    openAgeModal: boolean;
    setOpenAgeModal: Function
    openAlertModal: boolean;
    setOpenAlertModal: Function;
    handleCloseAgeModal: Function;
    userInfo: any;
    loading: any;
    setLoading: Function;
}

const Home: FunctionComponent<HomeProps> = ({ openAgeModal, openAlertModal, setOpenAlertModal, handleCloseAgeModal, userInfo, loading, setLoading }) => {
    let navigate = useNavigate();
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let wineLine = darkMode ? "/images/wineWhiteLine.png" : "/images/wineBlackLine.png";
    let alcoholLine = darkMode ? "/images/alcoholWhiteLine.png" : "/images/alcoholBlackLine.png";
    let beerLine = darkMode ? "/images/beerWhiteLine.png" : "/images/beerBlackLine.png";
    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";

    let [alcoholProducts, setAlcoholProducts] = useState([]);
    let [beerProducts, setBeerProducts] = useState([]);
    let [wineProducts, setWineProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        let showProducts = async () => {
            try {
                let alcohol = await getProductByCategory('alcohol');
                let beers = await getProductByCategory('beer');
                let wines = await getProductByCategory('wine');

                setAlcoholProducts(alcohol.data.slice(0, 4));
                setBeerProducts(beers.data.slice(0, 4));
                setWineProducts(wines.data.slice(0, 4));

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        showProducts()
        setLoading(false);
    }, [])

    let handleAddToCart = (product: Product) => {
        if (!userInfo.email) setOpenAlertModal(true)
        addToCart(product)
            .then((res) => addedToCartMsg(` ${product.name} added to cart`))
            .catch((err) => console.log(err))
    }

    return (
        <>
            {!userInfo.email && (
                <AgeConfirmation show={openAgeModal} onHide={handleCloseAgeModal} />
            )}
            <div className="home-container">
                <img className="homeBanner img-fluid mt-3 mb-5" src="/images/homeBanner.png" alt="banner" />
                <div className="categoryLine">
                    <img src={alcoholLine} style={{ width: "50rem" }} className="img-fluid" alt="alcohols" onClick={() => navigate('/products/alcohol')} />
                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (alcoholProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Volume: {product.volume} ml</p>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {!userInfo.email && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => setOpenAlertModal(true)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.email && userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                    <button className="btn categoryTransfer  my-4" onClick={() => navigate('/products/alcohol')}>Find more products</button>
                </div>
                <div className="categoryLine">
                    <img src={beerLine} style={{ width: "50rem" }} className="img-fluid" alt="beers" onClick={() => navigate('/products/beer')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (beerProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Volume: {product.volume} ml</p>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {!userInfo.email && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => setOpenAlertModal(true)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.email && userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                    <button className="btn categoryTransfer my-4" onClick={() => navigate('/products/beer')}>Find more products</button>
                </div>
                <div className="categoryLine">
                    <img src={wineLine} style={{ width: "50rem" }} className="img-fluid" alt="wines" onClick={() => navigate('/products/wine')} />
                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (wineProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Volume: {product.volume} ml</p>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {!userInfo.email && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => setOpenAlertModal(true)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.email && userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                            </div>)}

                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>

                    <button className="btn categoryTransfer my-4" onClick={() => navigate('/products/wine')}>Find more products</button>
                </div>
            </div >

            <AlertModal showAlert={openAlertModal} hideAlert={() => setOpenAlertModal(false)} />
        </>
    )
}
export default Home;