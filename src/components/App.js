import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import {
  getSomething
} from '../api';

import Products from './Products';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AdminPortal from './AdminPortal';
import Orders from './Orders';
import Checkout from './Checkout';
import Navigation from './Navigation';
import CheckoutForm from './CheckoutForm';
import FinishOrder from './FinishOrder';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([])
  

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    console.log('storageToken:', localToken)
    if(localToken){
      setToken(localToken)
    }
  });
  console.log('user1:', user)
  console.log('tokentoken:', token)
  return (
    <div className="App">
      <Navigation token={token} user={user}/>
      <div>{message}</div>
        <Route exact path='/'>
          <Home username={user.username} />
        </Route>
        <Route exact path='/products'>
          <Products products={products} setProducts={setProducts} orders={orders} token={token} />
        </Route>
        <Route exact path='/users/register'>
          <Register setToken={setToken} setUser={setUser} />
        </Route>
        <Route exact path='/users/login'>
          <Login setToken={setToken} setUser={setUser}/>
        </Route>
        <Route exact path='/admin_portal'>
          <AdminPortal admin={user.isAdmin}/>
        </Route>
        <Route exact path='/cart'>
          <Orders orders={orders} setOrders={setOrders} token={token} />
        </Route>
        <Route exact path='/complete_your_order'>
          <FinishOrder orders={orders} setOrders={setOrders} token={token}/>
        </Route>
  
    </div>
  );
}

export default App;