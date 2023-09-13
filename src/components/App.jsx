// import { Component } from "react"
// import Searchbar from './Searchbar/Searchbar'
// import ImageGallery from './ImageGallery/ImageGallery'
// import Button from "./Button/Button";


// export class App extends Component {
//   state = {
//     imageName: '',
//     currentPage: 1,
//   };

//   App(imageName) {
//     const KEY = '38529296-de6c3fac31b2614a8135b6c10';
//     // const currentPage = 1;

//     return fetch(
//       `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     ).then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       return Promise.reject(
//         new Error(`Таких фото немає${this.state.imageName}`)
//       );
//     });
//   }
//   hendleFormSubmit = imageName => {
//     if (imageName.trim() === '') {
//       return;
//     }
//     this.setState({ imageName });
//   };
//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.hendleFormSubmit} />
//         <ImageGallery imageName={this.state.imageName} App={this.App} />
//         <Button
//           imageName={this.state.imageName}
//           currentPage={this.state.page}
//           App={this.App}
//         />
//       </div>
//     );
//   }
// }
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    currentPage: 1,
    imageGallery: null,
  };

  App(imageName, currentPage) {
    const KEY = '38529296-de6c3fac31b2614a8135b6c10';

    console.log('currentPage:', currentPage);
    return fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Таких фото немає для запиту: ${imageName}`)
      );
    });
  }
  handlePageUpdate = newPage => {
    this.setState({ currentPage: newPage });
  };
  

  hendleFormSubmit = imageName => {
    if (imageName.trim() === '') {
      return;
    }

    this.setState({ imageName });
  };

 
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          App={this.App}
          currentPage={this.state.currentPage}
          onPageUpdate={this.handlePageUpdate}
        />
       
      </div>
    );
  }
}

