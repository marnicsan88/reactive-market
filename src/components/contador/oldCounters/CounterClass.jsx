import React from 'react';
import {InputGroup} from 'reactstrap'
import CounterButton from '../CounterButton';
import CounterInput from './CounterInput';

class Counter extends React.Component{
    constructor(){
        super();
        this.state = {
            contador: 0,
            fechaClick: ""
        }
    }

    getFechaHora = () => {
        const hoy = new Date()
        const dia = `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()}`
        const hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
        this.setState({fechaClick: `${dia} ${hora}`})
    }

    sumar = () => {
        if(this.state.contador < this.props.max){
            let cont = this.state.contador
            this.setState(({contador: cont + 1}))
            this.getFechaHora()
        }
    }

    restar = () => {
        if(this.state.contador > this.props.min){
            let cont = this.state.contador
            this.setState({contador: cont - 1})
            this.getFechaHora()
        }
    }

    render(){
        return(
            <div>
                <div className="d-flex justify-content-center" style={{fontWeight:"bolder"}}>Contador Class</div>
                <InputGroup className="d-flex justify-content-center">
                    <CounterButton inputAddOnType="prepend" colorButton="danger" accion={this.restar} text="-" />
                    <CounterInput contador={this.state.contador} />
                    <CounterButton inputAddOnType="append" colorButton="success" accion={this.sumar} text="+" />
                </InputGroup>
                <label>Fecha y Hora Ult. Click: {this.state.fechaClick}</label>
            </div>
        )
    }
}

export default Counter