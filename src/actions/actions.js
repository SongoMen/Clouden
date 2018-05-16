export const ADD_USERNAME = 'ADD_USERNAME'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
​
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
​
/*
 * action creators
 */
​
export function addUsername(text) {
  return { type: ADD_USERNAME, text }
}
