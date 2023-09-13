// import React, { Component } from 'react'

// export default class Button extends Component {
//   state = {
//     imageGallery: null,
//     currentPage: 1,
//     status: 'idle',
//   };

//   loadMoreImages = () => {
//     //   this.setState(prevState => ({
//     //       currentPage: prevState.currentPage + 1,
//     //   }));

//     this.props
//       .App(this.props.imageName, this.state.currentPage + 1)
//       .then(imageGallery => this.setState({ imageGallery, status: 'resolved' }))
//       .catch(error => this.setState({ error, status: 'rejected' }))
//       .finally(() => this.setState({ loading: false }));
      
//     //   this.state.currentPage += 1;
//     console.log(this.state.currentPage);
// };
//   render() {
//     return (
//       <div>
       
//           <button onClick={this.loadMoreImages}>Load more</button>
       
//       </div>
//     );
//   }
// }
import React, { Component } from 'react';

class Button extends Component {
  state = {
    imageGallery: null,
    status: 'idle',
    loading: false,
  
  };

    loadMoreImages = () => {
      
          
          console.log('imageGallery:', this.props.imageGallery);
    const { imageName,prevProps, currentPage, App, onPageUpdate, imageGallery } =
      this.props;
        
    const nextPage = currentPage + 1;

    App(imageName, nextPage)
      .then(imageGallery => {
        onPageUpdate(nextPage); // Оновіть сторінку в батьківському компоненті
        this.setState(
          {
            imageGallery: [...prevProps.imageGallery, imageGallery.hits],
            status: 'resolved',
          },
          () => {
            console.log('imageGallery:', this.state.imageGallery);
          }
        );
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <div>
        <button onClick={this.loadMoreImages}>Load more</button>
      </div>
    );
  }
}

export default Button;

