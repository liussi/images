import { Component } from "react"
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'


export class App extends Component {
  state = {
   
    imageName: '',
  };

  hendleFormSubmit = imageName => {
    this.setState({ imageName });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.hendleFormSubmit} />;
        <ImageGallery imageName={this.state.imageName} />
      </div>
    );
  }
}
