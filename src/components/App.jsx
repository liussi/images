
import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { AppContainer, GlobalStyles } from './GlobalStyles.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../servises/api';

function App() {
  const [imageName, setImageName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [imageGallery, setImageGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');


  useEffect(() => {
    
    const fetchImagesLoadmor= async () =>{
       const { hits, totalHits } = await fetchImages({
         setStatus,
         imageName,
         currentPage,
         perPage,
       });
      try {
        setImageGallery(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
        setStatus('resolved');
      } catch (error) {
        console.error(error);
        setStatus('rejected');
        toast.error(`Error: ${error.message}`);
      }
    }
   
    (imageName && fetchImagesLoadmor()) ||
      (currentPage > 1 && fetchImagesLoadmor());
    
  }, [imageName, currentPage, perPage]);

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


