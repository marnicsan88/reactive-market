import React, {useContext} from 'react';
import {CartContext} from '../../context/cartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const CartIcon = () => {
  const {cart, getTotalCarrito} = useContext(CartContext);
  return (
    cart.length?<span className="badge badge-light"><FontAwesomeIcon icon={faShoppingCart} />&nbsp;{getTotalCarrito()}</span>:<FontAwesomeIcon icon={faShoppingCart} />
  );
}

export default CartIcon;