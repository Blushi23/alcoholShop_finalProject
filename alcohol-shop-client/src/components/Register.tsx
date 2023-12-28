import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { alertMsg, errorMsg, successMsg } from "../services/feedbackService";
import { addUser, getTokenDetails } from "../services/usersService";
import { addDays } from "date-fns";
// import addDays from "date-fns/addDays";

interface RegisterProps {
    setUserInfo: Function;
    onHide: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo, onHide }) => {
    let navigate = useNavigate();
    let handleClearForm = () => {
        if (window.confirm("Do you want to clear this form?")) {
            formik.resetForm();
            successMsg("The form is cleared");
            formik.setFieldValue("houseNumber", "");
            formik.setFieldValue("floor", "");
            formik.setFieldValue("apartment", "");
        }
    }

    useEffect(() => {
        formik.setFieldValue("houseNumber", "");
        formik.setFieldValue("floor", "");
        formik.setFieldValue("apartment", "");
    }, []);
    let formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", birthDate: "", phone: "", password: "", country: "", city: "", street: "", houseNumber: 0, floor: 0, apartment: 0, zip: "", isAdmin: false },
        validationSchema: yup.object({
            firstName: yup.string().required("First name must have at least 2 characters").min(2),
            lastName: yup.string().required("Last name must have at least 2 characters").min(2),
            email: yup.string().required("Enter a valid email address").email(),
            birthDate: yup.date().required("Enter your birth date").max(new Date(), "Birth date can't be in the future").test('is-over-18', 'You must be at least 18 years old to register', function (value) {
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
            floor: yup.number().min(0),
            apartment: yup.number().min(0),
            zip: yup.string().min(5),
        }),
        onSubmit: (values) => {
            addUser(values)
                .then((res) => {
                    sessionStorage.setItem("token", JSON.stringify({ token: res.data }))
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: (getTokenDetails() as any).email,
                        userId: (getTokenDetails() as any)._id,
                        isAdmin: (getTokenDetails() as any).isAdmin
                    }))
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                    onHide();
                    successMsg(`${values.firstName} ${values.lastName} registered successfully`);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    errorMsg("You already have a registered user.");
                    navigate("/login")

                })
        }
    })
    return (
        <>
            <div className="container-register">
                <form className="mb-3" onSubmit={formik.handleSubmit}>
                    {/* <h2 className="title display-1">Register</h2> */}
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="firstName" type="text" className="form-control" id="firstName" placeholder="Donald"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="firstName">First Name *</label>
                                {formik.touched.firstName && formik.errors.firstName && (<small className="error-message ">{formik.errors.firstName}</small>)}
                            </div></div>
                        <div className="col"><div className="form-floating mb-3">
                            <input name="lastName" type="text" className="form-control" id="lastName" placeholder="Duck"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="lastName">Last Name *</label>
                            {formik.touched.lastName && formik.errors.lastName && (<small className="error-message">{formik.errors.lastName}</small>)}
                        </div></div>
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
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input name="birthDate" type="date" className="form-control" id="birthDate" placeholder="01/01/2000"
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="birthDate">Birth Date *</label>
                                <p><small className="error-message "><b>No changing after registration </b></small></p>
                                {formik.touched.birthDate && formik.errors.birthDate && (<small className="error-message">{formik.errors.birthDate}</small>)}
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
                                <input name="password" type="password" className="form-control" id="registerPassword" placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="registerPassword">Password *</label>
                                {formik.touched.password && formik.errors.password && (<small className="error-message">{formik.errors.password}</small>)}
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
                                <input name="street" type="text" className="form-control" id="street" placeholder="tel-aviv"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="street">Street *</label>
                                {formik.touched.street && formik.errors.street && (<small className="error-message">{formik.errors.street}</small>)}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-floating mb-3">
                                <input name="houseNumber" type="number" className="form-control" id="houseNumber" placeholder="1" min={1}
                                    value={formik.values.houseNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="houseNumber">House No.*</label>
                                {formik.touched.houseNumber && formik.errors.houseNumber && (<small className="error-message">{formik.errors.houseNumber}</small>)}
                            </div></div>
                        <div className="col-sm-2">
                            <div className="form-floating mb-3">
                                <input name="floor" type="number" className="form-control" id="floor" placeholder="1"
                                    value={formik.values.floor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="floor">Floor</label>
                            </div></div>
                        <div className="col-sm-3">
                            <div className="form-floating mb-3">
                                <input name="apartment" type="number" className="form-control" id="apartment" placeholder="1" min={0}
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
                                <label htmlFor="zip">Zip</label>
                            </div></div>
                    </div>

                    <button
                        type="submit"
                        className="btn submit-btn w-100 "
                        disabled={!formik.isValid || !formik.dirty}>Register</button>


                    <div className="row">
                        <div className="col">
                            <button className="btn backBtn w-50 ms-5  my-3" onClick={() => onHide()}>Back</button>
                        </div>
                        <div className="col">
                            <button type="reset" className="btn refreshBtn w-50  ms-5 my-3" onClick={() => handleClearForm()}><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                    </div>
                </form >
            </div >        </>
    )
}

export default Register;