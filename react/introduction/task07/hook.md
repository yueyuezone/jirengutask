## hook解决的场景是什么
>They let you use state and other React features without writing a class.
---
>hook是为了让你使用state和其他React特性，而不用像以前一样写一个calss

原先的react版本，function是没有状态的，即它如果要渲染页面，是一整个组件的渲染，而不通过diff算法的对比渲染。并且它没有react其他的特性，比如context，state，react-redux之类的其他特性，由于hook的引入，所以就能使用是其他的用法

简而言之，就是通过一些写法，用function代替calss

## hook的使用场景举例
https://codesandbox.io/s/throbbing-worker-zjr9l
```javascript
import React, { useState } from "react";
function Compoment() {
  const [count, setCount] = useState(0);
  function add() {
    setCount(count + 1);
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>增加数字</button>
    </div>
  );
}
export default Compoment;
```
```javascript
import React, { useState } from "react";
class  Component extends React.Component() {
  constructor(){
      super()
      this.state={
          count:0
      }
  }
  add:()=>{
      this.setState({
          count:this.state.count++
      })
  }
  render(){
      return (
    <div>
      <p>{this.state.count}</p>
      <button onClick={this.add}>增加数字</button>
    </div>
  );
  }
  
}
export default Component;
```