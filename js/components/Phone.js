import React, { Component } from 'react';
import Relay from 'react-relay';

import RemovePhoneMutation from '../mutations/RemovePhoneMutation';

export default class Phone extends Component {

  constructor(props) {
    super(props);
  }

  removePhone = (phoneId) => {
    const { viewer } = this.props;

    Relay.Store.commitUpdate(
      new RemovePhoneMutation({
        viewer,
        phoneId,
      }),
    );
  };

  editPhone = (phoneId, model) => {
    const { handleEditModal } = this.props;
    handleEditModal(true, phoneId, model);
  };

  render() {
    const { phoneId, model, image } = this.props;

    return (
      <div style={Style.container}>
        <div style={Style.removePhone} onClick={() => this.removePhone(phoneId)}>X</div>
        <div onClick={() => this.editPhone(phoneId, model)}>
          <div>
            <img style={Style.phoneImage} src={image} />
          </div>
          <div style={Style.phoneModel}>Model: {model}</div>
        </div>
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
  removePhone: {
    position: 'absolute',
    right: '8px',
    color: '#cc3030',
    top: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

Phone.propTypes = {
  viewer: React.PropTypes.object,
  phoneId: React.PropTypes.string,
  model: React.PropTypes.string,
  image: React.PropTypes.string,
  handleEditModal: React.PropTypes.func,
};
