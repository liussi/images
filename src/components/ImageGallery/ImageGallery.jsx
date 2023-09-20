import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ImageGalleryContainer from './ImageGallery.styled'
 import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ImageGallery({
  status,
  imageGallery,
  totalHits,
  perPage,
  currentPage,
  onPageUpdate,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = largeImageURL => {
    setIsOpenModal(true);
    setSelectedImage(largeImageURL);
  };

  const closeModal = () => setIsOpenModal(false);

  const allPage = totalHits / perPage;

  if (status === 'pedding') {
    return <Loader />;
  }

  if (status === 'rejected') {
    toast.error('ERROR😲');
    return;
  }

  if (status === 'resolved') {
    return (
      <div>
        <ImageGalleryContainer>
          { imageGallery.map(item => (
              <ImageGalleryItem
                key={item.id}
                item={item}
                onClick={() => openModal(item.largeImageURL)}
              />
            ))}
        </ImageGalleryContainer>
        {currentPage <= allPage && imageGallery && imageGallery.length > 0 && (
          <Button onPageUpdate={onPageUpdate} />
        )}

        {isOpenModal && (
          <Modal
            openModal={openModal}
            onClose={closeModal}
            image={selectedImage}
          />
        )}
      </div>
    );
  }
} 


