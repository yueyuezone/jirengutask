import React,{Component} from 'react'
import Box from './box'
import {mContext} from './context'
import './style.css'
export class App extends Component{
    constructor(){
        super()
        this.state = {
            theme:{
                color : 'red',
                toggleColor:this.toggleColor
            }
        }
    }
    toggleColor=()=>{
        this.setState({
            theme:{
                ...this.state.theme,
                color:'blue'
            }
        })
    }
    render(){
        return (
            <mContext.Provider value={this.state.theme}>
                <Box>
                </Box>
            </mContext.Provider>
        )
    }
}