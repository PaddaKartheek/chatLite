import React, { Component } from 'react'
import '../styles/Popup.css'

class Popup extends Component{
    constructor(props){
        super(props)
        this.state = {
            completeHistory: []
        }
    }
    closePopup = () => {
        this.props.setTrigger(false);
    }
    getData = async () => {
        const response = await fetch("http://localhost:4000/gethistory", {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: this.props.userEmail
            })
        })
        const resJson = await response.json();
        const dynamicElements = []
        for(let i=0;i<resJson.data.length;i++){
            dynamicElements.push(<div key={`q${i}`}>Q: {resJson.data[i].question}</div>)
            dynamicElements.push(<div key={`a${i}`}>A: {resJson.data[i].answer}</div>)
        }
        this.setState({completeHistory: dynamicElements})
        return true;
    }
    render(){
        return (this.props.trigger && this.getData()) ? (
                <div className='popup'>
            <div className='popup-inner'>
                <h1>History</h1>
                <div className='scrollHist'>
                {this.state.completeHistory}
                </div>
                <button className='btn btn-primary close-btn' onClick={this.closePopup}>Close</button>
            </div>
            </div>
            ):"";
    }
}

export default Popup