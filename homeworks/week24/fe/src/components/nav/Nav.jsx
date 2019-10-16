import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Logo from './../logo/Logo';
import debounce from 'lodash.debounce';
import Search from './../search/Search';

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
    const { category } = this.props;

    return (
      <nav
        className={`navbar ${isFixed ? 'fixed' : ''}`} >
        <div className="navbar__inner">
          <Logo />
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="navbar__list menu">
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/posts" activeClassName="active">List</NavLink></li>
            <li className="dropdown">
              <NavLink to="/category" activeClassName="active">Category</NavLink>
              <div className="dropdown-content">
                {
                  category.map((item, index) => (
                    <NavLink to={`/category/${item}`} key={index}>{item}</NavLink>
                  ))
                }
              </div>
            </li>
            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
            <li><NavLink to="/add-post" activeClassName="active">AddPost</NavLink></li>
            <li><Search /></li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default Nav;