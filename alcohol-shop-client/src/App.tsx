import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import User from './interfaces/User';
import UpdateAccount from './components/UpdateAccount';
import CategoryProducts from './components/CategoryProducts';
import ProductPage from './components/ProductPage';
import Product from './interfaces/Product';
import UsersManagment from './components/UsersManagment';
import ProductsManagment from './components/ProductsManagment';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import Search from './components/Search';
import { getProducts } from './services/productsService';
import SearchResults from './components/SearchResults';
import ProductsManagmentSearch from './components/ProductsManagmentSearch';
import Delivery from './components/Delivery';

let theme = {
  light: "light",
  dark: "dark",
};
export let siteTheme = createContext(theme.light);

//Quantity next to cart icon
export let QuantityContext = createContext<{ quantity: any; setQuantity: React.Dispatch<any> }>({
  quantity: {},
  setQuantity: () => { }
});

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem("darkMode")!));

  // Users
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) === null ? { email: false, password: false, isAdmin: false } : JSON.parse(sessionStorage.getItem("userInfo") as string));

  let [user, setUser] = useState<User>({
    firstName: "", lastName: "", email: "", birthDate: "", phone: "", password: "", country: "", city: "", street: "", houseNumber: 0, floor: 0, apartment: 0, zip: "", isAdmin: false
  })
  let [users, setUsers] = useState<User[]>([]);
  let handleUpdateUser = (updatedUser: User) => {
    setUsers((pervUsers) => pervUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)))
  }
  // let handleUpdateDeliveryUser = (updatedUser: User) => {
  //   setUsers((pervUsers) => pervUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)))
  // }

  //Products & Carts

  type Quantity = { [key: string]: number };
  let initialQuantity = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')!) : {};
  let [quantity, setQuantity] = useState<Quantity>(initialQuantity);

  // let [quantity, setQuantity] = useState<Quantity>({});
  let [cartData, setCartData] = useState<any>();
  let updateCartData = (newProduct: any) => {
    setCartData((prevCartData: any) => [...prevCartData, newProduct])
  }

  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((res) => setAllProducts(res.data));
  }, []);
  useEffect(() => {
    localStorage.setItem('quantity', JSON.stringify(quantity));
  }, [quantity]);

  let [productsChanged, setProductsChanged] = useState<boolean>(false);
  let render = () => setProductsChanged(!productsChanged);


  //Modals
  let [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  let [openAgeModal, setOpenAgeModal] = useState<boolean>(false);
  let [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  let [openContactModal, setOpenContactModal] = useState<boolean>(false);
  let [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  let [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setOpenAgeModal(true)
  }, [])
  let handleCloseAgeModal = () => {
    setOpenAgeModal
      (false)
  }

  let [loading, setLoading] = useState<boolean>(false);


  let [searchQuery, setSearchQuery] = useState<string>("");



  return (
    <div className={`App ${darkMode ? theme.light : theme.dark}`}>
      <siteTheme.Provider value={darkMode ? "light" : "dark"}>
        {/* <ShoppingCartProvider> */}
        <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
        <Router  >
          <QuantityContext.Provider value={{ quantity, setQuantity }}>
            <Navbar userInfo={userInfo} setUserInfo={setUserInfo} darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} products={allProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} updateCartData={updateCartData} render={render} productsChanged={productsChanged} setProductsChanged={setProductsChanged} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal}/*updateCart={updateCart}/*quantity={quantity}*/ />

            <Routes>
              <Route path='/' element={<Home openAgeModal={openAgeModal} setOpenAgeModal={setOpenAgeModal} handleCloseAgeModal={handleCloseAgeModal} userInfo={userInfo} products={allProducts} setProducts={setAllProducts} loading={loading} setLoading={setLoading} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              <Route path='/about' element={<About openContactModal={openContactModal} setOpenContactModal={setOpenContactModal} />} />
              <Route path='/update-account/:id' element={<UpdateAccount user={user} setUser={setUser} setUserInfo={setUserInfo} userInfo={userInfo} handleUpdateUser={handleUpdateUser} />} />

              <Route path='/users-managment' element={<UsersManagment users={users} setUsers={setUsers} />} />
              <Route path='/products-managment' element={<ProductsManagment products={allProducts} setProducts={setAllProducts} userInfo={userInfo} loading={loading} setLoading={setLoading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
              <Route path='/new-product' element={<NewProduct />} />
              <Route path='/edit-product/:id' element={<EditProduct />} />
              <Route path='/products/:category/:subcategory/:id' element={<ProductPage products={categoryProducts} setProducts={setCategoryProducts} userInfo={userInfo} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              <Route path='/products/:category' element={<CategoryProducts categoryProducts={categoryProducts} setCategoryProducts={setCategoryProducts} userInfo={userInfo} loading={loading} setLoading={setLoading} setSearchQuery={setSearchQuery} searchQuery={searchQuery} show={show} setShow={setShow} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              <Route path='/products/:category/:subcategory' element={<CategoryProducts categoryProducts={categoryProducts} setCategoryProducts={setCategoryProducts} userInfo={userInfo} loading={loading} setLoading={setLoading} setSearchQuery={setSearchQuery} searchQuery={searchQuery} show={show} setShow={setShow} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              <Route path='/products' element={<CategoryProducts categoryProducts={categoryProducts} setCategoryProducts={setCategoryProducts} userInfo={userInfo} loading={loading} setLoading={setLoading} setSearchQuery={setSearchQuery} searchQuery={searchQuery} show={show} setShow={setShow} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              <Route path='/cart' element={<Cart loading={loading} setLoading={setLoading} quantity={quantity} setQuantity={setQuantity} openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} userInfo={userInfo} cartData={cartData} setCartData={setCartData} render={render} productsChanged={productsChanged} setProductsChanged={setProductsChanged} />} />

              <Route element={<Search products={allProducts} setSearchQuery={setSearchQuery} updateCartData={updateCartData} userInfo={userInfo} render={render} productsChanged={productsChanged} setProductsChanged={setProductsChanged} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal}/*updateCart={updateCart}*/ />} />
              <Route element={<ProductsManagmentSearch setSearchQuery={setSearchQuery} products={allProducts} />} />
              <Route path='/Search/:key' element={<SearchResults products={allProducts} setProducts={setAllProducts} userInfo={userInfo} openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} />} />
              {/* <Route path='/delivery' element={<DeliveryDetails userInfo={userInfo} openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} cartData={cartData} user={user} setUser={setUser} />} /> */}
              <Route path="/delivery" element={<Delivery user={user} setUser={setUser} userInfo={userInfo} openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} />} />

              {/* <Route path='/payment' element={<Payment holderName='' cardNumber='' expiration='' cvc='' focus='' />} /> */}

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </QuantityContext.Provider>
          <Footer userInfo={userInfo} setUserInfo={setUserInfo} openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} openContactModal={openContactModal} setOpenContactModal={setOpenContactModal} />
        </Router >
        {/* </ShoppingCartProvider> */}
      </siteTheme.Provider>

    </div >
  );
}

export default App;
