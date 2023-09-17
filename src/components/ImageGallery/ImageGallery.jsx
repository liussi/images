import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import React, { Component } from 'react'
import Button from 'components/Button/Button';
import Modal from '../Modal/Modal';
import ImageGalleryContainer from './ImageGallery.styled'
 import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    selectedImage: null,
    isOpenModal: false,
   
  };

  openModal = largeImageURL => {
    this.setState({ isOpenModal: true, selectedImage: largeImageURL });
  };

  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const {  isOpenModal, selectedImage } = this.state;
    const { imageGallery, currentPage, perPage, totalHits, status } = this.props;

    const allPage = totalHits / perPage;

    if (status === 'pedding') {
      return <Loader />;
    }

    if (status === 'rejected') {
      toast.error('ERROR😲');
      return;
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
          {currentPage <= allPage &&
            imageGallery &&
            imageGallery.length > 0 && (
              <Button onPageUpdate={this.props.onPageUpdate} />
            )}

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

