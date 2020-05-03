import React from 'react';
import { connect } from 'react-redux';

import { clearVisibilityFilters, setVisibilityFilterFromText, setVisibilityFilterFromDate } from './actions';

export const FilterInput = ({
  onBtnClick,
  onTextInpChange,
  onDateInpChange
}) => {

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
      <input value="Очистить все" type="button" onClick={onBtnClick}/>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  onBtnClick: () => dispatch(clearVisibilityFilters()),
  onTextInpChange: (text) => dispatch(setVisibilityFilterFromText(text)),
  onDateInpChange: (date) => dispatch(setVisibilityFilterFromDate(date)),
});

 export default connect(null, mapDispatchToProps)(FilterInput);;
