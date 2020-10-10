import React from 'react'
import {Input} from 'reactstrap'

const CounterInput = (props) => {
    return(
        <Input className="text-center" value={props.contador}/>
    )
}
export default CounterInput;