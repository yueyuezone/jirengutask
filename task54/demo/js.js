class VNode {
    constructor(tag,children,text){
        this.tag = tag
        this.children = children||[]
        this.text = text
    }
    render(){
        let el = document.createElement(this.tag)
        if(this.text){
            el.appendChild(document.createTextNode(this.text))
        }
        if(this.children&&this.children.length>0){
            this.children.forEach(c=>{
                el.appendChild(c.render())
                c.render()
            })

        }
        return el
    }
}
function h(tag,children=[],text){
    if(typeof children=='string'){
        text=children
        children=[]
    }
    return new VNode(tag,children,text)
}
let vnode1 = h('div',[
    h('p',[h('i','再一次测试')]),h('span','测试')
])
let vnode2 = h('div',[
    h('p',[h('i','再一次测试'),h('em','children')]),h('span','测试222'),h('p','lklklkl')
])
function dispatchElement(parent,newVNode,oldVNode,index=0){
    if(!oldVNode||oldVNode.length==0){
        parent.appendChild(newVNode.render())
    } else if(!newVNode||newVNode.length==0){
        parent.removeChild(parent.childNodes[index])
    } else if(newVNode.tag!==oldVNode.tag||newVNode.text!==oldVNode.text){
        parent.replaceChild(newVNode.render(),parent.childNodes[index])
    } else {
        for (let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
            dispatchElement(parent.childNodes[index],newVNode.children[i],oldVNode.children[i],i)
        }
    }
}
let root = document.querySelector('#app')
dispatchElement(root,vnode1)
document.querySelector('button').addEventListener('click',e=>{
    dispatchElement(root,vnode2,vnode1)
})
//root.appendChild(vnode.render())
