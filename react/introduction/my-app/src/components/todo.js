import React, {Component}from 'react'
import {connect} from "react-redux"
import {toggleTodoAction} from '../redux/action'
import cx from "classnames";
class Todo extends Component{
    toggleTodo=(id)=>{
        this.props.dispatch(toggleTodoAction({
            id:id
        }))
    }
    
    render(){
        const {todo} = this.props
        return(
            <li className="todo-item" onClick={()=>this.toggleTodo(todo.id)}>
                {todo && todo.completed ? "👌" : "👋"}{" "}
            <span 
                className={cx(
                    "todo-item__text",
                    todo && todo.completed && "todo-item__text--completed"
                  )}
            >
                {todo.content}
            </span>
        </li>
        )
    }
}
export default connect()(Todo)
