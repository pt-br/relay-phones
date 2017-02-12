import React, { Component } from 'react';

export default class AddPhone extends Component {

  constructor(props) {
    super(props);
  }

  openAddModal = () => {
    const { handleModal } = this.props;
    handleModal(true);
  };

  render() {
    return (
      <div onClick={() => this.openAddModal()} style={Style.container}>
        <div style={Style.innerContainer}>
          <div style={Style.addPhone}>+</div>
        </div>
      </div>
    );
  }
}

const Style = {
  container: {
    border: 'dashed #d4d4d4',
    borderRadius: '3px',
    width: '180px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '0 6px',
    boxSizing: 'border-box',
    backfaceVisibility: 'hidden',
    height: '200px',
    position: 'relative',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhone: {
    fontSize: '60px',
    color: 'gray',
  },
};

AddPhone.propTypes = {
  handleModal: React.PropTypes.func,
};
