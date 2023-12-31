import { FunctionComponent, useEffect } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { useFormik } from "formik";
import { successMsg } from "../services/feedbackService";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/usersService";
import Payment from "./Payment";
import { createDeliveryAddress } from "../services/ordersService";
interface DeliveryProps {
    openPaymentModal: boolean;
    setOpenPaymentModal: Function;
    userInfo: any;
    user: User;
    setUser: Function;
}

const Delivery: FunctionComponent<DeliveryProps> = ({ user, setUser, userInfo, openPaymentModal, setOpenPaymentModal }) => {
    let { id } = useParams();
    let userId = id ? id : userInfo.userId;
    let navigate = useNavigate();

    useEffect(() => {
        getUserById(userId)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err));
    }, []);

    let formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone, country: user.country,
            city: user.city,
            street: user.street,
            houseNumber: user.houseNumber,
            floor: user.floor,
            apartment: user.apartment,
            zip: user.zip,
            deliveryInstructions: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            email: yup.string().required().email(),
            phone: yup.string().required().min(9).matches(/^[0-9]+$/, "phone must have numbers only"),
            country: yup.string().required().min(2),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required().min(0),
            floor: yup.number().min(0).nullable(),
            apartment: yup.number().min(0).nullable(),
            zip: yup.string().min(5).required(),
            deliveryInstructions: yup.string()
        }),
        onSubmit: (values) => {
            createDeliveryAddress(userId, values)
                .then((res) => {
                    successMsg("Delivery details recived"); setOpenPaymentModal(true);
                    formik.resetForm()
                })
                .catch((err) => console.log(err)
                )
        }
    })

    return (
        <>
            <div className="container-register">
                <form className="mb-3" onSubmit={formik.handleSubmit}>
                    <h2 className="delivery-title display-3">Delivery details</h2>
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
                                <label className="form-label" htmlFor="lastName">Last Name *</label>
                                {formik.touched.lastName && formik.errors.lastName && (<small className="error-message">{formik.errors.lastName}</small>)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="phone" type="text" className="form-control" id="phone" placeholder="050-0000000"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="phone">Phone *</label>
                                {formik.touched.phone && formik.errors.phone && (<small className="error-message">{formik.errors.phone}</small>)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="email" type="email" className="form-control" id="registerEmail" placeholder="name@example.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="registerEmail">Email Adress *</label>
                                {formik.touched.email && formik.errors.email && (<small className="error-message">{formik.errors.email}</small>)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="country" type="text" className="form-control" id="country" placeholder="israel"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="country">Country *</label>
                                {formik.touched.country && formik.errors.country && (<small className="error-message">{formik.errors.country}</small>)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="city" type="text" className="form-control" id="city" placeholder="tel-aviv"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="city">City *</label>
                                {formik.touched.city && formik.errors.city && (<small className="error-message">{formik.errors.city}</small>)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-floating mb-3">
                                <input name="street" type="text" className="form-control" id="street" placeholder="Arlozorov"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="street">Street *</label>
                                {formik.touched.street && formik.errors.street && (<small className="error-message">{formik.errors.street}</small>)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1" min={1}
                                    value={formik.values.houseNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="houseNumber">House No.*</label>
                                {formik.touched.houseNumber && formik.errors.houseNumber && (<small className="error-message">{formik.errors.houseNumber}</small>)}
                            </div></div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="floor" type="number" className="form-control" id="floor" placeholder="1"
                                    value={formik.values.floor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="floor">Floor</label>
                            </div></div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="apartment" type="number" className="form-control" id="apartment" placeholder="1"
                                    value={formik.values.apartment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="apartment">Apartment</label>
                            </div></div>
                        <div className="col-sm-4">
                            <div className="form-floating mb-3">
                                <input name="zip" type="string" className="form-control" id="zip" placeholder="1" min={0}
                                    value={formik.values.zip}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="zip">Zip *</label>
                                {formik.touched.zip && formik.errors.zip && (<small className="error-message">{formik.errors.zip}</small>)}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-floating mb-3">
                            <textarea name="deliveryInstructions" className="form-control" id="deliveryInstructions" placeholder="text"

                                value={formik.values.deliveryInstructions}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label className="ms-2 fs-shrink" htmlFor="deliveryInstructions">Delivery instructions and information (optional)</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn submit-btn w-75"
                        >submit and proceed to payment</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn backBtn w-25 my-3" onClick={() => navigate(-1)}>Back to Cart</button>
                    </div>
                </form >
            </div >
            <Payment
                show={openPaymentModal}
                onHide={() => setOpenPaymentModal(false)}
                holderName='' cardNumber='' expiration='' cvc='' focus='' />
        </>
    )
}

export default Delivery;