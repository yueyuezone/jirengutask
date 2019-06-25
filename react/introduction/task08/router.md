## router基本原理
-  改变url就会刷新页面--（自我理解：每一条url都会去请求服务器资源，所以会刷新页面，重新请求页面）
- 于是要求有不同的url对应不一样的组件
1. `window.location.hash`这个api就是在改变url的情况下不改变地址，即在后面加一个#就可以了`'http://baidu.com/#login`
2. `window.location.pathname`也是一样的改变path会请求资源
3. `window.history.pushState()`这个可以请求到不一样啊的`http://baidu.com/login`
4. 第三个api要求后端，每一次请求都是第一个主页，不会跳转

- 根据hash查看到的url地址，再去匹配相应的组件。然后刷新相应的页面

## react-router的使用
[实际应用地址](https://codesandbox.io/s/vigorous-gauss-4028z)
和vue相似
1. 要引入Router组件，来应对
```javascript
import React from "react";
import Header from "./Header";
import Content from "./content";
import { BrowserRouter as Router } from "react-router-dom";
function IndexPage() {
  return (
    <div>
      <Router>
        <Header />
        <Content />
      </Router>
    </div>
  );
}
export default IndexPage;

```
2. 组件的应该

```javascript
import React from "react";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import { Route } from "react-router-dom";
function Content() {
  return (
    <div>
      <Route path="/tab1" component={Tab1} />
      <Route path="/tab2" component={Tab2} />
    </div>
  );
}
export default Content;
```
3. 实际的link
```javascript
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const routers = [
  {
    name: "按钮1",
    url: "tab1"
  },
  {
    name: "按钮2",
    url: "tab2"
  }
];
function Header() {
  return (
    <ul className="tab-link">
      {routers.map(i => (
        <li key={i.url}>
          <Link to={"/" + i.url}>{i.name}</Link>
        </li>
      ))}
    </ul>
  );
}
export default Header;

```



