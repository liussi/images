import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import React, { Component } from 'react'
import Button from 'components/Button/Button';
import Modal from '../Modal/Modal';
import ImageGalleryContainer from './ImageGallery.styled'
 import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    imageGallery: [],
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

     this.setState({ status: 'pedding' });

    getApp(imageName, currentPage)
      .then(response =>
        this.setState({
          imageGallery: response.hits,
          status: 'resolved',
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }))
  };

  loadMoreImages = () => {
    
    const { imageName, currentPage, getApp } = this.props;

     this.setState({ status: 'pedding' });

    getApp(imageName, currentPage)
      .then(response => {
        this.setState(prevState => ({
          imageGallery: [...prevState.imageGallery, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
  };

  openModal = largeImageURL => {
    this.setState({ isOpenModal: true, selectedImage: largeImageURL });
  };
  
  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const { status, imageGallery, isOpenModal, selectedImage, currentPage } =
      this.state;
    const { perPage } = this.props;

    if (status === 'pedding') {
      return <Loader />;
    }
    
    if (status === 'rejected') {
      toast.error('ERROR😲');
      return ;
    }
    
    if (status === 'resolved') {
      return (
        <div>
          <ImageGalleryContainer>
            {imageGallery.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onClick={() => this.openModal(item.largeImageURL)}
              />
            ))}
          </ImageGalleryContainer>
          {imageGallery.length > 0 &&
            imageGallery.length > perPage &&
            !currentPage && <Button onPageUpdate={this.props.onPageUpdate} />}
          {isOpenModal && (
            <Modal
              openModal={this.openModal}
              onClose={this.closeModal}
              image={selectedImage}
            />
          )}
        </div>
      );
    }
  }
}

