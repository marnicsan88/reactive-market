import React, {useContext} from 'react';
import CartDetail from "../components/cart/CartDetail"
import ErrorMsg from "../components/msg/ErrorMsg"
import {CartContext} from "../context/cartContext"


export default function Cart(){
    const {cart} = useContext(CartContext);
    return(
        <div style={{marginBottom:"1rem"}}>
            {!cart.length?
                <ErrorMsg msg="El Carrito está Vacío" /> : 
                <>
                    <h1 style={{marginTop:"1.5rem",marginBottom:"2rem",marginLeft:"1.5rem"}}>Mi Carrito</h1>
                    <CartDetail />
                </>
            }
        </div>
    )
}