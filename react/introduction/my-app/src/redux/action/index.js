import { createAction } from 'redux-actions'
export const addTodoAction = createAction('ADD_TODO')
export const toggleTodoAction = createAction('TOGGLE_TODO')
export const setFilterAction = createAction('SET_FILTER')