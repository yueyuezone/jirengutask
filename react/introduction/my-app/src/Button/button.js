import React from 'react'
import './button.css'
export default class Button extends React.Component{
    constructor(){
        super()
        this.state={
            active:false,
            diffX:0,
            diffY:0
        }
        this.myRef = React.createRef();
    }
    addRipple(e){
        e.persist();
        let {clientX,clientY} = e
        let {left,top} = this.myRef.current.getBoundingClientRect()
        console.log();
        
        this.setState({
            active:true,
            diffX:clientX-left-5,
            diffY:clientY-top-5
        })

        
    }
    render(){
        let {active,diffX,diffY} = this.state
        return (
            <button ref={this.myRef} className="ui-button" onClick={this.addRipple.bind(this)} onAnimationEnd={()=>this.setState({
                active:false
            })}>
                <span>{this.props.children}</span>
                {!active||<i style={{left:diffX,top:diffY}} className="ripple-btn"></i>}
                
            </button>
        )
    }
}