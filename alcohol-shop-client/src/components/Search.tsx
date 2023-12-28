import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { currencyFormat } from "../services/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { addedToCartMsg, warningMsg } from "../services/feedbackService";
import { addToCart, updateCart } from "../services/cartService";

interface SearchProps {
    products: Product[];
    setSearchQuery: Function;
    // updateCart: Function;
}

const Search: FunctionComponent<SearchProps> = ({ products, setSearchQuery, /*updateCart*/ }) => {
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

                if (searchProducts.length === 0) warningMsg('No matching products found')

            } catch (error) {
                console.log(error);
            }
        }
        search()
    }, [key, products])

    let handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
        event.stopPropagation();
        addToCart(product)
            .then((res) => {
                addedToCartMsg(` ${product.name} added to cart`);
                // updateCart();
                handleClose()

            })
            .catch((err) => console.log(err))
    }

    let handleClose = () => {
        setKey("");
        setSearchRes([]);
    }

    let handleClick = () => {
        if (searchRes.length > 0) {
            navigate(`/search/${key}`);
        }
    }

    let handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
            handleClose();
        }
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
                        onKeyDown={handleEnterPress}
                    />
                    {key && (<button type="button" className="btn close-btn" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>)}

                    <i className="fa-solid fa-magnifying-glass ms-1" onClick={() => { handleClick(); handleClose(); }}></i>
                </div>


                {searchRes && searchRes.length > 0 && (
                    <div className="search-result">
                        {searchRes.map((product: Product) => (
                            <div className="result-item" key={product._id} onClick={() => { navigate(`/products/${product.category}/${product.subcategory}/${product._id}`); handleClose() }}>

                                <div className="img"><img src={product.image} alt={product.name} /></div>
                                <div className="product-info mt-2 nb-0">
                                    <h5 className="product-name">{product.name}</h5>
                                    <p>Price: {currencyFormat(product.price)}</p>
                                </div>
                                <div className="btn-container"><button type="button" className="btn addToCart-btn" onClick={(e) => handleAddToCart(e, product)}>Add To Cart</button></div>

                            </div>
                        ))}
                    </div>
                )}
            </form >
        </>
    )
}

export default Search;