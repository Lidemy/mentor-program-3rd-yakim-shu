import React from 'react';
import { connect } from 'react-redux';
import Msg from './../components/msg/Msg';
import { Actions } from './../actions';

const MsgContainer = props => (<Msg {...props} />);

const mapStateToProps = ({ msg }) => ({ msg });
const mapDispatchToProps = {
  hideMsg: Actions.HIDE_MSG,
};

export default connect(mapStateToProps, mapDispatchToProps)(MsgContainer)