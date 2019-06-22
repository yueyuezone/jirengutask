import React from 'react'
import Button from './button'
import {mContext} from './context'
class Box extends React.Component{
    render(){
        return(
            <mContext.Consumer>
                {(value)=><Button value={value}></Button>}
            </mContext.Consumer>
        )
    }
}
export default Box