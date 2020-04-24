import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const TodoInput = ({
  todos,
  dispatch
}) => {
  let todoText = '';
  let todoDate = '';
  const addTodo = () => {
    if (!todoText.value || !todoDate.value){
      todoText.value?(todoDate.classList.add("error")):(todoText.classList.add("error"))
      return;
    }
    todoDate.classList.remove("error");
    todoText.classList.remove("error");
    dispatch(actions.addToDo(todoText.value, todoDate.value))
  };

  return (
    <form className="todo__input">
      <h2>ToDo App</h2>
      <label htmlFor="">
        Введите текст задания:
        <input ref={(input)=>{todoText=input}} type="text"/>
      </label>
      <label htmlFor="">
        Введите дату:
        <input ref={(input)=>{todoDate=input}} type="date"/>
      </label>
      <input onClick={addTodo} type="button" value="Добавить" />
    </form>
  );
}

export default connect()(TodoInput);
