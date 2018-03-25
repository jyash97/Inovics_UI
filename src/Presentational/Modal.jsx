import React from 'react';
import ReactModal from 'react-modal';

import './styles/formStyle.css';

class Modal extends React.Component {
  render() {
    return (
      <ReactModal
        className="Modal"
        ariaHideApp={false}
        overlayClassName="Overlay"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleModal}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;
