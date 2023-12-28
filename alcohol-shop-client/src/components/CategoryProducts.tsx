import { FunctionComponent, useContext, useEffect, useState } from "react";
import { siteTheme } from "../App";
import { getProductByCategory, getProductBySubCategory } from "../services/productsService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
// import Filter from "./Filter";
import { addToCart, getCart } from "../services/cartService";
import { addedToCartMsg, successMsg } from "../services/feedbackService";
import { currencyFormat } from "../services/CurrencyFormat";
import Loading from "./Loading";
import { Pagination } from "react-bootstrap";

interface CategoryProductsProps {
    userInfo: any;
    categoryProducts: Product[];
    setCategoryProducts: Function;
    inputSearch: string;
    setInputSearch: Function;
    loading: any;
    setLoading: Function;
    searchQuery: any
    setSearchQuery: Function;

}
type Quantity = { [key: string]: number };


const CategoryProducts: FunctionComponent<CategoryProductsProps> = ({ categoryProducts, setCategoryProducts, userInfo, inputSearch, setInputSearch, loading, setLoading, searchQuery, setSearchQuery }) => {
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";
    let navigate = useNavigate();
    let { category, subcategory } = useParams();

    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    let [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    let [data, setData] = useState<Product[]>([]);

    let [currentPage, setCurrentPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;
    let [productQuantity, setProductQuantity] = useState<Quantity>({});

    let quantity = 0;



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
                    // setFilteredProducts(res.data);

                })

                .catch((err) => { console.log(err); setLoading(false) })


        } else if (category) {
            getProductByCategory(category)
                .then((res) => {
                    setCategoryProducts(res.data);
                    setData(res.data);
                    let calculatedPages = Math.ceil(res.data.length / itemsPerPage)
                    setTotalPages(calculatedPages);
                    setCurrentPage(prevPage => Math.min(prevPage, calculatedPages - 1))                    // setFilteredProducts(res.data);

                })
                .catch((err) => console.log(err));
        }
        getCart()
            .then((res) => {
                let quantities: Quantity = {};
                res.data.forEach((product: Product) => {
                    if (product._id) {
                        quantities[product._id] = product.quantity || 0;
                    }
                });
                setProductQuantity(quantities);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [productsChanged, setCategoryProducts, category, subcategory, itemsPerPage, setLoading]);

    // useEffect(() => {
    //     let filterd = products.filter(product => product.name.toLocaleLowerCase().includes(inputSearch.toLowerCase()))
    // })

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let subset = data.slice(startIndex, endIndex);
    // let subset = filteredProducts.slice(startIndex, endIndex);

    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };


    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => addedToCartMsg(` ${product.name} added to cart`))
            .catch((err) => console.log(err))
    }

    let filteredProducts = categoryProducts.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";
    let pageTitle = subcategory ? subcategory : category

    return (
        <div className={`${theme}`}>
            <h2 className="pageTitle text-uppercase">{pageTitle}</h2>
            <hr className="mx-5" />
            <div className="row">
                <div className="col"><button type="button" className="btn" onClick={() => { }}><i className="fa-solid fa-filter"></i> Filter</button>


                    <button className="btn"><i className="fa-solid fa-sort"></i> Sort</button>


                    <button className="btn" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}><i className="fa-solid fa-table-cells-large"></i> | <i className="fa-solid fa-list"></i></button></div>
                {/* <div className="col"><Search products={products} setSearchQuery={setSearchQuery} /></div> */}

                {/* <div className="col">
                    <input type="text" placeholder="Search Products..." className="search-product-box"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} /></div> */}
                <div>

                </div>
            </div>



            {loading ? (<Loading />) : (filteredProducts.length > 0 ? (<>
                {viewMode === 'cards' && (
                    <div className="container">
                        <div className="row">
                            {subset.map((product: Product) => (
                                // {subset.map((product: Product) => (
                                // {products.map((product: Product) => (

                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2"
                                    style={{ width: " 16rem", height: "28rem" }}>
                                    <img src={product.image ? (`${product.image}`) : noImg} alt={product.name}
                                        style={{ height: "13rem" }} className="mt-2"

                                        onClick={() => navigate(`/products/${category}/${subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p>Volume: {product.volume} ml</p>
                                        <p className="card-text">Price: {currencyFormat(product.price)}</p>

                                        <div className="mt-auto">

                                            {/* {productQuantity[product._id as string] === 0 ? (<button className="btn w-100 btn-info align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                                <div className="d-flex align-items-center justify-content-center quantityBtn" style={{ gap: ".5rem" }}>
                                                    <button className="btn ">-</button>
                                                    <div><span className="fs-5 ">{productQuantity[product._id as string]}</span> in cart</div>
                                                    <button className="btn ">+</button>
                                                </div>
                                                <button className="btn bg-danger removeBtn" >Remove</button>
                                            </div>)} */}
                                            {quantity === 0 ? (<button className="btn w-100 btn-info align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                                <div className="d-flex align-items-center justify-content-center quantityBtn" style={{ gap: ".5rem" }}>
                                                    <button className="btn ">-</button>
                                                    <div><span className="fs-5 ">{product.quantity}</span> in cart</div>
                                                    <button className="btn ">+</button>
                                                </div>
                                                <button className="btn bg-danger removeBtn" >Remove</button>
                                            </div>)}
                                        </div>
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

            </>) : (<p>No Products To Show</p>))}
        </div >

    )
}

export default CategoryProducts;