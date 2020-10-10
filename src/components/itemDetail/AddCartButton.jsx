import React from 'react';
import { Button } from 'reactstrap';

const AddCartButton = (props) => {
    const agregar = () => {
        props.agregarCarrito()
    }

    return (
        <Button onClick={agregar} color="primary" disabled={!props.sePuedeComprar} className="text-center" style={{width:"100%", margin:"1px"}}>
            Agregar al Carrito {props.cantidad}
        </Button>
    );
}

export default AddCartButton;