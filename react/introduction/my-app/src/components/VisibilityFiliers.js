import React from 'react'
import {VISIBILITY_FILTERS} from './constants'
import cx from "classnames";
import {connect} from 'react-redux'
import {setFilterAction} from '../redux/action'
const VisibilityFilters = ({visibilityFilter,setFilter}) =>{
    return(
        <div className="visibility-filters">
            {Object.keys(VISIBILITY_FILTERS).map((key)=>{
                const currentTodo = VISIBILITY_FILTERS[key]
                return (
                    <span 
                    key={`visibility-${currentTodo}`}
                    className={cx('filter',visibilityFilter==currentTodo&&"filter--active")}
                    onClick={()=>setFilter(currentTodo)}
                    >{currentTodo}</span>
                )
            })}
        </div>
    )
}

function mapStateToProps(state){
    const {visibilityFilter} = state
    return {visibilityFilter}
}
function setFilter(visibilityFilters){
    return setFilterAction({
        visibilityFilters:visibilityFilters
    })
}
export default connect(mapStateToProps,{setFilter})(VisibilityFilters)