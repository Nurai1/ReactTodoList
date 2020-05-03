import { makeIdCounter } from './utilities';

let storeFromLocalStore = JSON.parse(localStorage.getItem("reducer"));
console.log(storeFromLocalStore);
let maxId=0;
if(storeFromLocalStore){
  for(let val of storeFromLocalStore.todos){
    if(val.id>maxId)
      maxId=val.id;
  }
}
const idCounter = makeIdCounter(maxId+1);

const todoCurrentValuesReducer = function(state={}, action) {
  switch(action.type){
    case "ADD_CURRENT_TEXT":
      return {
        ...state,
        text: action.value
      }

    case "ADD_CURRENT_DATE":
      return {
        ...state,
        date: action.value
      }
    default:
      return state;
  }
}

const todosReducer = function(state=[], action) {
  switch(action.type){
    case "ADD_TODO":
      return [
          ...state,
          {
            id: idCounter(),
            text: action.text,
            date: action.date,
            completed: false,
          }
        ]
    case "TOGGLE__COMPLETE":
      return state.map(function(val) {
              if (action.id===val.id){
                return Object.assign({}, val, {completed: !val.completed});
              }
              return val;
            })
    case "DELETE__TODO":
      return state.filter(function(val) {
              return action.id!==val.id
            })
    default:
      return state;
  }
}

const visibilityFilters = function(state={text: "", date: ""}, action) {
  switch(action.type) {
    case "FILTER__TEXT":
      return {
        ...state,
        text: action.text
      }
    case "FILTER__DATE":
      return {
        ...state,
        date: action.date
      }
    case "CLEAR__FILTERS":
      return {
        text: "",
        date: ""
      }
    default:
      return state
  }
}

const sortingDetailsReducer = function(state={item:"", fromTop: false}, action) {
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

let defaultState = storeFromLocalStore?storeFromLocalStore:{};

const reducer = function(state=defaultState, action) {
  return {
    todoCurrentValues: todoCurrentValuesReducer(state.todoCurrentValues, action),
    todos: todosReducer(state.todos, action),
    sortingDetails: sortingDetailsReducer(state.sortingDetails, action),
    visibilityFilters: visibilityFilters(state.visibilityFilters, action)
  }
}

export default reducer;
