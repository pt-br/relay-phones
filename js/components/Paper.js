import React, { Component } from 'react';
import Relay from 'react-relay';

// import AddMessageMutation from '../mutations/AddMessageMutation';

export default class Paper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mutationResult: '',
    };
  }

  addMessage = () => {
    const { addMessageInput } = this.refs;
    const { user } = this.props;

    const text = addMessageInput.value;
  };

  render() {
    const { newMessageText } = this.state;
    return (
      <div>
        <h1>Insert a Message</h1>
        <input ref='addMessageInput' type="text"/>
        <button type="button" onClick={() => this.addMessage()}>Insert</button>
      </div>
    );
  }
}
