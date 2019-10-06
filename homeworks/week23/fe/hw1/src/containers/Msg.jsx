import React from 'react';
import { connect } from 'react-redux';
import Msg from './../components/msg/Msg';
import { hideMsg } from '../reducers/msg';

const MsgContainer = props => (<Msg {...props} />);

const mapStateToProps = ({ msg }) => ({ msg });
const mapDispatchToProps = { hideMsg };

export default connect(mapStateToProps, mapDispatchToProps)(MsgContainer)