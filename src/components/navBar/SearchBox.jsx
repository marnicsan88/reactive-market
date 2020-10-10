import React, { useState, useEffect } from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './css/searchBoxStyles.css';

const Searchbox = (props) => {
  const [category,setCategory] = useState(-1);
  const [catName,setCatName] = useState("");
  const [itemName,setItemName] = useState("");
  const [filterDestination,setFilterDestination] = useState("");

  const lupita = <FontAwesomeIcon icon={faSearch} />

  const selectOption = (evt) => {
    document.querySelectorAll("button.dropdown-toggle")[0].textContent = evt.target.textContent;
    setCategory(evt.target.id);
    setCatName(evt.target.textContent);
  }

  const nameItemChange = (evt) => {
    setItemName(evt.target.value)
  }

  useEffect(() => {
    let destino = "/search?";
    const catFilter = category != -1 ? `categoryId=${category}&catName=${catName}` : "";
    const namFilter = itemName ? `itemName=${itemName}` : "";
    if(!catFilter && !namFilter){
      destino = "/"
    }else if(catFilter && namFilter){
      destino = `${destino}${catFilter}&${namFilter}`;
    }else{
      destino = `${destino}${catFilter}${namFilter}`;
    }
    setFilterDestination(destino);
  },[category,itemName])

  return (
      <InputGroup className="search-width" size="sm">
        <InputGroupAddon addonType="prepend">
          <UncontrolledButtonDropdown >
            <DropdownToggle caret color="info" size="sm" className="w-25">
              Todos
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem id="-1" key="-1" onClick={selectOption}>Todos</DropdownItem>
              {props.categorias.map(categoria => <DropdownItem id={categoria.id} key={categoria.key} onClick={selectOption}>{categoria.descripcion}</DropdownItem>)}
            </DropdownMenu>
            </UncontrolledButtonDropdown>
        </InputGroupAddon>
        <Input placeholder="Buscar Producto..." style={{backgroundClip:"border-box"}} onChange={nameItemChange}/>
        <InputGroupAddon addonType="append">
          <NavLink to={filterDestination} style={{display:"inline-flex",padding:0,margin:0}}>
            <Button color="primary" style={{padding:".25rem .5rem",fontSize:".875rem",borderRadius:".2rem",borderTopLeftRadius: 0,borderBottomLeftRadius: 0}}>{lupita}</Button>
          </NavLink>
        </InputGroupAddon>
      </InputGroup>
  );
}

export default Searchbox;