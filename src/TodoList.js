import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoList = ({
  todos,
  sortTodos,
  dispatch
}) => {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("sortTodos", JSON.stringify(sortTodos));

  const initiliazeSortFunc = function(sortItem) {
    if (sortTodos.fromTop){
      return function(a,b){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        };
    }
    else {
      return function(b,a){
          if (a[sortItem]>b[sortItem])
            return 1;
          else
            return -1;
        };
    }
  }
  console.log(JSON.parse(localStorage.getItem("todos")));
  return (
    <div>
    <h3>Сортировка:</h3>
    <label htmlFor="">
      По тексту:
      <input type="radio" name="sortFunc" onClick={()=>{
          dispatch(actions.changeSortItem("text"));
        }}
      />
    </label>
    <label htmlFor="">
      По дате:
      <input type="radio" name="sortFunc" onClick={()=>{
          dispatch(actions.changeSortItem("date"));
        }}
      />
    </label>
    <label htmlFor="">
      Изменить направление:
      <input type="checkbox" onClick={()=>{
          dispatch(actions.toggleSortOrder());
        }}
      />
    </label>
    <ul>
      {
        JSON.parse(localStorage.getItem("todos")).sort(initiliazeSortFunc(sortTodos.item)).map((todo)=>{
          let toDoIndex= todo.index;
          return (todo.filterText && todo.filterDate)?
            <li key={todo.index} >
              <input type="checkbox" onClick={()=>{dispatch(actions.toggleCompleteState(toDoIndex))}} />
              Текст: {todo.text.toString()} Дата: {todo.date.toString()}
              <input onClick={()=>{dispatch(actions.deleteToDo(toDoIndex))}} type="button" value="Удалить" />
            </li>:""
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
