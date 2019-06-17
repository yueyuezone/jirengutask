>Http即Hypertext Transfer Protocol。超文本传输协议。是客户端和服务器之间的传输协议，双方的请求都有固定的格式，当然也有ftp等其他传输数据的协议

## 报文
>Http报文是在http应用程序之间发送的数据块，这些数据块以一些文本形式的元信息开头，描述报文的内容及含义，后面跟着可选的数据部分

即应用和应用之间的传输的内容的描述报文的内容和含义。还有一些可选的内容，要约定好传输之间的协议格式。这样才可以服务器和服务器之间进行传输
### 请求报文
```
<method><request-URL><version>
GET /blog/2014/05/restful_api.html HTTP/1.1

<headers>
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Referer: http://book.jirengu.com/fe/%E4%B8%93%E9%A2%98%E6%89%A9%E5%B1%95/HTTP%E4%B8%93%E9%A2%98/method.html
Accept-Encoding: gzip, deflate

<entity-body>
```
### 相应报文
```
<version><status><reason-phrase>
HTTP/1.1 200 OK

<headers>
Date: Fri, 14 Jun 2019 19:57:40 GMT
Content-Type: text/html
Content-Length: 37788
Connection: keep-alive
Server: nginx/1.6.2
Last-Modified: Thu, 13 Jun 2019 11:20:09 GMT
ETag: "32f55-58b32b67d3f75-gzip"
Vary: Accept-Encoding
Content-Encoding: gzip
Cache-Control: max-age=600, public, must-revalidate
X-Edge-Location: hnd
X-ORCA-Accelerator: EXPIRED from k09.mul.hnd01.jp.krill.zenlogic.net
X-Cache: EXPIRED from k09.mul.hnd01.jp.krill.zenlogic.net


<entity-body>
```

## me
http是超文本传输协议，类似一种协议在服务器和客户端之间进行传输协议。
这个内容就是有一些可选的数据和描述内容的含义和内容的一些格式规范

报文有请求报文和相应报文
--------------------
请求报文：
 - 方法
 - 请求的url
 - 协议的版本

 header。可以接受的方式，客户端的user-agent等等

相应报文：
 - 版本
 - 相应的状态码
 - 响应的内容

 headers：
  - 缓存的处理方式
  - 内容的压缩方式
  - 内容的编码方式

