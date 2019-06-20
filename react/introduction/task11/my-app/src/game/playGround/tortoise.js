import React, { Component } from 'react'
class Tortoise extends Component {
    constructor() {
        super()
        this.state={
            distance:0
        }
    }
    componentDidMount(){
        let distance = this.state.distance
        let timer=setInterval(()=>{
            
            this.setState({
                distance:distance+= 20
            })
            if(this.state.distance>=100){
                this.setState({
                    distance:100
                })
                clearInterval(timer)
                this.props.runTime(new Date())
            }
        },1000)
    }
    render() {
        return (
            <div  className="tortoise_run" style={{transform: `translateX(${this.state.distance}%)`}}>
                乌龟
            </div>
        )

    }
}
export default Tortoise