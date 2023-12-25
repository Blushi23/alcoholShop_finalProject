import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";

interface ProductsManagmentSearchProps {
    products: Product[];
    setSearchQuery: Function;
}

const ProductsManagmentSearch: FunctionComponent<ProductsManagmentSearchProps> = ({ products, setSearchQuery }) => {
    // let [searchRes, setSearchRes] = useState<Product[]>([]);
    let [key, setKey] = useState<string>("");

    // useEffect(() => {
    //     let search = async () => {
    //         try {
    //             if (!key.trim()) {
    //                 setSearchRes([]);
    //                 return;
    //             }
    //             let searchProducts = products.filter((product: Product) =>
    //                 product.name.toLowerCase().includes(key.toLowerCase())
    //             );
    //             setSearchRes(searchProducts);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     search();
    // }, [key, products]);

    useEffect(() => {
        // Filter and update searchQuery state in the parent component
        setSearchQuery(key);
    }, [key, setSearchQuery]);


    let handleClose = () => {
        setKey("");
        // setSearchRes([]);
    };

    return (
        <>
            <form style={{ display: "flex", alignItems: "center" }}>
                <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                    <input
                        className="managment-form-control form-control"
                        type="text"
                        placeholder="Search Products"
                        value={key}
                        onChange={(e) =>
                            setKey(e.target.value)
                            // setSearchQuery(e.target.value);
                        }
                    />
                    {key && (
                        <button type="button" className="btn managment-close-btn" onClick={handleClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>

                {/* {searchRes && searchRes.length > 0 && (
                    <div className="search-result">
                        {searchRes.map((product: Product) => (
                            <div
                                className="result-item"
                                key={product._id}
                           
                            >
                              
                            </div>
                        ))}
                    </div>
                )} */}
            </form>        </>
    )
}

export default ProductsManagmentSearch;