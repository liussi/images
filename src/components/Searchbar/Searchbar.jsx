import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';
 import { toast } from 'react-toastify';
import { useState } from 'react';


import {
  SearchbarContainer,
  SearchFormContainer,
  SearchFormButton,
  SearchFormInput,
} from './SearchForm.styled';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleSubmitName = e => {
    const value = e.currentTarget.value.toLowerCase();
    setImageName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('ERROR😲');
      return;
    }
   
    onSubmit({ imageName });
    setImageName('');
  };

  return (
    <IconContext.Provider value={{ color: 'blue', size: '2em' }}>
      <SearchbarContainer>
        <SearchFormContainer onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch />
          </SearchFormButton>
          <SearchFormInput
            onChange={handleSubmitName}
            value={imageName}
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

