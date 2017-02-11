import React, { Component } from 'react';
import Relay from 'react-relay';
import { Alert, Modal, Form, FormGroup, FieldGroup, Col, Button } from 'react-bootstrap';

import AddPhoneMutation from '../mutations/AddPhoneMutation';

export default class AddModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  close = () => {
    const { handleModal } = this.props;

    handleModal(false);
  };

  addPhone = () => {
    const { viewer } = this.props;
    const { phoneModelInput, phoneImageInput } = this.refs;

    Relay.Store.commitUpdate(
      new AddPhoneMutation({
        viewer,
        phoneModel: phoneModelInput.value,
        phoneImage: phoneImageInput.value,
      }),
      {
        onFailure: (transaction) => {
          this.setState({
            error: 'Something went wrong, please try again.',
          });
        },
        onSuccess: (response) => {
          this.close();
        },
      },
    );
  };

  renderError() {
    const { error } = this.state;

    if (!error) {
      return null;
    }

    return (
      <Alert bsStyle="danger">
        {error}
      </Alert>
    );
  }

  render() {
    /**
     * Not going to use <FormControl> bc I want my inputs to be
     * uncontrollable components.
     */
    return (
      <Modal.Dialog style={Style.container}>
        <Modal.Header closeButton onClick={this.close}>
          <Modal.Title>Add a Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.renderError()}
        <Form horizontal>
          <FormGroup controlId="phoneModelControl">
           <Col sm={12}>
             <input className="form-control" ref="phoneModelInput" type="text" placeholder="Phone Model" />
           </Col>
          </FormGroup>
          <FormGroup controlId="phoneImageControl">
           <Col sm={12}>
             <input className="form-control" ref="phoneImageInput" type="text" placeholder="Phone Image" />
           </Col>
          </FormGroup>
          <FormGroup>
           <Col sm={12}>
             <Button
               style={Style.addButton}
               type="button"
               onClick={() => this.addPhone()}
              >
               Add
             </Button>
           </Col>
          </FormGroup>
       </Form>
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}

const Style = {
  container: {
    backgroundColor: 'rgba(47, 46, 46, 0.71)',
  },
  addButton: {
    float: 'right',
  },
};

AddModal.propTypes = {
  viewer: React.PropTypes.object,
  handleModal: React.PropTypes.func,
};