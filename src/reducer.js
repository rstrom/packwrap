const init = {
  index: 0,
  table: {}
}

export default (state=init, action) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        table: {
          ...state.table,
          ...action.table
        }
      }
    case 'PUSH':
      return {
        ...state,
        index: state.index + 1,
        table: {
          ...state.table,
          ...action.table
        }
      }
    default:
      return state
  }
}
