import React, {useState,useEffect} from 'react';
import ErrorMsg from '../components/msg/ErrorMsg';
import OrdersContainer from '../components/orders/OrdersContainer';
import OrdersForm from '../components/orders/OrdersForm';
import Loading from '../components/loading/Loading';
import {getFirestore} from '../firebase';
import "./css/styles.css"

export default function Orders(){
    const [orderId, setOrderId] = useState("");
    const [loading,isLoading] = useState(false);
    const [order, setOrder] = useState("");

    const getOrder = (order) => {
        setOrderId(order);
    }

    useEffect(() => {
        if(orderId){
            isLoading(true);
            const db = getFirestore();
            const orders = db.collection("orders")
            const order = orders.doc(orderId)
            order.get().then((querySnapshot) => {
                if(!querySnapshot.size){
                    console.log("No Data");
                }
                setOrder({id:querySnapshot.id, ...querySnapshot.data()})
            }).catch(error => {
                console.log("ERROR ",error)
            }).finally(
                () => {isLoading(false);
            });
        }
    },[orderId])

    return(
        <div className="bodyContainer">
            <h1 className="titulo">Mis Ordenes</h1>
            <OrdersForm setOrderId={getOrder}/>
            {
                loading? <Loading msg="Cargando..."/> :
                !orderId ? "" : 
                    order ? <>
                        <OrdersContainer order={order}/>
                    </> : <ErrorMsg msg={`No se encontró Orden #${orderId}`}/>

            }           
        </div>
    )
}