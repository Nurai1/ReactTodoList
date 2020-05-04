import React from 'react';
import { connect } from 'react-redux';

import { changeSortItem, toggleSortOrder, toggleCompleteState, deleteToDo } from './actions';

export const TodoList = ({
  todos,
  sortingDetails,
  visibilityFilters,
  changeSortItem,
  toggleSortOrder,
  toggleCompleteState,
  deleteToDo
}) => {

  const initiliazeSortFunc = function(sortItem) {
    if (sortingDetails.fromTop){
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

  const sortingDetailsHandler = function(item) {
    if (item === sortingDetails.item){
      toggleSortOrder();
    }
    changeSortItem(item);
  }

  return (
    <div>
    <h3>Сортировка:</h3>
      <input type="button" name="sortFunc"
        value="Сортировка по тексту"
        onClick={()=>{
          sortingDetailsHandler("text");
        }}
      />
      <input type="button" name="sortFunc"
        value="Сортировка по дате"
        onClick={()=>{
          sortingDetailsHandler("date");
        }}
      />
      <input type="button" name="sortFunc"
        value="Сброс сортировки"
        onClick={()=>{
          sortingDetailsHandler("");
        }}
      />
    <ul>
      {
        todos.sort(initiliazeSortFunc(sortingDetails.item)).map((todo)=>{
          let toDoId= todo.id;
          return (todo.text.includes(visibilityFilters.text) && todo.date.includes(visibilityFilters.date))?
            <li key={todo.id} >
              <input type="checkbox" onClick={()=>{toggleCompleteState(toDoId)}} />
              Текст: {todo.text.toString()} Дата: {todo.date.toString()}
              <input onClick={()=>{deleteToDo(toDoId)}} type="button" value="Удалить" />
            </li>
            :null
        })
      }
    </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  sortingDetails: state.sortingDetails,
  visibilityFilters: state.visibilityFilters
});

const mapDispatchToProps = (dispatch) => ({
  changeSortItem: (item) => dispatch(changeSortItem(item)),
  toggleSortOrder: () => dispatch(toggleSortOrder()),
  toggleCompleteState: (id) => dispatch(toggleCompleteState(id)),
  deleteToDo: (id) => dispatch(deleteToDo(id))
});

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
