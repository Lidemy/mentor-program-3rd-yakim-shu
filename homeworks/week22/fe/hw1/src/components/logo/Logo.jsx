import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link className="main-logo" to="/">
    For beginner
    <span>React Learning</span>
  </Link>
);

export default Logo;
