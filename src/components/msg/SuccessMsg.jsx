import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function SuccessMsg({orderId}){
    return(
        <div style={{textAlign:"center"}}>
            <FontAwesomeIcon style={{marginTop:"3rem",color:"#218838",fontSize:"2.5rem"}} icon={faCheckCircle} /> &emsp;
            <h1 style={{marginTop:"0.5rem",fontWeight:"bolder"}}>COMPRA EXITOSA</h1>
            <h3 style={{marginTop:"1.5rem"}}><span style={{fontWeight:"bolder"}}>Tu Nro. de Orden: </span><span style={{color:"#9595AD"}}>{orderId}</span></h3>
            <Link to="/">
                <Button color="primary">Volver al Inicio</Button>        
            </Link>
        </div>
    )
}