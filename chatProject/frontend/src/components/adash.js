import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            adminName: "",
            nuq: "",
            nua: "",
        }
    }
    componentDidMount(){
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt_decode(token);
            if(!user){
                localStorage.removeItem('token');
                this.props.navigate("/");
            }else{
                this.setState({adminName:user.name});
            }
        }
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    logOut = ()=>{
         localStorage.removeItem("token");
         this.props.navigate("/");
    }
    handleSubmit = async (event) => {
        if(localStorage.getItem('token') === null){
            this.props.navigate("/")
            return;
        }
        event.preventDefault();
        const {nuq, nua} = this.state
        const response = await fetch("http://localhost:4000/updateqna",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nuq,
                nua
            })
        })
        if(response.status === 200)
            alert("Success");
        else   
            alert("error")
    }
    render(){
        return (
            <div className='parent'>
                <p className='text-light'>Welcome, {this.state.adminName}</p>
                <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh'}}>
                    <div className='text-center innerdiv'>
                        <h2 className='text-light'>Admin Panel</h2><br/>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' id='nuq' name='nuq' placeholder='Question' onChange={this.handleInputChange} required/>
                            <br/><br/>
                            <textarea rows="4" cols="50" id='nua' name='nua' onChange={this.handleInputChange} required></textarea>
                            <br/><br/><button className='btn btn-primary' type='submit'>Submit</button>
                        </form>
                        <button className='btn btn-primary logout-btn'onClick={this.logOut}>Log Out</button>
                    </div>
                
                </div>
                
            </div>
        )
    }
}

export function AdminWithRouter(props){
    const navigate = useNavigate();
    return <Admin navigate={navigate}></Admin>
}

export default Admin