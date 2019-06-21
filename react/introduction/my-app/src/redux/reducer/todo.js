import {handleActions} from 'redux-actions'
const todo = (state,action)=>{
    switch (action.type){
        case 'ADD_TODO':
            const {id,content} = action.payload
            return ({
                allIds:[...state.allIds,id],
                byIds:{
                    ...state.byIds,
                    [id]:{
                        content,
                        completed:false
                    }
                }
            })
        case 'TOGGLE_TODO':
            const key = action.payload.id
            return(
                {
                    ...state,
                    byIds:{
                        ...state.byIds,
                        [key]:{
                            ...state.byIds[key],
                            completed:!state.byIds[key].completed
                        }
                    }
                }
            )
        default:
            return state
    }
}
const initState = {
    allIds: [-3,-2,-1],
    byIds: {[-3]:{
        content:'第一件',
        completed:false
    },[-2]:{
        content:'第二件',
        completed:false
    },
        [-1]:{
            content:'第三件',
            completed:false
        }
    }
}
export const Todos = handleActions({
    ADD_TODO(state,action){
        return todo(state,action)
    },
    TOGGLE_TODO(state,action){
        return todo(state,action)
    }
},initState)