
//product = like a cart or bag where i kept all the goods after shopping.

import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';
//proptypes are for checking the correct value type of properties like in id there shoud be number. lineno 42

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.arr;
        /* as a prop we can access attribute of <Product key= arr=> in Product.js component
        this const {id, title, img, price, inCart} are multiple variables*/
        return (
            <ProductWrapper className ="col-9 col-md-6 col-lg-3 mx-auto my-3">
                <div className="card" style={{height:"100%"}} >
                    <ProductConsumer>
                        {
                            (value) => (
                            <div className="img-container p-5" style={{height:"100%"}} >
                            <Link to ="/details">
                                <img src={img} alt="product" className="card-img-top img-fluid"  onClick ={ () => value.handleDetails(id)
                                }/>
                            </Link>
                            <button className="cart-btn" disabled={inCart ? true : false} onClick={() => {value.addToCart(id);
                                            value.openModal(id);
                                            }}>
                            {inCart ? (<p className="text-capitalize mb-0" disabled>incart</p>) : (<i className="fas fa-cart-plus"/>)}
                            </button>
                        </div>)

                        }
                        
                        {/*
                            <ProductConsumer>
                            {
                                (value) => (all the jxs in that div img and buttons);
                            }
                            </ProductConsumer> 
                            
                         */}
                    </ProductConsumer>
                    {/*cart footer*/}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue mb-0 font-italic">
                             <span>${price}</span>
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}
// Product= name of component
//propTypes = predefined object
//PropType = we import from prop-type
Product.propTypes = {
    arr:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
};

//&:hover means parent container ProductWrapper 
const ProductWrapper = styled.div`
     .card{
        border-color: transparent;
        transition:all 0.5s linear;
     }
     .card-footer{
         background:transparent;
         transition:all 1s linear;
     }
     &:hover{
         .card{
             border:0.09rem solid rgba(0,0,0,0.1);
             box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
         }
         .card-footer{
             background:rgb(247,247,247);
         } 
     }
     .img-container{
         position: relative;
         overflow: hidden;
     }
     .img-container:hover .card-img-top{
         transition: all 0.3s linear;
         transform: scale(1.2);
     }
     .cart-btn{
         position:absolute;
         bottom:0;
         right:0;
         padding:0.3rem 0.5rem;
         border: none;
         background: #92cd81;
         font-size: 1.4rem;
         border-radius: 0.5rem 0 0 0;
         transform: translate(100%, 100%);
     }
     .img-container:hover .cart-btn{
        transform: translate(0, 0);
        transition: all 0.4s linear;
     }

`;
