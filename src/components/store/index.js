import React, { useEffect, useState } from "react";
import { inCart, CartButton, CartModal } from "../cart";
import ConvertCurrency from "../../functions";
import './style.css';

function Store() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotalItems, setCartTotalItems] = useState(0);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(products=> setProducts(products))
    }, []);

    useEffect(() => {
        setCartTotalItems(cart.length);
    }, [cart]);

    function handleClick(productId) {
        const itemIndex = cart.findIndex(id => id === productId)
        if (itemIndex > -1) {
            setCart(cart.filter(id => id !== productId));
        } else {
            setCart([...cart, productId])
        }
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <h1 className="navbar-brand m-0">Menu</h1>
                    <button className="btn btn-outline-light py-0 px-1">
                        <i className="bi bi-cart2 pe-1"></i>
                        {cartTotalItems}
                    </button>
                </div>
            </nav>
            <main className="container pt-5 mt-5">
                <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 text-center">
                    {
                        products.map((product) => (
                            <div className="col mb-5" key={product.id}>
                                <div className="card product h-100 text-white bg-dark shadow" >
                                    <div className="productImage d-block img-thumbnail">
                                        <img className="card-img-top" src={product.image} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                    </div>
                                    <div className="card-footer px-2">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="card-text"><h5 className="mb-0">{ConvertCurrency(product.price)}</h5></div>
                                            </div>
                                            <div className="col-auto">
                                                <CartButton isActive={inCart({cart: cart, productId: product.id})} handleButonClick={(event) => { handleClick(product.id) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
            <CartModal cart={cart} />
        </div>
    )
}

export default Store;