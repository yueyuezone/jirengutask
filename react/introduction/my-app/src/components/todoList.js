import React,{Component} from 'react'
import {connect} from "react-redux"
import Todo from './todo'
const allTodo = (todos) =>todos.allIds?todos.allIds.map(id=>id?{...todos.byIds[id],id}:{}):[]
const getTodo = (store) => {
    const {Todos,visibilityFilter} = store,
          allTodos = allTodo(Todos)
    switch (visibilityFilter){
        case "all":
            return  allTodos
        case "completed":
            return allTodos.filter(obj=>!obj.completed)
        case "incomplete":
                return allTodos.filter(obj=>obj.completed)
        default :
        return  allTodos

    }
    // if(store.Todos&&store.Todos.allIds){
    //     return store.Todos.allIds.map(id=>id?{...store.Todos.byIds[id],id}:{})
    // }
}
class ToDoList extends Component{
    render(){
        return(
            <ul  className="todo-list">
                {this.props.todos.map((key)=>{
                    return <Todo key={`todo-${key.id}`} todo={key}/>
                })}
                
            </ul>
        )
    }
}
export default connect((state=>{
    let todos = getTodo(state)
    return ({todos})
    
}))(ToDoList)