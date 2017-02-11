import React, { Component } from 'react';

import Phone from './Phone';
import AddPhone from './AddPhone';

export default class PhoneList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { viewer } = this.props;
    const { edges } = viewer.phones;
    return (
      <div style={Style.container}>
        {edges.map(edge => {
          const { id, model, image } = edge.node;
          return (
            <Phone key={id} id={id} model={model} image={image} />
          );
        })}
        <AddPhone />
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
};
