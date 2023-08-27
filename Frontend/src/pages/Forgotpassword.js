import React, {useContext, useEffect, useState} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import { useFormContext } from "../components/FormContext";
import {useNavigate} from "react-router-dom";
const schema = yup.object().shape({
    email: yup.string().email("Email should be valid").required("Email is Required")

});
const Forgotpassword = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("Reponse:");
    const { isSubmitted, setIsSubmitted } = useFormContext();
    const handleBack = () => {
        setIsSubmitted(false); // Réinitialisez l'état de soumission du formulaire lors du retour en arrière
        navigate(-1); // Revenir à l'emplacement précédent (le formulaire "Mot de passe oublié")
    };
    const [previousLocation, setPreviousLocation] = useState(null);

    const openGmail=()=>{
        window.open("https://mail.google.com", "_blank");
    }



    const navigate = useNavigate();
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

  useEffect( ()=> {
  } )

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:5000/user/forgot-password", {
                email: values.email,

            });
            if(!error){
                setMessage("check your email please")
            }


            if (response.data.status === "ok") {
                console.log("Connexion réussie. Token :", response.data.data);
                setError("");
                setMessage("show your email please")
                setIsSubmitted(true);
            //    navigate("/admin"); // Rediriger vers la page "admin" après la connexion réussie
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError("Erreur lors de la connexion.");
        }
    };
  return (
    <div className="py-5" style={{ background: "lightGray", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <div>
            {!isSubmitted  ?
                <form action="" onSubmit={formik.handleSubmit}>


                    <div className="error mt-2">{formik.touched.email && formik.errors.email}</div>

                    <CustomInput
                        type="text"
                        label="Email Address"
                        id="email"
                        name="email"
                        onChng={formik.handleChange("email")}
                        onBlr={formik.handleBlur("email")}
                        val={formik.values.email}
                    /> <br/>

                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100"
                        style={{background: "#ffd333"}}
                        type="submit"
                    >
                        Send Link
                    </button>
                </form>
                :
                <div>
                    <h1>Check your email </h1>
<button
    className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
    style={{ background: "#4285F4" }}
    onClick={openGmail}
>
    Open Gmail

</button>

                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
                        style={{ background: "#FF5733" }}
                        onClick={handleBack}
                    >
                        Go Back
                    </button>
                </div>
            }



        </div>

      </div>
    </div>
  );
};

export default Forgotpassword;
