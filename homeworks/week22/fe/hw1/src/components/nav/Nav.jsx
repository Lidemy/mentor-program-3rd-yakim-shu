import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Logo from './../logo/Logo';

class Nav extends Component {
  state = {
    prevScrollpos: window.pageYOffset,
    isFixed: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const isFixed = prevScrollpos < currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      isFixed
    });
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
        </ul>
      </nav>
    )
  }
};

export default Nav;