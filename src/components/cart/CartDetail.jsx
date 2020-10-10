import React, {useContext} from 'react';
import CartItem from "./CartItem"
import {CartContext} from "../../context/cartContext"
import {Container, Row, Col, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default function CartDetail(){
    const {cart,calcularTotal} = useContext(CartContext);
    return(
        <Container>
            <Row xs="1" md="12" className="justify-content-md-center" style={{textAlign:"center"}}>
                <Col className="col-md-7">
                    {cart.map(cartItem => <CartItem key={cartItem.item.key} item={cartItem.item} cantidad={cartItem.cantidad}/>)}
                </Col>
                <Col className="col-md-5">
                    <div style={{paddingBottom:"1.5rem",paddingLeft:"2rem",paddingRight:"3rem",boxSizing:"border-box",border:"1px solid #a45087",borderRadius:"8px"}}>
                        <h2>Total</h2>
                        <div style={{textAlign:"right",marginTop:"1rem",marginBottom:"1rem"}}><h4 style={{fontWeight:"bold"}}>${calcularTotal()}</h4></div>
                        <NavLink to="/checkout">
                            <Button color="primary" style={{width:"100%"}}>Continuar Compra</Button>
                        </NavLink>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}