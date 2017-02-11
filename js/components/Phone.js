import React, { Component } from 'react';

export default class Phone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { id, model, image } = this.props;

    return (
      <div id={id} style={Style.container}>
        <div>
          <img style={Style.phoneImage} src={image} />
        </div>
        <div style={Style.phoneModel}>{model}</div>
      </div>
    );
  }
}

const Style = {
  container: {
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.25)',
    width: '180px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    margin: '10px 6px',
    boxSizing: 'border-box',
    backfaceVisibility: 'hidden',
    height: '200px',
    position: 'relative',
  },
  phoneImage: {
    position: 'relative',
    width: '90px',
    margin: 'auto',
    display: 'block',
  },
  phoneModel: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '5px',
    margin: 'auto',
    display: 'block',
    left: '0',
    right: '0',
  },
};

Phone.propTypes = {
  id: React.PropTypes.string,
  model: React.PropTypes.string,
  image: React.PropTypes.string,
};
