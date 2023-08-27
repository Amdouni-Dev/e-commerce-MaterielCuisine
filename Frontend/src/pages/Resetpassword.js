import React, {useState} from "react";
import CustomInput from "../components/CustomInput";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import * as yup from "yup";
const schema = yup.object().shape({
    email: yup.string().email("Email should be valid").required("Email is Required")

});
const Resetpassword = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [resetStatus, setResetStatus] = useState(null);
    const { id, token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    // houni necj nasna3 l form w na3tyha des vals initiales
    const formik = useFormik({
        initialValues: {

            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/user/reset-password/${id}/${token}`, {
                password: password,
            });
            if (response.data.status === "verified") {
                setMessage("Mot de passe réinitialisé avec succès !");
            } else {
                setMessage("Échec de la réinitialisation du mot de passe.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    };
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />

        <div>
            <h2>Réinitialisation de mot de passe</h2>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Nouveau mot de passe:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Réinitialiser le mot de passe</button>
            </form>
        </div>
    </div>
  );
};

export default Resetpassword;
