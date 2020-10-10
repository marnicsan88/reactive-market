import React, {useState,useEffect} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './css/item.css'

const Item = (props) => {
  const [categoryClass,setCategoryClass]  = useState("")

  useEffect(() => {
    getCategoryClass(props.categoria);
  },[props])

  const getCategoryClass = (catId) => {
    switch(catId){
      case "1fye3TwjkPmHJFv5kD1U":  setCategoryClass("Encantamiento");
                                    break;
      case "EGJI7jS2yAqFlJvQJ3Ck":  setCategoryClass("Maleficio");
                                    break;
      case "RNjRfiUgsDYEAT6bPNRx":  setCategoryClass("Conjuro");
                                    break;
      case "aSUfJxNsVfUGp5EQyyok":  setCategoryClass("Maldicion");
                                    break;
      case "voThitRQPCuzMsUSM7r3":  setCategoryClass("Hechizo");
                                    break;
    }
  }

  return (
    <Card className={categoryClass} style={{margin:"0.5rem",height:"15rem",width:"15rem"}} id={props.id}>
      <CardBody style={{boxSizing:"borde-box"}}>
        <CardImg top style={{boxSizing:"borde-box",width:"10rem",height:"6rem"}} src={props.image} alt="Card image cap" />
        <CardTitle className="font-weight-bolde">{props.nombre}</CardTitle>
        <CardText className="text-right font-weight-bolder">${props.precio.toFixed(2)}</CardText>
      </CardBody>
      <Button color="info" style={{padding:"0"}}>
        <NavLink to={`/item/${props.id}`} style={{color:"#fff",display:"block",padding:".375rem .75rem"}}>Ver Detalle</NavLink>
      </Button>
    </Card>
  );
};

export default Item;