import * as React from 'react'
import  { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import './App.css';
import Index from './componts/IndexCom/IndexCom'
import LoginIn from './componts/LoginIn/loginin'
import SignUp from './componts/SignUp/signup'
import Button from 'antd/es/button';
interface RouterType{
  path:string,
  component:any,
  name:string
}
let basicRoutes:Array<RouterType> =  [
  {
    path:'/',
    component:Index,
    name:'主页'
  },
  {
    path:'/login',
    component:LoginIn,
    name:'登入'
  },
  {
    path:'/SignUp',
    component:SignUp,
    name:'登出'
  }
]
export default class App extends React.Component{
  constructor(props:object){
    super(props)
    
  }
  public render(){
      return (
        <div className="App">
          <Router>
            <Switch>
              {basicRoutes.map(item=>{
                let current:any = item.component
                return <Route key={item.path} path={item.path} exact={true} component={current}></Route>
              })}
            </Switch>
            <div>
            {basicRoutes.map(item=>{
                return <Link key={item.path} to={item.path}><Button>{item.name}</Button></Link>
              })}
            </div>
          </Router>
        </div>
      )
    }
}
