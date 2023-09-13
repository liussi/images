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
    currentPage : 1,
  };

  loadMoreImages = () => {
    const { imageName, currentPage, App, onPageUpdate } = this.props;
    const nextPage = currentPage + 1;
    console.log(nextPage);
    console.log(currentPage);
    App(imageName, nextPage)
      .then(imageGallery => {
        onPageUpdate(nextPage); // Оновіть сторінку в батьківському компоненті
        this.setState({ imageGallery, status: 'resolved' });
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

