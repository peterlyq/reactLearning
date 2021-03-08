import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import axios from "axios"

export default class Newbie extends Component {
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        this.getData()
        PubSub.subscribe("add",this.add.bind(this))
        PubSub.subscribe("search",this.search.bind(this))
        PubSub.subscribe("getData",this.getData.bind(this))
    }
    search(evt,data){
        axios.get("http://localhost:4000/list",{
            params:{
                q:data
            }
        }).then(res=>{
            this.setState({
                list:res.data
            })
            console.log(res.data)
        })
    }
    addone(et,data){
        this.setState({
            list:[...this.state.list,{id:1,title:data}]
        })
        console.log(this.state.list)
    }
    add = (evt,data)=>{
        axios.post("http://localhost:4000/list",{'title':data},{
            headers:{
                "Content-type":"application/json"
            }
        }).then(()=>{
            this.getData()
        })
    }
    getData(){
        axios.get("http://localhost:4000/list").then(res=>{
            console.log(res)
            if(res.status == 200){
                this.setState({
                    list:res.data
                })
            }
        })
    }
    remove(p){
        axios.delete('http://localhost:4000/list/'+ p).then(()=>{
        this.getData();
        })
    }
    modify(id){
        PubSub.publish('modify',id)
    }
    render() {
    let list = this.state.list
        return (
            <div>
                <ul>
                    {list.map((item,index)=>{
                        return <li key={index}>{item.title}<button onClick={this.remove.bind(this,item.id)}>删除</button><button onClick={this.modify.bind(this,item.id)}>修改</button></li>
                    })}
                </ul>
            </div>
        )
    }
}
