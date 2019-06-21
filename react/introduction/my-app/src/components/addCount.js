import React from 'react'
import {connect} from 'react-redux'
const AddCount = ({count,dispatch})=>{
    return(
        <div>
            <button onClick={()=>dispatch({type:'ADD_COUNT'})}>增加一个数</button>
        </div>
    )
}
export default connect()(AddCount)