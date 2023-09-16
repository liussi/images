
  import React, { Component } from 'react'
  import '../styles.css'

export default class Modal extends Component {
  componentDidUpdate() {
    window.addEventListener('keydown', this.hendleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleEsc);
  }
  hendleEsc = e => {
    if (e.code === 'Escape') {
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
    console.log('image in Modal:', image);
    return (
      <div className="overlay" onClick={this.hendleBackdrop}>
        <div className="modal">
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}
  




