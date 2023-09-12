import { React, useEffect, useState } from "react";

import ReactQuill from "react-quill";
import {Link, useNavigate} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import './styleDetailsP.css'
import Rating from "./Rating";
import axios from "axios";
import {Alert} from "antd";

import styles from "./modal.css";
const ProductDetails = ({    isShowDetailsProduct,selectedProduct }) => {


    const [newProduct,setNewProduct]=useState({selectedProduct})
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedProduct) {
                    const res = await axios.get(`http://localhost:5000/product/getProductById/${selectedProduct._id}`);
                    console.log(res.data);
                    setNewProduct(res.data)
                }
            } catch (e) {
                alert(e.message);
            }
        };

        fetchData();
    }, [selectedProduct]);

    const [connectedUser,setConnectedUser] = useState(null);
    const [rating,setRating] =useState(0);
    const [comment,setComment] =useState("");


    const fToken=  async  ()=> {



        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert("You must be connected to create product or comment ....");
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
        // Extract the user ID from the payload


    }

    useEffect(  ()=>{

        fToken()
    },[] )
//     useEffect( async () => {
//
// const reviw=async () => {
//     try {
//         await axios.post(`http://localhost:5000/product/addRatings/${selectedProduct._id}/64eb27dcecd3a891be9e6d28/Review`);
//         alert("Review Submitted successfully")
//         setRating(0)
//         setComment("")
//     } catch (e) {
//     }
// }
// reviw()
//
//
//
//
//
//     },[selectedProduct] )
    const [qty,setQty] =useState(1);
    const [rvs2, setRvs2] = useState([]);
    // const [numRvs,setNumRvs] = useState(selectedProduct.reviews.numReview)
    const [rvsButton, setRvsButton] = useState("view Reviews")
    const [rvsAddButton, setRvsAddButton] = useState("add Review")
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const handleViewReviews = () => {
        setShowReviewsModal(!showReviewsModal);


    };
    const handleAddViewReviews = () => {
        setShowAddReviewModal(!showAddReviewModal);


    };
    useEffect(() => {
        setRvsButton(showReviewsModal ? "Hide Reviews" : "View Reviews");
        setRvsAddButton(showAddReviewModal ? "Hide " : "add Review");
    }, [showReviewsModal,showAddReviewModal]);
    const [selectedProduct2,setSelectedProduct2] = useState({selectedProduct});
    // Inside your submitHandler function
    const submitHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert("You must be connected to create a product or comment.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/product/addRatings/${connectedUser}/${selectedProduct._id}/Review`,
                { rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Clear form values after successful submission
            setRating(0);

            setComment("");
            alert("Review Submitted successfully")
            console.log("Review Submitted Successfully:", response.data.review);
            console.log("Review Submitted Successfully:", response.data.product)
          //  setSelectedProduct2(response.data.product)

            const res = await axios.get(`http://localhost:5000/product/getProductById/${selectedProduct._id}`);
            console.log(res.data);
            setNewProduct(res.data)
            // You might want to show a success message to the user here
        } catch (error) {
            console.error("Error submitting review:", error);
            // Handle error, display error message to the user, etc.
        }
    };

    useEffect(() => {
        if (selectedProduct && selectedProduct.reviews) {
            setRvs2(selectedProduct.reviews);
            console.log("*********************0000*******ffff********************");
            console.log(rvs2);
            console.log("*********************0000*******ffff********************");
        }
    }, [selectedProduct]);
    const getProductDetailsStyle = () => {
        return isShowDetailsProduct ? { right: '0px' } : {};
    };

    return (


        <>





            <div id='productContainer2'  style={{
                overflowX:'scroll',
                overflowY: 'scroll', // Utilisez 'auto' ou 'scroll' selon vos besoins
                maxHeight: '100%', // Limite de hauteur pour le scroll vertical
                maxWidth: '1000px', // Limite de largeur pour le scroll horizontal,
                marginTop:"50px",
                ...getProductDetailsStyle()
            }}
                 className="product-div">
                {newProduct && (
                    <div>
                        <div className="product-div-left">
                            <div className="flex-box d-flex justify-content-between align-items" >
                                <h6>Status</h6>
                                {
                                    newProduct.countInStock>0?(
                                        <span>InStock</span>
                                    ):(
                                        <span>unaivalable</span>
                                    )
                                }

                            </div>

                            <div className="img-container">
                                {selectedProduct && selectedProduct._id ? (
                                    <img src={`http://localhost:5000/product/imageProductByID/${selectedProduct._id}`} alt="watch" />
                                ) : (
                                    <p>No product image available</p>
                                )}
                            </div>
                            <div className="hover-container">
                                <div> <img src="../../public/logo192.png" alt="watch"/></div>
                                <div>       <img src="../../public/logo192.png" alt="watch"/></div>
                                <div>       <img src="../../public/logo192.png" alt="watch"/></div>
                                <div>       <img src="../../public/logo192.png" alt="watch"/></div>
                                <div>       <img src="../../public/logo192.png" alt="watch"/></div>
                            </div>
                        </div>
                        <div className="product-div-right">
                            <span className="product-name">(New) {newProduct.name} - For Men</span>
                            <span className="product-price">DT {newProduct.price}</span>
                            <div className="product-rating">
                                <Rating
                                    value={newProduct.rating}
                                    text=""
                                ></Rating>
                                {/*<span><i className="fas fa-star"></i></span>*/}
                                {/*<span><i className="fas fa-star"></i></span>*/}
                                {/*<span><i className="fas fa-star"></i></span>*/}
                                {/*<span><i className="fas fa-star"></i></span>*/}
                                {/*<span><i className="fas fa-star-half-alt"></i></span>*/}
                                <span>(350 ratings)</span>
                            </div>

                            {newProduct.countInStock>0 ? (
                                <>
                                    <div className="flex-box d-flex justify-content-between align-items" >
                                        <h6>Quantity</h6>
                                        <select value={qty}
                                                onChange={ (e)=>setQty(e.target.value)}
                                        >
                                            {[...Array(newProduct.countInStock).keys()].map(
                                                (x)=>(
                                                    <option key={x+1} value={x+1} >{x+1}
                                                    </option>
                                                )
                                            )}

                                        </select>
                                    </div>
                                    <br/>
                                    <button className="main-btn btn-yellow"
                                        // onClick={AddToCartHandle}
                                    >Add To Cart2</button>
                                </>
                            ):null }

                            <div dangerouslySetInnerHTML={{ __html: newProduct.description }} />
                            <div className="btn-groups">
                                <button type="button" className="add-cart-btn"><i className="fas fa-shopping-cart"></i>add
                                    to cart
                                </button>
                                <button type="button" className="buy-now-btn"><i className="fas fa-wallet"></i>buy now
                                </button>
                            </div>
                            <br/>
                            <br/>
                            <div className="flex-box d-flex justify-content-between align-items">
                                <h6>Review</h6>
                                <span>
    {newProduct.numReviews} reviews{" "}





  </span>
                            </div>




                            <button type="button" 	id='addToCartButton'onClick={handleViewReviews}>{rvsButton}</button>
                            <br/>
                            <br/>
                            <button type="button" 	id='addToCartButton'onClick={handleAddViewReviews}>{rvsAddButton}</button>

                            {showReviewsModal &&
                                (
                                    <>
                                        <br/>
                                        <br/>

                                        <div  className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded  " >

                                            <h6 style={{textAlign:"center"}}>Reviews</h6>
                                        </div>
                                        {
                                            newProduct && rvs2 && rvs2.length === 0 && (
                                                <div  className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded  " >

                                                    <h6 style={{textAlign:"center"}}>No Reviews</h6>
                                                </div>
                                            )
                                        }


                                        {
                                            newProduct && rvs2 && rvs2.map( (review)=>(
                                                <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded  " >
                                                    <strong>{review.name}</strong>
                                                    <Rating  value={review.rating} />
                                                    <span> {review.createdAt} </span>
                                                    <div className="alert alert-info mt-3" >{review.comment}</div>
                                                </div>

                                            ) )
                                        }
                                    </>
                                )}
                        </div>
                        <br/>
                        <br/><br/>
                        <br/>
                        {showAddReviewModal && (<>
                            <div className="col md-6">
                                <h6>WRITE A CUSTOMER REVIEW</h6>
                                {/*<div className="my-4" >*/}
                                {/*    {loadingCreateReview && <Loading />}*/}
                                {/*    {errorCreateReview && (*/}
                                {/*        <Alert variant="alert-danger" >{errorCreateReview}</Alert>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                {
                                    connectedUser ?(
                                            <form onSubmit={submitHandler}>
                                                <strong>Rating</strong>
                                                <div className="my-4" >

                                                    <select value={rating} onChange={ (e)=>setRating(e.target.value) }
                                                            className="col-12"   required>
                                                        <option value="">Select ...</option>
                                                        <option value="1">1- Poor</option>

                                                        <option value="2">2- Fair ...</option>
                                                        <option value="3">3- Good</option>
                                                        <option value="4">4- Very Good</option>
                                                        <option value="5">5- Excellent</option>

                                                    </select>
                                                </div>



                                                <div className="my">
                                                    <strong>Comment</strong>
                                                    <textarea value={comment} onChange={ (e)=> setComment( e.target.value) } rows="3"
                                                              className="col-12  p-3 mt-2 border-1 rounded"  required></textarea>
                                                </div>
                                                <div className="my-3">
                                                    <button className="main-btn btn-yellow col-12  rounded "   >Create</button>

                                                </div>
                                            </form> ):
                                        <div className="my-3">
                                            <alert variant={"alert-warning"}>
                                                Please {" "}
                                                <Link href="/Auth">
                                                    <a>
                                                        <strong>Login</strong>
                                                        to write a review
                                                    </a>
                                                </Link>
                                            </alert>


                                        </div>
                                }

                            </div>
                            <br/>
                            <br/>

                        </>)}




                    </div>
                )}
                <br/>
                <br/><br/>
                <br/>




            </div>



        </>

        //     <p>
        //         {selectedProduct && (
        //             <>
        //                 <h3 className="mb-4 title">Product Details</h3>
        //                 <p>Name: {selectedProduct.name}</p>
        //                 <p>Price: ${selectedProduct.price}</p>
        //                 {/* Display other product details */}
        //             </>
        //         )}
        //         lorem. Lorem ipsum dolor sit amet, consect vitae et justo sed        magna. Lorem ipsum dolor sit amet, consect        vitae et justo sed
        //     </p>
        //
        // </div>
    );
};

export default ProductDetails;

