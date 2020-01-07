import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        const spanHome = {
            color:"rgb(93, 126, 37)"
        };
        return (
            <nav className="navbar navbar-expand-sm px-sm-5">
                <Link to="/" className="link">
                    <span style={spanHome}><i className="fas fa-home"></i></span>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="navbar-item ml-5">
                        <Link to="/" className="link">Product</Link>
                    </li>
                </ul>
                <Link to="/Cart" className="ml-auto">
                    <button className="navbutton">
                        <span className =" mx-4 navspan">
                        <i className="fas fa-cart-plus"/> my cart
                        </span> 
                    </button>
                </Link>

            </nav>
            

        )
    }
}
  
