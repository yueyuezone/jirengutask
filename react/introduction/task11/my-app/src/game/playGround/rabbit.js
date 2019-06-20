import React,{Component} from 'react'
class Rabbit extends Component{
    constructor(props){
        super(props)
        this.state={
            distance:0
        }
    }
    componentDidMount(){
        let distance = this.state.distance
        let timer=setInterval(()=>{
            this.setState({
                distance:distance+= 30
            })
            if(this.state.distance>=100){
                this.setState({
                    distance:100
                })
                clearInterval(timer)
                this.props.runTime()
            }
        },1000)
    }
    render(){
        return(
            <div className="rabbit_run" style={{transform: `translateX(${this.state.distance}%)`}}>
            兔子
            </div>
        )
        
    }
}
export default Rabbit
