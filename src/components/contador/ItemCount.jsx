import React, { useEffect, useState } from 'react';
import {InputGroup,Input} from 'reactstrap'
import CounterButton from './CounterButton';

const ItemCount = ({initial, max, min, onAdd}) =>{
    const [contador,updateContador] = useState(parseInt(initial))

    useEffect(()=>{
        updateContador(initial)
    },[initial]);

    useEffect(()=>{
        onAdd(contador)
    },[contador]);
    
    const sumar = () => {
        if(contador < max){
            updateContador((cont) => cont + 1);
        }
    }

    const restar = () => {
        if(contador > min){
            updateContador((cont) => cont - 1)
        }
    }

    const handleChange = (evt) => {
        const valor = evt.target.value
        const checkJustNumbers = /([0-9])$/g;
        checkJustNumbers.test(valor)?updateContador(parseInt(valor)):evt.preventDefault();
    }

    return(
        <div style={{marginTop:"2px",marginBottom:"2px"}}>
            <InputGroup style={{margin:"1px"}}>
                <CounterButton inputAddOnType="prepend" colorButton="danger" accion={restar} disabled={contador <= min} text="-" />
                <Input value={contador} onChange={handleChange} style={{width:"50%",textAlign:"center"}}/>
                <CounterButton inputAddOnType="append" colorButton="success" accion={sumar} text="+" disabled={contador >= max} />
            </InputGroup>
        </div>
    )
}

export default ItemCount;