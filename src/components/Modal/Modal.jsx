import React, { Component } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export default class Modal extends Component {
  componentDidUpdate() {
    window.addEventListener('keydown', this.hendleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleEsc);
  }
  hendleEsc = event => {
    console.log('Key pressed:', event.code); // Додайте цей рядок
    if (event.code === 'Escape') {
      this.props.closeModal();
      console.log('Escape');
    }
  };

  hendleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <Overlay  onClick={this.hendleBackdrop}>
        <ModalEl >
          <img src={image} alt="" />
        </ModalEl>
      </Overlay>
    );
  }
}
