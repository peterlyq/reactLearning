import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            str:"大司马的皮燕子",
            id:''
        }
    }
    componentDidMount(){
       PubSub.subscribe('modify',this.modify.bind(this))
    }
    addList(e){
        if(e.keyCode === 13){
            if(e.target.value !== ""){
                PubSub.publish("add",e.target.value)
                e.target.value = ""
            }
        }
    }
    modify(evt,data){
        axios.get("http://localhost:4000/list/"+data).then(res=>{
            console.log(res)
            this.setState({
                str:res.data.title,
                id:res.data.id
            })
        })
    }
    change(e){
        this.setState({
            str:e.target.value
        })
    }
    search(){
        PubSub.publish("search",this.state.str)
    }
    modifyFinished(id){
        console.log(id)
        axios.patch("http://localhost:4000/list/"+id,{
            title:this.state.str
        },{
            headers:{
                "Content-type":"application/json"
            }
        }).then(()=>{
            PubSub.publish("getData")
        })
        this.setState({
            id:'',
            str:""
        })
    }
    render() {
        return (
            <div>
                <input  value={this.state.str} onChange={this.change.bind(this)} onKeyUp={this.addList.bind(this)}/>
                <button onClick={this.search.bind(this)}>查询</button>
                <button onClick={this.modifyFinished.bind(this,this.state.id)}>保存</button>
            </div>
        )
    }
}

