import React, {useState,useEffect,useContext} from 'react';
import { Navbar} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import Searchbox from './SearchBox'
import CartIcon from './CartIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {getFirestore} from '../../firebase';
import {CategoryContext} from '../../context/categoryContext';

import './css/navBarStyles.css';

const NavPpal = () => {
  const [categories,setCategories] = useState([]);
  const {setCategory,setItemFilter} = useContext(CategoryContext)

  useEffect(() => {
    const db = getFirestore();
    const itemCollection = db.collection("categories")
    itemCollection.get().then((querySnapshot) => {
        if(!querySnapshot.size){
            console.log("No Data");
        }
        setCategories(querySnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        }))
    }).catch(error => {
        console.log("ERROR ",error)
    })
  },[]);

  const reiniciarSearchBox = () => {
    setCategory("/");
    setItemFilter("");
    document.querySelectorAll("button.dropdown-toggle")[0].textContent = "Todos";
    document.querySelector("#spellFilter").value = "";
  }

  const usuario = <FontAwesomeIcon icon={faUserCircle} />
  const displayFlex = "flex";
  
  return (
      <Navbar color="light" light expand="md" className="nav-background flex-space-between" style={{display:displayFlex}}>
        <NavLink to="/" className="text-white icon-link px-1 px-sm-3 px-md-4" onClick={reiniciarSearchBox}>
          <img src="https://imagizer.imageshack.com/img922/9889/P9I7Vu.png" alt="Reactive Market Logo" className="d-none d-sm-block"/>
          <img src="https://imagizer.imageshack.com/img923/6550/2RSH3p.png" alt="Reactive Market Logo" className="d-block d-sm-none"/>
        </NavLink>
        <Searchbox categorias={categories}/>
        <div style={{display:displayFlex, justifyContent:"center"}}>
          <NavLink to="/cart" className="text-white icon-link px-1 px-sm-3 px-md-4"><CartIcon/></NavLink>
          <NavLink to="/orders" className="text-white icon-link px-1 px-sm-3 px-md-4">{usuario}</NavLink>
        </div>
      </Navbar>
  );
}

export default NavPpal;