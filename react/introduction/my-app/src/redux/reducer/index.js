import {combineReducers} from "redux"
// import visibilityFilter from './visibilityFilter'
import * as todoList from './todo'
import {visibilityFilter} from './visibilityFilter'
export default combineReducers({
    ...todoList,
    visibilityFilter
})