
  import React, { Component } from 'react'
  
export default class Modal extends Component {

  componentDidUpdate() {
    window.addEventListener('keydown', this.hendleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleEsc);
  }
  hendleEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  render() {

    const {imageGallery} = this.props;
      return (
        <div className="overlay">
          <div className="modal">
            <img src={imageGallery} alt={imageGallery} />
          </div>
        </div>
      );

  }
}
  




