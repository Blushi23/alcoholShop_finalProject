import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { currencyFormat } from "../services/CurrencyFormat";
import { useNavigate } from "react-router-dom";

interface SearchProps {
    products: Product[];
    setSearchQuery: Function
}

const Search: FunctionComponent<SearchProps> = ({ products, setSearchQuery }) => {
    let navigate = useNavigate()
    let [searchRes, setSearchRes] = useState<Product[]>([]);
    let [key, setKey] = useState<string>("");


    useEffect(() => {
        let search = async () => {
            try {
                if (!key.trim()) {
                    setSearchRes([]);
                    return;
                }
                let searchProducts = products.filter((product: Product) => product.name.toLowerCase().includes(key.toLowerCase()))
                setSearchRes(searchProducts.slice(0, 6));
            } catch (error) {
                console.log(error);
            }
        }
        search()
    }, [key, products])

    let handleClose = () => {
        setKey("");
        setSearchRes([]);
    }

    return (
        <>
            <form style={{ display: "flex", alignItems: "center" }}>

                <div className="form-group" style={{ display: "flex", alignItems: "center" }}>

                    <input
                        className="form-control"
                        type="text"
                        placeholder="Searching... "
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                            setSearchQuery(e.target.value)
                        }}
                    />
                    {key && <button type="button" className="btn close-btn" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>}

                    <button className="btn search-btn"
                    //  onClick={() => handleSearch(key)}
                    ><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>


                {searchRes && searchRes.length > 0 && (
                    <div className="search-result">
                        {searchRes.map((product: Product) => (
                            <div className="result-item" key={product._id} onClick={() => { navigate(`/products/${product.category}/${product.subcategory}/${product._id}`); handleClose() }}>

                                <div className="img"><img src={product.image} alt={product.name} /></div>
                                <div className="product-info">
                                    <h5 className="product-name">{product.name}</h5>
                                    <p>Price: {currencyFormat(product.price)}</p>
                                </div>
                                <div className="btn-container"><button className="btn addToCart btn-outline-info">Add To Cart</button></div>

                            </div>
                        ))}
                    </div>
                )}
                {/* </div > */}
            </form >
        </>
    )
}

export default Search;