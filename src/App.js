import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import NavPpal from './components/navBar/NavBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import ItemDetailContainer from './pages/ItemDetailContainer';
import {CartProvider} from './context/cartContext';

import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <NavPpal/>
          <Switch>
            <Route exact path="/">
              <Home greeting="Bienvenido" nombre="Tincho"/>
            </Route>
            <Route path="/search">
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
          </Switch>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}
