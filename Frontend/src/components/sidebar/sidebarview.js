import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidebarstyle.css';
import SearchForm from '../form/searchform/searchformview';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [
				{ id: 1, name: 'Catégorie 1' },
				{ id: 2, name: 'Catégorie 2' },
				// Ajoutez d'autres catégories statiques ici
			],
		};
	}

	getSidebarStyle = () => {
		return !this.props.isShowSidebar ? { left: '-200px' } : {};
	};

	getCategoryLink = (categoryId) => `/c/${categoryId}`;

	render() {
		return (
			<div id='sideBarContainer' style={this.getSidebarStyle()}>
				<div id='sideBarBody'>
					<ul>
						<li id='sideBarSearchContainer'>
							<SearchForm productSearchHandler={this.props.productSearchHandler} />
						</li>
						{this.state.categories.map((category) => (
							<Link key={category.id} to={this.getCategoryLink(category.id)}>
								<li>{category.name}</li>
							</Link>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
