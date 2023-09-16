import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import React, { Component } from 'react'
import Button from 'components/Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    imageGallery: [],
    error: null,
    status: 'idle',
    selectedImage: null,
    isOpenModal: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageName !== this.props.imageName) {
      this.fetchLoad();
    }

    if (
      prevProps.currentPage !== this.props.currentPage &&
      this.props.currentPage > 1
    ) {
      this.loadMoreImages();
    }
  }

  fetchLoad = () => {
    const { getApp, imageName, currentPage } = this.props;

    getApp(imageName, currentPage)
      .then(response =>
        this.setState({
          imageGallery: response.hits,
          status: 'resolved',
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  };

  loadMoreImages = () => {
    console.log('imageGallery:', this.state.imageGallery);
    const { imageName, currentPage, getApp } = this.props;

    getApp(imageName, currentPage)
      .then(response => {
        this.setState(prevState => ({
          imageGallery: [...prevState.imageGallery, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  };

  openModal = largeImageURL => {
    this.setState({ isOpenModal: true, selectedImage: largeImageURL });
    console.log(largeImageURL);
  };
  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const { imageGallery, status, isOpenModal, selectedImage } = this.state;
    if (status === 'idle') {
      return <div>введіть імя або нотифікашка...</div>;
    }

    if (status === 'pedding') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>Помилка</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className="gallery">
            {imageGallery.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onClick={() => this.openModal(item.largeImageURL)}
              />
            ))}
          </ul>
          {
            <Button
              App={this.props.App}
              onPageUpdate={this.props.onPageUpdate}
              imageName={this.props.imageName}
            />
          }
          {isOpenModal && (
            <Modal
              imageGallery={this.state.imageGallery}
              openModal={this.openModal}
              closeModal={this.closeModal}
              loadMoreImages={this.loadMoreImages}
              image={selectedImage}
            />
          )}
        </div>
      );
    }
  }
}

