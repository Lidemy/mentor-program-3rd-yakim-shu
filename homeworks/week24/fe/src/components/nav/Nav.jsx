import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Logo from './../logo/Logo';
import debounce from 'lodash.debounce';

class Nav extends Component {
  state = {
    isFixed: false,
  };

  // 加入 debounce 延遲
  componentDidMount() {
    window.addEventListener("scroll", debounce(this.handleScroll, 50));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", debounce(this.handleScroll, 50));
  }

  handleScroll = () => {
    this.setState({
      isFixed: window.pageYOffset > 80
    })
  };

  render() {
    const { isFixed } = this.state;
    return (
      <nav
        className={`navbar ${isFixed ? 'fixed' : ''}`} >
        <ul className="navbar__list">
          <li><Logo /></li>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/posts" activeClassName="active">List</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li><NavLink to="/add-post" activeClassName="active">AddPost</NavLink></li>
        </ul>
      </nav>
    )
  }
};

export default Nav;