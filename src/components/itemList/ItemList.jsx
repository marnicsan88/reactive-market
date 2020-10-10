import React from 'react';
import {Col} from 'reactstrap';
import Item from './Item';

export default function ItemList({data}){
  return(
    <>  
        {data.map(item => <Col key={item.key} style={{display:"flex",justifyContent:"center"}}>
                            <Item id={item.id} nombre={item.nombre} precio={item.valor} image={item.image} categoria={item.idCategoria.id}/>
                          </Col>)}  
    </>
  )
}