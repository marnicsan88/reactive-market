import React, {useState, useEffect} from 'react';
import CartItem from '../cart/CartItem';
import {Container, Row, Col} from 'reactstrap';

export default function OrdersContainer({order}){
    const [fecha,setFecha] = useState("")
    
    useEffect(() => {
        const hoy = order.date.toDate()
        const dia = `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        setFecha(`${dia} ${hora}`)
    },[order])

    return(
            <Container fluid style={{minHeight:"49vh"}}>
                <Row xs="1" className="justify-content-sm-center" style={{height:"100%"}}>
                    <Col className="col-sm-10 col-lg-8" style={{padding:0}}>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",padding:"0.5rem",paddingBottom:"1rem",boxSizing:"border-box"}}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <div>
                                    <span style={{fontWeight:"bold"}}>Nro Orden: </span>
                                    <span >#{order.id}</span>
                                </div>
                                <div >
                                    <span style={{fontWeight:"bold"}}>Fecha: </span>
                                    <span >{fecha}</span>
                                </div>
                            </div>
                            <div style={{alignSelf:"center",fontSize:"2rem"}}>
                                <span style={{fontWeight:"bold"}}>Total: </span>
                                <span >${order.total}</span>
                            </div>
                        </div>
                        {
                            order.items.map(item => {
                                return <CartItem key={item.id} nombre={item.title} valor={item.price} cantidad={item.qty}/>
                            })
                        }
                    </Col>
                </Row>
            </Container>
    )
}