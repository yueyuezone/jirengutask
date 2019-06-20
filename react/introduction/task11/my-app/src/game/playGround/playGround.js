import React,{Component} from 'react'
import Rabbit from './rabbit'
import Tortoise from './tortoise'
import './playground.css'
class Playground extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="playground">
                <Rabbit runTime={this.props.rabbitTime}/>
                <hr/>
                <Tortoise runTime={this.props.tortoiseTime}/>
            </div>
        )
        
    }
}
export default Playground