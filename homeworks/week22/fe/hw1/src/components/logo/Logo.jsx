import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link className="main-logo" to="/">
    Beginner for
    <span className="main-logo--color">React Learning</span>
  </Link>
);

export default Logo;
