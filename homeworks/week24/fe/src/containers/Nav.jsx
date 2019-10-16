import React from 'react';
import { connect } from 'react-redux';
import Nav from './../components/nav/Nav';

const NavContainer = props => (<Nav {...props} />);

const mapStateToProps = category => category;

export default connect(mapStateToProps, null)(NavContainer)