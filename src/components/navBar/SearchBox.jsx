import React, { useState, useEffect } from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './css/searchBoxStyles.css';

const Searchbox = (props) => {
  const [category,setCategory] = useState("");
  const [itemName,setItemName] = useState("");
  const [filterDestination,setFilterDestination] = useState("");

  const lupita = <FontAwesomeIcon icon={faSearch} />

  const selectOption = (evt) => {
    document.querySelectorAll("button.dropdown-toggle")[0].textContent = evt.target.textContent;
    document.querySelector("#spellFilter").value = "";
    setItemName("");
    evt.target.id != "-1" ? setCategory(`/categories/${evt.target.id}/`) : setCategory(`/`);
  }

  const nameItemChange = (evt) => {
    setItemName(`search/${evt.target.value}`)
  }

  useEffect(() => {
    setFilterDestination(category + itemName);
  },[category,itemName])

  return (
      <InputGroup className="search-width" size="sm" style={{maxWidth:"5rem"}}>
        <InputGroupAddon addonType="prepend">
          <UncontrolledButtonDropdown >
            <DropdownToggle caret color="info" size="sm" className="w-25">
              Todos
            </DropdownToggle>
            <DropdownMenu>
              <NavLink key={-1} to="/">
                <DropdownItem id="-1" onClick={selectOption}>Todos</DropdownItem>
              </NavLink>
              {props.categorias.map(categoria =>
                <NavLink key={categoria.key} to={`/categories/${categoria.id}`} >
                  <DropdownItem id={categoria.id} onClick={selectOption}>
                    {categoria.descripcion}
                  </DropdownItem>
                </NavLink>
              )}
            </DropdownMenu>
            </UncontrolledButtonDropdown>
        </InputGroupAddon>
        <Input id="spellFilter" placeholder="Buscar Producto..." style={{backgroundClip:"border-box"}} onChange={nameItemChange}/>
        <InputGroupAddon addonType="append">
          <NavLink to={filterDestination} style={{display:"inline-flex",padding:0,margin:0}}>
            <Button color="primary" style={{padding:".25rem .5rem",fontSize:".875rem",borderRadius:".2rem",borderTopLeftRadius: 0,borderBottomLeftRadius: 0}}>{lupita}</Button>
          </NavLink>
        </InputGroupAddon>
      </InputGroup>
  );
}

export default Searchbox;