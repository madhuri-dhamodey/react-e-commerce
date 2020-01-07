
//productlist = is like a list of product which mammy gives me to bring up.
                //how much quantity(8 elements or products arrry), from where(from data.js indirectly)

import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class Productlist extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="product"/>
                        < div className="row">
                            {/* consumer contains arrow function in {} */}
                            <ProductConsumer>
                                { value => {
                                    /* in value we have products(array of 8 items), detailproduct, handleDetails, addToCart
                                    
                                    we will achive products only by value.products
                                    */
                                    return value.products.map(arr => {
                                        // arr have all array current elements of products
                                        return <Product key={arr.id} arr={arr}/>;
                                        /* arr={arr} means before that arr was an array
                                        for acces the id we would have to written-arr[0].id or something but by arr={arr} we made object to this (arr) arry so that we can directly access the properties of products array by arr.id*/
                                        
                                        //map() function will print <product/> 8 times, as 8 elements in products, whatever in the <product/>
                                    });
                                    
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
