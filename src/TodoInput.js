import React from 'react';
import { connect } from 'react-redux';

import { addCurrentDate, addCurrentText, addToDo } from './actions';

export const TodoInput = ({
  todoCurrentValues,
  onTextChange,
  onDateChange,
  onSubmit
}) => {
  let todoText = '';
  let todoDate = '';
  let isErrorClassNecessary = false;
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoCurrentValues.date || !todoCurrentValues.text){
      isErrorClassNecessary = true;
      return;
    }

    onSubmit(todoCurrentValues.text, todoCurrentValues.date);
    isErrorClassNecessary = false;
  }
  return (
    <form className="todo__input" onSubmit={addTodo} >
      <h2>ToDo App</h2>
      <label htmlFor="">
        Введите текст задания:
        <input className={(todoText.value || !isErrorClassNecessary)?"":"error"}
          onChange={(e)=>onTextChange(e.target.value)} type="text"
        />
      </label>
      <label htmlFor="">
        Введите дату:
        <input className={(todoDate.value || !isErrorClassNecessary)?"":"error"}
          onChange={(e)=>onDateChange(e.target.value)} type="date"
        />
      </label>
      <input type="submit" value="Добавить" />
    </form>
  );
}

const mapStateToProps = (state) => ({
  todoCurrentValues: state.todoCurrentValues
})

const mapDispatchToProps = (dispatch) => ({
  onTextChange: (value) => dispatch(addCurrentText(value)),
  onDateChange: (value) => dispatch(addCurrentDate(value)),
  onSubmit: (text, date) => dispatch(addToDo(text, date))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
