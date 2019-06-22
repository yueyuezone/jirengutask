## 为了解决什么问题
>Context provides a way to pass data through the component tree without having to pass props down manually at every level.
-----
>`Context`提供一种方式，在组件树中传递数据。而不需要繁琐的一层层的传递`props`参数

## 何时使用`Context`
>Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language. 
---
>`Context`用于分享数据，而该数据可以被考虑为`global`的变量用于一个React 树组件，类似当前认证的用户，主题，首选语言

## 如何使用

1. 创建一个Context对象

```javascript
export const mContext = React.createContext()
```
2.在数据提供顶层引入该对象
```javascript
export class App extends Component{
    constructor(){
        super()
        this.state = {
            theme:{
                color : 'red',
                toggleColor:this.toggleColor
            }
        }
    }
    toggleColor=()=>{
        this.setState({
            theme:{
                ...this.state.theme,
                color:'blue'
            }
        })
    }
    render(){
        return (
            <mContext.Provider value={this.state.theme}>
                <Box>
                </Box>
            </mContext.Provider>
        )
    }
}
```
3. 在需要的地方引入该对象
```javascript
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
```
4. 而Button就可以通过props活动需要的数据和函数
