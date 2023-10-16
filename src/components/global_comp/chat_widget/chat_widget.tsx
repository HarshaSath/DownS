"use client"

import React, { Component } from 'react';
import { Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "./chat_widget.css"


class ChatWidget extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to the chat!");
  }

  handleNewUserMessage = (newMessage) => {
    // Handle user messages here
    console.log(`New message incoming! ${newMessage}`);
  };

  render() {
    return (
      <Widget
        subtitle="Online"
        handleNewUserMessage={this.handleNewUserMessage}
        senderPlaceHolder="Type a message..."
      />
    );
  }
}

export default ChatWidget;
