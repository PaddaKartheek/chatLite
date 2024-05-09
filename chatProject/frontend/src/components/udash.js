import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import '../index.css'
import Popup from './popup'
import chatGptImage from './chatgpt.png'
import userImage from './user.png'

class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            userName: "",
            data: null,
            chat: [],
            count: 0,
            his_pop: false,
        }
    }
    fetchData = async()=>{
        const response = await fetch("http://localhost:4000/questions")
        const data = await response.json();
        this.setState({data: data})
    }
    componentDidMount(){
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt_decode(token);
            if(!user){
                localStorage.removeItem('token');
                this.props.navigate("/");
            }else{
                this.setState({email:user.email, userName:user.name});
                this.fetchData();
            }
        }
    }
    
    showAnswers = async (event)=>{
        if(localStorage.getItem('token') === null){
            this.props.navigate("/")
            return;
        }
        const index = parseInt(event.target.id)
        console.log(this.state.count);
        const newElement = (
            <div key={this.state.count}>
                <div className="d-flex align-items-center">
                    <img src={userImage} alt="Question Icon" className="mr-2" />
                    <div className='text-light question'>{this.state.data[index].question}</div>
                </div>
                <div className="d-flex align-items-center answer">
                    <img src={chatGptImage} alt="Answer Icon" className="mr-2" />
                    <div className='text-light'>{this.state.data[index].answer}</div>
                </div>
            </div>
        );
        const response = await fetch("http://localhost:4000/history", {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                question: this.state.data[index].question,
                answer: this.state.data[index].answer
            })
        })
        if(response.status === 200){
            this.setState({chat: [...this.state.chat, newElement], count: this.state.count+1})
        }
    }
    setPopup = (show) => {
        if(localStorage.getItem('token') === null){
            this.props.navigate("/")
            return;
        }
        this.setState({his_pop: show})
    }
    clearConv = () => {
        if(localStorage.getItem('token') === null){
            this.props.navigate("/")
            return;
        }
        // await fetch("http://localhost:4000/clearHistory", {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json', 
        //     },
        //     body: JSON.stringify({
        //         email : this.state.email
        //     })
        // })
        this.setState({chat: []})
    }
    logOut = ()=>{
         localStorage.removeItem("token");
         this.props.navigate("/");
    }
    render(){
        const dynamicElements = this.state.data ? this.state.data.map((item, index) => {
            return <div className='col-md-4 mb-3' key={index}><button className="btn btn-dark w-100" id={index} key={index} onClick={this.showAnswers}>{item.question}</button></div>;
        }) : [];
        return (
            <div className='parent'>
                <div className='userDash'>
                <p className='text-light'>Welcome, {this.state.userName}</p>
                <div className='chatArea'>
                    {this.state.chat}
                </div>
                <div className='container'>
                    <div id="qa" className='questionArea'>
                        <div className='row'>
                            {dynamicElements}
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary logout-btn' onClick={this.logOut}>Log Out</button>
                <button className='btn btn-primary his-btn' onClick={this.setPopup.bind(null, true)}>History</button>
                <button className='btn btn-primary clear-btn' onClick={this.clearConv}>Clear</button>
                <Popup trigger={this.state.his_pop} userEmail={this.state.email} setTrigger={this.setPopup}/>
            </div>
            </div>
        )
    }

}

export function UserWithRouter(props){
    const navigate = useNavigate();
    return (<User navigate={navigate}></User>);
}

export default User