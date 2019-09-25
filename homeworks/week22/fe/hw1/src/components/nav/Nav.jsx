import React from 'react';
import { NavLink } from "react-router-dom";
import './Nav.scss'

const Nav = () => (
  <nav className="navbar" >
    <ul className="navbar__list">
      <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
      <li><NavLink to="/posts" activeClassName="active">List</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
    </ul>
  </nav>
);

export default Nav;