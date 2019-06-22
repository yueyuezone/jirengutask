import React from 'react'

class Button extends React.Component{
    render(){
        console.log(this.props);
        
        return(
            <div className={`box ${this.props.value.color}`}>
                <button onClick={this.props.value.toggleColor}>颜色</button>
            </div>
        )
    }
}
export default Button