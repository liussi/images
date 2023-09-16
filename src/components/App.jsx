
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
    currentPage: 1,
    imageGallery: [],
  };
  
  getApp = (imageName, currentPage)=> {
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

  handlePageUpdate = () => {
    this.setState(prevState => ({
currentPage: prevState.currentPage + 1
    }))
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
          getApp={this.getApp}
          currentPage={this.state.currentPage}
          onPageUpdate={this.handlePageUpdate}
        />
      </div>
    );
  }
}

