import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

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
    name: yup.string().required("Name is Required"),
    surname: yup.string().required("Surname is Required"),
    email: yup.string().email("Email should be valid").required("Email is Required"),
    password: yup.string().required("Password is Required"),
});
const animatedComponents = makeAnimated();

const options = [
    { value: 'user', label: 'user' },
    { value: 'admin', label: 'admin' }
]

const SignIn = () => {
    const [selectedRole, setSelectedRole] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [role, setRole] = useState('user');
    // houni necj nasna3 l form w na3tyha des vals initiales
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
            role: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        try {
            const roleValue = options.map(option => option.value);
console.log("**************")
            console.log(roleValue)
            console.log("**************")

            const response = await axios.post("http://localhost:5000/user/register", {
                name:values.name,
                surname:values.surname,
role:role,
                email: values.email,
                password: values.password,
            });

            if (response.data.status === "ok") {
                console.log("Connexion réussie. Token :", response.data.data);
                setError("");
                navigate("/admin"); // Rediriger vers la page "admin" après la connexion réussie
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la saisie :", error);
            setError("Erreur lors de la saisie.");
        }
    };
    const handleChangeRole = (selectedOptions) => {
        // Extract the values of the selected options (an array of objects) and store them in the state
        setSelectedRole(selectedOptions.map((option) => option.value));
    };
    const handleLougout=()=>{

        window.location.href=''
    }
    return (
        <div className="py-5" style={{ background: "light", minHeight: "100vh" }}>

            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">SignIn</h3>
                <p className="text-center">SignIn .</p>
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
                        type="text"
                        label="Name"
                        id="name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <CustomInput
                        type="text"
                        label="SurName"
                        id="surname"
                        name="surname"
                        onChng={formik.handleChange("surname")}
                        onBlr={formik.handleBlur("surname")}
                        val={formik.values.surname}
                    />

                    <CustomInput
                        type="password"
                        label="Password"
                        id="pass"
                        name="password"
                        onChng={formik.handleChange("password")}
                        onBlr={formik.handleBlur("password")}
                        val={formik.values.password}
                    />
                    <div className="form-floating mt-3">
                        <select className={'form-control'} value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" disabled>
                                Choisir un rôle ...
                            </option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>


                    <div className="error mt-2">{formik.touched.password && formik.errors.password}</div>
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password" className="">
                            Forgot Password?
                        </Link>

                        <Link style={{ float: "left" }} to="/" className="">
                            Login
                        </Link>


                        {/*<div  style={{float:"left "}}   >SIGN IN</div>*/}


                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                    Register
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SignIn;
