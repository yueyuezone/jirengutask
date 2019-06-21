import React,{Component} from 'react'
import {connect} from 'react-redux'
class CouterNum extends Component{
    render(){
        return(
            <div>{this.props.num}</div>
        )
    }
}
export default connect((num)=>({num}))(CouterNum)