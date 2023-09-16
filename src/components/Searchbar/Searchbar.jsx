import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import React, { Component } from 'react';
 import { toast } from 'react-toastify';

import {
  SearchbarContainer,
  SearchFormContainer,
  SearchFormButton,
  SearchFormInput,
} from './SearchForm.styled';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleSubmitName = e => {
    const value = e.currentTarget.value;

      this.setState({
      imageName: value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {imageName, currentPage} = this.state

    if (imageName.trim() === '') {
       toast.error('ERROR😲');
      return;
    }
    this.props.onSubmit(imageName,currentPage);
    this.setState({ imageName: '' });
  };
  
  render() {
    return (
      <IconContext.Provider value={{ color: 'blue', size: '2em' }}>
        <SearchbarContainer>
          <SearchFormContainer onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <FaSearch />
            </SearchFormButton>
            <SearchFormInput
              onChange={this.handleSubmitName}
              value={this.state.imageName}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchFormContainer>
        </SearchbarContainer>
      </IconContext.Provider>
    );
  }
}
