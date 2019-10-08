import { ActionTypes } from "./../actions";

const initState = {
  isActive: false,
  isSuccess: false,
  type: '',
}

// reducer
export default function msgReducer(state = initState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_MSG:
      return {
        ...state,
        isActive: true,
        isSuccess: action.result,
        type: action.msgType,
      }

    case ActionTypes.HIDE_MSG:
      return {
        ...state,
        isActive: false,
      }

    default:
      return state
  }
}
