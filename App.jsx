import React, {useState} from 'react';
import './app.css'
import {Routes, Route, Link} from 'react-router-dom';
import AvailableInv from './AvailableInv';
import UserAvailableInv from './UserAvailableInv';
import AddItem from './AddItem';
import Cart from './Cart';

function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);

  const AddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(p => p.product_id === item.product_id);

      if(existing && existing.quantity >= item.quantity){
        alert('There are only ' + item.quantity + ' in stock.');
        return prev;
      }

      if(existing) {
        return prev.map(p => 
          p.product_id === item.product_id ? {...p, quantity:p.quantity + 1} : p
        );
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  return (
    <div className="app-container">
      <nav style={{marginBottom: '1rem'}}>
        <Link to="/" style={{marginRight: '1rem'}}>User Inventory</Link>
        <Link to="/admin" style={{marginRight: '1rem'}}>Admin Inventory</Link>
        <Link to="/additem" style={{marginRight: '1rem'}}>Add Item</Link>
        <Link to="/cart">View Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserAvailableInv AddToCart={AddToCart} items={items} setItems={setItems} />}/>
        <Route path="/admin" element={<AvailableInv />}/>
        <Route path="/additem" element={<AddItem />}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} userEmail="student@umbc.edu" setItems={setItems}/>}/>
        {/*<Route path="/cart" element={<Cart />}/> */}
      </Routes>
    </div>
  );
}

export default App;
