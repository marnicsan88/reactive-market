import React, { useState } from 'react';
import {InputGroup,Button} from 'reactstrap'
import CounterButton from '../CounterButton';
import CounterInput from './CounterInput';

const CounterFinal = (props) =>{
    const [contador,updateContador] = useState(0)

    const sumar = () => {
        let cont = contador;
        if(cont < props.max){
            updateContador((cont) => cont + 1);
        }
    }

    const restar = () => {
        let cont = contador;
        if(cont > props.min){
            updateContador((cont) => cont - 1)
        }
    }

    const agregarCarrito = () => {
        props.onAdd(contador);
    }

    return(
        <div style={{marginTop:"2px",marginBottom:"2px"}}>
            <InputGroup style={{margin:"1px"}}>
                <CounterButton inputAddOnType="prepend" colorButton="danger" accion={restar} text="-" />
                <CounterInput contador={contador} style={{width:"80%"}}/>
                <CounterButton inputAddOnType="append" colorButton="success" accion={sumar} text="+" />
            </InputGroup>
            <Button onClick={agregarCarrito} color="primary" className="text-center" style={{width:"100%", margin:"1px"}}>Añadir al Carrito</Button>
        </div>
    )
}

export default CounterFinal