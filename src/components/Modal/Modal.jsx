import React, { Component } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.hendleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleEsc);
  }

  hendleEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <Overlay onClick={this.hendleBackdrop}>
        <ModalEl>
          <img src={image} alt="" width="100%" />
        </ModalEl>
      </Overlay>
    );
  }
}
