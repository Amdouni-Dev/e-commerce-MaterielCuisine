import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {toast} from "react-toastify"; // Importez le composant Modal

Modal.setAppElement("#root"); // Assurez-vous d'ajuster l'élément racine de votre application

export default function UpdateCategoryModal({ category, onClose }) {


    const [categorytName, setcategoryName] = useState(category.name);

    const [isSuccess,setIsSuccess]=useState(false);

    const updateCategory = async (id) => {
        try {
            await axios.put(`http://localhost:5000/category/updateCategory/${id}`, {
                name: categorytName,

            });
            // setIsSuccess(true);
            toast.success("Category updated Successfullly!");
            onClose(true)
        } catch (e) {
            console.error("Error when updating category :", e);
        }
    };

    return (
        <Modal
            isOpen={true} // Le modal est toujours affiché
            onRequestClose={onClose} // Gérer la fermeture du modal
            contentLabel="Modifier la categorie"
            style={{
                overlay: {
                    top:'200px',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond sombre du modal
                },
                content: {
                    width: "60%", // Ajustez la largeur du modal selon vos besoins
                    maxWidth: "600px", // Limite maximale de la largeur
                    maxHeight: "80%", // Limite maximale de la hauteur
                    margin: "0 auto", // Centre horizontalement
                },
            }}
        >



            <h5>Modifier la categorie {category._id} </h5>
            <form>
                <div className="form-group">
                    <input
                        className="form-control"
                        value={categorytName}
                        onChange={(e) => setcategoryName(e.target.value)}
                    />
                </div>
                <br/>


                <button     className="btn btn-success border-0 rounded-3 my-5" onClick={(e) => {
                    e.preventDefault();
                    updateCategory(category._id);
                }}>Mettre à jour</button>
                <button style={{marginLeft:"5px"}}    className="btn btn-success border-0 rounded-3 my-5" onClick={onClose}>Fermer</button>

            </form>


        </Modal>
    );
}
