import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser, getTokenDetails } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbackService";

interface LoginProps {
    setUserInfo: Function;
    onHide: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo, onHide }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    sessionStorage.setItem("token", JSON.stringify({ token: res.data }))
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: (getTokenDetails() as any).email,
                        userId: (getTokenDetails() as any)._id,
                        isAdmin: (getTokenDetails() as any).isAdmin,
                    }))
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string))
                    successMsg(`${values.email} logged in successfully`);
                    onHide();
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    errorMsg("Wrong email or password");
                })
        }
    })

    return (
        <>
            <div className="container col-md-12 text-center">
                <form className="mb-3" onSubmit={formik.handleSubmit} >
                    {/* <h2 className="title display-4">Login</h2> */}
                    <div className="form-floating mb-3">
                        <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInput">Email address *</label>
                        {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}
                    </div>
                    <div className="form-floating">
                        <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingPassword">Password *</label>
                        {formik.touched.password && formik.errors.password && (<small className="text-danger">{formik.errors.password}</small>)}
                    </div>
                    <button type="submit" className="btn w-100 submit-btn my-3 btn-primary" disabled={!formik.isValid || !formik.dirty}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;