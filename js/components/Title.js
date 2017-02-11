import React, { Component } from 'react';

export default class Title extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;
    return (
      <div style={Style.container}>
        <div style={Style.text}>{text}</div>
      </div>
    );
  }
}

const Style = {
  container: {

  },
  text: {
    fontSize: '22px',
  },
};

Title.propTypes = {
  text: React.PropTypes.string,
};
