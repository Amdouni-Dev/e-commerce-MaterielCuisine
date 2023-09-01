import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import axios from "axios";
let schema = yup.object().shape({
    name: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    // brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    //tags: yup.string().required("Tag is Required"),
    //color: yup
    //   .array()
    //   .min(1, "Pick at least one color")
    //   .required("Color is Required"),
    countInStock: yup.number().required("Quantity is Required"),
});

const Addproduct= ({ isShowAddProduct2}) => {
    const getAddProductStyle = () => {
        return isShowAddProduct2 ? { right: '0px' } : {};
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    console.log(color);
    // useEffect(() => {
    //   dispatch(getBrands());
    //   dispatch(getCategories());
    //   dispatch(getColors());
    // }, []);



    const [connectedUser,setConnectedUser] = useState(null);
    useEffect(async  ()=> {



        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert("You must be connected to create product or comment ....");
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
        // Extract the user ID from the payload


    },[] )
    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const [cats,setCats]=useState([])
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/category/allCategories");
                console.log(response.data);
                setCats(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    // useEffect(() => {
    //     if (isSuccess && createdProduct) {
    //         toast.success("Product Added Successfullly!");
    //     }
    //     if (isError) {
    //         toast.error("Something Went Wrong!");
    //     }
    // }, [isSuccess, isError, isLoading]);
    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });
    // const img = [];
    // imgState.forEach((i) => {
    //   img.push({
    //     public_id: i.public_id,
    //     url: i.url,
    //   });
    // });

    // useEffect(() => {
    //   formik.values.color = color ? color : " ";
    //   formik.values.images = img;
    // }, [color, img]);
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            // brand: "",
            category: "",
            //  tags: "",
            //  color: "",
            countInStock: "",
            image: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            try {
                // Créez un FormData pour envoyer le formulaire et l'image au backend
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("categoryID", values.category);

                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("countInStock", values.countInStock);
                formData.append("image", values.image);


                // Envoyez les données à la route backend
                if(connectedUser){
                const response = await fetch(
                    `http://localhost:5000/product/addProduct/${connectedUser}`,
                    {
                        method: "POST",
                        body: formData, // Utilisation du FormData comme corps de la requête
                    }
                );

                if (response.ok) {
                    formik.resetForm();
                    toast.success("Product Added Successfully!");
                    dispatch(resetState());
                } else {
                    // Gérez les erreurs ici
                    toast.error("Failed to add product");
                }
                }
                else{
                    toast.error("You must be connected ! Please")
                }
            } catch (error) {
                console.error("Error adding product:", error);
                // Gérez les erreurs ici
                toast.error("An error occurred");
            }
        },
    });

    const handleColors = (e) => {
        setColor(e);
        console.log(color);
    };
    return (
        <div id='productContainer2' style={getAddProductStyle()}>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    {/*<select*/}
                    {/*  name="brand"*/}
                    {/*  onChange={formik.handleChange("brand")}*/}
                    {/*  onBlur={formik.handleBlur("brand")}*/}
                    {/*  value={formik.values.brand}*/}
                    {/*  className="form-control py-3 mb-3"*/}
                    {/*  id=""*/}
                    {/*>*/}
                    {/*  <option value="">Select Brand</option>*/}
                    {/*  {brandState.map((i, j) => {*/}
                    {/*    return (*/}
                    {/*      <option key={j} value={i.title}>*/}
                    {/*        {i.title}*/}
                    {/*      </option>*/}
                    {/*    );*/}
                    {/*  })}*/}
                    {/*</select>*/}
                    {/*<div className="error">*/}
                    {/*  {formik.touched.brand && formik.errors.brand}*/}
                    {/*</div>*/}



                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {cats.map((i, j) => {
                            return (
                                <option key={j} value={i._id}>
                                    {i.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    {/*<select*/}
                    {/*  name="tags"*/}
                    {/*  onChange={formik.handleChange("tags")}*/}
                    {/*  onBlur={formik.handleBlur("tags")}*/}
                    {/*  value={formik.values.tags}*/}
                    {/*  className="form-control py-3 mb-3"*/}
                    {/*  id=""*/}
                    {/*>*/}
                    {/*  <option value="" disabled>*/}
                    {/*    Select Category*/}
                    {/*  </option>*/}
                    {/*  <option value="featured">Featured</option>*/}
                    {/*  <option value="popular">Popular</option>*/}
                    {/*  <option value="special">Special</option>*/}
                    {/*</select>*/}
                    {/*<div className="error">*/}
                    {/*  {formik.touched.tags && formik.errors.tags}*/}
                    {/*</div>*/}

                    {/*<Select*/}
                    {/*  mode="multiple"*/}
                    {/*  allowClear*/}
                    {/*  className="w-100"*/}
                    {/*  placeholder="Select colors"*/}
                    {/*  defaultValue={color}*/}
                    {/*  onChange={(i) => handleColors(i)}*/}
                    {/*  options={coloropt}*/}
                    {/*/>*/}
                    {/*<div className="error">*/}
                    {/*  {formik.touched.color && formik.errors.color}*/}
                    {/*</div>*/}
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="countInStock"
                        onChng={formik.handleChange("countInStock")}
                        onBlr={formik.handleBlur("countInStock")}
                        val={formik.values.countInStock}
                    />
                    <div className="error">
                        {formik.touched.countInStock && formik.errors.countInStock}
                    </div>

                    <CustomInput
                        type="file"
                        label="Enter Product Image"
                        name="image"
                        onChng={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                        onBlur={formik.handleBlur("image")}
                    />
                    <div className="error">
                        {formik.touched.image && formik.errors.image}
                    </div>

                    {/*<div className="bg-white border-1 p-5 text-center">*/}
                    {/*  <Dropzone*/}
                    {/*    onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}*/}
                    {/*  >*/}
                    {/*    {({ getRootProps, getInputProps }) => (*/}
                    {/*      <section>*/}
                    {/*        <div {...getRootProps()}>*/}
                    {/*          <input {...getInputProps()} />*/}
                    {/*          <p>*/}
                    {/*            Drag 'n' drop some files here, or click to select files*/}
                    {/*          </p>*/}
                    {/*        </div>*/}
                    {/*      </section>*/}
                    {/*    )}*/}
                    {/*  </Dropzone>*/}
                    {/*</div>*/}
                    {/*<div className="showimages d-flex flex-wrap gap-3">*/}
                    {/*  {imgState?.map((i, j) => {*/}
                    {/*    return (*/}
                    {/*      <div className=" position-relative" key={j}>*/}
                    {/*        <button*/}
                    {/*          type="button"*/}
                    {/*          onClick={() => dispatch(delImg(i.public_id))}*/}
                    {/*          className="btn-close position-absolute"*/}
                    {/*          style={{ top: "10px", right: "10px" }}*/}
                    {/*        ></button>*/}
                    {/*        <img src={i.url} alt="" width={200} height={200} />*/}
                    {/*      </div>*/}
                    {/*    );*/}
                    {/*  })}*/}
                    {/*</div>*/}
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproduct;
