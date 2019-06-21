import React from 'react';
import AddToDo from './components/addTode'
import ToDoList from './components/todoList'
import VisibilityFilters from './components/VisibilityFiliers'
import './style.css'
function App() {
  return (
    <div  className="todo-app">
      <h1>to do list</h1>
      <AddToDo/>
      <ToDoList/>
      <VisibilityFilters/>
    </div>
  );
}

export default App;
