import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import {
  getSomething
} from '../api';

import Products from './Products';
import Home from './Home';
import AccountForm from './AccountForm';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>BookShelf</h1>
      <div id='navbar' className='navbar'>
          <Link to='/'>Home</Link> | <Link to='/products'>Products</Link>
      </div>
      <div>{message}</div>
        <Route exact path='/'>
          <Home username={user.username} />
        </Route>
        <Route exact path='/products'>
          <Products products={products} setProducts={setProducts} />
        </Route>
        <Route exact path='/users/:method'>
          <AccountForm setToken={setToken} setUser={setUser} />
        </Route>
    </div>
  );
}

export default App;