import { FunctionComponent, useContext, useState } from "react";
import Cards, { Focused } from 'react-credit-cards-2';
import { useFormik } from "formik";
import * as yup from "yup";
import { alertMsg } from "../services/feedbackService";
import { Modal } from "react-bootstrap";
import { siteTheme } from "../App";

interface PaymentProps {
    holderName: string;
    cardNumber: string;
    expiration: string;
    cvc: string;
    focus: string;
    show: boolean;
    onHide: Function;
}

const Payment: FunctionComponent<PaymentProps> = ({ show, onHide }) => {
    let theme = useContext(siteTheme);
    const [focus, setFocus] = useState<Focused | undefined>(undefined)

    let formik = useFormik({
        initialValues: { holderName: "", cardNumber: "", expiration: "", cvc: "" },
        validationSchema: yup.object({
            holderName: yup.string().required("Card holder Name is required").min(2),
            cardNumber: yup.string().required("Card number is required").min(14).max(16).matches(/^[0-9]*$/, "only numbers allowed"),
            expiration: yup.string().required("Expiration date is required").length(4, 'Expiration date must be exactly 4 digits').test('is-valid-expiration', 'Invalid expiration date', (value) => {
                if (!value) return false;
                const month = parseInt(value.slice(0, 2), 10);
                const year = parseInt(value.slice(2), 10);
                return month >= 1 && month <= 12 && year >= 24;
            }),
            cvc: yup.string().required("CVC number is required, 3-4 digits").matches(/^[0-9]*$/, "only numbers allowed").min(3).max(4),
            focus: yup.string()
        }),
        onSubmit: (values) => {
            alertMsg("Im sorry, I'm only student and this is my final project. I cant allow you to pay")
        }
    })

    let handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(e.target.name as Focused);
    };

    return (
        <>
            <Modal show={show} onHide={() => onHide()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                className={`${theme}`}>
                <div className="modalContent">
                    <Modal.Header className="payment-title" closeButton data-bs-theme={`${theme}`}>
                        <h4>Credit Card Payment</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="mb-3" onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col" style={{ padding: '36px' }}>
                                    <div className="form-floating mb-3">
                                        <input name="holderName" type="text" className="form-control" id="holderName" placeholder="John Doe"
                                            value={formik.values.holderName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            onFocus={handleInputFocus} />

                                        <label htmlFor="holderName">Card Holder Name</label>
                                        {formik.touched.holderName && formik.errors.holderName && (<small className="text-danger">{formik.errors.holderName}</small>)}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input name="cardNumber" type="text" className="form-control" id="cardNumber" placeholder="1234567890123456"
                                            value={formik.values.cardNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            onFocus={handleInputFocus} />
                                        <label htmlFor="cardNumber">Card Number</label>
                                        {formik.touched.cardNumber && formik.errors.cardNumber && (<small className="text-danger">{formik.errors.cardNumber}</small>)}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input name="expiration" type="text" className="form-control" id="expiration" placeholder="11/20"
                                                    value={formik.values.expiration}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    onFocus={handleInputFocus} />
                                                <label htmlFor="expiration">Expiration Date</label>
                                                {formik.touched.expiration && formik.errors.expiration && (<small className="text-danger">{formik.errors.expiration}</small>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input name="cvc" type="text" className="form-control" id="cvc" placeholder="123"
                                                    value={formik.values.cvc}
                                                    onChange={formik.handleChange}
                                                    onFocus={handleInputFocus}
                                                    onBlur={formik.handleBlur} />
                                                <label htmlFor="cvc">CVC</label>
                                                {formik.touched.cvc && formik.errors.cvc && (<small className="text-danger">{formik.errors.cvc}</small>)}
                                            </div>
                                        </div>
                                    </div>
                                </div >
                                <div className="col d-flex justify-content-center align-items-center">
                                    <Cards
                                        cvc={formik.values.cvc}
                                        expiry={formik.values.expiration}
                                        name={formik.values.holderName}
                                        number={formik.values.cardNumber}
                                        focused={focus}
                                    />
                                </div>
                            </div >
                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn btn-danger w-25" type="submit" disabled={!formik.isValid || !formik.dirty}>Pay Now</button>
                            </div>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}

export default Payment;



