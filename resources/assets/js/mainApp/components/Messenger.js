import React, { Component } from "react";
import axios from 'axios';
import IndividualFriend from './IndividualFriend';
import Chat from './Chat';
import socket from '../common/socket';

export default class Messenger extends Component {

  state = {
    loaded: false,
    friends: [],
    chats: [],
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.close();
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.props.loading) {
      socket.connect();
      this.subscription = socket.subscribe(`user_chat:${this.props.userId}`, this.onNewChat);
      this.setState({ loaded: true });
      this.fetchFriends();
      this.fetchChats();
    }
  }

  fetchFriends = () => {
    axios.get('/api/friends/allmyFriends').then(response => {
      this.setState({
        friends: response.data.showallMyFriends,
      });
    });
  }

  fetchChats = () => {
    axios.get(`/api/chats/${this.props.userId}`).then(response => {
      this.setState({
        chats: response.data,
      });
    });
  }

  onNewChat = chat => {
    this.setState(prevState => ({
      chats: [...prevState.chats, { chat_id: chat.data }]
    }));
  };

  openChat = (friend) => {
    axios.post(`/api/chat/`, {
      members: [
        this.props.userId,
        friend.friend_id,
      ]
    });
  }

  closeChat = (chat) => {
    this.setState(previous => {
      const chats = JSON.parse(JSON.stringify(previous.chats));
      const match = chats.find(candidate => candidate.contact === chat.contact);
      const index = chats.indexOf(match);
      if (index !== -1) chats.splice(index, 1);
      return { chats }
    });
  }

  renderFriend = (friend) => {
    return (
      <div
        key={friend.id}
        className="messenger-contact"
        onClick={() => this.openChat(friend)}
      >
        <IndividualFriend friend={friend} />
      </div>
    );
  }

  renderChats = () => {
    return (
      <div className="messenger-chat-bar">
        {this.state.chats.map(chat => (
          <Chat
            userId={this.props.userId}
            chatId={chat.chat_id}
            onClose={() => this.closeChat(chat)}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <section id="messenger">
        {this.renderChats()}
        <div className="messenger-header">
          <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Chat.png" />
        </div>
        <div className="messenger-body">
          {this.state.friends.map(this.renderFriend)}
        </div>
      </section>
    );
  }

}
