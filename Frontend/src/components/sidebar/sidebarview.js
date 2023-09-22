import React, {Component, useEffect, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './sidebarstyle.css';
import SearchForm from '../form/searchform/searchformview';
import axios from "axios";
import {Switch} from "antd";
import CategoryDetail from "../category/CategoryDetail";
import Header from "../header/Header";
// import {  useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 const  SideBar =(props)=> {
	 const navigate = useNavigate();

	 const [connectedUser,setConnectedUser] = useState(null);
	 const FToken=    async  ()=> {



		 const token = localStorage.getItem('jwtToken');
		 localStorage.setItem('jwtToken', token);
		 if (!token) {
			 alert("Vous devez être connecté pour créer un produit.");
			 return;
		 }

		 setConnectedUser(localStorage.getItem('connectedUser'));
		 // Extract the user ID from the payload


	 }
	 useEffect(  ()=>{
		 FToken()

	 } ,[] )
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		categories: [
	// 			{ id: 1, name: 'Catégorie 1' },
	// 			{ id: 2, name: 'Catégorie 2' },
	// 			// Ajoutez d'autres catégories statiques ici
	// 		],
	// 	};
	// }
	const [categories, setCategories] = useState([]);
	 const fetchCategories = async () => {
		 try {
			 const response = await axios.get('http://localhost:5000/category/allCategories');
			 // console.log("Categories", response.data);
			 setCategories(response.data);
		 } catch (error) {
			 console.error("Erreur lors de la récupération des catégories : ", error);
		 }
	 };
	 useEffect(() => {


		 fetchCategories();
	 }, []);
	const getSidebarStyle = () => {
		return !props.isShowSidebar ? { left: '-200px' } : {};
	};

	// const getCategoryLink = (categoryId) => {`/c/${categoryId}`

	// return (
	// 	<>
	// 	<h1>HHHHHH</h1>
	// 	</>
	// )
	//
	//
	// };

	 const handleCategoryClick = (categoryId) => {
		 // Incorporer l'ID de la catégorie dans le chemin de l'URL
		 // Cela déclenchera également le changement d'affichage du composant CategoryDetail
		 props.toggleShowCategoryDetails();
		navigate(`/Header/c/${categoryId}`);
		 // Par exemple, si vous utilisez '/c/:categoryId' comme chemin, vous pouvez le faire comme suit :
	 }
		 return (
		 <div id='sideBarContainer' style={getSidebarStyle()}>
			 <div id='sideBarBody'>
				 <ul>
					 <li id='sideBarSearchContainer'>
						 <SearchForm productSearchHandler={props.productSearchHandler} />
					 </li>
					 {/*<div  id="headerCartIcon">*/}
						{/* <div id="cartIconContainer">*/}
						{/*	 <i*/}
						{/*		 onClick={props.toggleShowCategoryDetails}*/}
						{/*		 id="cartIcon"*/}
						{/*		 className="fa fa-plus"*/}
						{/*	 ></i>*/}
						{/*	 <span id="cartCounter">15</span>*/}
						{/* </div>*/}
					 {/*</div>*/}


					 <Link  to={`/Orders/${connectedUser}`}  >
						 <li>My orders</li>
					 </Link>

					 <Link  to={`/Header`}  >
						 <li>All Products</li>
					 </Link>
					 {categories.map((category) => (
						 <Link key={category._id} to={`/Header/c/${category._id}`}  onClick={props.toggleShowCategoryDetails}>
							 <li>{category.name}</li>
						 </Link>
					 ))}

					 {/*{categories.map((category) => (*/}
						{/* <li*/}
						{/*	 key={category._id}*/}
						{/*	 onClick={() => handleCategoryClick(category._id)}*/}
						{/* >*/}
						{/*	 {category.name}*/}
						{/* </li>*/}
					 {/*))}*/}
					 {/*<Link to={`/Header`}>*/}
						{/* <li>All Products</li>*/}
					 {/*</Link>*/}
				 </ul>

			 </div>
		 </div>
	 );
 };

export default SideBar;
