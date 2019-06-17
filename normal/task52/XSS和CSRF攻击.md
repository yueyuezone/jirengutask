## XSS攻击
>XXS：跨站脚本(Cross-site scripting，简称XSS)恶意用户使用代码注入到页面中，使页面或者其他用户观看页面时收到影响。


使用页面中可以提交的表单部分，注入恶意的javascript代码。然后实现其中javascript中的恶意操作。可以建立一个隐藏的iframe框，src指向恶意网站的地址。然后建立和当前网站的通信。还能将恶意代码到数据库中。
### 使用eval 有什么问题
eval可以将string变成可执行的代码，若后台传回来的string中有恶意代码，就会被执行。

### 如何防范 XSS 攻击
1. 利用模板引擎
2. 避免内联事件
3. 避免拼接 HTML，谨慎使用evel和innerHtml，
4. 通过 CSP、输入长度配置、接口安全措施等方法，增加攻击的难度，降低攻击的后果。


## CSRF攻击
>CSRF：跨站请求伪造(Cross-site request forgery),也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

黑客猜测出某一操作的请求地址，然后在用户不知情的情况下，一直去请求该地址。达到执行该功能的请求。

### 如何防范CSRF攻击
1. 当服务器接收到当前页面的请求时，将一个`<input type="hidden" name="_csrf_token" value="xxxx">`埋入到请求地的form表单中。该`input`的`value`为服务器生成的随机数
2. 并且在`response`中`setCookie`，`_csrf_token=xxx`种到该浏览器的session中。
3. 当用户提交该请求的时候，比对`cookie`中的`_csrf_toke`和该表单的`_csrf_token`值是否相等




