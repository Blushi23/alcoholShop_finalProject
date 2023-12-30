import { FunctionComponent, useContext, useEffect, useState } from "react";
import Payment from "./Payment";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserById } from "../services/usersService";
import User from "../interfaces/User";
import { useNavigate, useParams } from "react-router-dom";
import { siteTheme } from "../App";
import { addOrder } from "../services/ordersService";
import Order from "../interfaces/Order";

interface DeliveryDetailsProps {
    openPaymentModal: any;
    setOpenPaymentModal: Function;
    userInfo: any;
    cartData: any;
    user: User;
    setUser: Function;
}

const DeliveryDetails: FunctionComponent<DeliveryDetailsProps> = ({ openPaymentModal, setOpenPaymentModal, userInfo, cartData, user, setUser }) => {

    let [isRegistered, setIsRegistered] = useState(false);
    // let [userOrder, setUserOrder] = useState<Order>({
    // let [user, setUser] = useState<User>({
    // firstName: "", lastName: "", email: "", phone: "", country: "", city: "", street: "", houseNumber: 0, floor: 0 as number, apartment: 0 as number, zip: ""
    // });
    let { id } = useParams()
    let userId = id ? id : userInfo.userId;
    let navigate = useNavigate();
    let theme = useContext(siteTheme);


    useEffect(() => {
        if (userId) {
            getUserById(userId)
                .then((res) => {
                    setIsRegistered(true);
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err);
                    setIsRegistered(false)
                }
                )
        } else setIsRegistered(false)
    }, [userId])

    let contactDetailsSchema = yup.object({
        firstName: yup.string().required("First name must have at least 2 charachters").min(2),
        lastName: yup.string().required("Last name must have at least 2 charachters").min(2),
        email: yup.string().required("Enter a valid email address").email(),
        phone: yup.string().required("Phone number must have at least 9 characters").min(9).matches(/^[0-9]+$/, "phone must have numbers only")
    },
    )

    let deliveryAdressSchema = yup.object({
        country: yup.string().required("Country name must have at least 2 characters").min(2),
        city: yup.string().required("City name must have at least 2 characters").min(2),
        street: yup.string().required("Street name must have at least 2 characters").min(2),
        houseNumber: yup.number().required("Enter valid number").min(0),
        floor: yup.string(),
        apartment: yup.string(),
        zip: yup.string().min(5),
    });

    let formik = useFormik({
        initialValues: {
            contactDetails: {
                firstName: user.firstName,
                // firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
            },
            deliveryAddress: {
                country: user.country || "",
                city: user.city || "",
                street: user.street || "",
                houseNumber: user.houseNumber || 0,
                floor: user.floor || "",
                apartment: user.apartment || "",
                zip: user.zip || "",
            },
            deliveryInstructions: "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            contactDetails: contactDetailsSchema,
            deliveryAddress: deliveryAdressSchema,
            deliveryInstructions: yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                let orderData = {
                    userId: userInfo.userId,
                    totalPrice: cartData.totalPrice,
                    products: cartData.products
                }

                let newOrder = await addOrder(orderData as Order);
                if (newOrder) {
                    // createOrder(newOrder.data); setOpenPaymentModal(true)
                }
                else {
                    console.log("there is an error creating the order")
                }
            } catch (error) {
                console.log(error);


            }
        }
    })

    return (
        <div className="container">
            <h3>Delivery Adress</h3>
            <form className="mb-3" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="firstName" type="text" className="form-control" id="firstName" placeholder="John"
                                value={formik.values.contactDetails.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="firstName">First Name *</label>
                            {formik.touched.contactDetails?.firstName && formik.errors.contactDetails?.firstName && (<small className="error-message">{formik.errors.contactDetails.firstName}</small>)}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="lastName" type="text" className="form-control" id="lastName" placeholder="Doe"
                                value={formik.values.contactDetails?.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="lastName">Last Name *</label>
                            {formik.touched.contactDetails?.lastName && formik.errors.contactDetails?.lastName && (<small className="error-message">{formik.errors.contactDetails.lastName}</small>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-floating mb-3">
                        <input name="email" type="email" className="form-control" id="registerEmail" placeholder="name@example.com"
                            value={formik.values.contactDetails?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="registerEmail">Email Adress *</label>
                        {formik.touched.contactDetails?.email && formik.errors.contactDetails?.email && (<small className="error-message">{formik.errors.contactDetails.email}</small>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="phone" type="text" className="form-control" id="phone" placeholder="050-1111111"
                                value={formik.values.contactDetails?.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="phone">Phone *</label>
                            {formik.touched.contactDetails?.phone && formik.errors.contactDetails?.phone && (<small className="error-message">{formik.errors.contactDetails.phone}</small>)}
                        </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="country" type="text" className="form-control" id="country" placeholder="israel"
                            value={formik.values.deliveryAddress?.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="country">Country *</label>
                        {formik.touched.deliveryAddress?.country && formik.errors.deliveryAddress?.country && (<small className="error-message">{formik.errors.deliveryAddress.country}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col"><div className="form-floating mb-3">
                        <input name="city" type="text" className="form-control" id="city" placeholder="tel-aviv"
                            value={formik.values.deliveryAddress?.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="city">City *</label>
                        {formik.touched.deliveryAddress?.city && formik.errors.deliveryAddress?.city && (<small className="error-message">{formik.errors.deliveryAddress.city}</small>)}
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="street" type="text" className="form-control" id="street" placeholder="Arlozorov"
                            value={formik.values.deliveryAddress?.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="street">Street *</label>
                        {formik.touched.deliveryAddress?.street && formik.errors.deliveryAddress?.street && (<small className="error-message">{formik.errors.deliveryAddress.street}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col"><div className="form-floating mb-3">
                        <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1" min={1}
                            value={formik.values.deliveryAddress?.houseNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="houseNumber">House No.*</label>
                        {formik.touched.deliveryAddress?.houseNumber && formik.errors.deliveryAddress?.houseNumber && (<small className="error-message">{formik.errors.deliveryAddress.houseNumber}</small>)}
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="floor" type="text" className="form-control" id="floor" placeholder="1"
                            value={formik.values.deliveryAddress.floor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floor">Floor</label>
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="apartment" type="text" className="form-control" id="apartment" placeholder="1"
                            value={formik.values.deliveryAddress?.apartment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="apartment">Apartment</label>
                    </div></div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="zip" type="string" className="form-control" id="zip" placeholder="1" min={0}
                                value={formik.values.deliveryAddress?.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="zip">Zip</label>
                        </div>
                    </div>
                </div >
                <div className="form-floating mb-3">
                    <textarea
                        name="instructions"
                        id="instructions"
                        className="form-control"
                        placeholder="info"
                        value={formik.values.deliveryInstructions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ minHeight: '3.5rem', resize: 'vertical' }} />
                    <label htmlFor="instructions">  Instructions for the delivery</label>
                </div>
            </form >
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark"
                // onClick={ }
                >submit and proceed to payment</button>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn backBtn w-50 btn-outline-info my-3" onClick={() => navigate("/cart")}>Back to cart</button>
            </div>

            <Payment
                show={openPaymentModal}
                onHide={() => setOpenPaymentModal(false)}
                holderName='' cardNumber='' expiration='' cvc='' focus='' />
        </div >
    )
}

export default DeliveryDetails;