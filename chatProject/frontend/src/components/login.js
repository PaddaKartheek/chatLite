import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'

class Login extends Component
{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        const response = await fetch('http://localhost:4000/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password,
            })
        })
        const data = await response.json();

        if(data.user){
            localStorage.setItem('token', data.user)
            alert('login Successful');
            const obj = jwt_decode(data.user)
            if(obj.utype === 'user')
                this.props.navigate("/user")
            else 
                this.props.navigate("/admin")
        }else {
			alert('Please check your username and password')
		}
    };
    render(){
        return(
            <div className='parent'>
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh'}}>
                <div className='text-center innerdiv'>
                    <h3 className='text-light'>Login</h3><br/>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' name='email' placeholder='Email' onChange={this.handleInputChange} required/><br/><br/>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleInputChange} required/><br/><br/>
                    <button className='btn btn-primary' type='submit'>Login</button><br/>
                </form>
                <br/>
                <Link to='/register' className='custom-link'>New User?</Link>
                </div>
            </div>
            </div>
        );
    }
}

export function LogWithRouter(props){
    const navigate = useNavigate();
    return <Login navigate={navigate}></Login>
}

export default Login