import React ,{Component}from 'react';
import './App.css';
import Playground from './game/playGround/playGround'
import Rabbit from './game/Time/rabbit'
import Tortoise from './game/Time/tortoise'
class App extends Component{
  constructor(){
    super()
    this.state={
      beginTime:new Date(),
      rabbitTime:null,
      tortoiseTime:null
    }
  }
  rabbitTime(){
    this.setState({
      rabbitTime:(new Date())-this.state.beginTime
    })
  }
  tortoiseTime(){
    this.setState({
      tortoiseTime:(new Date())-this.state.beginTime
    })
  }
  render(){
    return (
      <div className="App">
        <div className="timekeep">
          <Rabbit time={this.state.rabbitTime}/>
          <div>时间</div>
          <Tortoise time={this.state.tortoiseTime}/>
        </div>
        <Playground rabbitTime={this.rabbitTime.bind(this)} tortoiseTime={this.tortoiseTime.bind(this)}/>
      </div>
    );
  }
}

export default App;
