/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Nav.scss'

const Item = ({ children, pageActive, pageName, onChange }) => {
  return (
    <li
      className={pageActive === pageName && 'active'}
      onClick={(e) => onChange(e, pageName)}>
      {children}
    </li>
  )
}

const Nav = ({ page, onChangePage }) => {
  const navList = [
    ['index', '首頁'],
    ['about', 'About'],
    ['posts', 'List'],
  ];
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {
          navList.map(item => (
            <Item
              pageName={item[0]}
              pageActive={page}
              onChange={onChangePage}>
              {item[1]}
            </Item>
          ))
        }
      </ul>
    </nav>
  )
}

export default Nav;