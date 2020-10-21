import React from 'react'
import {Container, Row, Col} from 'reactstrap';

export default function CartItem(props){
    const anchoItems = props.image ? "col-sm-10" : "col-sm-12";
    return(
        <Container fluid={true}>
            <Row style={{alignItems:"center",borderBottom:"2px solid #A7B",padding:"0.5rem",paddingBottom:"0",boxSizing:"border-box",justifyContent:"space-between"}}>
                {props.image ? 
                    <Col className="col-sm-2" style={{padding:"0.5rem"}}><img src={props.image} style={{width:"100%",height:"3.5rem"}}  alt="Imagen Item"/></Col>
                    : ""
                }
                <Col className={anchoItems} style={{height:"100%"}}>
                    <Container>
                        <Row style={{alignItems:"center",padding:"0.5rem",boxSizing:"border-box",justifyContent:"space-between"}}>
                            <Col className="col-md-4" style={{textAlign:"left"}}>
                                <div style={{fontWeight:"bolder",color:"#007185"}}>{props.nombre}</div>
                            </Col>
                            <Col className="col-md-4">
                                <div>Cant.: {props.cantidad}</div>
                            </Col>
                            <Col className="col-md-4" style={{textAlign:"right"}}>
                                <div style={{fontWeight:"bolder"}}>${props.valor.toFixed(2)}</div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}