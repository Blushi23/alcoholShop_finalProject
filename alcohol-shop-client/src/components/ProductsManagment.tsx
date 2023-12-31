import { FunctionComponent, useContext, useEffect, useState } from "react";
import { siteTheme } from "../App";
import { deleteProduct, getProducts } from "../services/productsService";
import { successMsg } from "../services/feedbackService";
import { Link } from "react-router-dom";
import Product from "../interfaces/Product";
import Loading from "./Loading";
import { Pagination } from "react-bootstrap";
import ProductsManagmentSearch from "./ProductsManagmentSearch";

interface ProductsManagmentProps {
    products: any;
    setProducts: Function;
    userInfo: any;
    loading: any;
    setLoading: Function;
    searchQuery: any;
    setSearchQuery: Function;
}

const ProductsManagment: FunctionComponent<ProductsManagmentProps> = ({ products, setProducts, userInfo, loading, setLoading, searchQuery, setSearchQuery }) => {
    let [productsChanged, setProductsChanged] = useState<boolean>(false)
    let [data, setData] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;
    let theme = useContext(siteTheme);
    let darkMode = theme === "dark";

    let filteredProducts = products.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    let filteredTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    useEffect(() => {
        setLoading(true);
        getProducts()
            .then((res) => {
                setProducts(res.data);
                setData(res.data);
                let calculatedPages = Math.max(Math.ceil(res.data.length / itemsPerPage), 0);
                setTotalPages(calculatedPages);
                setCurrentPage(prevPage => Math.min(prevPage, Math.max(calculatedPages - 1, 0)))
                setLoading(false);
            })
            .catch((err) => {
                console.log(err); setLoading(false);
            });
    }, [productsChanged, setProducts, itemsPerPage, setLoading])

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let subset = filteredProducts.slice(startIndex, endIndex);

    let render = () => {
        setProductsChanged(!productsChanged)
    }

    let handleToDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    render();
                    successMsg("Product deleted successfully");
                })
                .catch((err) => console.log(err));
        }
    }

    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };

    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";

    return (
        <div className={`${theme}`}>
            <div className="managment-search">
                <ProductsManagmentSearch products={products} setSearchQuery={setSearchQuery} />
            </div>
            <h2 className="text-center managment-title">Products Managment</h2>
            {(userInfo.isAdmin === true) && (
                <Link to="/new-product" className="btn btn-new-product"><i className="fa-solid fa-plus" /> Add new product</Link>
            )}
            {loading ? (<Loading />) : (products.length ? (
                <div className="container">
                    {filteredProducts.length ? (<div className="row">
                        {subset.map((product: Product) => (
                            <div
                                key={product._id}
                                className=" managment-cards col-md-3 align-items-center m-2"
                                style={{ width: "16rem", height: "28rem" }}>
                                <img src={product.image ? (`${product.image}`) : noImg} alt={product.name}
                                    style={{ height: "12rem" }} className="mt-2 product-image" />
                                <div className="card-title text-center mt-2">
                                    <h5>{product.name}</h5>
                                    <h6>Category: {product.category}</h6>
                                    <p>Subcategory: {product.subcategory}</p>
                                    <hr className="mt-1" />
                                    <h4 className="manager-price">Price: {product.price} &#8362;</h4>
                                </div>
                                <div className=" editIcons w-100">
                                    < Link to={`/edit-product/${product._id}`} className="" >
                                        <i className="fa-solid fa-pencil"></i>
                                    </Link>
                                    <Link to="" className=" btn" onClick={() => handleToDelete(product._id as string)}>
                                        <i className="fa-solid fa-trash" ></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>) : (<p className="noProducts">There is no such product</p>)}

                    <div className="paging-container">
                        <Pagination>
                            <Pagination.First onClick={() => handlePaginationClick(1)} />
                            <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                            {Array.from({
                                length: searchQuery ? filteredTotalPages : totalPages
                            }, (_, index) => (

                                <Pagination.Item
                                    key={index + 1}
                                    active={index === currentPage}
                                    onClick={() => handlePaginationClick(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => currentPage < (searchQuery ? filteredTotalPages - 1 : totalPages - 1) && handlePaginationClick(currentPage + 2)} disabled={currentPage === (searchQuery ? filteredTotalPages - 1 : totalPages - 1)} />

                            <Pagination.Last onClick={() => handlePaginationClick(searchQuery ? filteredTotalPages : totalPages)} />
                        </Pagination>
                    </div>
                </div>
            ) : (<p>No products found</p>))}
        </div>
    )
}

export default ProductsManagment;