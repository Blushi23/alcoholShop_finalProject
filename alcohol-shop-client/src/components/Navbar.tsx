import { FunctionComponent, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import { QuantityContext, siteTheme } from "../App";
import LoginModal from "./LoginModal";
import Search from "./Search";
import Product from "../interfaces/Product";
import { searchProduct } from "../services/productsService";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function;
    darkMode: boolean;
    setDarkMode: Function;
    user: User;
    setUser: Function;
    openLoginModal: boolean;
    setOpenLoginModal: Function;
    products: Product[];
    // inputSearch: string;
    // setInputSearch: Function;
    setSearchQuery: Function;
    searchQuery: any;
    // updateCart: Function;
    // quantity: Quantity;
}
// type Quantity = { [key: string]: number };


const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo, darkMode, setDarkMode, user, setUser, openLoginModal, setOpenLoginModal, products, setSearchQuery, searchQuery, /*updateCart /*quantity*/ }) => {
    let navigate = useNavigate();
    let theme = useContext(siteTheme);
    let quantityContext = useContext(QuantityContext);
    let quantity = quantityContext ? quantityContext.quantity : {}

    let [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);

    let totalQuantity = Object.values(quantity).reduce((total: number, currentQuantity: any) => total + currentQuantity, 0);

    let logout = () => {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        setUserInfo({ email: false, isAdmin: false });
        navigate("/");
    }


    return (
        <>
            <nav className={`navbar navbar-expand-lg ${theme}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/"><img className="logo" src="/images/cocktailLogo.png" alt="logo" />Liquor Land</Link>


                    <div className="search-bar-locator">
                        {searchBarOpen ? (<Search products={products} setSearchQuery={setSearchQuery} /*updateCart={updateCart}*/ />) : (
                            <button type="button" className="btn search-btn" onClick={() => {
                                if (setSearchBarOpen && searchQuery.trim() !== "") {
                                    navigate(`/search/${searchQuery}`);
                                    setSearchBarOpen(false);
                                } else { setSearchBarOpen(true); }
                            }}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>

                        )}

                    </div>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-right-side"></div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/about">About</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Shop
                                </Link>
                                <div className="dropdown-menu">
                                    <ul>
                                        <li><Link className="dropdown-item" to="/products/alcohol">Alcohol</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/whiskey">Whiskey</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/vodka">Vodka</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/gin">Gin</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/tequila">Tequila</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/liqueur">Liqueur</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/rum">Rum</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/cognac">Cognac</Link></li>
                                        <li><Link className="dropdown-item" to="/products/alcohol/brandy">Brandy</Link></li>
                                    </ul>
                                    <ul>
                                        <li><Link className="dropdown-item" to="/products/beer">Beer </Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/lager">Lager Beer</Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/ale">Ale Beer</Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/wheat">Wheat Beer</Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/stout">Stout Beer</Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/ipa">IPA Beer</Link></li>
                                        <li><Link className="dropdown-item" to="/products/beer/ciders">Ciders</Link></li>
                                    </ul>
                                    <ul>
                                        <li><Link className="dropdown-item" to="/products/wine">Wine</Link></li>
                                        <li><Link className="dropdown-item" to="/products/wine/red">Red Wine</Link></li>
                                        <li><Link className="dropdown-item" to="/products/wine/white">White Wine</Link></li>
                                        <li><Link className="dropdown-item" to="/products/wine/rose">Rose Wine</Link></li>
                                        <li><Link className="dropdown-item" to="/products/wine/sparkling">Sparkling Wine</Link></li>
                                        <li><Link className="dropdown-item" to="/products/wine/dessert & fortified">Dessert & Fortified Wine</Link></li>

                                    </ul>
                                </div>
                            </li>
                            {userInfo.email && userInfo.isAdmin === false && (
                                <>
                                    <li className="nav-item"><Link to="#" className="nav-link">Favorites</Link></li>
                                </>
                            )}
                            {userInfo.email && userInfo.isAdmin === true && (
                                <>
                                    <li className="nav-item"><Link to="/users-managment" className="nav-link manager-page">Users Managment</Link></li>
                                    <li className="nav-item"><Link to="/products-managment" className="nav-link manager-page">Products Managment</Link></li>
                                </>
                            )}
                        </ul>

                        {/* <div className="search-bar-locator">
                            {searchBarOpen ? (<Search products={products} setSearchQuery={setSearchQuery} />) : (
                                <button type="button" className="btn search-btn" onClick={() => {
                                    if (setSearchBarOpen && searchQuery.trim() !== "") {
                                        navigate(`/search/${searchQuery}`);
                                        setSearchBarOpen(false);
                                    } else { setSearchBarOpen(true); }
                                }}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>

                            )}

                        </div> */}

                        {!userInfo.email && (
                            <>

                                <button className="btn" type="button"
                                    onClick={() => setOpenLoginModal(true)}
                                ><i className="fa-solid fa-user me-0"></i></button>
                            </>
                        )}

                        <button className=" btn" type="button" onClick={() => {
                            setDarkMode(!darkMode);
                            localStorage.setItem("darkMode", JSON.stringify(!darkMode))
                        }}>
                            <label className="form-check-label  darkModeButton fs-5" htmlFor="flexSwitchCheckDefault">{darkMode ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun text-warning"></i>}</label>
                        </button>

                        {userInfo.isAdmin === false && (
                            <button className="btn shopping-cart-btn" onClick={() => navigate("/cart")}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                <div className="position-relative">
                                    {/* {totalQuantity > 0 && ( */}
                                    <div className="items-counter rounded-circle w-100 d-flex justify-content-center align-items-center position-absolute">
                                        {totalQuantity}
                                    </div>
                                    {/* )} */}
                                </div>

                            </button>
                        )}
                        {userInfo.email && (
                            <>
                                <button className="btn" type="button"
                                    // onClick={() => navigate(`/update-account`)}
                                    onClick={() => navigate(`/update-account/${userInfo.userId}`)}
                                ><i className="fa-solid fa-user me-0"></i></button>

                                <button className="btn" onClick={logout}>Logout</button>
                            </>
                        )}

                    </div>

                </div >
            </nav >

            <LoginModal
                show={openLoginModal}
                onHide={() => setOpenLoginModal(false)}
                setUserInfo={setUserInfo}
            // userId={openUserModal}
            />
        </>
    )
}

export default Navbar;