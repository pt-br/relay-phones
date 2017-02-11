import React, { Component } from 'react';
import Relay from 'react-relay';

import TypedTransition from '../core/TypedTransition';

import Title from '../components/Title';
import PhoneList from '../components/PhoneList';

class PhoneView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { viewer } = this.props;

    return (
      <div style={Style.container}>
        <div style={Style.innerContainer}>
          <Title text="Relay Phones - Demo Application" />
          <PhoneList viewer={viewer}/>
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
        phones(first: 908098879) {
          edges {
            node {
              id
              model
              image
            },
          },
        },
      }
    `,
  },
});
