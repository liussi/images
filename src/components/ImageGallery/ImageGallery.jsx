import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import React, { Component } from 'react'
import Button from 'components/Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    imageGallery: null,
    error: null,
    status: 'idle',
    currentPage: 1,
    isOpenModal: false,
  };

  componentDidUpdate(prevProps, PrevState, App) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ status: 'pedding' });

      const { currentPage } = this.state;

      this.props
        .App(this.props.imageName, currentPage)
        .then(imageGallery =>
          this.setState({
            imageGallery,
            // currentPage : 1,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const { imageGallery, status } = this.state;
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
            {imageGallery.hits.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onclick={this.openModal}
              />
            ))}
          </ul>
          {
            <Button
              currentPage={this.props.currentPage}
              imageGallery={this.state.imageGallery}
              App={this.props.App}
              onPageUpdate={this.props.onPageUpdate}
              imageName={this.props.imageName}
            />
          }
          <Modal
            imageGallery={this.state.imageGallery.hits}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </div>
      );
    }
  }
}

