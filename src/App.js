import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import NavPpal from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Orders from './pages/Orders';
import ItemDetailContainer from './pages/ItemDetailContainer';
import {CartProvider} from './context/cartContext';

import './App.css';

export default function App() {
  return (
    <div style={{height:"100vh"}}>
      <BrowserRouter>
        <CartProvider>
          <NavPpal/>
          <Switch>
            <Route exact path="/">
              <Home greeting="Bienvenido" nombre="Tincho"/>
            </Route>
            <Route exact path={["/categories/:idCategoria","/categories/:idCategoria/search/:filtro","/search/:filtro","/search"]}>
              <Search />
            </Route>
            <Route exact path="/item/:idItem">
              <ItemDetailContainer />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
          </Switch>
        </CartProvider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
