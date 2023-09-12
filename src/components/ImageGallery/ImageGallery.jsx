import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import React, { Component } from 'react'

export default class ImageGallery extends Component {
  state = {
    imageGallery: null,
      error: null,
    status: 'idle',
  };

    componentDidUpdate(prevProps, PrevState) {
        if (prevProps.imageName !== this.props.imageName) {
            const KEY = '38529296-de6c3fac31b2614a8135b6c10';

            this.setState({ status: 'pedding'});

            fetch(
              `https://pixabay.com/api/?q=${this.props.imageName}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
            )
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                return Promise.reject(
                  new Error(`Таких фото немає${this.state.imageName}`)
                );
              })

              .then(imageGallery =>
                this.setState({ imageGallery, status: 'resolved' })
              )
              .catch(error => this.setState({ error, status: 'rejected' }))
              .finally(() => this.setState({ loading: false }));
    }
    }
    

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
          <ul className="gallery">
            <ImageGalleryItem imageGallery={imageGallery} />
          </ul>
        );
      }

        
  }
}

