import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbackService";
import { getUserById, updateUser } from "../services/usersService";
import { addDays } from "date-fns";
import User from "../interfaces/User";

interface UpdateAccountProps {
    setUserInfo: Function;
    userInfo: any;
    handleUpdateUser: Function;
    user: User;
    setUser: Function;
}
const UpdateAccount: FunctionComponent<UpdateAccountProps> = ({ userInfo, setUserInfo, handleUpdateUser, user, setUser }) => {
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
    let [isDisabled, setIsDisabled] = useState(true);
    let formik = useFormik({
        initialValues: { firstName: user.firstName, lastName: user.lastName, email: user.email, birthDate: user.birthDate, phone: user.phone, password: user.password, country: user.country, city: user.city, street: user.street, houseNumber: user.houseNumber, floor: user.floor, apartment: user.apartment, zip: user.zip, isAdmin: user.isAdmin },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstName: yup.string().required("First name must have at least 2 characters").min(2),
            lastName: yup.string().required("Last name must have at least 2 characters").min(2),
            email: yup.string().required("Enter a valid email address").email(),
            birthDate: yup.date().required("Enter your birth day").max(new Date(), "Birth date can't be in the future").test('is-over-18', 'You must be at least 18 years old to register', function (value) {
                let today = new Date();
                let calculate18 = addDays(today, -18 * 365);
                return new Date(value) <= calculate18;
            }),
            phone: yup.string().required("Phone number must have at least 9 characters").min(9).matches(/^[0-9]+$/, "phone must have numbers only"),
            password: yup.string().required(`Password must have at least 8 characters, capital letter, digits and includ a special character from (*_-&^%$#@!)`).min(8).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[(*_\-&^%$#@!)]).{8,}$/, "Password must contain 8 charachters, capital letter, digits and special character (*_-&^%$#@!)"),
            country: yup.string().required("Country name must have at least 2 characters").min(2),
            city: yup.string().required("City name must have at least 2 characters").min(2),
            street: yup.string().required("Street name must have at least 2 characters").min(2),
            houseNumber: yup.number().required("Enter valid number").min(0),
            floor: yup.number().min(0).nullable(),
            apartment: yup.number().min(0).nullable(),
            zip: yup.string().min(5),
        }),
        onSubmit: (values) => {
            updateUser(values, userId)
                .then((res) => {
                    handleUpdateUser(res.data)
                    if (id) navigate(-1)
                    else {
                        successMsg("User updated successfully!")
                        navigate("/")
                    }
                })
                .catch((err) => console.log(err));
        }
    })

    return (
        <>
            <div className="container-register">
                <form className="mb-3" onSubmit={formik.handleSubmit}>
                    <h2 className="edit-user-title display-3">Update Account</h2>
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
                        <div className="col">
                            <div className="form-floating disabled-field mb-3">
                                <input name="birthDate" type="date" className="form-control" id="birthDate" placeholder="01/01/2000"
                                    value={formik.values.birthDate}
                                    disabled />
                                <label htmlFor="birthDate">Birth Date *</label>

                            </div>
                        </div>
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating disabled-field mb-3 d-flex align-items-center">
                                <input name="password" type="password" className="form-control" id="registerPassword" placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={isDisabled} />
                                <label htmlFor="registerPassword" className="flex-grow-1">Password *</label>
                                {formik.touched.password && formik.errors.password && (<small className="error-message">{formik.errors.password}</small>)}
                                <button className="btn change-password ms-2" type="button" onClick={() => setIsDisabled(false)}>Change Password</button>
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
                    </div>
                    <div className="row">
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
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="street" type="text" className="form-control" id="street" placeholder="Arlozorov"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="street">Street *</label>
                                {formik.touched.street && formik.errors.street && (<small className="error-message">{formik.errors.street}</small>)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
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
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="zip" type="string" className="form-control" id="zip" placeholder="1" min={0}
                                    value={formik.values.zip}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="zip">Zip</label>
                            </div></div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn submit-btn w-50 btn-primary"
                            disabled={!formik.isValid || !formik.dirty}>Update</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn backBtn w-25 my-3" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </form >
            </div >          </>
    )
}

export default UpdateAccount;