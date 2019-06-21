## 创建Store
1. 从`react`导入`createStore`函数
2. 传入项目中的`reducer`函数
```javascript
import {createStore} from 'redux'
import {counter} from './reducer' 
export default createStore(counter) 
//创建store
export const counter = (state=0,action)=>{
    switch (action.type){
        case 'ADD_COUNT':
            return ++state
        default:
            return state
    }
}
//reducer函数

```
## 将store注入到顶层组件
1. 生成`<Provider store={store}></Provider>`的最外层组件
```javascript
import {Provider} from "react-redux"
import store from './countRedux/index'
import App from './countApp';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));

```

## 将需要store数据的组件与store相连接
1. 改变state状态的变化
```javascript
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
```
2. 获取state的数据
```javascript
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
```
