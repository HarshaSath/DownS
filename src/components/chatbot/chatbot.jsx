import React, { Component } from 'react';
import axios from 'axios';
import './chatbot.css';
import { FaComments } from 'react-icons/fa';

class CustomChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      messages: [],
      newMessage: '',
    };
  }

  toggleChat = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleNewMessageChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleNewUserMessage = () => {
    this.sendMessage(this.state.newMessage);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage(this.state.newMessage);
    }
  };

  sendMessage = (newMessage) => {
    if (newMessage.trim() === '') {
      return; // Don't send empty messages
    }

    const msgRequest = {
      msg: newMessage,
    };

    axios
      .post('https://asia-south1-downs-402315.cloudfunctions.net/downs', msgRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const response = res.data.msg;
        this.setState((prevState) => ({
          messages: [...prevState.messages, { text: newMessage, type: 'user' }, { text: response, type: 'bot' }],
        }));
        this.setState({ newMessage: '' }); // Clear the input field
      })
      .catch((error) => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, { text: 'Network ERR! Chatbot server is not running.', type: 'bot' }],
        }));
        this.setState({ newMessage: '' }); // Clear the input field
      });
  };

  render() {
    return (
      <div className="custom-chat">
        <div className={`widget-icon ${this.state.isOpen ? 'hidden' : ''}`} onClick={this.toggleChat}>
          <FaComments 
            style={{ height: 50, width: 50, fill:'#00b073' }}
          />
        </div>
        {this.state.isOpen && (
          <div className="chat-interface">
            <div className="chat-header">
              <span>Chat with AI Assistant</span>
              <button onClick={this.toggleChat}>&times;</button>
            </div>
            <div className="chat-messages">
              {this.state.messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={this.state.newMessage}
                onChange={this.handleNewMessageChange}
                onKeyPress={this.handleKeyPress} 
              />
              <button onClick={this.handleNewUserMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CustomChat;






// 'use client'
// import "./chatbot.css"
// import React, { Component } from 'react';
// import {addResponseMessage, Widget} from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';
// import axios from "axios";

// class ChatBot extends Component {

//     componentDidMount(){
//         addResponseMessage('Hello I am here to help you. Ask me anything.');
//     }


//     handleNewUserMessage = (newMessage) => {

//         var respone;

//         console.log(`New message incoming! ${newMessage}`);

//         const msgRq = {
//             msg : newMessage
//         }

//         // Send the message to your backend API
//         axios.post("https://asia-south1-downs-402315.cloudfunctions.net/downs",msgRq,{headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//             .then((res)=> {
//                 respone = res.data.msg;
//                 console.log(respone);
//                 addResponseMessage(respone);
//             })
//             .catch((error)=> {
//                 console.log(error.msg);
//                 addResponseMessage("Network ERR! Chatbot server is not Running.");
//             })
//         // Set Response

//     };

//     render() {
//         return (
//             <div>
//                 <Widget handleNewUserMessage={this.handleNewUserMessage} title={"Downsyndrome Helper"} subtitle={"Welcome to AI Assistant"}/>
//             </div>
//         );
//     }
// }

// export default ChatBot;