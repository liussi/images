
import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppContainer, GlobalStyles } from './GlobalStyles.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [imageName, setImageName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [imageGallery, setImageGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');

  const fetchImages = async () => {

    try {
      const KEY = '38529296-de6c3fac31b2614a8135b6c10';
      const response = await fetch(
        `https://pixabay.com/api/?q=${imageName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error(
          `There was an error fetching images for the query: ${imageName}`
        );
      }

      const data = await response.json();
      const hits = data.hits;
      const totalHits = data.totalHits;

      if (currentPage === 1) {
        setImageGallery(hits);
      } else {
        setImageGallery(prevImages => [...prevImages, ...hits]);
      }

      setTotalHits(totalHits);
      setStatus('resolved');
    } catch (error) {
      console.error(error);
      setStatus('rejected');
      toast.error(`Error: ${error.message}`);
    }
  };

 
  useEffect(() => {
    if (imageName === '') return;

    fetchImages();
  }, [imageName, currentPage]);

  const handlePageUpdate = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = ({ imageName }) => {
    setImageName(imageName);
    setCurrentPage(1);
    setImageGallery([]);
  };

  return (
    <GlobalStyles>
      <AppContainer>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          currentPage={currentPage}
          onPageUpdate={handlePageUpdate}
          perPage={perPage}
          imageGallery={imageGallery}
          totalHits={totalHits}
          status={status}
        />
      </AppContainer>
      <ToastContainer autoClose={3000} theme="colored" />
    </GlobalStyles>
  );
}

export default App;


