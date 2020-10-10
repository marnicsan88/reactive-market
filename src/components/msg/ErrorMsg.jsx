import React from 'react';
import {Link} from 'react-router-dom';

export default function ErrorMsg({msg}){
    return(
        <div style={{textAlign:"center"}}>
            <h1 style={{marginTop:"3rem",fontWeight:"bolder"}}>{msg}</h1>
            <Link to="/">Volver al Inicio</Link>
        </div>
    )
}