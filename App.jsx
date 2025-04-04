import React from 'react';
import './app.css'
import {Routes, Route, Link} from 'react-router-dom';
import AvailableInv from './AvailableInv';
import UserAvailableInv from './UserAvailableInv';
import AddItem from './AddItem';

function App() {
  return (
    <div className="app-container">
      <nav style={{marginBottom: '1rem'}}>
        <Link to="/" style={{marginRight: '1rem'}}>User Inventory</Link>
        <Link to="/admin" style={{marginRight: '1rem'}}>Admin Inventory</Link>
        <Link to="/additem">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserAvailableInv />}/>
        <Route path="/admin" element={<AvailableInv />}/>
        <Route path="/additem" element={<AddItem />}/>
      </Routes>
    </div>
  );
}

export default App;
