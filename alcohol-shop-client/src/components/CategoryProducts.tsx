import { FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import { siteTheme } from "../App";
import { getProductByCategory, getProductBySubCategory } from "../services/productsService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
// import Filter from "./Filter";
import { addToCart, getCart } from "../services/cartService";
import { addedToCartMsg, errorMsg, successMsg } from "../services/feedbackService";
import { currencyFormat } from "../services/CurrencyFormat";
import Loading from "./Loading";
import { Pagination } from "react-bootstrap";
import Filter from "./Filter";

interface CategoryProductsProps {
    userInfo: any;
    categoryProducts: Product[];
    setCategoryProducts: Function;
    // inputSearch: string;
    // setInputSearch: Function;
    loading: any;
    setLoading: Function;
    searchQuery: any
    setSearchQuery: Function;
    setShow: Function;
    show: any;
    // selectedVolumes: number[];

}
type Quantity = { [key: string]: number };


const CategoryProducts: FunctionComponent<CategoryProductsProps> = ({ categoryProducts, setCategoryProducts, userInfo, loading, setLoading, searchQuery, setSearchQuery, setShow, show }) => {
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let navigate = useNavigate();
    let { category, subcategory } = useParams();

    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    let [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    let [data, setData] = useState<Product[]>([]);

    let [selectedVolumes, setSelectedVolumes] = useState<number[]>([])
    let [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
    let [selectedAlcohol, setSelectedAlcohol] = useState<string[]>([])
    let [selectedPrice, setSelectedPrice] = useState<number[]>([])
    console.log(`selectedVolumes-${selectedVolumes},selectedOrigins-${selectedOrigins}, selectedAlcohol-${selectedAlcohol} `);

    let filteredProducts = useMemo(() => {
        let filtered = categoryProducts.filter((product: Product) => {
            if (selectedVolumes.length > 0 && !selectedVolumes.includes(product.volume!)) return false;
            if (selectedOrigins.length > 0 && !selectedOrigins.includes(product.origin!)) return false;
            if (selectedAlcohol.length > 0 && !selectedAlcohol.includes(product.alcoholPercentage!)) return false;
            // if (selectedPrice.length > 0 && !setSelectedPrice.includes(product.price!)) return false;
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        return filtered
    }, [categoryProducts, searchQuery, selectedAlcohol, selectedOrigins, /*selectedPrice,*/ selectedVolumes])



    let [currentPage, setCurrentPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;
    let [productQuantity, setProductQuantity] = useState<Quantity>({});
    let quantity = 1;

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);

    // let filteredProducts = categoryProducts.filter((product: Product) => {
    //     let query = searchQuery && typeof searchQuery === "string" ? searchQuery.toLowerCase() : '';
    //     let productName = product.name.toLowerCase();
    //     let productVolume = (product.volume || '').toString().toLowerCase();
    //     let productAlcohol = (product.alcoholPercentage || "").toLowerCase();
    //     let productPrice = product.price.toString().toLowerCase()

    //     return (
    //         query &&
    //         (productName.includes(query) ||
    //             productVolume.includes(query) ||
    //             productAlcohol.includes(query) ||
    //             productPrice.includes(query))
    //     );
    // })

    // let filteredProducts = categoryProducts.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    useEffect(() => {
        setCurrentPage(0)
    }, [searchQuery])

    useEffect(() => {
        if (category && subcategory) {
            setLoading(true)
            getProductBySubCategory(category, subcategory)
                .then((res) => {
                    setCategoryProducts(res.data);
                    setData(res.data);
                    let calculatedPages = Math.ceil(res.data.length / itemsPerPage)
                    setTotalPages(calculatedPages);
                    setCurrentPage(prevPage => Math.min(prevPage, calculatedPages - 1))
                    setLoading(false);

                })

                .catch((err) => { console.log(err); setLoading(false) })


        } else if (category) {
            getProductByCategory(category)
                .then((res) => {
                    setCategoryProducts(res.data);
                    setData(res.data);
                    let calculatedPages = Math.ceil(res.data.length / itemsPerPage)
                    setTotalPages(calculatedPages);
                    setCurrentPage(prevPage => Math.min(prevPage, calculatedPages - 1))

                })
                .catch((err) => console.log(err));
        }
        // // getCart()
        //     .then((res) => {
        //         let quantities: Quantity = {};
        //         res.data.forEach((product: Product) => {
        //             if (product._id) {
        //                 quantities[product._id] = product.quantity || 0;
        //             }
        //         });
        //         setProductQuantity(quantities);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

    }, [productsChanged, setCategoryProducts, category, subcategory, itemsPerPage, setLoading]);

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    // let subset = data.slice(startIndex, endIndex);
    let subset = filteredProducts.slice(startIndex, endIndex);

    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };


    let handleAddToCart = (product: Product) => {
        if (userInfo.isAdmin) errorMsg("Admin user cannot add items to cart")
        else {

            addToCart(product)
                .then((res) => addedToCartMsg(` ${product.name} added to cart`))
                .catch((err) => console.log(err))
        }
    }

    // let filteredProducts = categoryProducts.filter((product: Product) => selectedVolumes.length === 0 ? true : selectedVolumes.includes(product.volume!))



    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";
    let pageTitle = subcategory ? subcategory : category

    // let addToFavorites = favorites ? <i className="fa-solid fa-heart"></i> : <i className="fa-solid fa-heart-circle-plus"></i>
    let addToFavorites = darkMode ? <i className="fa-solid fa-heart"></i> : <i className="fa-solid fa-heart-circle-plus"></i>

    let [volumeOptions, setVolumeOptions] = useState<number[]>([])
    let [originOptions, setOriginOptions] = useState<string[]>([])
    let [alcoholOptions, setAlcoholOptions] = useState<string[]>([])
    let [priceOptions, setPriceOptions] = useState<number[]>([])
    let products = categoryProducts
    useEffect(() => {

        const uniqueVolumes = Array.from(new Set(products.map((product: Product) => product.volume))).filter((volume) => volume !== undefined) as number[];
        const uniqueOrigins = Array.from(new Set(products.map((product: Product) => product.origin))).filter((origin) => origin) as string[];
        const uniqueAlcohol = Array.from(new Set(products.map((product: Product) => product.alcoholPercentage))).filter((alcoholPercentage) => alcoholPercentage) as string[];
        const uniquePrice = Array.from(new Set(products.map((product: Product) => product.price))).filter((price) => price !== undefined) as number[];
        setVolumeOptions(uniqueVolumes);
        setOriginOptions(uniqueOrigins);
        setAlcoholOptions(uniqueAlcohol);
        setPriceOptions(uniquePrice);
    }, [products]);

    return (
        <div className={`${theme}`}>
            <h2 className="pageTitle text-uppercase">{pageTitle}</h2>
            <hr className="mx-5" />
            <div className="row">
                <div className="col">
                    <button type="button" className="btn filter" onClick={handleShow}>
                        <i className="fa-solid fa-filter"></i> Filter </button>
                    <button className="btn sort"><i className="fa-solid fa-sort"></i> Sort</button>

                    <button className="btn view" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}><i className="fa-solid fa-table-cells-large"></i> | <i className="fa-solid fa-list"></i></button>
                    <Filter show={show} setShow={setShow} handleClose={handleClose} categoryProducts={categoryProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} setSelectedVolumes={setSelectedVolumes} selectedVolumes={selectedVolumes} setSelectedOrigins={setSelectedOrigins} setSelectedAlcohol={setSelectedAlcohol} setSelectedPrice={setSelectedPrice} volumeOptions={volumeOptions} setVolumeOptions={setVolumeOptions} originOptions={originOptions} setOriginOptions={setOriginOptions} alcoholOptions={alcoholOptions} setAlcoholOptions={setAlcoholOptions} priceOptions={priceOptions} setPriceOptions={setPriceOptions} />

                    {/* <Filter setSearchQuery={setSearchQuery} categoryProducts={categoryProducts} handleClose={handleClose} show={show} setShow={setShow}
                      setSelectedVolumes={setSelectedVolumes} selectedVolumes={selectedVolumes} setSelectedOrigins={setSelectedOrigins} selectedOrigins={selectedOrigins} setSelectedAlcohol={setSelectedAlcohol} selectedAlcohol={selectedAlcohol} setSelectedPrice={setSelectedPrice} selectedPrice={selectedPrice} 
                    /> */}
                </div>
                {/* <div className="col"><Search products={products} setSearchQuery={setSearchQuery} /></div> */}

                {/* <div className="col">
                    <input type="text" placeholder="Search Products..." className="search-product-box"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} /></div> */}
                <div>

                </div>
            </div>



            {loading ? (<Loading />) : (categoryProducts.length > 0 ? (<>
                {viewMode === 'cards' && (
                    <div className="container">
                        <div className="row card-container">
                            {subset.map((product: Product) => (
                                // {subset.map((product: Product) => (
                                // {products.map((product: Product) => (

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
                                        {userInfo.isAdmin === false && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                <div className="heart-icon">{addToFavorites}</div>
                                            </div>
                                        )}
                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                                <button className="btn addToFavorites heart-icon" disabled >{addToFavorites}</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="paging-container">
                            <Pagination>
                                <Pagination.First onClick={() => handlePaginationClick(1)} />
                                <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index === currentPage}
                                        onClick={() => handlePaginationClick(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => currentPage < totalPages - 1 && handlePaginationClick(currentPage + 2)} disabled={currentPage === totalPages - 1} />
                                <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
                            </Pagination>
                        </div>
                    </div>
                )}
                {viewMode === 'table' && (
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Volume (ml)</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subset.map((product: Product) => (
                                    <tr key={product._id}>
                                        <td><img src={product.image ? (`${product.image}`) : noImg} alt={product.name} style={{ height: "7rem" }} /></td>
                                        <td>{product.name}</td>
                                        <td>{currencyFormat(product.price)}</td>
                                        <td>{product.volume}</td>
                                        <td><button className="btn" onClick={() => navigate(`/products/${category}/${subcategory}/${product._id}`)}>More Info</button></td>
                                        <td><button className="btn" onClick={() => handleAddToCart(product)}>Add to cart</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="paging-container">
                            <Pagination>
                                <Pagination.First onClick={() => handlePaginationClick(1)} />
                                <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index === currentPage}
                                        onClick={() => handlePaginationClick(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => currentPage < totalPages - 1 && handlePaginationClick(currentPage + 2)} disabled={currentPage === totalPages - 1} />
                                <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
                            </Pagination>
                        </div>

                    </div>
                )}

            </>) : (<p>No Products To Show</p>))
            }
        </div >

    )
}

export default CategoryProducts;