import React, { Component } from 'react';
import Relay from 'react-relay';

import TypedTransition from '../core/TypedTransition';

import Title from '../components/Title';
import PhoneList from '../components/PhoneList';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

import AddPhoneMutation from '../mutations/AddPhoneMutation';
import RemovePhoneMutation from '../mutations/RemovePhoneMutation';
import UpdatePhoneMutation from '../mutations/UpdatePhoneMutation';

class PhoneView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      editModalVisible: false,
      editingPhone: {
        phoneId: false,
        phoneModel: false,
      },
    };
  }

  handleModal = (modalVisible) => {
    this.setState({
      modalVisible,
    });
  };

  handleEditModal = (editModalVisible, phoneId, phoneModel) => {
    this.setState({
      editModalVisible,
      editingPhone: {
        phoneId,
        phoneModel,
      },
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

  renderEditModal() {
    const { editModalVisible, editingPhone } = this.state;
    const { viewer } = this.props;

    if (!editModalVisible) {
      return null;
    }

    return (
      <EditModal
        viewer={viewer}
        editingPhone={editingPhone}
        handleEditModal={this.handleEditModal}
      />
    );
  }

  render() {
    const { viewer } = this.props;

    return (
      <div>
        {this.renderModal()}
        {this.renderEditModal()}
        <div style={Style.container}>
          <div style={Style.innerContainer}>
            <Title text="Relay Phones - Demo Application" />
            <div style={Style.viewSource}>
              view <a target="_blank" href="https://github.com/pt-br/relay-phones">source</a>
            </div>
            <PhoneList
              viewer={viewer}
              handleModal={this.handleModal}
              handleEditModal={this.handleEditModal}
            />
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
        ${UpdatePhoneMutation.getFragment('viewer')}
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
