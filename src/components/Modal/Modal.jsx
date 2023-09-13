export default function Modal({ imageGallery }) {
  console.log('модалка:', imageGallery);
  return (
    <div className="overlay" >
      <div className="modal">
        <img src={imageGallery.largeImageURL} alt={imageGallery.tags} />
      </div>
    </div>
  );
}

// import React, { Component } from 'react'

// export default class Modal extends Component {
//   state = {};

//   componentDidUpdate() {
//     window.addEventListener('keydown', this.hendleEsc);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.hendleEsc);
//   }
//   hendleEsc = e => {
//     if (e.code === 'Escape') this.props.closeModal();
//   };
 
//   render() {
//     return (
//       <div>
//         <button onClick={this.openModal}>модалка</button>
//       </div>
//     );
//   }
// }
