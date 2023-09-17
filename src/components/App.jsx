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
    imageGallery: [],
    totalHits: null,
    status: 'idle',
  };

  getApp = () => {
    const KEY = '38529296-de6c3fac31b2614a8135b6c10';
    const { perPage, imageName, currentPage } = this.state;
    console.log(this.state.perPage);

    return fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          toast.promise({
            error: `There are no such photos for the request: ${imageName}`,
          })
        );
      })
      .then(data => {
        const hits = data.hits;
        const totalHits = data.totalHits;
        return { hits, totalHits };
      });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.fetchLoad();
    }
    if (
      prevState.currentPage !== this.state.currentPage &&
      this.state.currentPage > 1
    ) {
      this.loadMoreImages();
    }
  }

  fetchLoad = () => {
    const { imageName, currentPage } = this.state;
    const { getApp } = this;
    console.log('Current Page in fetchLoad:', currentPage);
    this.setState({ status: 'pedding' });

    getApp(imageName, currentPage)
      .then(({ hits, totalHits }) =>
        this.setState({
          imageGallery: hits,
          totalHits: totalHits,
          status: 'resolved',
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  loadMoreImages = () => {
    const { imageName, currentPage } = this.state;
    const { getApp } = this;
    console.log('Current Page in loadMoreImages:', currentPage);
    this.setState({ status: 'pedding' });

    getApp(imageName, currentPage)
      .then(response => {
        this.setState(prevState => ({
          imageGallery: [...prevState.imageGallery, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handlePageUpdate = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  hendleFormSubmit = ({ imageName }) => {
    this.setState({ imageName });
  };

  onPageReset = () => {
    this.setState({ currentPage: 1 });
  };

  render() {
    return (
      <GlobalStyles>
        <AppContainer>
          <Searchbar
            onSubmit={this.hendleFormSubmit}
            imageName={this.state.imageName}
            onPageReset={this.onPageReset}
          />
          <ImageGallery
            currentPage={this.state.currentPage}
            onPageUpdate={this.handlePageUpdate}
            perPage={this.state.perPage}
            imageGallery={this.state.imageGallery}
            totalHits={this.state.totalHits}
            status={this.state.status}
          />
        </AppContainer>
        <ToastContainer autoClose={3000} theme="colored" />
      </GlobalStyles>
    );
  }
}
