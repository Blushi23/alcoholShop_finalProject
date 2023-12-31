import { FunctionComponent, useContext } from "react";
import { siteTheme } from "../App";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import Contact from "./Contact";

interface FooterProps {
    userInfo: any;
    setUserInfo: Function;
    openLoginModal: boolean;
    setOpenLoginModal: Function;
    openContactModal: boolean;
    setOpenContactModal: Function;
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo, setUserInfo, setOpenLoginModal, openLoginModal, openContactModal, setOpenContactModal }) => {
    let theme = useContext(siteTheme);
    return (
        <>
            <div className="footer-container">
                <footer className="border-top py-3 my-4 border-top " data-bs-theme={`${theme}`}>
                    <div className="row">

                        <div className="col-sm-3">
                            <h5 className="footer-title">About</h5>
                            <ul className="footer-list">
                                <li ><Link to="/about" className="footer-li">About Us</Link></li>
                                <li ><button onClick={() => setOpenContactModal(true)} className=" btn footer-li ms-0">Contact Us</button></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5 className="footer-title">My Account</h5>
                            {!userInfo.email && (<>
                                <ul className="footer-list">
                                    <li ><button onClick={() => setOpenLoginModal(true)} className=" btn footer-li">Sign In / Register</button></li>
                                </ul>
                            </>)}
                            {userInfo.email && userInfo.isAdmin === false && (<>
                                <ul className="footer-list">
                                    <li
                                    ><Link to={`/update-account/${userInfo.userId}`} className="footer-li">My Profile</Link></li>
                                </ul>
                            </>)}
                            {userInfo.email && userInfo.isAdmin === true && (<>
                                <ul className="footer-list">
                                    <li
                                    ><Link to={`/update-account/${userInfo.userId}`} className="footer-li">My Profile</Link></li>
                                    <li
                                    ><Link to="/users-managment" className="footer-li">Users Managment</Link></li>
                                    <li
                                    ><Link to="/products-managment" className="footer-li">Products Managment</Link></li>
                                </ul>
                            </>)}
                        </div>
                        <div className="col-sm-3">
                            <h5 className="footer-title">Categories</h5>
                            <ul className="footer-list">
                                <li><Link to="/products/alcohol" className="footer-li">Alcohol Drinks</Link></li>
                                <li><Link to="/products/beer" className="footer-li">Beers</Link></li>
                                <li><Link to="/products/wine" className="footer-li">Wines</Link></li>
                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <div className="row">
                                <h5 className="footer-title">Follow us</h5>
                                <div className="col-md-12 footer-list">
                                    <Link to={"https://www.facebook.com/michal.blush"} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-facebook ms-4"></i></Link>
                                    <Link to={"https://www.instagram.com/michal_duvidzon/"} target="_blank" rel="noopener noreferrer"> <i className="fa-brands fa-instagram mx-3"></i></Link>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-12 paymentOptions">
                                    <h5 className="footer-title">Payment Options</h5>
                                    <img src="/images/diners.png" alt="Diners" />
                                    <img src="/images/mastercard.png" alt="Mastercard" />
                                    <img src="/images/visa.webp" alt="Visa" />
                                    <img src="/images/AmericanExpress.png" alt="American Express" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="/images/cocktailLogo.png" alt="Liquor Land Logo" style={{ height: "7rem" }} />
                    <p className="warning"><b>Warning:</b> Excessive consumption of alcohol is life threatening and is detrimental to health!</p>
                    <hr />
                    <h6 className="copyRights">&copy; 2023 Michal Duvidzon</h6>
                </footer>
            </div>

            <LoginModal
                show={openLoginModal}
                onHide={() => setOpenLoginModal(false)}
                setUserInfo={setUserInfo}
            />
            <Contact
                show={openContactModal}
                onHide={() => setOpenContactModal(false)} />
        </>
    )
}
export default Footer;