import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import {AppContainer ,GlobalStyles}  from './GlobalStyles.styled'
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    imageName: '',
    currentPage: 1,
    perPage: 12,
  };

  getApp = (imageName, currentPage, perPage) => {
    const KEY = '38529296-de6c3fac31b2614a8135b6c10';

    return fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        toast.promise({
          error: `There are no such photos for the request: ${imageName}`,
        })
      );
    });
  };

  handlePageUpdate = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  hendleFormSubmit = imageName => {
    if (imageName.trim() === '') {
      toast.error('ERROR😲 Enter a name!');
      return;
    }
    this.setState({ imageName });
  };

  render() {
    return (
      <GlobalStyles>
        <AppContainer>
          <Searchbar onSubmit={this.hendleFormSubmit} />
          <ImageGallery
            imageName={this.state.imageName}
            getApp={this.getApp}
            currentPage={this.state.currentPage}
            onPageUpdate={this.handlePageUpdate}
            perPage={this.state.perPage}
          />
        </AppContainer>
        <ToastContainer autoClose={3000} theme="colored" />
      </GlobalStyles>
    );
  }
}
