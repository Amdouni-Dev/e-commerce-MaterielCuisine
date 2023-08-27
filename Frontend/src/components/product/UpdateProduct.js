import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {toast} from "react-toastify"; // Importez le composant Modal

Modal.setAppElement("#root"); // Assurez-vous d'ajuster l'élément racine de votre application

export default function UpdateProductModal({ product, onClose }) {


    const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
    const [productCountInStock, setProductCountInStock] = useState(product.countInStock);
    const [productDescription, setProductDescription] = useState(product.description);

    const [isSuccess,setIsSuccess]=useState(false);

  const updateProduct = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/updateProduct/${id}`, {
        name: productName,
        price: productPrice,
          description:productDescription,
          countInStock: productCountInStock
      });
        // setIsSuccess(true);
        toast.success("Product updated Successfullly!");
        onClose(true)
    } catch (e) {
      console.error("Erreur lors de la mise à jour du produit :", e);
    }
  };

  return (
      <Modal
          isOpen={true} // Le modal est toujours affiché
          onRequestClose={onClose} // Gérer la fermeture du modal
          contentLabel="Modifier le produit"
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



          <h5>Modifier le produit {product._id} </h5>
          <form>
              <div className="form-group">
            <input
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
              </div>
              <br/>
              <div className="form-group">
                  <input
                      className="form-control"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                  />
              </div>
              <br/>
              <div className="form-group">
                  <input
                      type="number"
                      className="form-control"
                      value={productCountInStock}
                      onChange={(e) => setProductCountInStock(e.target.value)}
                  />
              </div>
              <br/>
              <div className="form-group">
            <input
                className="form-control"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
            />
              </div>
        <br/>
            <br/>

              <button     className="btn btn-success border-0 rounded-3 my-5" onClick={(e) => {
                  e.preventDefault();
                  updateProduct(product._id);
              }}>Mettre à jour</button>
                  <button style={{marginLeft:"5px"}}    className="btn btn-success border-0 rounded-3 my-5" onClick={onClose}>Fermer</button>

          </form>


      </Modal>
  );
}
