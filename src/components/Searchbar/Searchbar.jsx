
    import React, { Component } from 'react'
    
export default class Searchbar extends Component {
  state = {
    imageName: '',
  
  };

  handleSubmitName = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
    console.log(e.currentTarget.value);
}

  handleSubmit = event => {
    event.preventDefault();
    
      if (this.state.imageName.trim() === '') {
          return
      }
      this.props.onSubmit(this.state.imageName, this.state.currentPage);
      this.setState({ imageName: '' });
  }
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleSubmitName}
            value={this.state.imageName}
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
    
 
