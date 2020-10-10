import React, {useState,useEffect,useContext} from 'react';
import CartItem from "../components/cart/CartItem"
import BuyerForm from "../components/buyerForm/BuyerForm"
import Loading from "../components/loading/Loading"
import * as firebase from 'firebase/app'
import {getFirestore} from '../firebase';
import {CartContext} from "../context/cartContext"
import {Container, Row, Col} from 'reactstrap';

export default function Checkout(){
    const [orderId,setOrderId] = useState("");
    const [loading,isLoading] = useState(false);
    const {cart,calcularTotal} = useContext(CartContext);

    const crearOrden = (cliente) =>{
        isLoading(true)
        const orden = {
            "cliente": cliente,
            "items": cart.map(cItem => {return {"id": cItem.item.id,"title": cItem.item.nombre,"price":cItem.item.valor,"qty":cItem.cantidad}}),
            "date": firebase.firestore.Timestamp.fromDate(new Date()),
            "total": calcularTotal()
        }
        const db = getFirestore();
        const orders = db.collection("orders")
        orders.add(orden).then(({id}) => {
            setOrderId(id);
        }).catch(error => {
            console.log("ERROR ",error)
        }).finally(
            () => {isLoading(false);
        });
        
    }

    useEffect(() => {
        if(orderId)
            alert(`Tu nro de Orden de compra es: #${orderId}`);
    },[orderId])

    return(
            loading ? <Loading msg="Procesando Compra"/> : 
            <>
                <h1 style={{marginTop:"1.5rem",marginBottom:"2rem",marginLeft:"1.5rem"}}>Finalizar Compra</h1>
                <Container>
                    <Row xs="1" md="12" className="justify-content-md-center" style={{textAlign:"center"}}>
                        <Col className="col-md-7" style={{paddingTop:"1rem"}}>
                            <BuyerForm finalizar={crearOrden} cantItems={cart.length}/>
                        </Col>
                        <Col className="col-md-5">
                            <h2 style={{display:"flex",alignItems:"start"}}>Resumen Orden</h2>
                            {cart.map(cartItem => <CartItem key={cartItem.item.key} item={cartItem.item} cantidad={cartItem.cantidad}/>)}
                            <div style={{fontWeight:"bold",marginTop:"0.25rem",backgroundColor:"#f5f5f7",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem",paddingRight:"3rem",boxSizing:"border-box",border:"1px solid #a45087",borderRadius:"8px"}}>
                                <div>TOTAL:</div>
                                <div>${calcularTotal()}</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
    )
}