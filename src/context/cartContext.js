import React, {useState} from 'react'

export const CartContext = React.createContext([]);

//Componente React que retorna un Provider con su valor englobando a todos los elemntos hijos que lo van consumir
export const CartProvider = (props) => {
    const[cart, setCart] = useState([]);

    const calcularTotal = () => cart.length && cart.reduce((total,cartItem) => (total + parseFloat(cartItem.item.valor)*cartItem.cantidad),0.00).toFixed(2);
    const getTotalCarrito = () => cart.length && cart.reduce((total,cartItem) => (total + cartItem.cantidad),0);

    //el value definido en value va a ser accesible por todos los elementos envueltos por el 
    //contexto, en este caso: los children
    return(
        <CartContext.Provider value={{cart, setCart, calcularTotal, getTotalCarrito}}>
            {props.children}
        </CartContext.Provider>
    )
}
