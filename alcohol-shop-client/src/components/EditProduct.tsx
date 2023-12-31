import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { getProductById, updateProduct } from "../services/productsService";
import Product from "../interfaces/Product";
import { useFormik } from "formik";
import { successMsg } from "../services/feedbackService";

interface EditProductProps {

}

const EditProduct: FunctionComponent<EditProductProps> = () => {
    let { category, subcategory, id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        getProductById(category as string, subcategory as string, id as string)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [category, subcategory, id])
    let [product, setProduct] = useState<Product>({ name: "", category: "", subcategory: "", price: 0, description: "", volume: 0, alcoholPercentage: "", origin: "", image: "" })
    let formik = useFormik({
        initialValues: { name: product.name, category: product.category, subcategory: product.subcategory, price: product.price, description: product.description, volume: product.volume, alcoholPercentage: product.alcoholPercentage, origin: product.origin, image: product.image },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required("Product name is required").min(2),
            category: yup.string().required("Choose category"),
            subcategory: yup.string().required("Choose subcategory"),
            price: yup.number().required("Price is required").min(0),
            description: yup.string().required("Description is required").min(2),
            volume: yup.number(),
            alcoholPercentage: yup.string(),
            origin: yup.string(),
            image: yup.string()
        }),
        onSubmit: (values) => {
            updateProduct(values, category as string, subcategory as string, id as string)
                .then((res) => {
                    navigate(-1)
                    successMsg("Product updated successfully")
                })
                .catch((err) => console.log(err))
        }
    })
    let dependedSubcategories = (selectedCategory: string) => {
        switch (selectedCategory) {
            case "alcohol":
                return ["whiskey", "vodka", "gin", "tequila", "liqueur", "rum", "cognac", "brandy"]
            case "beer":
                return ["lager", "ale", "wheat", "stout", "ipa", "cider"]
            case "wine":
                return ["red", "white", "rose", "sparkling", "dessert & fortified"]
            default:
                break;
        }
    }
    return (
        <>
            <div className="container ">

                <form className="mb-3 edit-product" onSubmit={formik.handleSubmit}>
                    <h4 className="managment-title my-4">Edit product</h4>
                    <div className="row">
                        <div className="col-sm-6"><div className="form-floating mb-3">
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Martini Bianco"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            <label htmlFor="name">Product name</label>
                            {formik.touched.name && formik.errors.name && (<small className="text-danger">{formik.errors.name}</small>)}
                        </div></div>
                        <div className="col-sm-6">
                            <div className="form-floating">
                                <input type="text" name="image" id="image"
                                    className="form-control"
                                    placeholder="image.png" value={formik.values.image}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="image">Image</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><div className="form-floating mb-3">
                            <input
                                name="price"
                                id="price"
                                type="number"
                                className="form-control"
                                placeholder="100"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min="0" />
                            <label htmlFor="price">Price (&#8362;)</label>
                            {formik.touched.price && formik.errors.price && (<small className="text-danger">{formik.errors.price}</small>)}
                        </div></div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <select
                                    name="category"
                                    id="category"
                                    className="form-select"
                                    value={formik.values.category}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue("subcategory", "");
                                    }}
                                    onBlur={formik.handleBlur} >
                                    <option value="">Select category</option>
                                    <option value="alcohol">Alcohol</option>
                                    <option value="beer">Beer</option>
                                    <option value="wine">Wine</option>
                                </select>
                                <label htmlFor="category">Category</label>
                                {formik.touched.category && formik.errors.category && (<small className="text-danger">{formik.errors.category}</small>)}
                            </div>
                        </div>
                        <div className="col"><div className="form-floating mb-3">
                            <select
                                name="subcategory"
                                id="subcategory"
                                className="form-select"
                                value={formik.values.subcategory}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={!formik.values.category}>

                                <option value="">Select subcategory</option>
                                {dependedSubcategories(formik.values.category)?.map((subcategory) => (
                                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                                ))}
                            </select>
                            <label htmlFor="subcategory">Subcategory</label>
                            {formik.touched.subcategory && formik.errors.subcategory && (<small className="text-danger">{formik.errors.subcategory}</small>)}
                        </div></div>
                    </div>
                    <div className="row">
                        <div className="form-floating mb-3">
                            <textarea
                                name="description"
                                id="description"
                                className="form-control"
                                placeholder="info"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ minHeight: '7rem', resize: 'vertical', paddingLeft: "10px" }} />
                            <label style={{ marginLeft: "10px" }} htmlFor="description">  Description</label>
                            {formik.touched.description && formik.errors.description && (<small className="text-danger">{formik.errors.description}</small>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="volume"
                                    id="volume"
                                    type="number"
                                    className="form-control"
                                    placeholder="750"
                                    value={formik.values.volume}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0" />
                                <label htmlFor="volume">Volume (ml)</label>

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="alcoholPercentage"
                                    id="alcoholPercentage"
                                    type="text"
                                    className="form-control"
                                    placeholder="13.5"
                                    value={formik.values.alcoholPercentage}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0" />
                                <label htmlFor="alcoholPercentage">Alcohol percentage (%)</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="origin"
                                    id="origin"
                                    type="text"
                                    className="form-control"
                                    placeholder="canada"
                                    value={formik.values.origin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="origin">Origin country</label>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button
                            type="submit"
                            className="btn btn-edit-product w-25 my-3 me-5"
                            disabled={!formik.isValid || !formik.dirty}>Save changes</button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn back-btn  "
                        >Back</button>
                    </div>
                </form >

            </div >        </>
    )
}

export default EditProduct;