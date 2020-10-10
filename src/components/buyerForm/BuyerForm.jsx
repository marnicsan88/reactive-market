import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const BuyerForm = (props) => {
    
    const finalizarCompra = (evt) => {
      evt.preventDefault();
      const msg = validarForm();
      if(!msg){
        const nombre = document.querySelector("#nombreCliente").value;
        const apellido = document.querySelector("#apellidoCliente").value;
        const telefono = document.querySelector("#telefonoCliente").value;
        const email = document.querySelector("#emailCliente").value;
        props.finalizar({
          name: `${nombre} ${apellido}`,
          phone: telefono,
          email: email
        })
      }else{
        alert(msg);
      }
    }
    
    function validarForm(){
      let msg = "";
      document.querySelectorAll("input.clientInput").forEach((campo,idx) => {
        if(!campo.value){
          idx > 0 ? msg += "\n" : msg += ""
          msg += `Debe completar el campo '${campo.attributes["data-title"].value}'`
        }
      })
      return msg
    }

    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="nombreCliente">Nombre</Label>
              <Input type="text" name="nombre" id="nombreCliente" required className="w-100 clientInput" data-title="Nombre"/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="apellidoCliente">Apellido</Label>
              <Input type="text" name="apellido" id="apellidoCliente" required className="w-100 clientInput" data-title="Apellido"/>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="telefonoCliente">Teléfono</Label>
              <Input type="text" name="telefono" id="telefonoCliente" className="w-100 clientInput" data-title="Teléfono"/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="emailCliente">E-mail</Label>
              <Input type="email" name="email" id="emailCliente" className="w-100 clientInput" data-title="E-mail"/>
            </FormGroup>
          </Col>
        </Row>
        <Button color="danger" style={{width:"100%"}} onClick={finalizarCompra} disabled={!props.cantItems}>Finalizar Compra</Button>
      </Form>
    );
  }
export default BuyerForm;