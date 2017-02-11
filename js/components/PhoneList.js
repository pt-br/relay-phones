import React, { Component } from 'react';

import Phone from './Phone';
import AddPhone from './AddPhone';

export default class PhoneList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { viewer, handleModal } = this.props;
    const { edges } = viewer.phones;

    return (
      <div style={Style.container}>
        {edges.map(edge => {
          const { phoneId, model, image } = edge.node;
          return (
            <Phone key={phoneId} phoneId={phoneId} model={model} image={image} />
          );
        })}
        <AddPhone handleModal={handleModal}/>
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
    flexWrap: 'wrap',
  },
};

PhoneList.propTypes = {
  viewer: React.PropTypes.object,
  handleModal: React.PropTypes.func,
};
