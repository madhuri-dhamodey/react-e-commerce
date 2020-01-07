import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {id, company, img, info, price, title, inCart} = value.detailproduct;
                     return (
                         <div className="container py-5">
                            {/*title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* end of title */}
                            {/*product info */}
                            <div className="row">
                                {/*product image */}
                                <div className="col-10 mx-auto col-md-6 my-6 text-capitalize">
                                    <img src={img} alt="products" className="img-fluid"/>
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-6 text-capitalize">
                                    <h2>model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by: <span>
                                           {company} 
                                        </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>price : <span>$</span>{price}</strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0 lead">
                                        some info about the product:
                                    </p>
                                    <p className="text-muted lead">{info}
                                    </p>
                                    {/*buttons */}
                                    <div>
                                        <Link to="/">
                                            <button className="navbutton">back to product</button>
                                        </Link>
                                        <button className="navbutton" disabled={inCart?true:false} 
                                        onClick={() =>{
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}>
                                            {inCart ? "incart" : "add to cart"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                         </div>
                     )
                }}
            </ProductConsumer>
        )
    }
}
