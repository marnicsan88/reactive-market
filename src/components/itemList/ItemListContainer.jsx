import React from 'react';
import ErrorMsg from '../msg/ErrorMsg';
import ItemList from './ItemList';
import {Container,Row} from 'reactstrap'

function ItemListContainer({items}){

    return(
        !items.length?<ErrorMsg msg="No se encontraron Items"/>:
        <Container fluid={true}>
            <Row xs="1" sm="2" md="3" lg="4" className="justify-content-md-center" style={{textAlign:"center"}}>
                <ItemList data={items}/>
            </Row>
        </Container>    
    )
}

export default ItemListContainer