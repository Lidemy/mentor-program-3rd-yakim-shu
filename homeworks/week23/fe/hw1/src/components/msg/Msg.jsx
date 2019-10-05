import React, { Component } from 'react';

class MsgContent extends Component {
  componentDidMount() {
    const { hideMsg } = this.props;
    this.timer = setTimeout(() => {
      hideMsg();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { msg } = this.props;
    return (
      <div className='msg'>
        {
          msg.isSuccess ?
            msg[msg.type].successMsg :
            msg[msg.type].errorMsg
        }
      </div>
    )
  }
}

const Msg = ({ msg, hideMsg }) => (
  msg.isActive && <MsgContent msg={msg} hideMsg={hideMsg} />
)

export default Msg;