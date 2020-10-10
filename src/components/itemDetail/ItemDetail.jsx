import React, {useEffect, useState,useContext} from 'react';
import ItemCount from '../contador/ItemCount';
import AddCartButton from './AddCartButton';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import {CartContext} from '../../context/cartContext';
import params from '../../constants/counterParam';

const ItemDetail = (props) => {
    const [cantidad,setCantidad] = useState(params.initial)
    const [sePuedeComprar,setSePuedeComprar] = useState(false)
    const [modal, setModal] = useState(false);
    const {setCart} = useContext(CartContext);
    
    const toggle = () => {
        if(modal)
            setCantidad(1)
        setModal(!modal);
    }

    useEffect(() =>{
        (cantidad >= params.min && cantidad <= props.item.stock) ? setSePuedeComprar(true) : setSePuedeComprar(false)
    },[cantidad,props.item.stock])

    const onAdd = (count) => {
        setCantidad(count);
    }

    const agregarCarrito = () => {
        setCart(carrito => [...carrito,{item:props.item,cantidad:cantidad}])
        toggle()
    }

    return(
        <>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"3vh", maxHeight:"15rem"}}>
                <img src={props.item.image} alt={`Imagen de ${props.item.nombre}`} style={{width:"15rem",maxHeight:"100%",margin:"0.5rem"}}/>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",margin:"0.5rem",width:"20rem"}}>
                    <h1>{props.item.nombre}</h1>
                    <div>{props.item.efecto}</div>
                    <div style={{fontWeight:"bold"}}>${props.item.valor.toFixed(2)}</div>
                    {props.item.stock>0?
                        <ItemCount initial={cantidad} min={params.min} max={props.item.stock} onAdd={onAdd} /> : 
                        <div><label style={{color:"#F00",fontWeight:"bold"}}>¡No hay Stock Disponible!</label></div>}
                    <AddCartButton agregarCarrito={agregarCarrito} cantidad={cantidad} nombreItem={props.item.nombre} sePuedeComprar={sePuedeComprar}/>
                </div>        
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{textAlign:"center"}}>
                    Producto agregado al carrito
                </ModalHeader>
                <ModalBody style={{textAlign:"center", display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <FontAwesomeIcon style={{color:"#218838",fontSize:"1.5rem"}} icon={faCheckCircle} /> &emsp;
                    <label style={{marginBottom:"0"}}>Se han agregado al carrito: <span>{cantidad}x {props.item.nombre}</span></label>
                </ModalBody>
                <ModalFooter>
                    <NavLink exact to="/cart">
                        <Button color="primary">Ir al Carrito</Button>{' '}
                    </NavLink>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ItemDetail;