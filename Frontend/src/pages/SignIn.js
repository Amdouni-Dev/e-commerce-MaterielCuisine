import React, {useEffect, useMemo, useState} from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import GoogleMapReact from 'google-map-react';

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
import {GoogleMap,  useLoadScript} from "@react-google-maps/api";
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./leaflet.css"
import ExternalInfo from "../components/ExternalInfo";
// import {Popup} from "leaflet/src/layer";
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
    // const [center,setCenter] = useState([8.8064948, 2.1815316]);
    // // Map
    // const [markerPosition, setMarkerPosition] = useState(center);
    //
    //
    // const ZOOM_LEVEL = 9;

    // ...

    // Gestionnaire d'événement pour le clic sur la carte
    const handleMapClick = (e) => {
        // const clickedPosition = [e.latlng.lat, e.latlng.lng];
        // setMarkerPosition(clickedPosition);
    };
    // Gestionnaire d'événement pour le clic sur le Marker

    //End Map


    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    const [selectedRole, setSelectedRole] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [role, setRole] = useState('user');

    const handleChangeRole = (selectedOptions) => {
        // Extract the values of the selected options (an array of objects) and store them in the state
        setSelectedRole(selectedOptions.map((option) => option.value));
    };
    const handleLougout=()=>{

        window.location.href=''
    }

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [markerPosition, setMarkerPosition] = useState([null, null]);
    const [center, setCenter] = useState([null, null]);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const ZOOM_LEVEL = 9;

    useEffect(() => {
        // Vérifiez si le navigateur prend en charge la géolocalisation
        if ("geolocation" in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            setLatitude(latitude);
                            setLongitude(longitude);
                            setMarkerPosition([latitude, longitude]);
                            setCenter([latitude, longitude]);
                            console.log("Fetching console information from Map")
                            console.log("--------------------------------")
                            console.log(latitude)

                            // Utilisez l'API de géocodage inversé (ex. Google Maps) pour obtenir le nom de la position
                            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=VOTRE_CLE_API`)
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.results && data.results.length > 0) {
                                        const address = data.results[0].formatted_address;
                                        // setLocationName(address);
                                    } else {
                                        // setLocationName("Nom de la position non disponible.");
                                    }
                                })
                                .catch((error) => {
                                    console.error("Erreur lors de la récupération du nom de la position :", error);
                                    // setLocationName("Erreur lors de la récupération du nom de la position.");
                                });
                        },
                        (error) => {
                            console.error("Erreur lors de la récupération de la géolocalisation :", error);
                            // setLocationName("Erreur lors de la récupération de la géolocalisation.");
                        }
                    );
                } else if (result.state === 'denied') {
                    setPermissionDenied(true);
                }
            });
        } else {
            // setLocationName("La géolocalisation n'est pas prise en charge par votre navigateur.");
        }
    }, []);



    useEffect(  ()=>{
       const fetchConsole=()=>{
console.log("--------------22222222---------------")
           console.log(center[0],center[1])
       }
       fetchConsole()
    },[] )


    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);



    // houni necj nasna3 l form w na3tyha des vals initiales
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
            role: "", // Add role field here
            lat:latitude,
            lng:longitude
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
                name: formik.values.name,
                surname: formik.values.surname,
                email: formik.values.email,
                password: formik.values.password,
                role: role, // Send the role state
                lat:latitude,
                lng: longitude
            });

            if (response.data.status === "ok") {
                console.log("Connexion réussie. Token :", response.data.data);
                setError("");
                navigate("/admin"); // Rediriger vers la page "admin" après la connexion réussie
            } else {
                console.log("errrrrreur")
                setError(response.data.error);
                console.log(response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la saisie :", error);
            setError("Erreur lors de la saisie.");
        }
    };










    // useEffect(() => {
    //     // Vérifiez si le navigateur prend en charge la géolocalisation
    //     if ("geolocation" in navigator) {
    //         // Vérifiez si la géolocalisation est déjà activée
    //         navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    //             if (result.state === 'granted') {
    //                 // La géolocalisation est activée, vous pouvez faire ce que vous voulez ici
    //             } else if (result.state === 'prompt') {
    //                 // La géolocalisation n'est pas encore activée, affichez une alerte
    //                 setPermissionDenied(true);
    //                 window.alert("Veuillez activer la géolocalisation pour bien localiser votre position et profiter de nos produits  .");
    //             } else if (result.state === 'denied') {
    //                 // L'utilisateur a refusé la géolocalisation, vous pouvez afficher un message d'erreur ou le rediriger vers les paramètres de géolocalisation
    //                 setPermissionDenied(true);
    //                 window.alert("La géolocalisation est désactivée dans votre navigateur. Veuillez l'activer pour utiliser cette fonctionnalité.");
    //             }
    //         });
    //     }
    // }, []);












    return (
        <div className="py-5" style={{ background: "light", minHeight: "100vh" }}>

            <br />
            <br />

{/*<h1>Position*/}

{/*    Position : Latitude {markerPosition[0].toFixed(6)}, Longitude{" "}*/}
{/*    {markerPosition[1].toFixed(6)}*/}
{/*</h1>*/}
{/*            <h1>Test Mapp</h1>*/}


            <div>
                <p style={{fontSize:"7px"}} >Latitude : {latitude}</p>
                <p style={{fontSize:"7px"}} >Longitude : {longitude}</p>

            </div>
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
                    <div className="error mt-2">{formik.touched.name && formik.errors.name}</div>
                    <CustomInput
                        type="text"
                        label="SurName"
                        id="surname"
                        name="surname"
                        onChng={formik.handleChange("surname")}
                        onBlr={formik.handleBlur("surname")}
                        val={formik.values.surname}
                    />
                    <div className="error mt-2">{formik.touched.surname && formik.errors.surname}</div>

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

                    <select
                        className="form-control"
                        value={formik.values.role}
                        onChange={formik.handleChange("role")}
                        onBlur={formik.handleBlur("role")} // Add onBlur handler if needed
                        name="role" // Add name attribute
                    >
                        <option value="" disabled>
                            Choisir un rôle ...
                        </option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>


                    <div className="error mt-2">{formik.touched.password && formik.errors.password}</div>

<br/>

                    <div>
                        {permissionDenied ? (
                            <div>
                                <p>La géolocalisation n'est pas activée dans votre navigateur.</p>
                                <p>Veuillez activer la géolocalisation pour utiliser cette fonctionnalité.</p>
                                <p>Vous pouvez généralement activer la géolocalisation dans les paramètres de votre navigateur.</p>
                            </div>
                        ) : null}

                        {latitude !== null && longitude !== null && center[0] !== null && center[1] !== null && (
                            <div style={{ height: "auto", width: "auto" }}>
                                <MapContainer center={center} zoom={ZOOM_LEVEL} onClick={handleMapClick}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {/* Utilisez markerPosition pour la position du marqueur */}
                                    <Marker position={markerPosition}>
                                        <Popup style={{ width: "700px" }}>
                                            A pretty CSS3 popup. <br /> Easily customizable. <br />
                                            Position : Latitude {markerPosition[0]}, Longitude {markerPosition[1]}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        )}
                    </div>
                    <br/>
                    <br/>

                    <div className="mb-3 text-end">
                        <Link to="/forgot-password" className="">
                            Forgot Password?
                        </Link>

                        <Link style={{ float: "left" }} to="/" className="">
                            Login
                        </Link>


                        {/*<div  style={{float:"left "}}   >SIGN IN</div>*/}


                    </div>




                    {latitude !== null && longitude !== null && center[0] !== null && center[1] !== null && (

                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                    Register
                    </button>
                        )}

                </form>
            </div>
        </div>
    );
};

export default SignIn;
