import React from 'react';
import { connect } from 'react-redux';

import { clearFilters, filterFromText, filterFromDate } from './actions';

export const FilterInput = ({
  onBtnClick,
  onTextInpChange,
  onDateInpChange
}) => {

  const clearAllInputs = () => {
    onBtnClick();
  }
  return (
    <form action="">
      <h3>Найдите нужные дела: </h3>
      <label htmlFor="">
        Фильтр по тексту
        <input onChange={(e)=>onTextInpChange(e.target.value)} type="text"/>
      </label>
      <label htmlFor="">
        Фильтр по дате:
        <input onChange={(e)=>onDateInpChange(e.target.value)} type="date"/>
      </label>
      // <input value="Очистить все" type="button" onClick={clearAllInputs}/>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  onBtnClick: () => dispatch(clearFilters()),
  onTextInpChange: (text) => dispatch(filterFromText(text)),
  onDateInpChange: (date) => dispatch(filterFromDate(date)),
});

 export default connect(null, mapDispatchToProps)(FilterInput);;
