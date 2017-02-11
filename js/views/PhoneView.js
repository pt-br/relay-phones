import React, { Component } from 'react';
import Relay from 'react-relay';

import TypedTransition from '../core/TypedTransition';

import Title from '../components/Title';
import PhoneList from '../components/PhoneList';
import AddModal from '../components/AddModal';

import AddPhoneMutation from '../mutations/AddPhoneMutation';
import RemovePhoneMutation from '../mutations/RemovePhoneMutation';

class PhoneView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  handleModal = (modalVisible) => {
    this.setState({
      modalVisible,
    });
  };

  renderModal() {
    const { modalVisible } = this.state;
    const { viewer } = this.props;

    if (!modalVisible) {
      return null;
    }

    return (
      <AddModal viewer={viewer} handleModal={this.handleModal}/>
    );
  }

  render() {
    const { viewer } = this.props;

    return (
      <div>
        {this.renderModal()}
        <div style={Style.container}>
          <div style={Style.innerContainer}>
            <Title text="Relay Phones - Demo Application" />
            <PhoneList viewer={viewer} handleModal={this.handleModal}/>
          </div>
        </div>
      </div>
    );
  }
}

const Style = {
  container: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export function path() {
  return '/phone';
}

PhoneView.contextTypes = TypedTransition.contextTypes();

export default Relay.createContainer(PhoneView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${AddPhoneMutation.getFragment('viewer')}
        ${RemovePhoneMutation.getFragment('viewer')}
        phones(first: 908098879) {
          edges {
            node {
              phoneId
              model
              image
            },
          },
        },
      }
    `,
  },
});
