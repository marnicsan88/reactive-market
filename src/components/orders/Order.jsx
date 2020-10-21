import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button} from 'reactstrap';

export default function Order(props){
    const [fecha,setFecha] = useState("")
    
    useEffect(() => {
        const hoy = props.fecha.toDate()
        const dia = `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        setFecha(`${dia} ${hora}`)
    },[])

    return(
        <Container fluid={true}>
            <Row style={{alignItems:"center",borderBottom:"2px solid #A7B",padding:"0.5rem",boxSizing:"border-box",justifyContent:"space-between"}}>
                <Col className="col-sm-3" style={{padding:"0.5rem"}}>
                    <span style={{fontWeight:"bolder"}}>#{props.id}</span>
                </Col>
                <Col className="col-md-3" style={{textAlign:"right"}}>
                    <span>{fecha}</span>
                </Col>
                <Col className="col-md-3" style={{textAlign:"right"}}>
                    <span>${props.total}</span>
                </Col>
                <Col className="col-md-3" style={{textAlign:"right"}}>
                    <Button color="primary">Ver Detalle</Button>
                </Col>
            </Row>
        </Container>
    )
}