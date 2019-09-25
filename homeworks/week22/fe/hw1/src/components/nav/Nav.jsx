import React from 'react';
import './Nav.scss'

const Item = ({ children, pageActive, pageName }) => {
  return (
    <li className={pageActive === pageName ? 'active' : ''}>
      <a href={'#' + pageName}>
        {children}
      </a >
    </li>
  )
}

const Nav = ({ page }) => {
  const navList = [
    ['index', '首頁'],
    ['posts', 'List'],
    ['about', 'About'],
  ];
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {
          navList.map((item, index) => (
            <Item
              key={index}
              pageName={item[0]}
              pageActive={page}>
              {item[1]}
            </Item>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav;