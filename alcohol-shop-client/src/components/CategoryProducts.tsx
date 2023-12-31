import { FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import { siteTheme } from "../App";
import { getProductByCategory, getProductBySubCategory } from "../services/productsService";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
import { addToCart } from "../services/cartService";
import { addedToCartMsg, errorMsg } from "../services/feedbackService";
import { currencyFormat } from "../services/CurrencyFormat";
import Loading from "./Loading";
import { Pagination } from "react-bootstrap";
import Filter from "./Filter";
import AlertModal from "./AlertModal";

interface CategoryProductsProps {
    userInfo: any;
    categoryProducts: Product[];
    setCategoryProducts: Function;
    openAlertModal: boolean;
    setOpenAlertModal: Function;
    loading: any;
    setLoading: Function;
    searchQuery: any
    setSearchQuery: Function;
    setShow: Function;
    show: any;
}

const CategoryProducts: FunctionComponent<CategoryProductsProps> = ({ categoryProducts, setCategoryProducts, userInfo, loading, setLoading, searchQuery, setSearchQuery, setShow, show, openAlertModal, setOpenAlertModal }) => {
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let navigate = useNavigate();
    let { category, subcategory } = useParams();

    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    let [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    let [data, setData] = useState<Product[]>([]);

    const [selectedVolumes, setSelectedVolumes] = useState<number[]>([]);
    const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number[]>([]);

    let handleRangeChange = (index: number, newValue: number) => {
        setSelectedPrice((prevValues: any) => {
            let newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        })
    }

    let filteredProducts = useMemo(() => {
        let filtered = categoryProducts.filter((product: Product) => {
            if (selectedVolumes.length > 0 && !selectedVolumes.includes(product.volume!)) return false;
            if (selectedOrigins.length > 0 && !selectedOrigins.includes(product.origin!)) return false;
            if (selectedAlcohol.length > 0 && !selectedAlcohol.includes(product.alcoholPercentage!))
                return false;
            if (selectedPrice.length > 0 && (product.price < selectedPrice[0])) return false;
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        return filtered
    }, [categoryProducts, searchQuery, selectedAlcohol, selectedOrigins, selectedPrice, selectedVolumes])

    let [currentPage, setCurrentPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);

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
    }, [productsChanged, setCategoryProducts, category, subcategory, itemsPerPage, setLoading]);

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let subset = filteredProducts.slice(startIndex, endIndex);
    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };
    let handleAddToCart = (product: Product) => {
        if (!userInfo.email) setOpenAlertModal(true);
        if (userInfo.isAdmin) errorMsg("Admin user cannot add items to cart");
        else {
            addToCart(product)
                .then((res) => addedToCartMsg(` ${product.name} added to cart`))
                .catch((err) => console.log(err))
        }
    }

    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";
    let pageTitle = subcategory ? subcategory : category

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
        setSelectedPrice(uniquePrice);
    }, [products]);

    return (
        <div className={`${theme}`}>
            <h2 className="pageTitle text-uppercase">{pageTitle}</h2>
            <hr className="mx-5" />
            <div className="view-change">
                <button type="button" className="btn filter" onClick={handleShow}>
                    <i className="fa-solid fa-filter"></i> Filter </button>
                <button className="btn view" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}><i className="fa-solid fa-table-cells-large"></i> | <i className="fa-solid fa-list"></i></button>
                <Filter
                    show={show}
                    setShow={setShow}
                    setSearchQuery={setSearchQuery}
                    setSelectedVolumes={setSelectedVolumes}
                    selectedVolumes={selectedVolumes}
                    setSelectedOrigins={setSelectedOrigins}
                    selectedOrigins={selectedOrigins}
                    setSelectedAlcohol={setSelectedAlcohol}
                    selectedAlcohol={selectedAlcohol}
                    setSelectedPrice={setSelectedPrice}
                    selectedPrice={selectedPrice}
                    volumeOptions={volumeOptions}
                    originOptions={originOptions}
                    alcoholOptions={alcoholOptions}
                    priceOptions={priceOptions}
                    handleClose={handleClose}
                    setPriceOptions={setPriceOptions}
                    handleRangeChange={handleRangeChange}
                />
            </div>

            <div className="row products-page-content">
                {loading ? (<Loading />) : (categoryProducts.length > 0 ? (<>
                    {viewMode === 'cards' && (
                        <div className="container">
                            <div className="row card-container">
                                {subset.map((product: Product) => (
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

                                            {userInfo.email && userInfo.isAdmin === false && (
                                                <div className="products-addToCart-container">
                                                    <button className="btn addToCart-btn" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                </div>
                                            )}
                                            {!userInfo.email && (
                                                <div className="products-addToCart-container">
                                                    <button className="btn addToCart-btn" onClick={() => setOpenAlertModal(true)}>Add to cart</button>
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
                        <div className="container table-container">
                            <table className="table ms-0 mt-2">
                                <thead>
                                    <tr className="table-titles">
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Volume (ml)</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="table-content">
                                    {subset.map((product: Product) => (
                                        <tr key={product._id}>
                                            <td><img src={product.image ? (`${product.image}`) : noImg} alt={product.name} className="table-image" style={{ height: "7rem" }} /></td>
                                            <td className="table-name">{product.name}</td>
                                            <td>{currencyFormat(product.price)}</td>
                                            <td>{product.volume}</td>
                                            <td><button className="btn table-btn" onClick={() => navigate(`/products/${category}/${subcategory}/${product._id}`)}>More Info</button></td>
                                            <td><button className="btn table-btn" onClick={() => handleAddToCart(product)}>Add to cart</button></td>
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
            <AlertModal showAlert={openAlertModal} hideAlert={() => setOpenAlertModal(false)} />
        </div>
    )
}

export default CategoryProducts;