import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function OrdersForm(props){
    
    const consultarOrden = (evt) => {
        evt.preventDefault();
        const orderId = document.querySelector("#nroOrden").value;
        if(orderId){
            props.setOrderId(orderId)
        }else{
            alert(" - Debe ingresar un Nro. de Orden")
        }
    }

    return(
        <Form inline style={{justifyContent:"center",paddingBottom:"2rem",boxSizing:"border-box"}}>
            <FormGroup>
                <Label for="nroOrden" hidden>Email: </Label>
                <Input type="text" name="nroOrden" id="nroOrden" required style={{width:"20rem"}} placeholder="Ingrese Nro. de Orden" onKeyDown={(evt)=>{if(evt.keyCode==13)consultarOrden(evt)}}/>
            </FormGroup>
            &emsp;
            <Button color="primary" onClick={consultarOrden}>Consultar Orden</Button>
        </Form>
    )
}