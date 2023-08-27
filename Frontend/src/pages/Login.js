import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
    Navbar,
    Collapse,
    Nav,
    NavItem,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Button,
} from "reactstrap";
import {Image} from "antd";
const schema = yup.object().shape({
    email: yup.string().email("Email should be valid").required("Email is Required"),
    password: yup.string().required("Password is Required"),
});

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    // houni necj nasna3 l form w na3tyha des vals initiales
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:5000/user/login-user", {
                email: values.email,
                password: values.password,
            });

            if (response.data.status === "ok") {
                const token = response.data.data.token;
                console.log("****************************************************************")
                console.log(token)

                console.log("****************************************************************")

                localStorage.setItem('jwtToken', token);

                 const token2 = localStorage.getItem('jwtToken');
                console.log("****************************************************************")
                console.log(token2)

                console.log("*************11111***************************************************")


                localStorage.setItem('connectedUser', response.data.data.user._id);

                localStorage.setItem('emailUserConnected', response.data.data.user.email);
                localStorage.setItem('nameUserConnected', response.data.data.user.name);

                const connectedUser=localStorage.getItem('connectedUser');
console.log(connectedUser)
                console.log("Connexion réussie. Token :", response.data.data);
                setError("");
                navigate("/admin"); // Rediriger vers la page "admin" après la connexion réussie
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError("Erreur lors de la connexion.");
        }
    };

    return (
        <div className="py-5" style={{ background: "light", minHeight: "100vh" }}>

            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <div className="error text-center">
                    {error && error} {/* Affichez l'erreur ici */}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Email Address"
                        id="email"
                        name="email"
                        onChng={formik.handleChange("email")}
                        onBlr={formik.handleBlur("email")}
                        val={formik.values.email}
                    />
                    <div className="error mt-2">{formik.touched.email && formik.errors.email}</div>
                    <CustomInput
                        type="password"
                        label="Password"
                        id="pass"
                        name="password"
                        onChng={formik.handleChange("password")}
                        onBlr={formik.handleBlur("password")}
                        val={formik.values.password}
                    />
                    <div className="error mt-2">{formik.touched.password && formik.errors.password}</div>
                    <div className="mb-3 text-end">
                        <Link to="forgot-password" className="">
                            Forgot Password?
                        </Link>

                        <Link style={{float:"left "}} to="SignIn" className="">
                       Sign In
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
