import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//provider
//consumer

export default class ProductProvider extends Component {
    state = {
        products: [],
        detailproduct: detailProduct, 
        cart:[],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
        /*in first we were assigning the storeProducts to products.
        products: storeProducts, as reference
        but now we are assigning tempProducts, (copied elements or items of array)  
        products:tempProducts (line no. 29)
        'products' that we will access in Productlist.js in value
        value.products.map(arr =>.................
        */
    };
    /* Why we used componenentDidMount()?
        ==by products: storeProducts, if we were changing the products value somehow, its automatically changing the storeProducts value because of reference thing.
        for getting the seperate values of different arrays, or getting the original value (old value of storeProducts) instead of copied by products.
        by storeProducts.forEach( item => {
            const singleItem = {...item};
            now if we do any chnages in (products.) it will not effect on old original arrry(values) 
            now we will have new and updated array(values) both
    */
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        //like ...this.state, we can not access the all values of storeProducts by [...storeProducts] because in storeProducts, values are nested = `[{id=, name= etc}, {}, {}........]`
        // by products : storeProducts, we are direct giving the array thts why its a referance and elements are not accessible by [...storeProducts]. but below in line 19, by {...item} it is accessible because here we firstly taking all the elements in item n then assigning them in singleItem. thts why it is copying.

        storeProducts.forEach( item => {
            const singleItem = {...item};
            //here we copying the values in singleItem of array not  referancing.
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products:tempProducts}
            /*'products' that we will access in Productlist.js in value
                value.products.map(arr =>................. */
        });
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    /*in Product.js whn we click  on image, on tht image's onClick there will fire handleDetails() function, and we will get the id.
    by const product = this.getItem(); this we are gonna find that perticular product that were clicking on */
    handleDetails = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailproduct:product}
            /* setState() for changing the details == here we setting the state by setState(), for getting the details of clicked products through id and change it in detailproduct  */
        });

        };
     addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
            return {
                products: tempProducts, 
                cart: [...this.state.cart, product]
            };
        },
        () => {
            this.addTotals();
        }
        );

        
        /* setState() for changning the inCart, count, total ==  */
     };
     openModal = id => {
         const product = this.getItem(id);
         this.setState(() => {
             return {modalProduct:product, modalOpen:true}
         });
     }
     closeModal = () =>{
         this.setState(() => {
             return {modalOpen:false};
         });
     };

     increment = (id) => {
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id === id);

         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count + 1;
         product.total = product.count * product.price;

         this.setState(
             () => {
             return {cart: [...tempCart] };
             },
            () => {
              this.addTotals();
            }
         );
     };
     decrement = (id) => {
         let tempCart = [...this.state.cart];
         const selectedProduct = tempCart.find(item => item.id === id);

         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count - 1;

         if(product.count === 0){
             this.removeItem(id)
         }
         else{
             product.total = product.count * product.price;
             
             this.setState(
                () => {
                return {cart: [...tempCart] };
                },
               () => {
                 this.addTotals();
               }
            );

         }
        
    };
     removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        // this.getItem(id) - this id is removeItem = (id) 
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                    products: [...tempProducts]
                };
            },
            () => {
                this.addTotals();
            }
        );

    };
     clearCart = () => {
        this.setState(() => {
            return { cart : []};
        }, () => {
            this.setProducts();
            this.addTotals();
        });
    };

     /* this callback function 
     () => {
            this.setProducts();
        } 
        will set all the products fresh, no product will be in automatic in cart as previous setting, without that function as we clear the cart ,the cart will be clear but the product would still show "incart" in the button*/

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax:tax,
                cartTotal:total
            }
        });
    };
    render() {
        return (
            //provider contain value and children in {}

            <ProductContext.Provider value = {{
                //...this.state is destructuring, by this we can dirctly access the state properties
                ...this.state, 
                handleDetails:this.handleDetails,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer};