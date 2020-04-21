import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

export const FilterInput = ({
  dispatch
}) => {
  let filterInpText = '';
  let filterInpDate = '';

  const clearAllInputs = () => {
    dispatch(actions.clearFilters());
    filterInpText.value='';
    filterInpDate.value='';
  }
  return (
    <form action="">
      <h3>Найдите нужные дела: </h3>
      <label htmlFor="">
        Фильтр по тексту
        <input onChange={()=>{dispatch(actions.filterFromText(filterInpText.value))}} ref={(input)=>{filterInpText=input}} type="text"/>
      </label>
      <label htmlFor="">
        Фильтр по дате:
        <input onChange={()=>{dispatch(actions.filterFromDate(filterInpDate.value))}} ref={(input)=>{filterInpDate=input}} type="date"/>
      </label>
      <input value="Очистить все" type="button" onClick={clearAllInputs}/>
    </form>
  )
}

 export default connect()(FilterInput);;
