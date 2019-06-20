import React,{Component} from 'react'
class Rabbit extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){
        return(
            <div>
                <p>
                兔子
                </p>
                <span>{this.props.time?`${this.props.time/1000}s`:'未完成'}</span>
            </div>
        )
        
    }
}
export default Rabbit