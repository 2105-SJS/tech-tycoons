import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import {
  getSomething
} from '../api';

import Products from './Products';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([])

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <div>${message}</div>
        <Route exact path='/products'>
          <Products products={products} setProducts={setProducts} />
        </Route>
    </div>
  );
}

export default App;