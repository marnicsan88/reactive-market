import React, {useState,useEffect} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Orders(){
    const [mailConsulta, setMailConsulta] = useState("");
    const [orders, setOrders] = useState([]);

    return(
        <>
            <h1>Mis Ordenes</h1>
            <Form>
                <Row form>
                    <Col md={6}>
                        <InputGroup>
                            <Label for="nombreCliente">Nombre</Label>
                            <Input type="text" name="nombre" id="nombreCliente" required className="w-100 clientInput" data-title="Nombre"/>
                            <Button color="primary">Consultar Ordenes</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Form>
        </>
    )
}