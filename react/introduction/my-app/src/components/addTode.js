import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addTodoAction} from '../redux/action'
let nextTodoId =1
class AddToDo extends Component{
    constructor(){
        super()
        this.state={
            value:''
        }
    }
    updateInput(val){
        this.setState({
            value:val
        })
    }
    handleaddTodo=()=>{
        this.props.dispatch(
            addTodoAction({
                id:nextTodoId++,
                content:this.state.value
            })
        )
        this.setState({
            value:'',
        })
    }
    render(){
        return (
            <div>
                <input value={this.state.value} onChange={e=>this.updateInput(e.target.value)}/>
                <button className="add-todo" onClick={this.handleaddTodo}>增加</button>
            </div>
            
        )
    }
   
}

export default connect()(AddToDo)