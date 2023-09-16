import {ImageGalleryItemImage,ImageGalleryItemContainer } from './ImageGalleryItem.styled'

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <ImageGalleryItemContainer  onClick={onClick}>
      <ImageGalleryItemImage
        src={item.webformatURL}
        alt={item.tags}
        width={200}
      />
    </ImageGalleryItemContainer>
  );
}
