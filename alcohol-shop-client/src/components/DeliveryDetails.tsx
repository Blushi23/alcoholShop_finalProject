import { FunctionComponent, useEffect, useState } from "react";
import Payment from "./Payment";
import User from "../interfaces/User";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/usersService";
import { useFormik } from "formik";
import * as yup from "yup";
import { values } from "lodash";

interface DeliveryDetailsProps {
    // setUserInfo: Function;
    userInfo: any;
    // handleUpdateUser: Function;
    user: User;
    //setUser: Function;
    openPaymentModal: any;
    setOpenPaymentModal: Function;
}

const DeliveryDetails: FunctionComponent<DeliveryDetailsProps> = ({ /*setUserInfo,*/ userInfo, /*handleUpdateUser,*/ user, /*setUser,*/ openPaymentModal, setOpenPaymentModal }) => {
    let [formValues, setFormValues] = useState<User>()
    let { id } = useParams();
    let userId = id ? id : userInfo.userId;
    let navigate = useNavigate();


    let registeredUser = !!userInfo.userId;
    // let registeredUser = userInfo && userInfo.userId;
    let formik = useFormik({
        initialValues: {
            firstName: registeredUser ? user.firstName : "",
            lastName: registeredUser ? user.lastName : "",
            email: registeredUser ? user.email : "",
            phone: registeredUser ? user.phone : "",
            country: registeredUser ? user.country : "",
            city: registeredUser ? user.city : "",
            street: registeredUser ? user.street : "",
            houseNumber: registeredUser ? user.houseNumber : 0,
            floor: registeredUser ? user.floor : 0,
            apartment: registeredUser ? user.apartment : 0,
            zip: registeredUser ? user.zip : ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required("First name must have at least 2 characters").min(2),
            lastName: yup.string().required("Last name must have at least 2 characters").min(2),
            email: yup.string().required("Enter a valid email address").email(),
            phone: yup.string().required("Phone number must have at least 9 characters").min(9).matches(/^[0-9]+$/, "phone must have numbers only"),
            country: yup.string().required("Country name must have at least 2 characters").min(2),
            city: yup.string().required("City name must have at least 2 characters").min(2),
            street: yup.string().required("Street name must have at least 2 characters").min(2),
            houseNumber: yup.number().required("Enter valid number").min(0),
            floor: yup.number().min(0).nullable(),
            apartment: yup.number().min(0).nullable(),
            zip: yup.string().min(5),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    useEffect(() => {
        getUserById(userId)
            .then((res) => { formik.setValues({ ...formik.values, ...res.data }) }
            )
            .catch((err) => console.log(err))
    }, [userId, formik])


    return (
        <div className="container">
            <h3>Delivery Adress</h3>
            {/* <> */}
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="firstName" type="text" className="form-control" id="firstName" placeholder="John"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="firstName">First Name *</label>
                            {formik.touched.firstName && formik.errors.firstName && (<small className="error-message">{formik.errors.firstName}</small>)}
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="lastName" type="text" className="form-control" id="lastName" placeholder="Doe"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="lastName">Last Name *</label>
                            {formik.touched.lastName && formik.errors.lastName && (<small className="error-message">{formik.errors.lastName}</small>)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-floating mb-3">
                        <input name="email" type="email" className="form-control" id="registerEmail" placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="registerEmail">Email Adress *</label>
                        {formik.touched.email && formik.errors.email && (<small className="error-message">{formik.errors.email}</small>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input name="phone" type="text" className="form-control" id="phone" placeholder="050-1111111"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="phone">Phone *</label>
                            {formik.touched.phone && formik.errors.phone && (<small className="error-message">{formik.errors.phone}</small>)}
                        </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="country" type="text" className="form-control" id="country" placeholder="israel"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="country">Country *</label>
                        {formik.touched.country && formik.errors.country && (<small className="error-message">{formik.errors.country}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col"><div className="form-floating mb-3">
                        <input name="city" type="text" className="form-control" id="city" placeholder="tel-aviv"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="city">City *</label>
                        {formik.touched.city && formik.errors.city && (<small className="error-message">{formik.errors.city}</small>)}
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="street" type="text" className="form-control" id="street" placeholder="Arlozorov"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="street">Street *</label>
                        {formik.touched.street && formik.errors.street && (<small className="error-message">{formik.errors.street}</small>)}
                    </div></div>
                </div>
                <div className="row">
                    <div className="col"><div className="form-floating mb-3">
                        <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1" min={1}
                            value={formik.values.houseNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="houseNumber">House No.*</label>
                        {formik.touched.houseNumber && formik.errors.houseNumber && (<small className="error-message">{formik.errors.houseNumber}</small>)}
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="floor" type="number" className="form-control" id="floor" placeholder="1"
                            value={formik.values.floor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floor">Floor</label>
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="apartment" type="number" className="form-control" id="apartment" placeholder="1"
                            value={formik.values.apartment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="apartment">Apartment</label>
                    </div></div>
                    <div className="col"><div className="form-floating mb-3">
                        <input name="zip" type="string" className="form-control" id="zip" placeholder="1" min={0}
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="zip">Zip</label>
                    </div>
                        {/* </div> */}
                    </div>
                </div >
            </form >
            <div className="d-flex justify-content-center">
                <button type="submit" disabled={!formik.isValid || !formik.dirty} className="btn btn-dark" onClick={() => setOpenPaymentModal(true)}>submit and proceed to payment</button>
            </div>

            <div className="d-flex justify-content-center">
                <button type="button" className="btn backBtn w-50 btn-outline-info my-3" onClick={() => navigate("/cart")}>Back to cart</button>
            </div>

            <Payment
                show={openPaymentModal}
                onHide={() => setOpenPaymentModal(false)}
                holderName='' cardNumber='' expiration='' cvc='' focus='' />
        </div>
    )
}

export default DeliveryDetails;