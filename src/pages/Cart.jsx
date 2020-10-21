import React, {useContext} from 'react';
import CartDetail from "../components/cart/CartDetail"
import ErrorMsg from "../components/msg/ErrorMsg"
import {CartContext} from "../context/cartContext"
import "./css/styles.css"

export default function Cart(){
    const {cart} = useContext(CartContext);
    return(
        <div className="bodyContainer">
            {!cart.length?
                <ErrorMsg msg="El Carrito está Vacío" /> : 
                <>
                    <h1 className="titulo">Mi Carrito</h1>
                    <CartDetail />
                </>
            }
        </div>
    )
}