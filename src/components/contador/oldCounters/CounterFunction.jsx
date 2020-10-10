import React, { useState } from 'react';
import {InputGroup} from 'reactstrap'
import CounterButton from '../CounterButton';
import CounterInput from './CounterInput';

const Counter2 = (props) =>{
    const [contador,updateContador] = useState(0)
    const [fechaHora,updateFechaHora] = useState("")

    const sumar = () => {
        if(contador < props.max){
            updateContador((cont) => cont + 1);
        }
        getFechaHora();
    }

    const restar = () => {
        if(contador > props.min){
            updateContador((cont) => cont - 1)
        }
        getFechaHora();
    }

    const getFechaHora = () => {
        const hoy = new Date()
        const dia = `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        updateFechaHora(`${dia} ${hora}`)
    }

    return(
        <div>
            <div className="d-flex justify-content-center" style={{fontWeight:"bolder"}}>Contador Function</div>
            <InputGroup className="d-flex justify-content-center">
                <CounterButton inputAddOnType="prepend" colorButton="danger" accion={restar} text="-" />
                <CounterInput contador={contador} />
                <CounterButton inputAddOnType="append" colorButton="success" accion={sumar} text="+" />
            </InputGroup>
            <label>Fecha y Hora Ult. Click: {fechaHora}</label>
        </div>
    )
}

export default Counter2