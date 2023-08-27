import React, { useEffect, useState } from 'react';
import './productstyle.css';
import CustomInput from "../CustomInput";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    description: yup.string().required("Description is Required"),
});

const AddProduct = ({ isShowAddProduct }) => {

    const [image, setImage] = useState(null);
const [connectedUser,setConnectedUser] = useState(null);
const [products, setProducts] = useState([]);
const [isSuccess,setIsSuccess]=useState(false);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getAddProductStyle = () => {
        return isShowAddProduct ? { right: '0px' } : {};
    };

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        image: null
    });

    useEffect(async  ()=> {



        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert("Vous devez être connecté pour créer un produit.");
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
        // Extract the user ID from the payload


    },[] )


    const handleSubmit2 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', productData.name);
        formData.append('description', productData.description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                alert("Vous devez être connecté pour créer un produit.");
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            };

            const response = await axios.post(`http://localhost:5000/product/addProduct/${connectedUser}`, formData, config);
            console.log(response.data);
            setIsSuccess(true);
            toast.success("Product Added Successfullly!");
        } catch (error) {
            console.error(error);
            alert("Une erreur s'est produite lors de la création du produit.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    return (
        <div id='productContainer2' style={getAddProductStyle()}>
            <div id="product">
                <div>
                    <h3 className="mb-4 title">Add Product</h3>
                    <div>
                        <form
                            onSubmit={handleSubmit2}
                            className="d-flex gap-3 flex-column"
                        >
                            <input
                                type="text"
                              //  label="Enter Product Title"
                                name="name"
                                onChange={handleInputChange}
                                value={productData.name}

                            />

                            <div className="">
                                <ReactQuill
                                    theme="snow"
                                    name="description"
                                    onChange={(value) => setProductData({ ...productData, description: value })}
                                    value={productData.description}
                                />
                            </div>

                            <div>
                                <label>Image du produit</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button style={{marginBottom:"20px" }}
                                id='addToCartButton'
                                type="submit"
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;






/*
* import React, {useEffect, useState} from 'react';
import './productstyle.css';
import CustomInput from "../CustomInput";
import ReactQuill from "react-quill";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBrands} from "../../features/brand/brandSlice";
import {getCategories} from "../../features/pcategory/pcategorySlice";
import {getColors} from "../../features/color/colorSlice";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {createProducts, resetState} from "../../features/product/productSlice";
import * as yup from "yup";
import axios from "axios";
// import CartProduct from './cartproduct/cartproductview';
let schema = yup.object().shape({
    name: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup
        .array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
    quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = ({ isShowAddProduct }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    console.log(color);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);
    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });
    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img]);
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",

            image: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });
    const handleColors = (e) => {
        setColor(e);
        console.log(color);
    };

    const getAddProductStyle = () => {
        return isShowAddProduct ? { right: '0px' } : {};
    };

   const token=localStorage.getItem('jwtToken')
    useEffect( ()=>{
        console.log("TOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKEEEEEEEEENNNNNNNN")
       console.log(token)
        console.log("TOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKEEEEEEEEENNNNNNNN")

    },[] )

    const handleSubmit = async (values) => {
        try {


            const response = await axios.post("http://localhost:5000/product/addProduct/64c111e5ea61c2769fac4c59", {
                name:values.name,
                description:values.description,
                image:values.image

            });

            if (response.data.status === "ok") {
                console.log("produit ajouté. Token :", response.data);
                // setError("");
                // navigate("/admin"); // Rediriger vers la page "admin" après la connexion réussie
            } else {
                // setError(response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la saisie :", error);
            // setError("Erreur lors de la saisie.");
        }
    };




    const [productData, setProductData] = useState({
        title: "",
        description: "",
        price: 0,
        image: null // État pour stocker l'image sélectionnée
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setProductData({ ...productData, image: imageFile });
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();

        // Créez un objet FormData pour envoyer le formulaire avec l'image
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);

        formData.append('image', productData.image);

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                alert("Vous devez être connecté pour créer un produit.");
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Définissez le type de contenu sur 'multipart/form-data'
                },
            };

            const response = await axios.post('http://localhost:5000/product/addProduct/64c111e5ea61c2769fac4c59', formData, config);
            console.log(response.data);
            alert("Produit créé avec succès !");
        } catch (error) {
            console.error(error);
            alert("Une erreur s'est produite lors de la création du produit.");
        }
    };
    return (
        <div id='productContainer2' style={getAddProductStyle()}>
            <div id="product">
                <div>
                    <h3 className="mb-4 title">Add Product</h3>
                    <div>
                        <form onSubmit={handleSubmit2}>
                            <div>
                                <label>Titre du produit</label>
                                <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" value={productData.description} onChange={handleInputChange} />
                            </div>

                            <div>
                                <label>Image du produit</label>
                                <input type="file" name="image" onChange={handleImageChange} />
                            </div>
                            <button type="submit">Créer le produit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;

* */
