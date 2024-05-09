import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


class Register extends Component
{
    constructor(props){
        super(props);
        this.state = {
            admin: false,
            user: true,
            name: '',
            email: '',
            password: '',
        }
    }
    toggle = (param1, param2)=>{
        this.setState({admin:param1, user:param2});
        // console.log(this.state.user, this.state.admin);
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const utype = (this.state.admin)?"admin":"user";
        const response = await fetch('http://localhost:4000/register',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password,
                utype,
            })
        })
        const data = await response.json();
        if(data.status === "ok"){
            this.props.navigate("/");
        }else{
            alert('Account with this email already exists')
        }
    };
    render(){
        return(
            <div className='parent'>
                <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh'}}>
                    <div className='text-center innerdiv'>
                        <button className={(this.state.user)?'btn btn-primary user-btn active':'btn btn-primary user-btn'} onClick={this.toggle.bind(null, false, true)}>User</button>
                        <button className={(this.state.admin)?'btn btn-primary admin-btn active':'btn btn-primary admin-btn'} onClick={this.toggle.bind(null, true, false)}>Admin</button><br/><br/>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' name='name' placeholder='Name' onChange={this.handleInputChange} required/><br/><br/>
                            <input type="email" name='email' placeholder="Email" onChange={this.handleInputChange} required/><br/><br/>
                            <input type="password" name='password' placeholder="Password" onChange={this.handleInputChange} required/><br/><br/>
                            <button type="submit" className='btn btn-primary'>Register</button><br/><br/>
                        </form>
                        <Link to="/" className='custom-link'>Already Have an account?</Link>
                    </div>
                
                </div>
            </div>
            
        );
    }
}

export function RegWithRouter(props){
    const navigate = useNavigate();
    return (<Register navigate={navigate}></Register>)
}

export default Register