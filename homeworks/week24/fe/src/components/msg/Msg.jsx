import React, { Component } from 'react';

class MsgContent extends Component {
  // 不確定可以放外面、還是要放在 constructor 裡？
  msgContent = {
    addPost: {
      successMsg: '新增文章成功',
      errorMsg: '新增文章失敗',
    },
    deletePost: {
      successMsg: '刪除文章成功',
      errorMsg: '刪除文章失敗',
    },
    updatePost: {
      successMsg: '編輯文章成功',
      errorMsg: '編輯文章失敗',
    },
  }

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
            this.msgContent[msg.type].successMsg :
            this.msgContent[msg.type].errorMsg
        }
      </div>
    )
  }
}

const Msg = ({ msg, hideMsg }) => (
  msg.isActive && <MsgContent msg={msg} hideMsg={hideMsg} />
)

export default Msg;