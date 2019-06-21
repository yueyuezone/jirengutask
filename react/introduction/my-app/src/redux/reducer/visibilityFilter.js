import {handleActions} from 'redux-actions'

const initState = 'all'
const setFilter = (state,action)=>{
    switch (action.type){
        case "SET_FILTER":
            return (action.payload.visibilityFilters)
        default:
            return state
    }
}
export const visibilityFilter = handleActions({
    SET_FILTER(state,action){
        return setFilter(state,action)
    }
},initState)