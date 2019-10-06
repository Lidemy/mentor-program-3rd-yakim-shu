// action types
const HIDE_MSG = 'HIDE_MSG'
const SHOW_MSG = 'SHOW_MSG'

const initState = {
  isActive: false,
  isSuccess: false,
  type: '',
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

// reducer
export default function msgReducer(state = initState, action) {
  console.log('call msg reducer');
  switch (action.type) {
    case SHOW_MSG:
      return {
        ...state,
        isActive: true,
        isSuccess: action.result,
        type: action.msgType,
      }

    case HIDE_MSG:
      return {
        ...state,
        isActive: false,
      }

    default:
      return state
  }
}

// action creators
export const showMsg = (msgType, result) => {
  return {
    type: SHOW_MSG,
    result,
    msgType,
  }
}

export const hideMsg = () => {
  return {
    type: HIDE_MSG,
  }
}
