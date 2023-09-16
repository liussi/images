import React, { Component } from 'react';
import {
  SearchbarContainer,
  SearchFormContainer,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchForm.styled';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleSubmitName = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.imageName, this.state.currentPage);
    this.setState({ imageName: '' });
  };
  render() {
    return (
      <SearchbarContainer >
        <SearchFormContainer  onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" >
            <SearchFormButtonLabel >
              Search
            </SearchFormButtonLabel>
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
    );
  }
}
