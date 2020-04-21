import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoList = ({
  todos,
  sortTodos,
  dispatch
}) => {

  const initiliazeSortFunc = function(sortItem) {
    if (sortTodos.fromTop){
      dispatch(
        actions.changeSortFunc(function(a,b){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        }));
    }
    else {
      dispatch(
        actions.changeSortFunc(function(b,a){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        }));
    }
  }

  return (
    <div>
    <h3>Сортировка:</h3>
    <label htmlFor="">
      По тексту:
      <input type="radio" name="sortFunc" onClick={()=>{
          dispatch(actions.changeSortItem("text"));
          initiliazeSortFunc(sortTodos.item);
        }}
      />
    </label>
    <label htmlFor="">
      По дате:
      <input type="radio" name="sortFunc" onClick={()=>{
          dispatch(actions.changeSortItem("date"));
          console.log(sortTodos.item); // "" -> should be 'date'
          initiliazeSortFunc(sortTodos.item);
        }}
      />
    </label>
    <label htmlFor="">
      Изменить направление:
      <input type="checkbox" onClick={()=>{
          dispatch(actions.toggleSortOrder());
          initiliazeSortFunc(sortTodos.item);
        }}
      />
    </label>
    <ul>
      {
        todos.sort(sortTodos.func).map((todo)=>{
          console.log(sortTodos.func);
          return (todo.filterText && todo.filterDate)?
            <li key={todo.index}>Текст: {todo.text.toString()} Дата: {todo.date.toString()}</li>:""
        })
      }
    </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  sortTodos: state.sortTodos
});

const TodoListContainer = connect(
  mapStateToProps,
)(TodoList);

export default TodoListContainer;
