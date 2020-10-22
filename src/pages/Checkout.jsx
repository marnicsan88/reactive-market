import React, {useState,useEffect,useContext} from 'react';
import CartItem from "../components/cart/CartItem"
import BuyerForm from "../components/buyerForm/BuyerForm"
import Loading from "../components/loading/Loading"
import SuccessMsg from "../components/msg/SuccessMsg"
import * as firebase from 'firebase/app'
import {getFirestore} from '../firebase';
import {CartContext} from "../context/cartContext"
import {Container, Row, Col} from 'reactstrap';
import "./css/styles.css"

export default function Checkout(){
    const [orderId,setOrderId] = useState("");
    const [loading,isLoading] = useState(false);
    const {cart,calcularTotal,vaciarCarrito} = useContext(CartContext);

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
        })        
    }

    useEffect(() => {
        if(orderId){
            actualizarStock();  
        }
    },[orderId])

    const actualizarStock = () => {
        const db = getFirestore();
        const orden = db.collection("orders").doc(orderId)
        //Recupero los items de la orden creada
        let ordenItems
        debugger
        orden.get().then((doc) => {
            if(!doc.exists){
                console.log("No Orden");
            }
            ordenItems = doc.data().items;
            //preparo el batch para actualizar los stocks
            const itemsDocUpdate = db.collection("spells").where(firebase.firestore.FieldPath.documentId(), 'in', ordenItems.map(i => i.id))
            const batch = db.batch();
            itemsDocUpdate.get().then((doc) => {
                doc.docs.forEach((docSnapshot) => {
                    /********************************************************************
                     * Este codigo estaba en la slides, lo comento porque los elementos *
                     * de itemsDocUpdate no vienen en el mismo orden que en ordenItems  *
                     * entonces el idx no sirve                                         *
                     * 
                     * doc.docs.forEach((docSnapshot,idx) => {
                     *  if(docSnapshot.data().stock >= ordenItems[idx].qty){
                     *      batch.update(docSnapshot.ref, {stock: docSnapshot.data().stock - ordenItems[idx].qty})
                     *  }
                     * })
                     * ******************************************************************/
                    const item = ordenItems.find(i => i.title == docSnapshot.data().nombre)
                    if(item){
                        if(docSnapshot.data().stock >= item.qty){
                            batch.update(docSnapshot.ref, {stock: docSnapshot.data().stock - item.qty})
                        }
                    }
                })
                //ejecuto el batch
                batch.commit().then(res => {
                    vaciarCarrito();
                })
                .catch(error => {
                    console.log("ERROR ",error)
                }).finally(() => {
                    isLoading(false);
                })
            }).catch(error => {
                console.log("ERROR ",error)
            })
        }).catch(error => {
            console.log("ERROR ",error)
        })
    }

    return(
        <div className="bodyContainer">
        {
            loading ? <Loading msg="Procesando Compra"/> : 
            !orderId ?
                <>
                    <h1 className="titulo">Comprar</h1>
                    <Container>
                        <Row xs="1" md="12" className="justify-content-md-center" style={{textAlign:"center"}}>
                            <Col className="col-md-7" style={{paddingTop:"1rem"}}>
                                <BuyerForm finalizar={crearOrden} cantItems={cart.length}/>
                            </Col>
                            <Col className="col-md-5">
                                <h2 style={{display:"flex",alignItems:"start"}}>Resumen Orden</h2>
                                {cart.map(cartItem => <CartItem key={cartItem.item.key} image={cartItem.item.image} nombre={cartItem.item.nombre} valor={cartItem.item.valor} cantidad={cartItem.cantidad}/>)}
                                <div style={{fontWeight:"bold",marginTop:"0.25rem",backgroundColor:"#f5f5f7",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem",paddingRight:"3rem",boxSizing:"border-box",border:"1px solid #a45087",borderRadius:"8px"}}>
                                    <div>TOTAL:</div>
                                    <div>${calcularTotal()}</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
            :   <SuccessMsg orderId={orderId}/>
        }
        </div>
    )
}