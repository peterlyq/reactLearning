import React, { Component } from 'react'
import Newbie from "./Newbie";
import Todo from "./Todo"

export default class Text extends Component {
    constructor(props){         
        super(props)
        this.state = {
            txt:"I'm a rookie here",
            list:[]
        }
    }
    componentDidMount(){
    }
    
    componentDidCatch(){
    }
    add(p){
        this.state.list.
        this.setState({
            list:[p,...this.state.list]
        },()=>{
            console.log(this.state.list)
        })   
    }
    render() {
        return (
            <div>
                <Todo />
                 <Newbie />
            </div>
        )
    }
}
