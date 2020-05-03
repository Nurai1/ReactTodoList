// ACTION CREATORS

export const addCurrentText = function(value) {
  return { type: "ADD_CURRENT_TEXT", value };
}

export const addCurrentDate = function(value) {
  return { type: "ADD_CURRENT_DATE", value };
}

export const addToDo = function(text, date) {
  return { type: "ADD_TODO", text, date };
}

export const setVisibilityFilterFromText = function(text) {
  return { type: "FILTER__TEXT", text };
}

export const setVisibilityFilterFromDate = function(date) {
  return { type: "FILTER__DATE", date };
}

export const clearVisibilityFilters = function() {
  return { type: "CLEAR__FILTERS" };
}

export const toggleCompleteState = function(id) {
  return { type: "TOGGLE__COMPLETE", id };
}

export const deleteToDo = function(id) {
  return { type: "DELETE__TODO", id }
}

export const changeSortItem = function(item) {
  return { type: "CHANGE__SORT_ITEM", item }
}

export const toggleSortOrder = function() {
  return { type: "TOGGLE__SORT_ORDER" }
}
