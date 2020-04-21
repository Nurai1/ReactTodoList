import { makeIndexCounter } from './utilities';

const indexCounter = makeIndexCounter();

const todosReducer = function(state=[], action) {
  switch(action.type){
    case "ADD_TODO":
      return [
          ...state,
          {
            index: indexCounter(),
            text: action.text,
            date: action.date,
            completed: false,
            filterText: true,
            filterDate: true
          }
        ]
    case "FILTER__TEXT":
      return state.map(function(val) {
          if (!val.text.includes(action.text)){
            return {...val, filterText: false}
          }
            return {...val, filterText: true}
        })
    case "FILTER__DATE":
      return state.map(function(val) {
          if (val.date !== action.date){
            return {...val, filterDate: false}
          }
          return val;
        })
    case "CLEAR__FILTERS":
      return state.map(function(val) {
            return {...val, filterText: true, filterDate: true}
        })
    case "TOGGLE__COMPLETE":
      return state.map(function(val) {
              if (action.index===val.index){
                return Object.assign({}, val, {completed: !val.completed});
              }
              return val;
            })
    case "DELETE__TODO":
      return state.filter(function(val) {
              return action.index!==val.index
            })
    default:
      return state;
  }
}

const sortTodosReducer = function(state={item:"", fromTop: true}, action) {
  switch(action.type) {
    case "CHANGE__SORT_ITEM":
      return {
        ...state,
        item: action.item,
      }
    case "TOGGLE__SORT_ORDER":
      return{
        ...state,
        fromTop: !state.fromTop,
      }
    default:
      return state;
  }
}

const reducer = function(state={}, action) {
  return {//localStorage.setItem("todos", todosReducer(state.todos, action))
    todos: todosReducer(state.todos, action),
    sortTodos: sortTodosReducer(state.sortTodos, action),
  }
}

export default reducer;
