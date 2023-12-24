import { FunctionComponent, useContext, useEffect, useState } from "react";
import { siteTheme } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import AgeConfirmation from "./AgeConfirmation";
import { getProductByCategory, getProductBySubCategory } from "../services/productsService";
import Product from "../interfaces/Product";
import Loading from "./Loading";

interface HomeProps {
    openAgeModal: boolean;
    setOpenAgeModal: Function
    // show: boolean;
    handleCloseAgeModal: Function;
    userInfo: any;
    products: any;
    setProducts: Function
    loading: any;
    setLoading: Function;

}

const Home: FunctionComponent<HomeProps> = ({ openAgeModal, setOpenAgeModal, handleCloseAgeModal, userInfo, products, setProducts, loading, setLoading }) => {
    let navigate = useNavigate();
    let { category, subcategory } = useParams();

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
    // }, [setProducts, category, subcategory])

    return (
        <>
            {!userInfo.email && (

                <AgeConfirmation show={openAgeModal} onHide={handleCloseAgeModal} />
            )}

            <div className="container">
                <img className="homeBanner img-fluid mt-3 mb-5" src="/images/homeBanner.png" alt="banner" />

                <div className="categoryLine">
                    <img src={alcoholLine} style={{ width: "50rem" }} className="img-fluid" alt="alcohols" onClick={() => navigate('/products/alcohol')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (alcoholProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}
                                    onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)}>

                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p>Volume: {product.volume} ml</p>
                                        <p className="card-text">Price: {product.price} &#8362;</p>
                                        <button className="btn btn-info align-items-center" onClick={() => { }}>Add to cart</button>
                                    </div>
                                </div>
                            )))}


                        </div>
                    </div>
                    <button className="btn btn-outline-dark categoryTransfer w-25 my-4" onClick={() => navigate('/products/alcohol')}>Find more products</button>
                </div>

                <div className="categoryLine">
                    <img src={beerLine} style={{ width: "50rem" }} className="img-fluid" alt="beers" onClick={() => navigate('/products/beer')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (beerProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}
                                    onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)}>
                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p>Volume: {product.volume} ml</p>
                                        <p className="card-text">Price: {product.price} &#8362;</p>
                                        <button className="btn btn-info align-items-center" onClick={() => { }}>Add to cart</button>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>

                    <button className="btn btn-outline-dark categoryTransfer w-25 my-4" onClick={() => navigate('/products/beer')}>Find more products</button>
                </div>
                <div className="categoryLine">
                    <img src={wineLine} style={{ width: "50rem" }} className="img-fluid" alt="wines" onClick={() => navigate('/products/wine')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (wineProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}
                                    onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)}>
                                    <img src={product.image ? product.image : noImg}
                                        alt={product.name}
                                        style={{ height: "13rem" }}
                                        className="mt-2" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p>Volume: {product.volume} ml</p>
                                        <p className="card-text">Price: {product.price} &#8362;</p>
                                        <button className="btn btn-info align-items-center" onClick={() => { }}>Add to cart</button>
                                    </div>
                                </div>
                            )))}



                        </div>
                    </div>

                    <button className="btn btn-outline-dark categoryTransfer w-25 my-4" onClick={() => navigate('/products/wine')}>Find more products</button>
                </div>
            </div >
        </>
    )
}

export default Home;